import { Component } from 'react';
import mtCore from 'material-transitions-core';
import ReactDom from 'react-dom';
import { PropTypes } from 'react';

const DecorateWithTransition = (ComposedComponent) => class WithTransition extends Component {
  static contextTypes = {
    __MaterialTransitions: PropTypes.object,
  };

  componentDidMount () {
    const element = ReactDom.findDOMNode(this.refs._component);
    this.context.__MaterialTransitions.setEnd(element);
  }

  render () {
    return (
      <ComposedComponent
        ref="_component"
        {...this.props}
      />
    );
  }
};

export default DecorateWithTransition;
