// @flow

import React from 'react';
import Box from './Box';
import withAnimation from '../../../../src/withAnimation';

const Container = ({ children }: any) => (
  <div>
    {children}
  </div>
);

const BoxwithAnimation = withAnimation([{
  transition: 'expand',
  duration: 0.4,
  background: '#3d7596',
  autoStart: true,
  cover: true,
}, {
  transition: 'move',
  duration: 0.75,
  matchSize: true,
}])(Box);

const BoxWithReverseTransition = withAnimation([{
  transition: 'expand',
  duration: 0.4,
  background: '#3d7596',
  reverse: true,
  cover: true,
}, {
  transition: 'move',
  duration: 0.75,
  matchSize: true,
}])(Box);

export default class App extends React.Component {
  state = {
    big: false,
  };

  toggle = () => {
    this.setState((prevState) => ({
      big: !prevState.big,
    }));
  };

  render () {
    return (
      <div className="root">
        {this.state.big && <Container><BoxWithReverseTransition animationPair="box-to-box" type="big" onClick={this.toggle} /></Container>}

        {this.state.big || <Container><BoxwithAnimation animationPair="box-to-box" type="small" onClick={this.toggle} className="float-right" /></Container>}
      </div>
    );
  }
}
