import * as React from 'react';
import { InlineStyles } from '../Collector';
import { ExtractProps, Omit } from '../lib/types';

export interface BabaManangerProps extends InjectedProps {
  /**
   * Children as function which passes down style,
   * add this to the elements you want to hide until all child animations have finished.
   */
  children: (props: { style: InlineStyles }) => React.ReactNode;

  /**
   * Optional name to target a specific child Baba.
   */
  name?: string;
}

export interface State {
  style: InlineStyles;
}

export interface InjectedProps {
  /**
   * Internal context, ignore this.
   */
  context?: BabaManagerContext;
}

export type OnFinishHandler = (opts: { name: string }) => void;

export interface BabaManagerContext {
  onFinish: OnFinishHandler;
}

export const BabaContext = React.createContext<BabaManagerContext | undefined>(undefined);

export default class BabaManager extends React.Component<BabaManangerProps, State> {
  state: State = {
    style: {
      visibility: 'hidden',
    },
  };

  onFinish: OnFinishHandler = opts => {
    const { context, name } = this.props;

    if (context && context.onFinish) {
      context.onFinish(opts);
    }

    if (name && opts.name !== name) {
      return;
    }

    this.setState({
      style: {
        visibility: 'visible',
      },
    });
  };

  render() {
    const { children } = this.props;
    const { style } = this.state;

    return (
      <BabaContext.Provider value={{ onFinish: this.onFinish }}>
        {children({ style })}
      </BabaContext.Provider>
    );
  }
}

export const withBabaManagerContext = <
  TComponent extends React.ComponentType<InjectedProps & ExtractProps<TComponent>>
>(
  WrappedComponent: TComponent
) => {
  type WithBabaManagerContextProps = JSX.LibraryManagedAttributes<
    TComponent,
    ExtractProps<TComponent>
  >;

  // eslint-disable-next-line react/no-multi-comp
  return class extends React.Component<Omit<WithBabaManagerContextProps, keyof InjectedProps>> {
    static displayName = `babaManagerContext(${WrappedComponent.displayName})`;

    render() {
      // WrappedComponent isn't considered to be a proper element for JSX, need to understand why.
      // See: https://github.com/Microsoft/TypeScript/issues/23812
      const CoercedWrappedComponent = WrappedComponent as React.ComponentType<
        InjectedProps & ExtractProps<TComponent>
      >;

      return (
        <BabaContext.Consumer>
          {context => (
            // @ts-ignore
            <CoercedWrappedComponent context={context} {...this.props} />
          )}
        </BabaContext.Consumer>
      );
    }
  };
};

export const WrappedBabaManager = withBabaManagerContext(BabaManager);
