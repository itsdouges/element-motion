// @flow

import type { Children } from 'react';

import React from 'react';
import * as yubaba from 'yubaba-core';

export type Options = {};

const nodeStore = {};

function readFromStore (pairName) {
  return nodeStore[pairName.replace('-1', '')];
}

function addToStore (pairName, nodeOrFunc) {
  nodeStore[pairName] = nodeOrFunc;
}

function removeFromStore (pairName) {
  delete nodeStore[pairName];
}

export default class Transition extends React.Component {
  _node: HTMLElement;

  props: {
    transition: 'move',
    pair: string,
    children?: Children,
    options?: {},
  };

  componentDidMount () {
    process.env.NODE_ENV !== 'production' && console.log('Mounted.');

    this.initialise();
  }

  componentWillUnmount () {
    process.env.NODE_ENV !== 'production' && console.log('Unmounting.');

    this.initialise();
  }

  initialise () {
    const nodeOrFunc = readFromStore(this.props.pair);
    if (!nodeOrFunc) {
      process.env.NODE_ENV !== 'production' && console.log('Adding node to store.');
      addToStore(this.props.pair, this._node);
      return;
    }

    if (nodeOrFunc === this._node) {
      process.env.NODE_ENV !== 'production' && console.log('Intialising transition.');

      const node = nodeOrFunc;
      const transition = yubaba[this.props.transition](node.firstElementChild, this.props.options);

      const startTransition = (endNode) => transition.start(endNode).then(() => {
        process.env.NODE_ENV !== 'production' && console.log('Finished transition.');
      });

      addToStore(this.props.pair, startTransition);
    } else if (typeof nodeOrFunc === 'function') {
      process.env.NODE_ENV !== 'production' && console.log('Found a transition, starting.');
      const startTransition = nodeOrFunc;
      // We dip into the node and get the _actual_ target (not wrapper container).
      startTransition(this._node.firstElementChild);

      process.env.NODE_ENV !== 'production' && console.log('Resetting store with fresh node.');
      addToStore(this.props.pair, this._node);
    } else {
      process.env.NODE_ENV !== 'production' && console.log('Did not find same node nor waiting transition.');
    }
  }

  render () {
    return (
      <div ref={(node) => (this._node = node)}>
        {this.props.children}
      </div>
    );
  }
}
