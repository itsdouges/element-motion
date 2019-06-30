import * as React from 'react';
import { InlineStyles } from '../Collector';
import { ExtractProps, Omit } from '../lib/types';

export interface VisibilityManagerProps extends InjectedProps {
  /**
   * Children as function which passes down style,
   * add this to the elements you want to hide until all child motions have finished.
   */
  children: (props: { style: InlineStyles }) => React.ReactNode;

  /**
   * Optional name to target a specific child Motion.
   */
  name?: string;

  /**
   * Set to "true" if should be shown immediately on mount.
   * "false" if should wait for a motion first.
   * Defaults to false.
   */
  isInitiallyVisible?: boolean;
}

export interface State {
  style: InlineStyles;
}

export interface InjectedProps {
  /**
   * Internal context, ignore this.
   */
  context?: VisibilityManagerContext;
}

export type Handler = (opts: { name: string }) => void;

export interface VisibilityManagerContext {
  onFinish: Handler;
  onStart: Handler;
}

export const MotionContext = React.createContext<VisibilityManagerContext | undefined>(undefined);

export default class VisibilityManager extends React.Component<VisibilityManagerProps, State> {
  state: State = {
    style: {
      visibility: this.props.isInitiallyVisible ? 'visible' : 'hidden',
    },
  };

  onStart: Handler = opts => {
    const { context, name } = this.props;

    if (context && context.onFinish) {
      context.onStart(opts);
    }

    if (name && opts.name !== name) {
      return;
    }

    if (this.state.style.visibility === 'visible') {
      this.setState({
        style: {
          visibility: 'hidden',
        },
      });
    }
  };

  onFinish: Handler = opts => {
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
      <MotionContext.Provider value={{ onFinish: this.onFinish, onStart: this.onStart }}>
        {children({ style })}
      </MotionContext.Provider>
    );
  }
}

export const withVisibilityManagerContext = <
  TComponent extends React.ComponentType<InjectedProps & ExtractProps<TComponent>>
>(
  WrappedComponent: TComponent
) => {
  type WithVisibilityManagerContextProps = JSX.LibraryManagedAttributes<
    TComponent,
    ExtractProps<TComponent>
  >;

  const ReturnComponent: React.FC<
    Omit<WithVisibilityManagerContextProps, keyof InjectedProps>
  > = props => {
    return (
      <MotionContext.Consumer>
        {context => (
          // @ts-ignore
          <WrappedComponent context={context} {...props} />
        )}
      </MotionContext.Consumer>
    );
  };

  ReturnComponent.displayName = `VisibilityManagerContext(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return ReturnComponent;
};

export const WrappedVisibilityManager = withVisibilityManagerContext(VisibilityManager);
