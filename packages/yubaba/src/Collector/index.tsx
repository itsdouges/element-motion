import * as React from 'react';
// We don't want to depend on this, we'll just grab whatever version emotion gets.
// eslint-disable-next-line import/no-extraneous-dependencies
// import { CSSObject } from 'create-emotion';
import { GetElementSizeLocationReturnValue } from '../lib/dom';

export interface ChildProps {
  style: InlineStyles;
  className?: string;
}

export interface ChildPropsFunc {
  style?: (previous: InlineStyles) => InlineStyles | undefined;
  className?: (previous: string | undefined) => string | undefined;
}

/**
 * AnimationCallback
 *
 * Return JSX if you want to add a new element to the DOM,
 * call onFinish() when you've finished the animation,
 * call setProps() if you want to update the child props.
 */
export type AnimationCallback = (
  data: AnimationData,
  onFinish: () => void,
  setChildProps: (props: ChildPropsFunc) => void
) => React.ReactNode | undefined | void;

export enum CollectorActions {
  animation = 'animation',
  wait = 'wait',
}

export interface WaitAction {
  action: CollectorActions.wait;
}

export interface AnimationAction {
  action: CollectorActions.animation;
  payload: {
    animate: AnimationCallback;
    beforeAnimate?: AnimationCallback;
    afterAnimate?: AnimationCallback;
  };
}

export type CollectorData = AnimationAction | WaitAction;

export type SupplyRefHandler = (ref: HTMLElement | null) => void;

/**
 * @hidden
 */
export type SupplyRenderChildrenHandler = (reactNode: CollectorChildrenAsFunction) => void;

/**
 * @hidden
 */
export type SupplyDataHandler = (data: CollectorData[]) => void;

export type CollectorChildrenAsFunction = (
  props: {
    ref: SupplyRefHandler;
    style: InlineStyles;
    className?: string;
  }
) => React.ReactNode;

/**
 * @hidden
 */
export interface AnimationData {
  origin: ElementData;
  destination: ElementData;
}

// export interface InlineStyles extends CSSObject {}
export interface InlineStyles {
  [key: string]: string | number | undefined;
}

/**
 * @hidden
 */
export interface ElementData {
  element: HTMLElement;
  elementBoundingBox: GetElementSizeLocationReturnValue;
  render: CollectorChildrenAsFunction;
  focalTargetElement: HTMLElement | null | undefined;
  focalTargetElementBoundingBox: GetElementSizeLocationReturnValue | undefined;
}

export interface CollectorChildrenProps {
  children: CollectorChildrenAsFunction | React.ReactElement<CollectorProps>;
}

/**
 * ## CollectorProps
 *
 * Props for the Collector which will eventually be passed to the parent `<Baba />`.
 */
export interface CollectorProps extends CollectorChildrenProps {
  receiveRef?: SupplyRefHandler;
  receiveFocalTargetRef?: SupplyRefHandler;
  receiveRenderChildren?: SupplyRenderChildrenHandler;
  receiveData?: SupplyDataHandler;
  data?: CollectorData;
  style?: InlineStyles;
  className?: string;
}

/**
 * @hidden
 */
export interface Collect {
  ref: SupplyRefHandler;
  /**
   * Used for more complex animations when there is a child in the container
   * that is needed for the animation calculation.
   */
  focalTargetRef: SupplyRefHandler;
  data: SupplyDataHandler;
  renderChildren: SupplyRenderChildrenHandler;
  style: InlineStyles;
  className?: string;
}

export const CollectorContext = React.createContext<Collect | undefined>(undefined);

/**
 * ## Collector
 *
 * Used as the glue for all `yubaba` components.
 * It is purely an internal component which will collect and pass all props up to the parent `<Baba />` component.
 *
 * ### Usage
 *
 * ```
 *  const Noop = ({
 *    children,
 *    duration,
 *  }) => (
 *    <Collector
 *      data={{
 *        action: 'animation',
 *        payload: {
 *          abort: () => {},
 *          cleanup: () => {},
 *          afterAnimate: () => Promise.resolve(),
 *          animate: () => new Promise(resolve => setTimeout(resolve, duration)),
 *          beforeAnimate: () => Promise.resolve(),
 *        },
 *      }}
 *    >
 *      {children}
 *    </Collector>
 *  );
 * ```
 *
 * For example usage look inside `Baba.tsx` or any component in the `animations` folder.
 */
export default class Collector extends React.Component<CollectorProps> {
  render() {
    const {
      children,
      style,
      className,
      data,
      receiveRenderChildren,
      receiveRef,
      receiveData,
    } = this.props;

    if (typeof children !== 'function') {
      return (
        <CollectorContext.Consumer>
          {collect => (
            <CollectorContext.Provider
              value={{
                ref: ref => {
                  if (receiveRef) {
                    receiveRef(ref);
                  }

                  if (collect) {
                    collect.ref(ref);
                  }
                },
                focalTargetRef: ref => {
                  const { receiveFocalTargetRef } = this.props;
                  if (receiveFocalTargetRef) {
                    receiveFocalTargetRef(ref);
                  }

                  if (collect) {
                    collect.focalTargetRef(ref);
                  }
                },
                data: childData => {
                  const collectedData = data ? [data].concat(childData) : childData;
                  if (collect) {
                    collect.data(collectedData);
                  }

                  if (receiveData) {
                    receiveData(childData);
                  }
                },
                renderChildren: node => {
                  if (collect) {
                    collect.renderChildren(node);
                  }

                  if (receiveRenderChildren) {
                    receiveRenderChildren(node);
                  }
                },
                style: {
                  ...style,
                  ...(collect ? collect.style : {}),
                },
                className: className || (collect ? collect.className : undefined),
              }}
            >
              {children}
            </CollectorContext.Provider>
          )}
        </CollectorContext.Consumer>
      );
    }

    return (
      <CollectorContext.Consumer>
        {collect => {
          if (typeof children === 'function') {
            if (collect) {
              const collectedData = data ? [data] : [];
              collect.renderChildren(children);
              collect.data(collectedData);
            }

            if (receiveRenderChildren) {
              receiveRenderChildren(children);
            }

            return React.Children.only(
              children({
                className: className || (collect ? collect.className : undefined),
                ref: (ref: HTMLElement) => {
                  if (collect) {
                    collect.ref(ref);
                  }

                  if (receiveRef) {
                    receiveRef(ref);
                  }
                },
                style: collect ? { ...style, ...collect.style } : style || {},
              })
            );
          }

          throw new Error('Children is guaranteed to be a function. Impossible condition.');
        }}
      </CollectorContext.Consumer>
    );
  }
}
