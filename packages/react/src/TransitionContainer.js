// @flow

import type { Children } from 'react';
import React from 'react';

import { addTransitionListener } from './Transition';

export default class TransitionContainer extends React.Component {
  _detatch: Function;

  props: {
    pair: string,
    children?: Children,
    style?: any,
  };

  state = {
    visible: false,
  };

  componentDidMount () {
    console.log('Transition container mounted.');
    this._detatch = addTransitionListener(this.props.pair, this.setVisibility);
  }

  componentWillUnmount () {
    this._detatch();
  }

  setVisibility = (visible: boolean) => {
    console.log('Notified', visible);
    this.setState({
      visible,
    });
  };

  render () {
    const { pair, style, ...props } = this.props;

    return (
      <div {...props} style={{ ...style, opacity: this.state.visible ? 1 : 0 }}>
        {this.props.children}
      </div>
    );
  }
}
