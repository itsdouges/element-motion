import * as React from 'react';
import { GetElementSizeLocationReturnValue } from '../lib/dom';

export type AnimationCallback = (data: AnimationData) => Promise<any>;
export enum Actions {
  animation = 'animation',
  wait = 'wait',
}
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
export type SupplyRef = (ref: HTMLElement | null) => void;
export type SupplyRenderChildren = (reactNode: ChildrenAsFunction) => void;
export type SupplyData = (data: Data[]) => void;
export type ChildrenAsFunction = (props: { ref: SupplyRef; style: Style }) => React.ReactNode;

export interface AnimationData {
  caller: React.Component;
  fromTarget: TargetData;
  toTarget: TargetData;
}

export interface Style {
  [key: string]: string | number | undefined;
}

export interface TargetData extends GetElementSizeLocationReturnValue {
  render: ChildrenAsFunction;
}

export interface CommonProps {
  children: ChildrenAsFunction | React.ReactNode;
}

export interface Props extends CommonProps {
  receiveRef?: SupplyRef;
  receiveRenderChildren?: SupplyRenderChildren;
  receiveData?: SupplyData;
  data?: Data;
  style?: Style;
}

export interface Collect {
  ref: SupplyRef;
  data: SupplyData;
  renderChildren: SupplyRenderChildren;
  style: Style;
}

const CollectContext = React.createContext<Collect>();

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

          throw new Error('Children is  guaranteed to be a function. Impossible condition.');
        }}
      </CollectContext.Consumer>
    );
  }
}
