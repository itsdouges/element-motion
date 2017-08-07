// @flow

import type { AnimationFunc } from './animations';
import type { Metadata } from './lib/location';
import * as animationDefinitions from './animations';
import { getElementSizeLocation } from '../../core/src/lib/dom';

const toCamelCase = (str) => str.replace(/-[a-z]/g, (match) => match[1].toUpperCase());
const buildInflightName = (pairName, animationName) => `${pairName}${animationName}`;

// This isn't fantastic. Basically the crux of the problem is
// for these animations they need the "end" element to act as the
// "start" element. Don't have a elegant solution yet.
// Issue: https://github.com/madou/yubaba/issues/31
const REQUIRES_LAST_NODE_AS_FIRST = ['circle-shrink'];
const REMOVE_DELAY = 100;
const NODE_STORE = {};
const LISTENER_STORE = {};
// const INFLIGHT_ANIMATIONS = {};

export function addListener (pairName: string, cb: (boolean) => void) {
  LISTENER_STORE[pairName] = (LISTENER_STORE[pairName] || []);
  LISTENER_STORE[pairName].push(cb);

  return () => {
    LISTENER_STORE[pairName] = LISTENER_STORE[pairName].filter((listener) => listener !== cb);
  };
}

function notifyListener (pairName, value: boolean) {
  const cbArr = LISTENER_STORE[pairName];
  if (cbArr && cbArr.length) {
    cbArr.forEach((cb) => cb(value));
  }
}

function readFromStore (pairName) {
  return NODE_STORE[pairName] || [];
}

function addToStore (pairName, { node, animations }) {
  NODE_STORE[pairName] = (NODE_STORE[pairName] || []);
  NODE_STORE[pairName].push({ node, animations });
}

function updateNodeData (pairName, { node, metadata }) {
  NODE_STORE[pairName] = NODE_STORE[pairName].map((item) => {
    if (item.node === node) {
      return {
        ...item,
        metadata,
      };
    }

    return item;
  });
}

export function removeFromStore (pairName: string, node: Element, withDelay: boolean = false) {
  const remove = () => {
    NODE_STORE[pairName] = NODE_STORE[pairName].filter(({ node: nodeInStore }) => nodeInStore !== node);
  };

  if (withDelay) {
    setTimeout(remove, REMOVE_DELAY);
  } else {
    remove();
  }
}

export type Animation = {
  animationName: 'move' | 'expand',
  animation?: AnimationFunc,
};

type Options = {
  node: HTMLElement,
  animations: Array<Animation>,
};

type Node = {
  node: HTMLElement,
  animations: Array<Animation>,
  metadata?: Metadata,
};

function prepareAnimation (pairName, animation, fromNode, toNode) {
  const { animation: customAnim, animationName: name, ...options } = animation;
  const inflightName = buildInflightName(pairName, name);

  let toElement;
  let fromElement;
  let metadata;

  // if (INFLIGHT_ANIMATIONS[inflightName]) {
    // fromElement = toNode.node;
    // INFLIGHT_ANIMATIONS[inflightName].animation.pause();

    // fromElement = INFLIGHT_ANIMATIONS[inflightName].target;
    // toElement = toNode.node;
    // metadata = {
    //   sizeLocation: getElementSizeLocation(fromElement, { useOffsetSize: true }),
    // };
  // } else
  if (REQUIRES_LAST_NODE_AS_FIRST.includes(name)) {
    fromElement = toNode.node;
    toElement = fromNode.node;
  } else {
    fromElement = fromNode.node;
    toElement = toNode.node;
    metadata = fromNode.metadata;
  }

  const func = customAnim
    ? (element, opts, mtdata) => animationDefinitions.animate(customAnim, element, opts, mtdata)
    : animationDefinitions[toCamelCase(name)];

  return func(fromElement, {
    ...options,
    onStart: (/* anim */) => {
      process.env.NODE_ENV !== 'production' && console.log(`Starting ${inflightName} animation.`);
      // INFLIGHT_ANIMATIONS[inflightName] = anim;
    },
  }, metadata)(toElement)
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
      return start().then((result) => {
        results = results.concat(result);
      });
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
        // delete INFLIGHT_ANIMATIONS[buildInflightName(pairName, result.animationName)];
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

    const elementSizeLocation = getElementSizeLocation(options.node);

    updateNodeData(pairName, {
      node: options.node,
      metadata: {
        sizeLocation: elementSizeLocation,
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
