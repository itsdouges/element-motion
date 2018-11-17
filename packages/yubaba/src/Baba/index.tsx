import * as React from 'react';
import {
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
  unmountComponentAtNode,
} from 'react-dom';
import { css, cx } from 'emotion';
import Collector, {
  AnimationData,
  SupplyDataHandler,
  SupplyRenderChildrenHandler,
  SupplyRefHandler,
  CollectorChildrenAsFunction,
  CollectorData,
  CollectorChildrenProps,
  CollectorActions,
  Styles,
  ChildPropsFunc,
} from '../Collector';
import { getElementSizeLocation } from '../lib/dom';
import defer from '../lib/defer';
import noop from '../lib/noop';
import * as babaStore from '../lib/babaStore';
import { InjectedProps, withBabaManagerContext } from '../BabaManager';

/**
 * @hidden
 */
export type AnimationFunc = () => Promise<void>;

/**
 * @hidden
 */
export interface MappedAnimation {
  animate: AnimationFunc;
  beforeAnimate: AnimationFunc;
  afterAnimate: AnimationFunc;
  cleanup: () => void;
}

/**
 * @hidden
 */
export type AnimationBlock = MappedAnimation[];

/**
 * @hidden
 */
export interface ChildProps {
  style?: Styles;
  className?: string;
}

/**
 * @hidden
 */
export interface State {
  shown: boolean;
  childProps: ChildProps;
}

const shownClass = css({ opacity: 1 });
const hiddenClass = css({ opacity: 0 });

export interface BabaProps extends CollectorChildrenProps, InjectedProps {
  /**
   * Name of the yubaba animation, this should match the target yubaba.
   */
  name: string;

  /**
   * Used alternatively to the implicit animation triggering via unmounting/mounting of Baba components.
   * Only use `in` if your component is expected to persist through the entire lifecyle of the app.
   * When you transition to the "next page" make sure to set your "in" to false. When you transition
   * back to the original page set the "in" prop back to true. This lets the Baba components know when to
   * execute the animations.
   */
  in?: boolean;

  /**
   * Callback called when all animations have finished and been cleaned up. Fired from the triggering Baba
   * component.
   */
  onFinish: () => void;

  /**
   * Time this component will wait until it throws away the animation.
   * Defaults to 50ms, might want to bump it up if loading something that was code split.
   */
  TIME_TO_WAIT_FOR_NEXT_BABA: number;
}

/**
 * ## Baba
 *
 * This is the primary component in `yubaba`.
 * When rendering it will be given all of the animation data from its children.
 * When unmounting or flipping the prop `in` from `true` to `false`,
 * it will execute all the animations `top to bottom` below it if a matching `<Baba />` pair is found within 50ms.
 *
 * ### Usage
 *
 * ```
 * import Baba, { CrossFadeMove } from 'yubaba';
 *
 * const MyApp = ({ shown, show }) => (
 *  <div>
 *    {shown || (
 *      <Baba name="my-anim">
 *        <CrossFadeMove>
 *          {({ ref, style }) => <div onClick={() => show(false)} ref={ref} style={style}>starting point</div>}
 *        </CrossFadeMove>
 *      </Baba>
 *    )}
 *
 *    {shown && (
 *      <Baba name="my-anim">
 *        <CrossFadeMove>
 *          {({ ref, style }) => <div onClick={() => show(true)} ref={ref} style={style}>ending point</div>}
 *        </CrossFadeMove>
 *      </Baba>
 *    )}
 *  </div>
 * );
 * ```
 */
export class Baba extends React.PureComponent<BabaProps, State> {
  static displayName = 'Baba';

  static defaultProps = {
    onFinish: noop,
    TIME_TO_WAIT_FOR_NEXT_BABA: 50,
  };

  state: State = {
    shown: false,
    childProps: {},
  };

  animating: boolean = false;

  unmounting: boolean = false;

  element: HTMLElement | null;

  focalTargetElement: HTMLElement | null;

  renderChildren: CollectorChildrenAsFunction;

  data: CollectorData[];

  abortAnimations: () => void = () => undefined;

  componentDidMount() {
    const { in: componentIn, name } = this.props;

    if (componentIn === undefined && babaStore.has(name)) {
      // A child has already been stored, so this is probably the matching pair.
      this.executeAnimations();
      return;
    }

    if (componentIn === undefined || componentIn) {
      // Ok nothing is there yet, show ourself and store DOM data for later.
      // We'll be waiting for another Baba to mount.
      this.showSelfAndNotifyManager();
    }
  }

