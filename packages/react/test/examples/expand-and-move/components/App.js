// @flow

import React from 'react';
import Box from './Box';
import withTransition from '../../../../src/withTransition';

const BoxWithTransition = withTransition([{
  transition: 'expand',
  duration: 0.2,
  background: '#3d7596',
  autoStart: true,
  cover: false,
}, {
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
        {this.state.big && <BoxWithTransition transitionPair="box-to-box" type="big" onClick={this.toggle} />}
        {this.state.big || <BoxWithTransition transitionPair="box-to-box" type="small" onClick={this.toggle} className="float-right" />}
      </div>
    );
  }
}
