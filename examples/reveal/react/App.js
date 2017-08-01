// @flow

import React from 'react';
import Box from './Box';
import BoxWithContent from './BoxWithContent';
import { withAnimation } from '../../../packages/react/src';

const Container = ({ children, className }: any) => (
  <div className={className}>
    {children}
  </div>
);

// Note both animations happen at the same time because they're
// inside their own array!
const BoxWithTransition = withAnimation([[{
  animationName: 'circle-expand',
  duration: 400,
  background: '#3d7596',
  // Note fadeout is truthy! If it's false, it will disappear immediately after the
  // animation.
  fadeout: 100,
}, {
  animationName: 'move',
  duration: 500,
}]])(Box);

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
