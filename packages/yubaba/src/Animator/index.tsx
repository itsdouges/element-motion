import * as React from 'react';
import { createPortal } from 'react-dom';
import Collector, {
  SupplyDataHandler,
  SupplyRenderChildrenHandler,
  SupplyRefHandler,
  CollectorChildrenAsFunction,
  CollectorData,
  CollectorChildrenProps,
  CollectorActions,
  InlineStyles,
  TargetPropsFunc,
  AnimationData,
  AnimationCallback,
} from '../Collector';
import { getElementBoundingBox } from '../lib/dom';
import defer from '../lib/defer';
import noop from '../lib/noop';
import { precondition, warn } from '../lib/log';
import * as store from '../lib/animatorStore';
import { InjectedProps, withVisibilityManagerContext } from '../VisibilityManager';

export type AnimationFunc = () => Promise<void>;

export interface MappedAnimation {
  animate: AnimationFunc;
  beforeAnimate: AnimationFunc;
  afterAnimate: AnimationFunc;
  cleanup: () => void;
}

export type AnimationBlock = MappedAnimation[];

export interface ChildProps {
  style?: InlineStyles;
  className?: string;
}

export interface State {
  childProps: ChildProps;
  animationsMarkup: React.ReactPortal[];
}

export interface AnimatorProps extends CollectorChildrenProps, InjectedProps {
  /**
   * Name of the animator, this should match the target animator.
   */
  name: string;

  /**
   * Used alternatively to the implicit animation triggering via unmounting or mounting of Animator components.
   * Only use `in` if your component is expected to persist through the entire lifecyle of the app.
   * When you transition to the "next page" make sure to set your "in" to false. When you transition
   * back to the original page set the "in" prop back to true. This lets the Animator components know when to
   * execute the animations.
   */
  in?: boolean;

  /**
   * Callback called when all animations have finished and been cleaned up. Fired from the triggering Animator
   * component.
   */
  onFinish: () => void;

  /**
   * Time this component will wait until it throws away the animation.
   * Defaults to 50ms, might want to bump it up if loading something that was code split.
   */
  timeToWaitForNextAnimator: number;

  /**
   * HTMLElement container used when creating elements for animations,
   * generally only supporting animations will need this.
   */
  container: HTMLElement | (() => HTMLElement);
}

export default class Animator extends React.PureComponent<AnimatorProps, State> {
  static displayName = 'Animator';

  static defaultProps = {
    onFinish: noop,
    timeToWaitForNextAnimator: 50,
    container: document.body,
  };

  state: State = {
    animationsMarkup: [],
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

    if (componentIn === undefined && store.has(name)) {
      // A child has already been stored, so this is probably the matching pair.
      this.executeAnimations();
      return;
    }

    if (componentIn === undefined || componentIn) {
      // Ok nothing is there yet, show ourself and store DOM data for later.
      // We'll be waiting for another Animator to mount.
      this.showSelfAndNotifyManager();
    }
  }

  componentWillUpdate(prevProps: AnimatorProps) {
    const { in: isIn } = this.props;
    if (prevProps.in === false && isIn === true) {
      // We're being removed from "in". Let's recalculate our DOM position.
      this.storeDOMData();
      this.delayedClearStore();
      this.abortAnimations();
    }
  }

  componentDidUpdate(prevProps: AnimatorProps) {
    const { in: isIn, name } = this.props;

    if (isIn === prevProps.in) {
      // Nothing has changed, return early.
      return;
    }

    if (
      process.env.NODE_ENV === 'development' &&
      (isIn === undefined || prevProps.in === undefined)
    ) {
      warn(
        `You're switching between controlled and uncontrolled, don't do this. Either always set the "in" prop as true or false, or keep as undefined.`
      );
    }

    if (isIn) {
      if (store.has(name)) {
        this.executeAnimations();
        return;
      }

      this.showSelfAndNotifyManager();
    }
  }

  componentWillUnmount() {
    this.storeDOMData();
    this.delayedClearStore();
    this.abortAnimations();
    this.unmounting = true;
  }

  showSelfAndNotifyManager() {
    const { context, name } = this.props;

    // If a VisibilityManager is a parent up the tree context will be available.
    // Notify them that we're finished getting ready.
    if (context) {
      context.onFinish({ name });
    }
  }

  delayedClearStore() {
    const { name, timeToWaitForNextAnimator } = this.props;

    setTimeout(() => store.remove(name), timeToWaitForNextAnimator);
  }

