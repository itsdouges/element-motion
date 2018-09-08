import * as React from 'react';
import { GetElementSizeLocationReturnValue } from '../lib/dom';

export type SetTargetProps = (props: { style: InlineStyles }) => void;

/**
 * AnimationCallback
 *
 * Return JSX if you want to add a new element to the DOM,
 * call onFinish() when you've finished the animation,
 * call setTargetProps() if you want to update the target props.
 */
export type AnimationCallback = (
  data: AnimationData,
  onFinish: () => void,
  setTargetProps: SetTargetProps
) => React.ReactElement<{}> | undefined | void;

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

/**
 * @hidden
 */
export type SupplyRenderChildrenHandler = (reactNode: CollectorChildrenAsFunction) => void;

/**
 * @hidden
 */
export type SupplyDataHandler = (data: CollectorData[]) => void;

export type CollectorChildrenAsFunction = (
  props: { ref: SupplyRefHandler; style: InlineStyles }
) => React.ReactNode;

/**
 * @hidden
 */
export interface AnimationData {
  fromTarget: TargetData;
  toTarget: TargetData;
}

export interface InlineStyles {
  [key: string]: string | number | undefined;
}

/**
 * @hidden
 */
export interface TargetData extends GetElementSizeLocationReturnValue {
  render: CollectorChildrenAsFunction;
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
  receiveRenderChildren?: SupplyRenderChildrenHandler;
  receiveData?: SupplyDataHandler;
  data?: CollectorData;
  style?: InlineStyles;
}

/**
 * @hidden
 */
export interface Collect {
  ref: SupplyRefHandler;
  data: SupplyDataHandler;
  renderChildren: SupplyRenderChildrenHandler;
  style: InlineStyles;
}

/**
 * @hidden
 */
const CollectContext = React.createContext<Collect>();

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
    if (typeof this.props.children !== 'function') {
      return (
        <CollectContext.Consumer>
          {collect => (
            <CollectContext.Provider
              value={{
                ref: ref => {
                  this.props.receiveRef && this.props.receiveRef(ref);
                  collect && collect.ref(ref);
                },
                data: childData => {
                  const data = this.props.data ? [this.props.data].concat(childData) : childData;
                  collect && collect.data(data);
                  this.props.receiveData && this.props.receiveData(childData);
                },
                renderChildren: node => {
                  collect && collect.renderChildren(node);
                  this.props.receiveRenderChildren && this.props.receiveRenderChildren(node);
                },
                style: {
                  ...this.props.style,
                  ...(collect ? collect.style : {}),
                },
              }}
            >
              {this.props.children}
            </CollectContext.Provider>
          )}
        </CollectContext.Consumer>
      );
    }

    return (
      <CollectContext.Consumer>
        {collect => {
          if (typeof this.props.children === 'function') {
            if (collect) {
              const data = this.props.data ? [this.props.data] : [];
              collect.renderChildren(this.props.children);
              collect.data(data);
            }

            if (this.props.receiveRenderChildren) {
              this.props.receiveRenderChildren(this.props.children);
            }

            return this.props.children({
              ref: (ref: HTMLElement) => {
                if (collect) {
                  collect.ref(ref);
                }

                if (this.props.receiveRef) {
                  this.props.receiveRef(ref);
                }
              },
              style: collect ? { ...this.props.style, ...collect.style } : this.props.style || {},
            });
          }

          throw new Error('Children is guaranteed to be a function. Impossible condition.');
        }}
      </CollectContext.Consumer>
    );
  }
}
