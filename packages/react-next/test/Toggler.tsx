import * as React from 'react';

interface Props {
  children: (
    props: { toggle: () => void; set: (value: string) => void; shown: boolean | string }
  ) => React.ReactNode;
}

interface State {
  shown: boolean | string;
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

  set = (value: string) => {
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