  storeDOMData() {
    if (this.unmounting) {
      return;
    }

    // If there is only a Animator target and no child animations
    // data will be undefined, which means there are no animations to store.
    if (this.data) {
      if (process.env.NODE_ENV === 'development') {
        precondition(
          this.element,
          `The ref was not set when trying to store data, check that a child element has a ref passed. This needs to be set so we can take a snapshot of the origin DOM element.

<${Animator.displayName} name="${this.props.name}">
  {props => <div ref={props.ref} />}
</${Animator.displayName}>
`
        );
      }

      const elementBoundingBox = getElementBoundingBox(this.element as HTMLElement);
      const focalTargetElementBoundingBox = this.focalTargetElement
        ? getElementBoundingBox(this.focalTargetElement)
        : undefined;

      if (process.env.NODE_ENV === 'development' && elementBoundingBox.size.height === 0) {
        warn(`Your target child had a height of zero when capturing it's DOM data. This may affect the animation.
If it's an image, try and have the image loaded before mounting, or set a static height.`);
      }

      const { name } = this.props;

      // NOTE: Currently in react 16.3 if the parent being unmounted is a Fragment
      // there is a chance for sibling elements to be removed from the DOM first
      // resulting in inaccurate calculations of location. Watch out!
      const data: store.AnimatorData = {
        elementData: {
          element: this.element as HTMLElement,
          elementBoundingBox,
          focalTargetElement: this.focalTargetElement,
          focalTargetElementBoundingBox,
          render: this.renderChildren,
        },
        collectorData: this.data,
      };

      store.set(name, data);
    }
  }

  executeAnimations = () => {
    const { name, container: getContainer, context } = this.props;
    const container = typeof getContainer === 'function' ? getContainer() : getContainer;
    const fromTarget = store.get(name);

    if (fromTarget) {
      const { collectorData, elementData } = fromTarget;
      this.animating = true;

      // Calculate DOM data for the executing element to then be passed to the animation/s.
      const animationData: AnimationData = {
        origin: elementData,
        destination: {
          render: this.renderChildren,
          element: this.element as HTMLElement,
          elementBoundingBox: getElementBoundingBox(this.element as HTMLElement),
          focalTargetElement: this.focalTargetElement,
          focalTargetElementBoundingBox: this.focalTargetElement
            ? getElementBoundingBox(this.focalTargetElement)
            : undefined,
        },
      };

      // Loads each action up in an easy-to-execute format.
      const actions = collectorData.map((targetData, index) => {
        if (targetData.action !== CollectorActions.animation) {
          return targetData;
        }

        // Element will be lazily instantiated if we need to add something to the DOM.
        let elementToMountChildren: HTMLElement | null = null;

        const mount = (jsx: React.ReactNode) => {
          if (!elementToMountChildren) {
            elementToMountChildren = document.createElement('div');
            // We insert the new element at the beginning of the body to ensure correct stacking context.
            container.insertBefore(elementToMountChildren, container.firstChild);
          }

          // This ensures that if there was an update to the jsx that is animating it changes next frame.
          // Resulting in the transition _actually_ happening.
          requestAnimationFrame(() => {
            if (elementToMountChildren) {
              this.setState(prevState => {
                const newAnimationsMarkup = prevState.animationsMarkup.concat();
                newAnimationsMarkup[index] = createPortal(jsx, elementToMountChildren!);
                return {
                  animationsMarkup: newAnimationsMarkup,
                };
              });
            }
          });
        };

        const setChildProps = (props: TargetPropsFunc | null) => {
          if (this.unmounting) {
            return;
          }

          if (props) {
            this.setState(prevState => ({
              childProps: {
                style: props.style
                  ? props.style(prevState.childProps.style || {})
                  : prevState.childProps.style,
                className: props.className
                  ? props.className(prevState.childProps.className)
                  : prevState.childProps.className,
              },
            }));
          } else {
            this.setState({
              childProps: {},
            });
          }
        };

        const generatePhase = (cb: AnimationCallback | undefined) => () => {
          if (cb) {
            const deferred = defer();
            const jsx = cb(animationData, deferred.resolve, setChildProps);

            if (jsx) {
              mount(jsx);
            }

            return deferred.promise;
          }

          return Promise.resolve();
        };

        return {
          action: CollectorActions.animation,
          payload: {
            beforeAnimate: generatePhase(targetData.payload.beforeAnimate),
            animate: generatePhase(targetData.payload.animate),
            afterAnimate: generatePhase(targetData.payload.afterAnimate),
            cleanup: () => {
              if (elementToMountChildren && container.contains(elementToMountChildren)) {
                container.removeChild(elementToMountChildren);
              }

              if (this.unmounting) {
                return;
              }

              this.setState({
                animationsMarkup: [],
              });

              setChildProps(null);
            },
          },
        };
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

      // If a VisibilityManager is a parent somewhere, notify them that we're starting animating.
      if (context) {
        context.onStart({ name });
      }

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
                // If a VisibilityManager is a parent somewhere, notify them that we're finished animating.
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
    const { childProps, animationsMarkup } = this.state;
    const { children } = this.props;

    return (
      <React.Fragment>
        {animationsMarkup}
        <Collector
          topMostCollector
          receiveData={this.setData}
          receiveRenderChildren={this.setReactNode}
          receiveRef={this.setRef}
          receiveFocalTargetRef={this.setTargetRef}
          style={childProps.style}
          className={childProps.className}
        >
          {typeof children === 'function' ? children : React.Children.only(children)}
        </Collector>
      </React.Fragment>
    );
  }
}

export const WrappedAnimator = withVisibilityManagerContext(Animator);
