import * as React from 'react';

interface Style {
  [key: string]: string | number | undefined;
}

interface Props {
  duration: number;
  from: Style;
  to: Style;
  onFinish: () => void;
  start?: boolean;
}

interface State {
  state: 'from' | 'to';
}

export default class SimpleTween extends React.Component<Props, State> {
  started: boolean = false;

  static defaultProps = {
    start: true,
  };

  state: State = {
    state: 'from',
  };

  componentDidMount() {
    if (this.props.start) {
      this.start();
    }
  }

  componentDidUpdate() {
    if (this.props.start) {
      this.start();
    }
  }

  start = () => {
    if (this.started) {
      return;
    }

    this.started = true;

    window.setTimeout(() => {
      this.setState({
        state: 'to',
      });

      window.setTimeout(this.props.onFinish, this.props.duration);
    }, 14);
  };

  render() {
    const { from, to } = this.props;
    return (
      <span style={this.state.state === 'from' ? from : { ...from, ...to }}>
        {this.props.children}
      </span>
    );
  }
}
