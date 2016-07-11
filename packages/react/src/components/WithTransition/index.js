import { Component } from 'react';
import mtCore from 'material-transitions-core';
import ReactDom from 'react-dom';
import { PropTypes } from 'react';

const DecorateWithTransition = (ComposedComponent, definitions) => class WithTransition extends Component {
  static contextTypes = {
    __MaterialTransitions: PropTypes.object,
  };

  componentDidMount () {
    if (definitions.immediate) {
      this._start();
    }
  }

  _start = () => {
    const element = ReactDom.findDOMNode(this.refs._component);

    const transitionDefinitions = Array.isArray(definitions) ?
      definitions :
      [definitions];

    const promises = [];

    transitionDefinitions.forEach((transition) => {
      const { start, promise } = mtCore[transition.type](element, {
        ...transition,
        showFromElement: transition.from ? ReactDom.findDOMNode(this.refs._component.refs[transition.from]) : undefined,
      });

      if (start) {
        this.context.__MaterialTransitions.waiting(start);
        console.log(start);
      }

      promises.push(promise);
    });

    this.context.__MaterialTransitions.starty(promises);
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
