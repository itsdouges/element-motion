import * as React from 'react';
import { createPortal } from 'react-dom';
import Collector, {
  SupplyDataHandler,
  SupplyRenderChildrenHandler,
  SupplyRefHandler,
  CollectorChildrenAsFunction,
  CollectorData,
  CollectorActions,
  TargetPropsFunc,
  MotionData,
  MotionCallback,
} from '../Collector';
import { getElementBoundingBox, eventListener } from '../lib/dom';
import defer from '../lib/defer';
import noop from '../lib/noop';
import { throwIf, warn } from '../lib/log';
import * as store from '../lib/store';
import { withVisibilityManagerContext } from '../VisibilityManager';
import { MotionProps, MotionState, MotionBlock } from './types';

export default class Motion extends React.PureComponent<MotionProps, MotionState> {
  static displayName = 'Motion';

  static defaultProps = {
    onFinish: noop,
    timeToWaitForNext: 50,
    container: document.body,
    name: '',
  };

  state: MotionState = {
    motionsMarkup: [],
    childProps: {},
  };

  executing: boolean = false;

  unmounting: boolean = false;

  element: HTMLElement | null;

  focalTargetElement: HTMLElement | null;

  renderChildren: CollectorChildrenAsFunction;

  data: CollectorData[];

  cancel: () => void = () => undefined;

  componentDidMount() {
    const { in: componentIn, name, triggerSelfKey } = this.props;

    if (process.env.NODE_ENV === 'development' && (!triggerSelfKey && !name)) {
      warn(
        '"name" prop needs to be defined. Without it you may have problems matching up motion targets. You will not get this error when using "triggerSelfKey" prop.'
      );
    }

    if (store.has(name) && componentIn === undefined) {
      if (process.env.NODE_ENV === 'development') {
        this.throwIfElementUndefinedOrNotDOMElement(this.element, 'destination');
      }

      // A child has already been stored, so this is probably the matching pair.
      if (
        this.element &&
        this.element.tagName === 'IMG' &&
        !(this.element as HTMLImageElement).complete
      ) {
        const remove = eventListener(this.element, 'load', () => {
          remove();
          this.execute();
        });
      } else {
        this.execute();
      }

      return;
    }

    if (componentIn === undefined || componentIn) {
      // Ok nothing is there yet, show ourself and store DOM data for later.
      // We'll be waiting for another Motion to mount.
      this.notifyVisibilityManagerWeFinished();
    }
  }

  getSnapshotBeforeUpdate(prevProps: MotionProps) {
    if (prevProps.in === true && this.props.in === false) {
      this.snapshotDOMData();
      this.delayedClearStore();
      this.cancel();
    }

    if (prevProps.triggerSelfKey !== this.props.triggerSelfKey) {
      return this.snapshotDOMData('return');
    }

    return null;
  }

  componentDidUpdate(prevProps: MotionProps, _: MotionState, DOMSnapshot: store.MotionData | null) {
    const inPropSame = this.props.in === prevProps.in;
    const triggerSelfKeyPropSame = this.props.triggerSelfKey === prevProps.triggerSelfKey;

    if (inPropSame && triggerSelfKeyPropSame) {
      // Nothing has changed, return early.
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      throwIf(
        this.props.in !== undefined && this.props.triggerSelfKey !== undefined,
        `Don't use "in" and "triggerSelfKey" together. If your element is persisted use "in". If your element is targeting itself for motions use "triggerSelfKey".`
      );
    }

    if (process.env.NODE_ENV === 'development') {
      throwIf(
        (this.props.in === undefined || prevProps.in === undefined) && !inPropSame,
        `You're switching between persisted and unpersisted, don't do this. Either always set the "in" prop as true or false, or keep as undefined.`
      );
    }

    if (process.env.NODE_ENV === 'development') {
      throwIf(
        (this.props.triggerSelfKey === undefined || prevProps.triggerSelfKey === undefined) &&
          !triggerSelfKeyPropSame,
        `You're switching between self triggering modes, don't do this. Either always set the "triggerSelfKey" prop or keep as undefined.`
      );
    }

    if (this.props.in) {
      if (store.has(this.props.name)) {
        this.execute();
        // return early dont tell manager yet dawg
        return;
      }
      // No motion to trigger, tell manager we're all good regardless.
      this.notifyVisibilityManagerWeFinished();
      return;
    }

    if (!triggerSelfKeyPropSame) {
      this.cancel();
      this.execute(DOMSnapshot);
    }
  }

