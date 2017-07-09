// @flow

import type { Children } from 'react';
import React from 'react';

import { addTransitionListener } from './orchestrator';

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

  componentWillMount () {
    // We need to have this be attached before
    // everything else is mounted, but we don't want to run this on the server.
    // How?
    this._detatch = addTransitionListener(this.props.pair, this.setVisibility);
  }

  componentDidMount () {
    // console.log('>>> TransitionContainer has mounted');
    // this._detatch = addTransitionListener(this.props.pair, this.setVisibility);
  }

  componentWillUnmount () {
    this._detatch();
  }

  setVisibility = (visible: boolean) => {
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
