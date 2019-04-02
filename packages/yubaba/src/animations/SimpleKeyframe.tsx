import * as React from 'react';

export interface Style {
  [key: string]: string | number | undefined;
}

export interface Props {
  style: Style;
  keyframes: Style[];
  onFinish: () => void;
  step?: number;
}

export default class SimpleKeyframe extends React.Component<Props> {
  state = {
    started: false,
  };

  componentDidMount() {
    if (this.props.step !== undefined) {
      this.start();
    }
  }

  componentDidUpdate() {
    if (this.props.step !== undefined && !this.state.started) {
      this.start();
    }
  }

  start = () => {
    requestAnimationFrame(() => {
      this.setState({
        started: true,
      });
    });
  };

  onTransitionEnd: React.TransitionEventHandler<HTMLSpanElement> = _ => {
    // This will be called for _any_ transition that finished, even for one element.
    // Watch out for multi transitions!
    this.props.onFinish();
  };

  render() {
    const { style, keyframes, step, children } = this.props;
    const ready = step !== undefined && this.state.started;

    return (
      <span
        onTransitionEnd={this.onTransitionEnd}
        style={{ ...style, ...(ready ? keyframes[step || 0] : {}) }}
      >
        {children}
      </span>
    );
  }
}
