import { Component, cloneElement } from 'react';
import TransitionGroup from 'react-addons-transition-group';

class App extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <div>
        <div className="hero-sticky" styles={{ zIndex: -1 }}>
          <div className="hero"></div>
        </div>

        <TransitionGroup>
          {cloneElement(this.props.children, {
            key: this.props.location.pathname,
          })}
        </TransitionGroup>
      </div>
    );
  }
}

export default App;
