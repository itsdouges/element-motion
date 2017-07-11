// @flow

import type { Metadata } from '../lib/location';

import transitioner from '../transitioner';
import deferred from '../lib/deferred';
import doCircleExpand from './circle-expand';
import doCircleShrink from './circle-shrink';
import doFadeout from './fadeout';
import doMove from './move';
import doReveal from './reveal';

type TransitionFunc = (element: HTMLElement, options: Object, metadata?: Metadata) => ({
  to: Object,
  from: Object | (toElement: HTMLElement) => Object,
});

function transition (transitionFunc: TransitionFunc, element: HTMLElement, options: Object, metadata?: Metadata) {
  const transitionDefinition = transitionFunc(element, options, metadata);
  const defer = deferred();

  const start = transitioner(element, {
    options,
    transition: transitionDefinition,
    resolve: defer.resolve,
  });

  return (toElement?: HTMLElement) => {
    const to = (typeof transitionDefinition.to === 'function') ?
      transitionDefinition.to(toElement) :
      transitionDefinition.to;

    start(to);

    return defer.promise;
  };
}

export function circleExpand (element: HTMLElement, options: Object, metadata?: Metadata) {
  return transition(doCircleExpand, element, options, metadata);
}

export function circleShrink (element: HTMLElement, options: Object, metadata?: Metadata) {
  return transition(doCircleShrink, element, options, metadata);
}

export function fadeout (element: HTMLElement, options: Object, metadata?: Metadata) {
  return transition(doFadeout, element, options, metadata);
}

export function move (element: HTMLElement, options: Object, metadata?: Metadata) {
  return transition(doMove, element, options, metadata);
}

export function reveal (element: HTMLElement, options: Object, metadata?: Metadata) {
  return transition(doReveal, element, options, metadata);
}

export const custom = transition;
