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
    src: 'first-order.jpg',
  };

  componentDidMount () {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.setState({
          big: false,
        });
      }
    });
  }

  toggle = (src: string) => {
    this.setState((prevState) => ({
      big: !prevState.big,
      src,
    }));
  };

  render () {
    return (
      <div className="root">
        {this.state.big && (
          <Container>
            <BoxWithContent onClick={this.toggle} src={this.state.src} />
          </Container>
        )}

        {this.state.big || (
          <Container className="container">
            <img alt="Empire Insignia" src={`${require('../images/logo.png')}`} className="insignia" />

            <div className="container-inner">
              <Box type="small" src="ben.jpeg" />
              <Box type="small" src="darth-maul.jpg" />
              <Box type="small" src="boba-fett.jpg" />

              <BoxWithTransition
                transitionPair="box-to-box"
                type="small"
                onClick={() => this.toggle('first-order.jpg')}
                src="first-order.jpg"
                className="box-highlighted"
              />

              <Box type="small" src="emporer.jpg" />
              <Box type="small" src="phasma.jpg" />
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
