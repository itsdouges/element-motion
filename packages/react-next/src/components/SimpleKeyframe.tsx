import * as React from 'react';

/**
 * @hidden
 */
export interface Style {
  [key: string]: string | number | undefined;
}

/**
 * @hidden
 */
export interface Props {
  style: Style;
  keyframes: Style[];
  onFinish: () => void;
  at?: number;
}

/**
 * @hidden
 */
export default class SimpleKeyframe extends React.Component<Props> {
  state = {
    started: false,
  };

  componentDidMount() {
    if (this.props.at !== undefined) {
      this.start();
    }
  }

  componentDidUpdate() {
    if (this.props.at !== undefined && !this.state.started) {
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
    const { style, keyframes, at } = this.props;
    const ready = at !== undefined && this.state.started;

    return (
      <span
        onTransitionEnd={this.onTransitionEnd}
        style={{ ...style, ...(ready ? keyframes[at || 0] : {}) }}
      >
        {this.props.children}
      </span>
    );
  }
}
