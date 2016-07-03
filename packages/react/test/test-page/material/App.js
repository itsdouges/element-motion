import { Component } from 'react';
import MaterialTransitions from '../../../src/components/MaterialTransitions';

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

        <MaterialTransitions {...this.props}>
          {this.props.children}
        </MaterialTransitions>
      </div>
    );
  }
}

export default App;
