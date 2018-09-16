import * as React from 'react';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';
import Collector, {
  SupplyDataHandler,
  SupplyRenderChildrenHandler,
  SupplyRefHandler,
  CollectorChildrenAsFunction,
  CollectorData,
  CollectorChildrenProps,
  CollectorActions,
  InlineStyles,
} from '../Collector';
import { getElementSizeLocation } from '../lib/dom';
import { defer } from '../lib/defer';
import * as childrenStore from '../lib/childrenStore';
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
  style?: InlineStyles;
}

/**
 * @hidden
 */
export interface State {
  shown: boolean;
  childProps: ChildProps;
}

export interface BabaProps extends CollectorChildrenProps, InjectedProps {
  /**
   * Name of the yubaba animation, this should match the target yubaba.
   */
  name: string;

  /**
   * Used alternatively to the implicit animation triggering via unmounting/mounting of Baba components.
   * Only use `in` if your component is expected to persist through the entire lifecyle of the app.
   */
  in?: boolean;

  /**
   * Callback called when all animations have finished and been cleaned up.
   * **Word of caution**: Currently the _target_ `Baba` component will be the one who fires this callback.
   */
  onFinish?: () => void;
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

  state: State = {
    shown: false,
    childProps: {},
  };

  TIME_TO_WAIT_FOR_NEXT_BABA = 50;
  animating: boolean = false;
  unmounting: boolean = false;
  element: HTMLElement | null;
  renderChildren: CollectorChildrenAsFunction;
  data: CollectorData[];
  abortAnimations: () => void = () => undefined;

  componentDidMount() {
    const { in: componentIn, name } = this.props;

    if (componentIn === undefined && childrenStore.has(name)) {
      // A child has already been stored, so this is probably the matching pair.
      this.executeAnimations();
      return;
    }

    if (componentIn === undefined || componentIn) {
      // Ok nothing is there yet, show ourself and store DOM data for later.
      // We'll be waiting for another Baba to mount.
      this.showSelfAndNotifyManager();
    }

    if (componentIn) {
      // Store data so it can be used later. This works around the problem of the "in" prop not having data when it needs.
      this.storeDOMData();
    }
  }

  componentWillUnmount() {
    this.storeDOMData();
    this.delayedClearDOMData();
    this.abortAnimations();
    this.unmounting = true;
  }

  componentDidUpdate(prevProps: BabaProps) {
    if (this.props.in === prevProps.in) {
      // Nothing to do, return early.
      return;
    }

    if (
      process.env.NODE_ENV === 'development' &&
      (this.props.in === undefined || prevProps.in === undefined)
    ) {
      console.warn(`yubaba
You're switching between controlled and uncontrolled, don't do this. Either always set the "in" prop as true or false, or keep as undefined.`);
    }

    if (this.props.in) {
      if (childrenStore.has(this.props.name)) {
        this.executeAnimations();
        return;
      }

      // Store data so it can be used later. This works around the problem of the "in" prop not having data when it needs.
      this.storeDOMData();
      this.showSelfAndNotifyManager();
      return;
    }

    this.storeDOMData();
    this.delayedClearDOMData();
    this.abortAnimations();
  }

  showSelfAndNotifyManager() {
    this.setState({
      shown: true,
    });

    // If a BabaManager is a parent up the tree context will be available.
    // Notify them that we're finished getting ready.
    if (this.props.context) {
      this.props.context.onFinish({ name: this.props.name });
    }
  }

  delayedClearDOMData() {
    setTimeout(() => {
      childrenStore.remove(this.props.name);
    }, this.TIME_TO_WAIT_FOR_NEXT_BABA);
  }

