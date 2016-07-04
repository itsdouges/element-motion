import { Component } from 'react';
import mtCore from 'material-transitions-core';
import ReactDom from 'react-dom';
import { PropTypes } from 'react';

const Enhance = (ComposedComponent) => class WithTransition extends Component {
  static contextTypes = {
    __MaterialTransitions: PropTypes.object,
  };

  doTransition = () => {
    const element = ReactDom.findDOMNode(this.refs._component);

    const setEnd = mtCore['move'](element, {
      duration: 0.75,
      matchSize: true,
      cleanup: true,
      onStart () {
        console.log('move:start');
      },
      onFinish () {
        console.log('move:finish');
      },
    });

    // mtCore[this.props.type](element, {
    //   duration: 0.5,
    //   background: '#3d7596',
    //   onStart () {
    //     console.log('expand:start');
    //   },
    //   onFinish () {
    //     console.log('expand:finish');
    //   },
    // });

    console.log(this.context);

    // setEnd(element);

    this.context.__MaterialTransitions.waiting(setEnd);
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
