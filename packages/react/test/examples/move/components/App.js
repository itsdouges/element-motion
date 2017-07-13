// @flow

import React from 'react';
import Box from './Box';
import withAnimation from '../../../../src/withAnimation';

const BoxWithAnimation = withAnimation([{
  transition: 'move',
  duration: 0.75,
  matchSize: true,
  autoCleanup: true,
}])(Box);

export default class App extends React.Component {
  state = {
    big: true,
  };

  toggle = () => {
    this.setState((prevState) => ({
      big: !prevState.big,
    }));
  };

  render () {
    return (
      <div>
        {this.state.big && <BoxWithAnimation animationPair="box-to-box" type="big" onClick={this.toggle} />}
        {this.state.big || <BoxWithAnimation animationPair="box-to-box" type="small" onClick={this.toggle} className="float-right" />}
      </div>
    );
  }
}