  componentWillUnmount() {
    if (this.props.triggerSelfKey) {
      this.cancel();
      this.unmounting = true;
      return;
    }

    this.snapshotDOMData();
    this.delayedClearStore();
    this.cancel();
    this.unmounting = true;
  }

  notifyVisibilityManagerWeFinished() {
    const { context, name } = this.props;

    // If a VisibilityManager is a parent up the tree context will be available.
    // Notify them that we're finished getting ready.
    if (context) {
      context.onFinish({ name });
    }
  }

  delayedClearStore() {
    const { name, timeToWaitForNext } = this.props;

    setTimeout(() => store.remove(name), timeToWaitForNext);
  }

  throwIfElementUndefinedOrNotDOMElement(element: HTMLElement | null, location: string) {
    if (process.env.NODE_ENV === 'development') {
      const buildMessage = (msg: string) => `${msg}

<${Motion.displayName} name="${this.props.name}">
  {props => <div ref={props.ref} />}
</${Motion.displayName}>
`;

      throwIf(
        !element,
        buildMessage(
          `The ${location} ref was not set when trying to store data, check that a child element has a ref passed.
This needs to be set so we can take a snapshot of the origin DOM element!
Try setting "innerRef" or "ref" depending if the component is using React.forwardRef().`
        )
      );

      throwIf(
        !(element instanceof HTMLElement),
        buildMessage(
          `The ${location} ref was not a DOM element - double check your ref to make sure it's being passed to a real DOM element!
You might need to use "innerRef" if the component isn't using React.forwardRef().`
        )
      );
    }
  }

  snapshotDOMData(action: 'store' | 'return' = 'store'): store.MotionData | null {
    // If there is only a Motion target and no child motions
    // data will be undefined, which means there are no motions to store.
    if (this.unmounting || !this.data) {
      return null;
    }

    if (process.env.NODE_ENV === 'development') {
      this.throwIfElementUndefinedOrNotDOMElement(this.element, 'origin');
    }

    const elementBoundingBox = getElementBoundingBox(this.element as HTMLElement);
    const focalTargetElementBoundingBox = this.focalTargetElement
      ? getElementBoundingBox(this.focalTargetElement)
      : undefined;

    if (process.env.NODE_ENV === 'development' && elementBoundingBox.size.height === 0) {
      warn(`Your origin element had a height of zero when capturing it's DOM data. This may affect the motion.
If it's an image, try and have the image loaded before mounting or set a static height.`);
    }

    const { name } = this.props;

    // NOTE: Currently in react 16.3 if the parent being unmounted is a Fragment
    // there is a chance for sibling elements to be removed from the DOM first
    // resulting in inaccurate calculations of location. Watch out!
    const data: store.MotionData = {
      elementData: {
        element: this.element as HTMLElement,
        elementBoundingBox,
        focalTargetElement: this.focalTargetElement,
        focalTargetElementBoundingBox,
        render: this.renderChildren,
      },
      collectorData: this.data,
    };

    if (action === 'return') {
      return data;
    }

    if (action === 'store') {
      store.set(name, data);
    }

    return null;
  }

