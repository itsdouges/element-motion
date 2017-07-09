// @flow

import * as yubaba from 'yubaba-core';

const REMOVE_DELAY = 100;
const nodeStore = {};
const listenerStore = {};

export function addTransitionListener (pairName: string, cb: (boolean) => void) {
  listenerStore[pairName] = cb;

  return () => {
    delete listenerStore[pairName];
  };
}

function notifyTransitionListener (pairName, value: boolean) {
  // we should be able to handle multiple listeners.
  const cb = listenerStore[pairName];
  if (cb) {
    cb(value);
  }
}

function readFromStore (pairName) {
  return nodeStore[pairName] || [];
}

function addToStore (pairName, { node, transitions }) {
  nodeStore[pairName] = (nodeStore[pairName] || []);
  nodeStore[pairName].push({ node, transitions });
}

export function removeFromStore (pairName: string, node: Element, withDelay: boolean = false) {
  const remove = () => (nodeStore[pairName] = nodeStore[pairName].filter(({ node: nodeInStore }) => nodeInStore !== node));

  if (withDelay) {
    setTimeout(remove, REMOVE_DELAY);
  } else {
    remove();
  }
}

export type Transition = {
  transition: 'move' | 'expand',
};

type Options = {
  node: Element,
  transitions: Array<Transition>,
  shouldShow: (show: boolean) => void,
};

type Node = {
  node: Element,
  transitions: Array<Transition>,
};

function startTransition (
  pairName: string,
  fromNode: Node,
  toNode: Node,
  shouldShow: (boolean) => void,
) {
  const transitions = fromNode.transitions.map(({ transition: name, ...options }) => {
    // Hack to get reverse working. Uh. This should probably be rethought.
    const initTransition = (node) => yubaba[name](node, options);

    return options.reverse
      ? { start: (node) => initTransition(node).start }
      : initTransition(fromNode.node);
  });

  Promise
    .all(transitions.map((transition) => transition.start(toNode.node)))
    .then((results) => {
      // Start all reverse transitions
      return Promise.all(results
        .filter((result) => typeof result === 'function')
        .map((start) => start())
        .concat(results));
    })
    .then((results) => {
      process.env.NODE_ENV !== 'production' && console.log(`Finished transition for ${pairName}.`);
      // Fadeout and cleanup all expanders. This is deliberately a broken promise chain.

      Promise.all(
        results
          .filter(({ transition }) => transition === 'expand')
          .map(({ target }) => {
            return yubaba.fadeout(target, {
              duration: 0.75,
              autoCleanup: true,
              autoStart: true,
            }).promise;
          })
      )
      .then((fadeoutResults) => {
        // Cleanup anything else left
        fadeoutResults.concat(results).forEach((result) => {
          result.cleanup && result.cleanup();
        });
      });
    })
    .then(() => {
      notifyTransitionListener(pairName, true);
      shouldShow(true);
    });
}

export default function orchestrator (pairName: string, options: Options) {
  const nodeArr = readFromStore(pairName);

  if (nodeArr.length === 0) {
    process.env.NODE_ENV !== 'production' && console.log(`Found fromNode for "${pairName}".`);

    notifyTransitionListener(pairName, true);
    options.shouldShow(true);
    addToStore(pairName, { node: options.node, transitions: options.transitions });

    return;
  }

  const isInNodeArr = nodeArr.some(({ node }) => options.node === node);

  if (nodeArr.length === 1 && isInNodeArr) {
    process.env.NODE_ENV !== 'production' && console.log(`Found fromNode for "${pairName}" pair, saving dimensions.`);

    return;
  }

  if (nodeArr.length === 1 && !isInNodeArr) {
    process.env.NODE_ENV !== 'production' && console.log(`Found toNode for "${pairName}" pair, starting transition.`);

    const [fromNode] = nodeArr;
    const toNode = { node: options.node, transitions: options.transitions };

    addToStore(pairName, toNode);
    startTransition(pairName, fromNode, toNode, options.shouldShow);

    return;
  }

  if (nodeArr.length === 2) {
    process.env.NODE_ENV !== 'production' && console.log(`Found both nodes for "${pairName}", starting transition.`);
    const [fromNode, toNode] = nodeArr;

    startTransition(pairName, fromNode, toNode, options.shouldShow);
  }
}
