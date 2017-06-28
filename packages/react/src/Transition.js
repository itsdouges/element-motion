// @flow

import type { Children } from 'react';

import React from 'react';
import * as yubaba from 'yubaba-core';

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

export type TransitionOptions = {
  transition: 'move' | 'expand',
};

export default class Transition extends React.Component {
  _node: HTMLElement;

  props: {
    pair: string,
    children?: Children,
    transitions: Array<TransitionOptions>,
  };

  state = {
    visible: false,
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
      this.setState({
        visible: true,
      });
      addToStore(this.props.pair, this._node);
      return;
    }

    if (nodeOrFunc === this._node) {
      process.env.NODE_ENV !== 'production' && console.log('Intialising transition.');

      const node = nodeOrFunc;

      const transitions = this.props.transitions.map(({ transition: name, ...options }) => {
        return yubaba[name](node.firstElementChild, options);
      });

      const startTransition = (endNode) => Promise.all(transitions.map((transition) => {
        return transition.start(endNode);
      }))
      .then((results) => {
        process.env.NODE_ENV !== 'production' && console.log('Finished transition.');

        // Fadeout all expanders
        return results
          .filter(({ transition }) => transition === 'expand')
          .map(({ target }) => {
            return yubaba.fadeout(target, {
              duration: 0.75,
              autoCleanup: true,
              autoStart: true,
            }).promise;
          });
      });

      addToStore(this.props.pair, startTransition);
    } else if (typeof nodeOrFunc === 'function') {
      process.env.NODE_ENV !== 'production' && console.log('Found a transition, starting.');
      const startTransition = nodeOrFunc;
      // We dip into the node and get the _actual_ target (not wrapper container).
      startTransition(this._node.firstElementChild).then(() => {
        this.setState({
          visible: true,
        });
      });

      process.env.NODE_ENV !== 'production' && console.log('Resetting store with fresh node.');
      addToStore(this.props.pair, this._node);
    } else {
      process.env.NODE_ENV !== 'production' && console.log('Did not find same node nor waiting transition.');
    }
  }

  render () {
    return (
      <div ref={(node) => (this._node = node)} style={{ opacity: this.state.visible ? 1 : 0 }}>
        {this.props.children}
      </div>
    );
  }
}
