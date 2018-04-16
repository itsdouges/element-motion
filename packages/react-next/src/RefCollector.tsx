import * as React from 'react';

type SupplyRef = (ref: HTMLElement | null) => void;
type GetRef = SupplyRef;
type ChildrenGetRef = (getRef: SupplyRef) => React.ReactNode;

interface Props {
  children: ChildrenGetRef | React.ReactNode;
  getRef?: GetRef;
}

const RefContext = (React as any).createContext();

export default class RefCollector extends React.Component<Props> {
  render() {
    if (typeof this.props.children !== 'function') {
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
        {(setRefFunc?: SupplyRef) =>
          typeof this.props.children === 'function' &&
          this.props.children((ref: HTMLElement) => {
            setRefFunc && setRefFunc(ref);
            this.props.getRef && this.props.getRef(ref);
          })
        }
      </RefContext.Consumer>
    );
  }
}
