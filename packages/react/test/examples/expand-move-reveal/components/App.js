// @flow

import React from 'react';
import Box from './Box';
import BoxWithContent from './BoxWithContent';
import withAnimation from '../../../../src/withAnimation';

const Container = ({ children, className }: any) => (
  <div className={className}>
    {children}
  </div>
);

const BoxWithTransition = withAnimation([{
  transition: 'expand',
  duration: 0.5,
  background: '#3d7596',
  autoStart: true,
  cover: true,
}, {
  transition: 'move',
  duration: 0.5,
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
        {this.state.big && (
          <Container>
            <BoxWithContent onClick={this.toggle} />
          </Container>
        )}

        {this.state.big || (
          <Container className="container">
            <Box type="small" />
            <Box type="small" />
            <Box type="small" />
            <BoxWithTransition
              animationPair="box-to-box"
              type="small"
              onClick={this.toggle}
              className="box-highlighted"
            />
            <Box type="small" />
            <Box type="small" />
            <Box type="small" />
          </Container>
        )}
      </div>
    );
  }
}
