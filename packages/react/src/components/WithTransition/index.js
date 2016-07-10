import { Component } from 'react';
import mtCore from 'material-transitions-core';
import ReactDom from 'react-dom';
import { PropTypes } from 'react';

const DecorateWithTransition = (ComposedComponent, options) => class WithTransition extends Component {
  static contextTypes = {
    __MaterialTransitions: PropTypes.object,
  };

  _start = () => {
    const element = ReactDom.findDOMNode(this.refs._component);
    const types = options.type.split(',');

    types.forEach((type, index) => {
      const callback = this._transition(element, {
        type,
        options,
      });

      callback && this.context.__MaterialTransitions.waiting(callback);
    });
  }

  _transition (element, { type, options }) {
    return mtCore[type](element, {
      duration: 0.75,
      matchSize: true,
      cleanup: true,
      ...options,
    });
  }

  render () {
    return (
      <ComposedComponent
        ref="_component"
        {...this.props}
        doTransition={this._start}
      />
    );
  }
};

export default DecorateWithTransition;
