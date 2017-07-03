// @flow

import type { Children } from 'react';

import React from 'react';
import * as yubaba from 'yubaba-core';

const nodeStore = {};
const listenerStore = {};

export function addTransitionListener (pairName: string, cb: (boolean) => void) {
  if (typeof listenerStore[pairName] === 'boolean') {
    // message was left, lets pick it up.
    cb(listenerStore[pairName]);
  }

  listenerStore[pairName] = cb;
  return () => {
    delete listenerStore[pairName];
  };
}

function notifyTransitionListener (pairName, value: boolean /* , leaveAMessage?: boolean*/) {
  const cb = listenerStore[pairName];
  if (cb) {
    cb(value);
  }
}

function readFromStore (pairName) {
  return nodeStore[pairName];
}

function addToStore (pairName, nodeOrFunc) {
  nodeStore[pairName] = nodeOrFunc;
}

// function removeFromStore (pairName) {
//   delete nodeStore[pairName];
// }

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
      process.env.NODE_ENV !== 'production' && console.log('Nothing left in store, adding node to store.');
      // need to notify any pairing transition container.
      notifyTransitionListener(this.props.pair, true);
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
        // Hack to get reverse working. Uh. This should probably be rethought.
        const initTransition = (element) => yubaba[name](element, options);

        return options.reverse
          ? { start: (endElement) => initTransition(endElement).start }
          : initTransition(node.firstElementChild);
      });

      const startTransition = (endNode) => Promise.all(transitions.map((transition) => {
        return transition.start(endNode);
      }))
      .then((results) => {
        // Start all reverse transitions
        return Promise.all(results
          .filter((result) => typeof result === 'function')
          .map((start) => start())
          .concat(results));
      })
      .then((results) => {
        process.env.NODE_ENV !== 'production' && console.log('Finished transition.');
        // Fadeout and cleanup all expanders. This is deliberately a broken promise chain.

        Promise.all(results
          .filter(({ transition }) => transition === 'expand')
          .map(({ target }) => {
            return yubaba.fadeout(target, {
              duration: 0.75,
              autoCleanup: true,
              autoStart: true,
            }).promise;
          }))
          .then((fadeoutResults) => {
            // Cleanup anything else left
            fadeoutResults.concat(results).forEach((result) => {
              result.cleanup && result.cleanup();
            });
          });
      });

      addToStore(this.props.pair, startTransition);
    } else if (typeof nodeOrFunc === 'function') {
      process.env.NODE_ENV !== 'production' && console.log('Found a transition, starting.');
      const startTransition = nodeOrFunc;
      // We dip into the node and get the _actual_ target (not wrapper container).
      startTransition(this._node.firstElementChild).then(() => {
        // need to notify any pairing transition container.
        notifyTransitionListener(this.props.pair, true);
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
