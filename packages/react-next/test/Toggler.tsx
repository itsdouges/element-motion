import * as React from 'react';

interface Props {
  children: (props: { toggle: () => void; shown: boolean }) => React.ReactNode;
}

interface State {
  shown: boolean;
}

export default class Toggler extends React.Component<Props, State> {
  state = {
    shown: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      shown: !prevState.shown,
    }));
  };

  render() {
    return this.props.children({
      toggle: this.toggle,
      shown: this.state.shown,
    });
  }
}
