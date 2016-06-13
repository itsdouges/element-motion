import { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { targetReady } from 'material-transitions-core';

export default class MoveTo extends Component {
  componentDidMount () {
    const element = findDOMNode(this).children[0];
    targetReady(this.props.transitionKey, element);
  }

  render () {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}

MoveTo.propTypes = {
  children: PropTypes.element.isRequired,
  transitionKey: PropTypes.string.isRequired,
};