  componentWillUpdate(prevProps: BabaProps) {
    const { in: isIn } = this.props;
    if (prevProps.in === false && isIn === true) {
      // We're being removed from "in". Let's recalculate our DOM position.
      this.storeBabaData();
      this.delayedClearBabaData();
      this.abortAnimations();
    }
  }

  componentDidUpdate(prevProps: BabaProps) {
    const { in: isIn, name } = this.props;

    if (isIn === prevProps.in) {
      // Nothing has changed, return early.
      return;
    }

    if (
      process.env.NODE_ENV === 'development' &&
      (isIn === undefined || prevProps.in === undefined)
    ) {
      console.warn(`yubaba
You're switching between controlled and uncontrolled, don't do this. Either always set the "in" prop as true or false, or keep as undefined.`);
    }

    if (isIn) {
      if (babaStore.has(name)) {
        this.executeAnimations();
        return;
      }

      this.showSelfAndNotifyManager();
    }
  }

  componentWillUnmount() {
    this.storeBabaData();
    this.delayedClearBabaData();
    this.abortAnimations();
    this.unmounting = true;
  }

  showSelfAndNotifyManager() {
    const { context, name } = this.props;

    this.setState({
      shown: true,
    });

    // If a BabaManager is a parent up the tree context will be available.
    // Notify them that we're finished getting ready.
    if (context) {
      context.onFinish({ name });
    }
  }

  delayedClearBabaData() {
    const { name, TIME_TO_WAIT_FOR_NEXT_BABA } = this.props;

    setTimeout(() => babaStore.remove(name), TIME_TO_WAIT_FOR_NEXT_BABA);
  }

  storeBabaData() {
    if (this.unmounting) {
      return;
    }

    // If there is only a Baba target and no child animations
    // data will be undefined, which means there are no animations to store.
    if (this.data) {
      const elementBoundingBox = getElementSizeLocation(this.element as HTMLElement);
      const focalTargetElementBoundingBox = this.focalTargetElement
        ? getElementSizeLocation(this.focalTargetElement)
        : undefined;

      if (process.env.NODE_ENV === 'development' && elementBoundingBox.size.height === 0) {
        console.warn(`yubaba
Your target child had a height of zero when capturing it's DOM data. This may affect the animation.
If it's an image, try and have the image loaded before mounting, or set a static height.`);
      }

      const { name } = this.props;

      const animationData: babaStore.BabaStore = {
        elementData: {
          elementBoundingBox,
          focalTargetElementBoundingBox,
          element: this.element as HTMLElement,
          focalTargetElement: this.focalTargetElement,
          render: this.renderChildren,
        },
        collectorData: this.data,
      };

      // NOTE: Currently in react 16.3 if the parent being unmounted is a Fragment
      // there is a chance for sibling elements to be removed from the DOM first
      // resulting in inaccurate calculations of location. Watch out!
      babaStore.set(name, animationData);
    }
  }