  execute = (DOMSnapshot: store.MotionData | null = store.get(this.props.name)) => {
    const { name, container: getContainer, context } = this.props;
    const container = typeof getContainer === 'function' ? getContainer() : getContainer;
    let aborted = false;

    if (process.env.NODE_ENV === 'development') {
      this.throwIfElementUndefinedOrNotDOMElement(this.element, 'destination');
    }

    if (DOMSnapshot) {
      const { collectorData, elementData } = DOMSnapshot;
      this.executing = true;

      /**
       * !! START SAFARI BULLSHIT HACK ALERT !!
       * Safari has a problem correctly updating a parent element if a child element changes its position.
       * Because of this it will read the wrong dimensions in this frame and then in the next frame have them
       * as we expected.
       *
       * This essentially forces the browser to repaint everything in the current frame.
       */
      this.element!.style.display = 'none';
      this.element!.offsetHeight; // eslint-disable-line no-unused-expressions
      this.element!.style.display = '';
      /**
       * !! END SAFARI BULLSHIT HACK ALERT !!
       */

      // Calculate DOM data for the executing element to then be passed to the motion/s.
      const motionData: MotionData = {
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

      if (
        process.env.NODE_ENV === 'development' &&
        motionData.destination.elementBoundingBox.size.height === 0
      ) {
        warn(`Your destination element had a height of zero when capturing it's DOM data. This may affect the motion.
If it's an image, try and have the image loaded before mounting or set a static height.`);
      }

      // Loads each action up in an easy-to-execute format.
      const actions = collectorData.map((targetData, index) => {
        if (targetData.action !== CollectorActions.motion) {
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

          if (elementToMountChildren) {
            this.setState(prevState => {
              const markup = prevState.motionsMarkup.concat();
              markup[index] = createPortal(jsx, elementToMountChildren!);
              return {
                motionsMarkup: markup,
              };
            });
          }
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

        const generatePhase = (cb: MotionCallback | undefined) => () => {
          if (cb) {
            const deferred = defer();
            const jsx = cb(motionData, deferred.resolve, setChildProps);

            if (jsx) {
              mount(jsx);
            }

            return deferred.promise;
          }

          return Promise.resolve();
        };

        return {
          action: CollectorActions.motion,
          payload: {
            beforeAnimate: generatePhase(targetData.payload.beforeAnimate),
            animate: generatePhase(targetData.payload.animate),
            afterAnimate: generatePhase(targetData.payload.afterAnimate),
            cleanup: () => {
              if (elementToMountChildren && container.contains(elementToMountChildren)) {
                container.removeChild(elementToMountChildren);
              }

              if (targetData.payload.abort) {
                targetData.payload.abort();
              }

              if (this.unmounting) {
                return;
              }

              this.setState({
                motionsMarkup: [],
              });

              setChildProps(null);
            },
          },
        };
      });

      const blocks = actions.reduce<MotionBlock[]>(
        (arr, targetData) => {
          switch (targetData.action) {
            case CollectorActions.motion: {
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

      this.cancel = () => {
        aborted = true;

        if (this.executing) {
          this.executing = false;
          blocks.forEach(block => block.forEach(motion => motion.cleanup()));
        }
      };

      const beforeAnimatePromises = actions.map(targetData =>
        targetData.action === CollectorActions.motion
          ? targetData.payload.beforeAnimate()
          : Promise.resolve()
      );

      // If a VisibilityManager is a parent somewhere, notify them that we're starting animating.
      if (context) {
        context.onStart({ name });
      }

      Promise.all(beforeAnimatePromises)
        .then(() => {
          // Wait two motion frames before triggering motions.
          // This makes sure state set inside animate don't happen in the same motion frame as beforeAnimate.
          const deferred = defer();
          requestAnimationFrame(() => {
            requestAnimationFrame(() => deferred.resolve());
          });
          return deferred.promise;
        })
        .then(() => {
          // Trigger each blocks motions, one block at a time.
          return (
            blocks
              // We don't care what the promises return.
              .reduce<Promise<any>>(
                (promise, block) =>
                  promise.then(() => Promise.all(block.map(motion => motion.animate()))),
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
                      Promise.all(block.map(motion => motion.afterAnimate())).then(() => undefined)
                    ),
                  Promise.resolve()
                );
              })
              .then(() => {
                if (aborted) {
                  return;
                }

                blocks.forEach(block => block.forEach(motion => motion.cleanup()));
              })
              .then(() => {
                this.executing = false;
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
    const { childProps, motionsMarkup } = this.state;
    const { children } = this.props;

    return (
      <React.Fragment>
        {motionsMarkup}
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

export const WrappedMotion = withVisibilityManagerContext(Motion);
