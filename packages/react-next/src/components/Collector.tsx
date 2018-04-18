import * as React from 'react';
import { GetElementSizeLocationReturnValue } from '../lib/dom';

export type AnimationResult = {};
export type AnimationCallback = (data: AnimationData) => Promise<AnimationResult>;
export enum Actions {
  animation = 'animation',
  wait = 'wait',
}
export type Data =
  | { action: Actions.animation; payload: AnimationCallback }
  | { action: Actions.wait };
export type SupplyRef = (ref: HTMLElement | null) => void;
export type SupplyReactNode = (reactNode: React.ReactNode) => void;
export type SupplyData = (data: Data[]) => void;
export type ChildrenSupplyRef = (getRef: SupplyRef) => React.ReactNode;

export interface AnimationData {
  fromTarget: TargetData;
  toTarget: TargetData;
}

export interface TargetData extends GetElementSizeLocationReturnValue {
  reactNode: React.ReactNode;
}

export interface CommonProps {
  children: ChildrenSupplyRef | React.ReactNode;
}

export interface Props extends CommonProps {
  receiveRef?: SupplyRef;
  receiveReactNode?: SupplyReactNode;
  receiveData?: SupplyData;
  data?: Data;
}

export interface Collect {
  ref: SupplyRef;
  data: SupplyData;
  reactNode: SupplyReactNode;
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
                reactNode: node => {
                  collect && collect.reactNode(node);
                  this.props.receiveReactNode && this.props.receiveReactNode(node);
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
          const children =
            typeof this.props.children === 'function' &&
            this.props.children((ref: HTMLElement) => {
              if (collect) {
                collect.ref(ref);
              }

              if (this.props.receiveRef) {
                this.props.receiveRef(ref);
              }
            });

          if (collect) {
            const data = this.props.data ? [this.props.data] : [];
            collect.data(data);
            collect.reactNode(children);
          }

          if (this.props.receiveReactNode) {
            this.props.receiveReactNode(children);
          }

          return children;
        }}
      </CollectContext.Consumer>
    );
  }
}
