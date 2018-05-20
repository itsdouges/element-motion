import * as React from 'react';
import Collector, {
  SupplyDataHandler,
  SupplyRenderChildrenHandler,
  SupplyRefHandler,
  ChildrenAsFunction,
  Data,
  CommonProps,
  Actions,
} from './Collector';
import { getElementSizeLocation } from '../lib/dom';
import * as childrenStore from '../lib/childrenStore';
import { InjectedProps, withBabaManagerContext } from './BabaManager';

type PromiseFunc = () => Promise<any>;
type Func = () => void;
interface MappedAnimation {
  animate: PromiseFunc;
  beforeAnimate: PromiseFunc;
  afterAnimate: PromiseFunc;
  abort: Func;
  cleanup: Func;
}
type AnimationBlock = MappedAnimation[];

export interface Props extends CommonProps, InjectedProps {
  name: string;

  /**
   * Only use `in` if your component is expected to persist through the entire lifecyle of the app.
   */
  in?: boolean;

  /**
   * Callback called when all animations have finished and been cleaned up.
   */
  onFinish?: () => void;
}

interface State {
  shown: boolean;
}

class Baba extends React.PureComponent<Props, State> {
  state: State = {
    shown: false,
  };

  animating: boolean = false;
  unmounting: boolean = false;
  element: HTMLElement | null;
  renderChildren: ChildrenAsFunction;
  abortAnimations = () => {};
  data: Data[];

  componentDidMount() {
    if (this.props.in === undefined && childrenStore.has(this.props.name)) {
      // A child has already been stored, so this is probably the matching pair.
      this.executeAnimations();
      return;
    }

    if (this.props.in === undefined || this.props.in) {
      // Ok nothing is there yet, show ourself and store DOM data for later.
      // We'll be waiting for another Baba to mount.
      this.showSelfAndNotifyManager();
    }

    if (this.props.in) {
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

  componentDidUpdate(prevProps: Props) {
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
    }

    this.setState({
      shown: false,
    });

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
    this.props.context && this.props.context.onFinish({ name: this.props.name });
  }

  delayedClearDOMData() {
    setTimeout(() => {
      childrenStore.remove(this.props.name);
    }, 50);
  }

  storeDOMData() {
    if (this.unmounting) {
      return;
    }

    // If there is only a Baba target and no animation data
    // will be undefined, which means there are no animations to store.
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
        element: this.element as HTMLElement,
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

      const actions = fromTarget.data.map(data => {
        if (data.action === Actions.animation) {
          const animationData = {
            caller: this,
            fromTarget: target,
            toTarget: {
              render: this.renderChildren,
              ...getElementSizeLocation(this.element as HTMLElement),
            },
          };

          return {
            action: Actions.animation,
            payload: {
              beforeAnimate: () =>
                data.payload.beforeAnimate
                  ? data.payload.beforeAnimate(animationData)
                  : Promise.resolve(),
              animate: () => data.payload.animate(animationData),
              afterAnimate: () =>
                data.payload.afterAnimate
                  ? data.payload.afterAnimate(animationData)
                  : Promise.resolve(),
              abort: () => data.payload.abort && data.payload.abort(),
              cleanup: () => data.payload.cleanup && data.payload.cleanup(),
            },
          };
        }

        return data;
      });

      const blocks = actions.reduce<AnimationBlock[]>(
        (arr, data) => {
          switch (data.action) {
            case Actions.animation: {
              // Add to the last block in the array.
              arr[arr.length - 1].push(data.payload);
              return arr;
            }

            case Actions.wait: {
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
          blocks.forEach(block => block.forEach(anim => anim.abort()));
        }
      };

      const beforeAnimatePromises = actions.map(
        data =>
          data.action === Actions.animation ? data.payload.beforeAnimate() : Promise.resolve()
      );

      Promise.all(beforeAnimatePromises).then(() => {
        // Trigger each blocks animations, one block at a time.
        return blocks
          .reduce<Promise<any>>(
            (promise, block) => promise.then(() => Promise.all(block.map(anim => anim.animate()))),
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

            // If a BabaManager is a parent somewhere, notify them that
            // we're finished animating.
            this.props.context && this.props.context.onFinish({ name: this.props.name });

            // Run through all after animates.
            return blocks.reduce<Promise<any>>(
              (promise, block) =>
                promise.then(() => Promise.all(block.map(anim => anim.afterAnimate()))),
              Promise.resolve()
            );
          })
          .then(() => blocks.forEach(block => block.forEach(anim => anim.cleanup())))
          .then(() => {
            // Animations can still "animate" away when finishing. So we're truly not finished animating
            // until the cleanup step has finished.
            this.animating = false;
            this.props.onFinish && this.props.onFinish();
          });
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
        }}
      >
        {this.props.children}
      </Collector>
    );
  }
}

export default withBabaManagerContext(Baba);