  storeDOMData() {
    if (this.unmounting) {
      return;
    }

    // If there is only a Baba target and no child animations
    // data will be undefined, which means there are no animations to store.
    if (this.data) {
      const DOMData = getElementSizeLocation(this.element as HTMLElement);

      if (process.env.NODE_ENV === 'development' && DOMData.size.height === 0) {
        console.warn(`yubaba
Your target child had a height of zero when capturing it's DOM data. This may affect the animation.
If it's an image, try and have the image loaded before mounting, or set a static height.`);
      }

      // NOTE: Currently in react 16.3 if the parent being unmounted is a Fragment
      // there is a chance for sibling elements to be removed from the DOM first
      // resulting in inaccurate calculations of location. Watch out!
      childrenStore.set(this.props.name, {
        ...DOMData,
        render: this.renderChildren,
        data: this.data,
      });
    }
  }

  executeAnimations = () => {
    const fromTarget = childrenStore.get(this.props.name);
    if (fromTarget) {
      const { data, ...target } = fromTarget;
      this.animating = true;

      // Calculate element DOM data _once_.
      const elementDOMData = {
        fromTarget: target,
        toTarget: {
          render: this.renderChildren,
          ...getElementSizeLocation(this.element as HTMLElement),
        },
      };

      // Loads each action up in an easy-to-execute format.
      const actions = fromTarget.data.map(targetData => {
        if (targetData.action === CollectorActions.animation) {
          let elementToMountChildren: HTMLElement;

          const mount = (jsx: React.ReactElement<{}>) => {
            if (!elementToMountChildren) {
              elementToMountChildren = document.createElement('div');
              document.body.insertBefore(elementToMountChildren, document.body.firstChild);
            }

            // This ensures that if there was an update to the jsx that is animating,
            // it changes next frame. Resulting in the transition _actually_ happening.
            requestAnimationFrame(() =>
              unstable_renderSubtreeIntoContainer(this, jsx, elementToMountChildren)
            );
          };

          const unmount = () => {
            if (elementToMountChildren) {
              unmountComponentAtNode(elementToMountChildren);
              document.body.removeChild(elementToMountChildren);
            }
          };

          let propsStore: ChildProps = {};
          const setTargetProps = (props: { style: InlineStyles } | null) => {
            if (props) {
              // We keep existing set props so consumers don't need to keep
              // calling it with the same props. Think of how setState works
              // except in this instance its deeply nested.
              propsStore = {
                ...propsStore,
                ...props,
                style: {
                  ...propsStore.style,
                  ...props.style,
                },
              };

              this.setState({
                childProps: propsStore || {},
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
                    elementDOMData,
                    deferred.resolve,
                    setTargetProps
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
                  elementDOMData,
                  deferred.resolve,
                  setTargetProps
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
                    elementDOMData,
                    deferred.resolve,
                    setTargetProps
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
                setTargetProps(null);
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

      const beforeAnimatePromises = actions.map(
        targetData =>
          targetData.action === CollectorActions.animation
            ? targetData.payload.beforeAnimate()
            : Promise.resolve()
      );

      Promise.all(beforeAnimatePromises).then(() => {
        // Trigger each blocks animations, one block at a time.
        return (
          blocks
            // We don't care what the promises return.
            // tslint:disable-next-line no-any
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

              // Store data so it can be used later.
              // This primarily works around the problem of the "in" prop not having data when it needs.
              this.storeDOMData();

              // If a BabaManager is a parent somewhere, notify them that we're finished animating.
              if (this.props.context) {
                this.props.context.onFinish({ name: this.props.name });
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
              if (this.props.onFinish) {
                this.props.onFinish();
              }
            })
        );
      });
    }
  };

  setRef: SupplyRefHandler = ref => {
    this.element = ref;
  };

  setReactNode: SupplyRenderChildrenHandler = renderChildren => {
    this.renderChildren = renderChildren;
  };

  setData: SupplyDataHandler = data => {
    this.data = data;
  };

  render() {
    return (
      <Collector
        receiveData={this.setData}
        receiveRenderChildren={this.setReactNode}
        receiveRef={this.setRef}
        style={{
          opacity: this.state.shown ? 1 : 0,
          ...this.state.childProps.style,
        }}
      >
        {this.props.children}
      </Collector>
    );
  }
}

/**
 * @hidden
 */
export default withBabaManagerContext(Baba);
