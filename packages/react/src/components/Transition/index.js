import { Component } from 'react';
import { expand } from 'material-transitions-core';
import reactDom from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';

class Thing extends Component {
  constructor () {
    super();
    this.state = {};
    this.click = this.click.bind(this);
  }

  componentWillLeave () {
    console.log('hey');
  }

  click () {
    const target = reactDom.findDOMNode(this.refs.element);
    expand(target, {
      duration: 0.5,
      background: '#3d7596',
      onStart () {
        console.log('expand:start');
      },
      onFinish () {
        console.log('expand:finish');
      },
    });
  }

  render () {
    return (<div onClick={this.click} ref="element">{this.props.children}</div>);
  }
}

class Transition extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <Thing ref="element">{this.props.children}</Thing>
    );
  }
}

export default Transition;
