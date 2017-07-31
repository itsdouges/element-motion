import React from 'react';
import ReactDOM from 'react-dom';
import Animate from '../../packages/react/src';

const boxStyles = {
  width: 100,
  height: 100,
  backgroundColor: 'blue',
};

const bigBoxStyles = {
  ...boxStyles,
  width: 400,
  height: 400,
};

class App extends React.Component {
  state = {
    isBig: false,
  };

  toggle = () => this.setState((prevState) => ({
    isBig: !prevState.isBig,
  }));

  render () {
    return (
      <div>
        {this.state.isBig
          ? (
          // Wrap with <Animate />
          <Animate
            // Make sure both from and to components
            // have the same pair name!
            pair="small-and-big"
            animations={[{
              animationName: 'move',
              duration: 500,
            }]}
            // We want react to render unique instances of these
            // components, hence using "key".
            key="big-box"
          >
            <div onClick={this.toggle} style={bigBoxStyles} />
          </Animate>
        )
        : (
          // Wrap with <Animate />
          <Animate
            // Make sure both from and to components
            // have the same pair name!
            pair="small-and-big"
            animations={[{
              animationName: 'move',
              duration: 500,
            }]}
            // We want react to render unique instances of these
            // components, hence using "key".
            key="small-box"
          >
            <div onClick={this.toggle} style={boxStyles} />
          </Animate>
        )}
      </div>
    );
  }
}

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);
ReactDOM.render(<App />, rootEl);
