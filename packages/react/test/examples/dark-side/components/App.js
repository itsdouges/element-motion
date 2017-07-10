// @flow

import React from 'react';
import Box from './Box';
import BoxWithContent from './BoxWithContent';
import Transition from '../../../../src/Transition';
import items from './data';

const Container = ({ children, className }: any) => (
  <div className={className}>
    {children}
  </div>
);

export default class App extends React.Component {
  state = {
    big: false,
    item: items[0],
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

  select = (item: any) => {
    this.setState((prevState) => ({
      big: !prevState.big,
      item,
    }));
  };

  render () {
    return (
      <div className="root">
        {this.state.big && (
          <Container>
            <BoxWithContent onClick={this.select} {...this.state.item} />
          </Container>
        )}

        {this.state.big || (
          <Container className="container">
            <img alt="Empire Insignia" src={`${require('../images/logo.png')}`} className="insignia" />

            <div className="container-inner">
              {items.map((item) => (
                <Transition
                  key={item.name}
                  pair={item.name}
                  transitions={[{
                    transition: 'expand',
                    duration: 0.4,
                    background: item.color,
                    cover: true,
                  }, {
                    transition: 'move',
                    duration: 0.5,
                    matchSize: true,
                  }]}
                >
                  <Box
                    {...item}
                    key={item.name}
                    type="small"
                    className="box-highlighted"
                    onClick={() => this.select(item)}
                  />
                </Transition>
              ))}
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
