import * as React from 'react';

type SupplyRef = (ref: HTMLElement | null) => void;
type GetRef = SupplyRef;
type ChildrenGetRef = (getRef: SupplyRef) => React.ReactNode;
type GetReactNode = (reactNode: React.ReactNode | null) => void;

interface Props {
  children: ChildrenGetRef | React.ReactNode;
  getRef?: GetRef;
  getReactNode?: GetReactNode;
}

const RefContext = (React as any).createContext();

export default class RefCollector extends React.Component<Props> {
  reactNode: React.ReactNode;

  componentWillUnmount() {
    if (this.props.getReactNode) {
      this.props.getReactNode(this.reactNode);
    }
  }

  render() {
    if (typeof this.props.children !== 'function') {
      this.reactNode = this.props.children;

      return this.props.getRef ? (
        <RefContext.Consumer>
          {(setRefFunc?: SupplyRef) => (
            <RefContext.Provider
              value={(ref: HTMLElement | null) => {
                this.props.getRef && this.props.getRef(ref);
                setRefFunc && setRefFunc(ref);
              }}
            >
              {this.props.children}
            </RefContext.Provider>
          )}
        </RefContext.Consumer>
      ) : (
        this.props.children
      );
    }

    return (
      <RefContext.Consumer>
        {(setRefFunc?: SupplyRef) => {
          const children =
            typeof this.props.children === 'function' &&
            this.props.children((ref: HTMLElement) => {
              setRefFunc && setRefFunc(ref);
              this.props.getRef && this.props.getRef(ref);
            });

          this.reactNode = children;
          return children;
        }}
      </RefContext.Consumer>
    );
  }
}
