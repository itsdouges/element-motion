import * as React from 'react';
import { GetElementSizeLocationReturnValue } from '../lib/dom';

/**
 * @hidden
 */
export type AnimationCallback = (data: AnimationData) => Promise<any>;

/**
 * @hidden
 */
export enum Actions {
  animation = 'animation',
  wait = 'wait',
}

/**
 * @hidden
 */
export type Data =
  | {
      action: Actions.animation;
      payload: {
        animate: AnimationCallback;
        beforeAnimate?: AnimationCallback;
        afterAnimate?: AnimationCallback;
        abort?: () => void;
        cleanup: () => void;
      };
    }
  | { action: Actions.wait };

/**
 * @hidden
 */
export type SupplyRefHandler = (ref: HTMLElement | null) => void;

/**
 * @hidden
 */
export type SupplyRenderChildrenHandler = (reactNode: ChildrenAsFunction) => void;

/**
 * @hidden
 */
export type SupplyDataHandler = (data: Data[]) => void;

/**
 * @hidden
 */
export type ChildrenAsFunction = (
  props: { ref: SupplyRefHandler; style: Style }
) => React.ReactNode;

/**
 * @hidden
 */
export interface AnimationData {
  caller: React.Component;
  fromTarget: TargetData;
  toTarget: TargetData;
}

/**
 * @hidden
 */
export interface Style {
  [key: string]: string | number | undefined;
}

/**
 * @hidden
 */
export interface TargetData extends GetElementSizeLocationReturnValue {
  render: ChildrenAsFunction;
}

/**
 * @hidden
 */
export interface CommonProps {
  children: ChildrenAsFunction | React.ReactElement<Props>;
}

/**
 * @hidden
 */
export interface Props extends CommonProps {
  receiveRef?: SupplyRefHandler;
  receiveRenderChildren?: SupplyRenderChildrenHandler;
  receiveData?: SupplyDataHandler;
  data?: Data;
  style?: Style;
}

/**
 * @hidden
 */
export interface Collect {
  ref: SupplyRefHandler;
  data: SupplyDataHandler;
  renderChildren: SupplyRenderChildrenHandler;
  style: Style;
}

const CollectContext = React.createContext<Collect>();

/**
 * ## Collector
 *
 * Used as the glue for all `yubaba` components.
 * It is purely an internal component which will collect and pass all props up to the parent `<Baba />` component.
 *
 * For example usage look inside `Baba.tsx` or any component in the `animations` folder.
 */
export default class Collector extends React.Component<Props> {
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
