import * as React from 'react';
import { Style } from './Collector';

interface Props {
  children: (props: { style: Style }) => React.ReactNode;
  name?: string;
}

interface State {
  style: Style;
}

export interface InjectedProps {
  context?: BabaManagerContext;
}

type OnFinishHandler = (opts: { name: string }) => void;

export interface BabaManagerContext {
  onFinish: OnFinishHandler;
}

export const BabaContext = React.createContext<BabaManagerContext>();

export default class BabaManager extends React.Component<Props, State> {
  state: State = {
    style: {
      opacity: 0,
    },
  };

  onFinish: OnFinishHandler = opts => {
    if (this.props.name && opts.name !== this.props.name) {
      return;
    }

    this.setState({
      style: {
        opacity: 1,
      },
    });
  };

  render() {
    return (
      <BabaContext.Provider value={{ onFinish: this.onFinish }}>
        {this.props.children({ style: this.state.style })}
      </BabaContext.Provider>
    );
  }
}

export const withBabaManagerContext = <T extends InjectedProps>(
  WrappedComponent: React.ComponentType<T>
) => (props: T) => (
  <BabaContext.Consumer>
    {context => <WrappedComponent context={context} {...props} />}
  </BabaContext.Consumer>
);
