import * as React from 'react';
import { ElementBoundingBox } from '../lib/dom';

export type InlineStyles = React.CSSProperties;

export interface TargetProps {
  style: InlineStyles;
  className?: string;
}

export interface TargetPropsFunc {
  style?: (previous: InlineStyles) => InlineStyles | undefined;
  className?: (previous: string | undefined) => string | undefined;
}

export type setChildProps = (props: TargetPropsFunc) => void;

/**
 * AnimationCallback
 *
 * Return JSX if you want to add a new element to the DOM,
 * call onFinish() when you've finished the animation,
 * call setChildProps() if you want to update the target props.
 */
export type AnimationCallback = (
  elements: AnimationData,
  onFinish: () => void,
  setChildProps: setChildProps
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
    abort?: () => void;
  };
}

export type CollectorData = AnimationAction | WaitAction;

export type SupplyRefHandler = (ref: HTMLElement | null) => void;

export type SupplyRenderChildrenHandler = (reactNode: CollectorChildrenAsFunction) => void;

export type SupplyDataHandler = (data: CollectorData[]) => void;

export type CollectorChildrenAsFunction = (props: {
  ref: SupplyRefHandler;
  style: InlineStyles;
  className?: string;
}) => React.ReactNode;

export interface AnimationData {
  origin: ElementData;
  destination: ElementData;
}

export interface ElementData {
  element: HTMLElement;
  elementBoundingBox: ElementBoundingBox;
  focalTargetElement: HTMLElement | null | undefined;
  focalTargetElementBoundingBox: ElementBoundingBox | undefined;
  render: CollectorChildrenAsFunction;
}

export interface CollectorChildrenProps {
  children: CollectorChildrenAsFunction | React.ReactElement<CollectorProps>;
}

export interface CollectorProps extends CollectorChildrenProps {
  receiveRef?: SupplyRefHandler;
  receiveFocalTargetRef?: SupplyRefHandler;
  receiveRenderChildren?: SupplyRenderChildrenHandler;
  receiveData?: SupplyDataHandler;
  data?: CollectorData;
  style?: InlineStyles;
  className?: string;
  topMostCollector?: boolean;
}

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
      topMostCollector,
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

                  if (!topMostCollector && collect) {
                    collect.ref(ref);
                  }
                },
                focalTargetRef: ref => {
                  const { receiveFocalTargetRef } = this.props;
                  if (receiveFocalTargetRef) {
                    receiveFocalTargetRef(ref);
                  }

                  if (!topMostCollector && collect) {
                    collect.focalTargetRef(ref);
                  }
                },
                data: childData => {
                  const collectedData = data ? [data].concat(childData) : childData;
                  if (!topMostCollector && collect) {
                    collect.data(collectedData);
                  }

                  if (receiveData) {
                    receiveData(childData);
                  }
                },
                renderChildren: node => {
                  if (!topMostCollector && collect) {
                    collect.renderChildren(node);
                  }

                  if (receiveRenderChildren) {
                    receiveRenderChildren(node);
                  }
                },
                style: {
                  ...style,
                  ...(collect && !topMostCollector ? collect.style : {}),
                },
                className:
                  className || (collect && !topMostCollector ? collect.className : undefined),
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
            if (!topMostCollector && collect) {
              const collectedData = data ? [data] : [];
              collect.renderChildren(children);
              collect.data(collectedData);
            }

            if (receiveRenderChildren) {
              receiveRenderChildren(children);
            }

            return React.Children.only(
              children({
                className:
                  className || (collect && !topMostCollector ? collect.className : undefined),
                ref: (ref: HTMLElement) => {
                  if (!topMostCollector && collect) {
                    collect.ref(ref);
                  }

                  if (receiveRef) {
                    receiveRef(ref);
                  }
                },
                style: collect && !topMostCollector ? { ...style, ...collect.style } : style || {},
              })
            );
          }

          throw new Error('Children is guaranteed to be a function. Impossible condition.');
        }}
      </CollectorContext.Consumer>
    );
  }
}
