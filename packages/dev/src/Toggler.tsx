import * as React from 'react';
import useInterval from 'use-interval';
import useIsInViewport from 'use-is-in-viewport';
import useVisible from '@21kb/react-page-visible-hook';

interface Props {
  interval: boolean;
  intervalMs: number;
  onIntervalSet: (value: any) => any;
  children: (props: {
    toggle: (value?: any) => void;
    set: (value: any) => void;
    shown: any;
  }) => React.ReactNode;
}

interface State {
  shown: any;
}

export default class Toggler extends React.Component<Props, State> {
  static defaultProps = {
    interval: false,
    intervalMs: 1500,
    onIntervalSet: () => {},
  };

  state = {
    shown: false,
  };

  cleanup: () => void = () => {};

  componentDidMount() {
    if (this.props.interval) {
      const intervalId = window.setInterval(() => {
        const result = this.props.onIntervalSet(this.state.shown);
        this.setState(prevState => ({
          shown: result !== undefined ? result : !prevState.shown,
        }));
      }, this.props.intervalMs);

      this.cleanup = () => window.clearInterval(intervalId);
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  toggle = (value?: any) => {
    this.cleanup();

    this.setState(prevState => ({
      shown: prevState.shown ? false : value || true,
    }));
  };

  set = (value: any) => {
    this.cleanup();

    this.setState({
      shown: value,
    });
  };

  render() {
    return this.props.children({
      toggle: this.toggle,
      set: this.set,
      shown: this.state.shown,
    });
  }
}

interface TogglrProps {
  interval?: boolean;
  intervalMs?: number;
  onIntervalSet?: (value: any) => any;
  children: (props: {
    toggle: (value?: any) => void;
    set: (value: any) => void;
    shown: any;
  }) => React.ReactNode;
}

// @ts-ignore
export const Togglr: React.FC<TogglrProps> = ({
  onIntervalSet = () => {},
  interval = false,
  intervalMs = 1500,
  children,
}: TogglrProps) => {
  const [shown, setShown] = React.useState<any>(false);
  const [interacted, setInteracted] = React.useState(false);
  const [inView, setRef] = useIsInViewport({});
  const state = useVisible();
  const set = (value: any) => {
    setInteracted(true);
    setShown(value);
  };
  const toggle = (value?: any) => {
    setInteracted(true);
    setShown((prevVal: any) => (prevVal ? false : value || true));
  };

  useInterval(() => {
    if (!interval || interacted || !inView || state.hidden) {
      return;
    }

    const result = onIntervalSet(shown);
    setShown((prevVal: any) => (result !== undefined ? result : !prevVal));
  }, intervalMs);

  return (
    <>
      <div ref={setRef} />
      {children({
        toggle,
        set,
        shown,
      })}
    </>
  );
};
