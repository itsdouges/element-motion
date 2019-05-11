import * as React from 'react';

interface Props {
  interval: boolean;
  intervalMs: number;
  onIntervalSet: (value: string | boolean) => string | boolean;
  children: (props: {
    toggle: (value?: string) => void;
    set: (value: string) => void;
    shown: boolean | string;
  }) => React.ReactNode;
}

interface State {
  shown: boolean | string;
}

export default class Toggler extends React.Component<Props, State> {
  static defaultProps = {
    interval: false,
    intervalMs: 2000,
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

  toggle = (value?: string) => {
    this.cleanup();

    this.setState(prevState => ({
      shown: prevState.shown ? false : value || true,
    }));
  };

  set = (value: string) => {
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
