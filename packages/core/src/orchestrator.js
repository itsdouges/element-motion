// @flow

import * as animationDefinitions from './animations';
import { calculateElementLocation, calculateElementSize } from '../../core/src/lib/dom';

const REMOVE_DELAY = 100;
const nodeStore = {};
const listenerStore = {};

export function addListener (pairName: string, cb: (boolean) => void) {
  listenerStore[pairName] = (listenerStore[pairName] || []);
  listenerStore[pairName].push(cb);

  return () => {
    listenerStore[pairName] = listenerStore[pairName].filter((listener) => listener !== cb);
  };
}

function notifyListener (pairName, value: boolean) {
  const cbArr = listenerStore[pairName];
  if (cbArr && cbArr.length) {
    cbArr.forEach((cb) => cb(value));
  }
}

function readFromStore (pairName) {
  return nodeStore[pairName] || [];
}

function addToStore (pairName, { node, animations }) {
  nodeStore[pairName] = (nodeStore[pairName] || []);
  nodeStore[pairName].push({ node, animations });
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

export type Animation = {
  animationName: 'move' | 'expand',
};

type Options = {
  node: HTMLElement,
  animations: Array<Animation>,
};

type Node = {
  node: HTMLElement,
  animations: Array<Animation>,
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

// This isn't fantastic. Basically the crux of the problem is
// for these animations they need the "end" element to act as the
// "start" element. Don't have a elegant solution yet.
// Issue: https://github.com/madou/yubaba/issues/31
const toNodeFirstList = ['circle-shrink'];
const inFlightAnimations = {};

function prepareAnimation (pairName, animation, fromNode, toNode) {
  const { animationName: name, ...options } = animation;
  const inFlightName = `${pairName}${name}`;

  let toElement;
  let fromElement;
  let metadata;

  if (inFlightAnimations[inFlightName]) {
    process.env.NODE_ENV !== 'production' && console.log(`Found an inflight animation for ${pairName}, hijacking.`);

    fromElement = inFlightAnimations[inFlightName];
    toElement = toNode.node;
    metadata = {
      newElement: false,
      cloneElement: false,
    };
  } else if (toNodeFirstList.includes(name)) {
    fromElement = toNode.node;
  } else {
    fromElement = fromNode.node;
    toElement = toNode.node;
    metadata = fromNode.data;
  }

  const optionsWithStartCb = {
    ...options,
    onStart: ({ target }) => {
      inFlightAnimations[inFlightName] = target;
    },
  };

  return animationDefinitions[toCamelCase(name)](fromElement, optionsWithStartCb, metadata)(toElement)
    .then((result) => ({ result, options }));
}

function animate (
  pairName: string,
  fromNode: Node,
  toNode: Node,
) {
  const animationsStarters = fromNode.animations.map((animation) => {
    if (Array.isArray(animation)) {
      const animationGroup = animation;

      return () => Promise.all(
        animationGroup.map((animationChild) => prepareAnimation(pairName, animationChild, fromNode, toNode))
      );
    }

    return () => prepareAnimation(pairName, animation, fromNode, toNode);
  });

  let results = [];

  animationsStarters
    .reduce((promise, start) => promise.then(() => {
      return start().then((result) => (results = results.concat(result)));
    }), Promise.resolve())
    .then(() => {
      process.env.NODE_ENV !== 'production' && console.log(`Finished animations for ${pairName}.`);

      notifyListener(pairName, true);

      const fadeouts = results
        .filter(({ options }) => options.fadeout)
        .map(({ result, options }) => {
          return animationDefinitions.fadeout(result.target, {
            duration: options.fadeout,
          })(result.target);
        });

      return Promise.all(fadeouts);
    })
    .then(() => {
      results.forEach(({ result }) => {
        delete inFlightAnimations[`${pairName}${result.animationName}`];
        result.cleanup();
      });
    });
}

export default function orchestrator (pairName: string, options: Options) {
  const nodeArr = readFromStore(pairName);

  if (nodeArr.length === 0) {
    process.env.NODE_ENV !== 'production' && console.log(`Found fromNode for "${pairName}".`);

    notifyListener(pairName, true);
    addToStore(pairName, { node: options.node, animations: options.animations });

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
    process.env.NODE_ENV !== 'production' && console.log(`Found toNode for "${pairName}" pair, starting animation.`);

    const [fromNode] = nodeArr;
    const toNode = { node: options.node, animations: options.animations };

    addToStore(pairName, toNode);
    animate(pairName, fromNode, toNode);

    return;
  }

  if (nodeArr.length === 2) {
    process.env.NODE_ENV !== 'production' && console.log(`Found both nodes for "${pairName}", starting animation.`);
    const [fromNode, toNode] = nodeArr;

    animate(pairName, fromNode, toNode);
  }
}
