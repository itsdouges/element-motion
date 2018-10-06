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
   * Optional name to target a specific child `<Baba />`.
   */
  name?: string;
}

/**
 * @hidden
 */
export interface State {
  style: InlineStyles;
}

/**
 * @hidden
 */
export interface InjectedProps {
  context?: BabaManagerContext;
}

/**
 * @hidden
 */
export type OnFinishHandler = (opts: { name: string }) => void;

/**
 * @hidden
 */
export interface BabaManagerContext {
  onFinish: OnFinishHandler;
}

/**
 * @hidden
 */
export const BabaContext = React.createContext<BabaManagerContext | undefined>(undefined);

/**
 * ## BabaManager
 *
 * Used to hide contents before an animation is complete triggered from a child `<Baba />` component.
 * If there is more than one child `<Baba />` you can use an optional `name` prop which should match the appropriate `<Baba />` component.
 *
 * If it is the initial mount it will immediately be shown.
 *
 * You can also nest `<BabaManager />`'s and they will all be notified from the appropriate child `<Baba />`.
 *
 * We use visibility over opacity as it can show nested children even if the parent is `visibility: hidden`.
 * This greatly simplifies code we need to write.
 * It will be up to consumers to handle their own fade-in behaviour.
 *
 * ### Usage
 *
 * ```
 * const MyApp = () => (
 * <BabaManager name="my-anim">
 *    {(props) => (
 *      <div {...props}>
 *        <Baba name="my-anim">
 *          {(props) => <div {...props} />}
 *        </Baba>
 *      </div>
 *    )}
 *   </BabaManager>
 * );
 * ```
 */
export class BabaManager extends React.Component<BabaManangerProps, State> {
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

/**
 * @hidden
 */
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
          {context => <CoercedWrappedComponent context={context} {...this.props} />}
        </BabaContext.Consumer>
      );
    }
  };
};

/**
 * @hidden
 */
export default withBabaManagerContext(BabaManager);
