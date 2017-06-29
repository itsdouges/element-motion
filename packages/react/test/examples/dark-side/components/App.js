// @flow

import React from 'react';
import Box from './Box';
import BoxWithContent from './BoxWithContent';
import withTransition from '../../../../src/withTransition';

const Container = ({ children, className }: any) => (
  <div className={className}>
    {children}
  </div>
);

const BoxWithTransition = withTransition([{
  transition: 'expand',
  duration: 0.5,
  background: '#541219',
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
            <img src="images/logo.png" className="insignia" />

            <div className="container-inner">
              <Box type="small" src="images/ben.jpeg" />
              <Box type="small" src="images/darth-maul.jpg" />
              <Box type="small" src="images/boba-fett.jpg" />
              <BoxWithTransition
                transitionPair="box-to-box"
                type="small"
                onClick={this.toggle}
                src="images/first-order.jpg"
                className="box-highlighted"
              />
              <Box type="small" src="images/emporer.jpg" />
              <Box type="small" src="images/phasma.jpg" />
            </div>

            <div className="vader-container">
              <div className="vader-bg" />
            </div>
          </Container>
        )}
      </div>
    );
  }
}
