import * as React from 'react';
import { InlineStyles } from './Collector';

export interface BabaManangerProps {
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
export const BabaContext = React.createContext<BabaManagerContext>();

/**
 * ## BabaManager
 *
 * Used to hide contents before an animation is complete triggered from a child `<Baba />` component.
 * If there is more than one child `<Baba />` you can use an optional `name` prop which should match the appropriate `<Baba />` component.
 *
 * If it is the initial mount it will immediately be shown.
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
export default class BabaManager extends React.Component<BabaManangerProps, State> {
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

/**
 * @hidden
 */
export const withBabaManagerContext = <T extends InjectedProps>(
  WrappedComponent: React.ComponentType<T>
) => (props: T) => (
  <BabaContext.Consumer>
    {context => <WrappedComponent context={context} {...props} />}
  </BabaContext.Consumer>
);
