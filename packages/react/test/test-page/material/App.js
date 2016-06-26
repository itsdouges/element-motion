import { Component } from 'react';

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

        {this.props.children}
      </div>
    );
  }
}

export default App;
