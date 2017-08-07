// @flow

import type { Children } from 'react';
import type { Animation } from 'yubaba-core';

import React from 'react';
import { orchestrator, removeFromStore, addListener } from 'yubaba-core';

export default class Animate extends React.Component {
  _node: HTMLElement;
  _detatch: Function;

  props: {
    pair: string,
    children?: Children,
    animations: Array<Animation>,
    style?: {
      [string]: any,
    },
  };

  state = {
    visible: false,
  };

  componentDidMount () {
    this._detatch = addListener(this.props.pair, this.setVisibility);
    this.initialise();
  }

  componentWillUnmount () {
    this._detatch();
    this.initialise();

    if (this._node.firstElementChild) {
      removeFromStore(this.props.pair, this._node.firstElementChild, true);
    }
  }

  setVisibility = (visible: boolean) => {
    this.setState({
      visible,
    });
  };

  setDOMNode (node: HTMLElement) {
    this._node = node;
  }

  initialise () {
    if (!this._node.firstElementChild) {
      return;
    }

    orchestrator(this.props.pair, {
      node: this._node.firstElementChild,
      animations: this.props.animations,
      shouldShow: this.setVisibility,
    });
  }

  render () {
    const { pair, animations, style, ...props } = this.props;

    return (
      <div
        {...props}
        ref={this.setDOMNode}
        style={{ ...style, opacity: this.state.visible ? 1 : 0 }}
      >
        {this.props.children}
      </div>
    );
  }
}
