import * as React from 'react';
import { GetElementSizeLocationReturnValue } from '../lib/dom';

export type AnimationCallback = (data: AnimationData) => Promise<{}>;
type SupplyRef = (ref: HTMLElement | null) => void;
type SupplyAnimations = (animations: AnimationCallback[]) => void;
type ChildrenSupplyRef = (getRef: SupplyRef) => React.ReactNode;
type GetReactNode = (reactNode: React.ReactNode | null) => void;

interface AnimationData extends GetElementSizeLocationReturnValue {
  reactNode: React.ReactNode;
}

interface Props {
  children: ChildrenSupplyRef | React.ReactNode;
  getRef?: SupplyRef;
  getReactNode?: GetReactNode;
  getAnimations?: SupplyAnimations;
  animation?: AnimationCallback;
}

interface Collect {
  ref: SupplyRef;
  animations: SupplyAnimations;
}

const CollectContext = React.createContext<Collect>();

export default class RefCollector extends React.Component<Props> {
  reactNode: React.ReactNode;

  componentWillUnmount() {
    if (this.props.getReactNode) {
      this.props.getReactNode(this.reactNode);
    }
  }

  render() {
    if (typeof this.props.children !== 'function') {
      return this.props.getRef ? (
        <CollectContext.Consumer>
          {collect => (
            <CollectContext.Provider
              value={{
                ref: (ref: HTMLElement | null) => {
                  this.props.getRef && this.props.getRef(ref);
                  collect && collect.ref(ref);
                },
                animations: childAnimations => {
                  if (childAnimations) {
                    this.props.getAnimations && this.props.getAnimations(childAnimations);

                    const animations = this.props.animation
                      ? childAnimations.concat(this.props.animation)
                      : childAnimations;

                    collect && collect.animations(animations);
                  }
                },
              }}
            >
              {this.props.children}
            </CollectContext.Provider>
          )}
        </CollectContext.Consumer>
      ) : (
        this.props.children
      );
    }

    return (
      <CollectContext.Consumer>
        {collect => {
          const children =
            typeof this.props.children === 'function' &&
            this.props.children((ref: HTMLElement) => {
              collect && collect.ref(ref);
              this.props.getRef && this.props.getRef(ref);
            });

          this.reactNode = children;
          return children;
        }}
      </CollectContext.Consumer>
    );
  }
}
