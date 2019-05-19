import * as React from 'react';

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
