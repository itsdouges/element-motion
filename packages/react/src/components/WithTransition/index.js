import { Component } from 'react';
import mtCore from 'material-transitions-core';
import ReactDom from 'react-dom';
import { PropTypes } from 'react';

const Enhance = (ComposedComponent) => class WithTransition extends Component {
  static contextTypes = { trigger: PropTypes.func };

  doTransition = () => {
    const element = ReactDom.findDOMNode(this.refs._component);

    mtCore['expand'](element, {
      duration: 0.5,
      background: '#3d7596',
      onStart () {
        console.log('expand:start');
      },
      onFinish () {
        console.log('expand:finish');
      },
    });

    // this.context.trigger(element);
  }

  render () {
    return (
      <ComposedComponent
        ref="_component"
        {...this.props}
        doTransition={this.doTransition}
      />
    );
  }
};

export default Enhance;