  executeAnimations = () => {
    const { name } = this.props;
    const originElementData = babaStore.get(name);

    if (originElementData) {
      const { collectorData, ...target } = originElementData;
      this.animating = true;

      const animationData: AnimationData = {
        origin: target.elementData,
        destination: {
          // Calculate DOM data for the destination element to then be passed to the animation/s.
          render: this.renderChildren,
          element: this.element as HTMLElement,
          elementBoundingBox: getElementSizeLocation(this.element as HTMLElement),
          focalTargetElement: this.focalTargetElement,
          focalTargetElementBoundingBox: this.focalTargetElement
            ? getElementSizeLocation(this.focalTargetElement)
            : undefined,
        },
      };

      // Loads each action up in an easy-to-execute format.
      const actions = originElementData.collectorData.map(targetData => {
        if (targetData.action === CollectorActions.animation) {
          // Element will be lazily instantiated if we need to add something to the DOM.
          let elementToMountChildren: HTMLElement;

          const mount = (jsx: React.ReactNode) => {
            if (!elementToMountChildren) {
              elementToMountChildren = document.createElement('div');
              // We insert the new element at the beginning of the body to ensure correct
              // stacking context.
              document.body.insertBefore(elementToMountChildren, document.body.firstChild);
            }

            // This ensures that if there was an update to the jsx that is animating,
            // it changes next frame. Resulting in the transition _actually_ happening.
            requestAnimationFrame(() =>
              renderSubtreeIntoContainer(
                this,
                jsx as React.ReactElement<{}>,
                elementToMountChildren
              )
            );
          };

          const unmount = () => {
            if (elementToMountChildren) {
              unmountComponentAtNode(elementToMountChildren);
              document.body.removeChild(elementToMountChildren);
            }
          };

          const setChildProps = (props: ChildPropsFunc | null) => {
            if (props) {
              this.setState(prevState => {
                const styles = props.style
                  ? props.style(prevState.childProps.style || {})
                  : prevState.childProps.style;

                return {
                  childProps: {
                    style: styles,
                    className: css(styles),
                  },
                };
              });
            } else {
              this.setState({
                childProps: {},
              });
            }
          };

          return {
            action: CollectorActions.animation,
            payload: {
              beforeAnimate: () => {
                if (targetData.payload.beforeAnimate) {
                  const deferred = defer();
                  const jsx = targetData.payload.beforeAnimate(
                    animationData,
                    deferred.resolve,
                    setChildProps
                  );

                  if (jsx) {
                    mount(jsx);
                  }

                  return deferred.promise;
                }

                return Promise.resolve();
              },
              animate: () => {
                const deferred = defer();
                const jsx = targetData.payload.animate(
                  animationData,
                  deferred.resolve,
                  setChildProps
                );

                if (jsx) {
                  mount(jsx);
                }

                return deferred.promise;
              },
              afterAnimate: () => {
                if (targetData.payload.afterAnimate) {
                  const deferred = defer();
                  const jsx = targetData.payload.afterAnimate(
                    animationData,
                    deferred.resolve,
                    setChildProps
                  );

                  if (jsx) {
                    mount(jsx);
                  }

                  return deferred.promise;
                }

                return Promise.resolve();
              },
              cleanup: () => {
                unmount();
                setChildProps(null);
              },
            },
          };
        }

        return targetData;
      });

      const blocks = actions.reduce<AnimationBlock[]>(
        (arr, targetData) => {
          switch (targetData.action) {
            case CollectorActions.animation: {
              // Add to the last block in the array.
              arr[arr.length - 1].push(targetData.payload);
              return arr;
            }

            case CollectorActions.wait: {
              // Found a wait action, start a new block.
              arr.push([]);
              return arr;
            }

            default: {
              return arr;
            }
          }
        },
        [[]]
      );

      this.abortAnimations = () => {
        if (this.animating) {
          this.animating = false;
          blocks.forEach(block => block.forEach(anim => anim.cleanup()));
        }
      };

      const beforeAnimatePromises = actions.map(targetData =>
        targetData.action === CollectorActions.animation
          ? targetData.payload.beforeAnimate()
          : Promise.resolve()
      );

      Promise.all(beforeAnimatePromises)
        .then(() => {
          // Wait two animation frames before triggering animations.
          // This makes sure state set inside animate don't happen in the same animation frame as beforeAnimate.
          const deferred = defer();
          requestAnimationFrame(() => {
            requestAnimationFrame(() => deferred.resolve());
          });
          return deferred.promise;
        })
        .then(() => {
          // Trigger each blocks animations, one block at a time.
          return (
            blocks
              // We don't care what the promises return.
              .reduce<Promise<any>>(
                (promise, block) =>
                  promise.then(() => Promise.all(block.map(anim => anim.animate()))),
                Promise.resolve()
              )
              .then(() => {
                // We're finished all the transitions! Show the child element.
                this.setState({
                  shown: true,
                });

                const { context } = this.props;

                // If a BabaManager is a parent somewhere, notify them that we're finished animating.
                if (context) {
                  context.onFinish({ name });
                }

                // Run through all after animates.
                return blocks.reduce(
                  (promise, block) =>
                    promise.then(() =>
                      Promise.all(block.map(anim => anim.afterAnimate())).then(() => undefined)
                    ),
                  Promise.resolve()
                );
              })
              .then(() => {
                blocks.forEach(block => block.forEach(anim => anim.cleanup()));
              })
              .then(() => {
                this.animating = false;
                const { onFinish } = this.props;
                onFinish();
              })
          );
        });
    }
  };

  setRef: SupplyRefHandler = ref => {
    this.element = ref;
  };

  setTargetRef: SupplyRefHandler = ref => {
    this.focalTargetElement = ref;
  };

  setReactNode: SupplyRenderChildrenHandler = renderChildren => {
    this.renderChildren = renderChildren;
  };

  setData: SupplyDataHandler = data => {
    this.data = data;
  };

  render() {
    const { childProps, shown } = this.state;
    const { children } = this.props;

    return (
      <Collector
        receiveData={this.setData}
        receiveRenderChildren={this.setReactNode}
        receiveRef={this.setRef}
        receiveFocalTargetRef={this.setTargetRef}
        className={cx(childProps.className, shown ? shownClass : hiddenClass)}
      >
        {typeof children === 'function' ? children : React.Children.only(children)}
      </Collector>
    );
  }
}

/**
 * @hidden
 */
export default withBabaManagerContext(Baba);
