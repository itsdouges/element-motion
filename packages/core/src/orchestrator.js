// @flow

import * as yubabaTransitions from './transitions';
import { calculateElementLocation, calculateElementSize } from '../../core/src/lib/dom';

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

function updateNodeData (pairName, { node, data }) {
  nodeStore[pairName] = nodeStore[pairName].map((item) => {
    if (item.node === node) {
      return {
        ...item,
        data,
      };
    }

    return item;
  });
}

export function removeFromStore (pairName: string, node: Element, withDelay: boolean = false) {
  const remove = () => (nodeStore[pairName] = nodeStore[pairName]
    .filter(({ node: nodeInStore }) => nodeInStore !== node));

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
  data?: {
    location: {
      left: number,
      top: number,
    },
    size: {
      width: number,
      height: number,
    },
  },
};

const toCamelCase = (str) => str.replace(/-[a-z]/g, (match) => match[1].toUpperCase());

function startTransition (
  pairName: string,
  fromNode: Node,
  toNode: Node,
  shouldShow: (boolean) => void,
) {
  const transitions = fromNode.transitions.map(({ transition: name, ...options }) => {
    // Hack to get reverse working. Uh. This should probably be rethought.
    const initTransition = (node, metadata) => yubabaTransitions[toCamelCase(name)](node, options, metadata);

    return name === 'circle-shrink'
      ? (node) => initTransition(node)
      : initTransition(fromNode.node, fromNode.data);
  });

  Promise
    .all(transitions.map((transition) => transition(toNode.node)))
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
          .filter(({ transition }) => transition === 'circle-shrink')
          .map(({ target }) => {
            return yubabaTransitions.fadeout(target, {
              duration: 0.75,
              autoCleanup: true,
            })();
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
    // This branch will get triggered only if the component was added, and then removed, from the vDOM.
    process.env.NODE_ENV !== 'production' && console.log(`Found fromNode for "${pairName}" pair, saving dimensions.`);

    const location = calculateElementLocation(options.node);
    const size = calculateElementSize(options.node);

    updateNodeData(pairName, {
      node: options.node,
      data: {
        location,
        size,
      },
    });

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
