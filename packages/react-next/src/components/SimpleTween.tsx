import * as React from 'react';

interface Style {
  [key: string]: string | number | undefined;
}

interface Props {
  duration: number;
  from: Style;
  to: Style;
  onFinish: () => void;
}

interface State {
  state: 'from' | 'to';
}

export default class SimpleTween extends React.Component<Props, State> {
  state: State = {
    state: 'from',
  };

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({
        state: 'to',
      });

      window.setTimeout(this.props.onFinish, this.props.duration);
    }, 14);
  }

  render() {
    const { from, to } = this.props;
    return (
      <span style={this.state.state === 'from' ? from : { ...from, ...to }}>
        {this.props.children}
      </span>
    );
  }
}
