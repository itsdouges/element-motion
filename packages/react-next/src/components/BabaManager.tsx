import * as React from 'react';
import { Style } from './Collector';

interface Props {
  children: (props: { style: Style }) => React.ReactNode;
  name?: string;
}

interface State {
  style: Style;
}

/**
 * @hidden
 */
export interface InjectedProps {
  context?: BabaManagerContext;
}

type OnFinishHandler = (opts: { name: string }) => void;

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
 * Used to hide contents before an animation is complete from a child `<Baba />` component.
 * If there is more than one child `<Baba />` you can use an optional `name` prop which should match the appropriate `<Baba />`.
 *
 * Usage:
 *
 * ```
 * <BabaManager name="my-anim">
 *  {(props) => (
 *    <div {...props}>
 *      <Baba name="my-anim">
 *        {(props) => <div {...props} />}
 *      </Baba>
 *    </div>
 *  )}
 * </BabaManager>
 * ```
 */
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
