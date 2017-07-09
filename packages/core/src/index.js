import transitioner from './transitioner';
import deferred from './lib/deferred';
import doExpand from './definitions/expand';
import doFadeout from './definitions/fadeout';
import doMove from './definitions/move';
import doReveal from './definitions/reveal';

function transition (transitionFunc, element, options, metadata) {
  const transitionDefinition = transitionFunc(element, options, metadata);
  const defer = deferred();

  const start = transitioner(element, {
    options,
    transition: transitionDefinition,
    resolve: defer.resolve,
  });

  const params = {
    promise: defer.promise,
    start: (data) => {
      const to = (typeof transitionDefinition.to === 'function') ?
        transitionDefinition.to(data) :
        transitionDefinition.to;

      start(to);
      return defer.promise;
    },
  };

  if (options.autoStart) {
    params.start();
  }

  return params;
}

export function expand (element, options, metadata) {
  return transition(doExpand, element, options, metadata);
}

export function fadeout (element, options, metadata) {
  return transition(doFadeout, element, options, metadata);
}

export function move (element, options, metadata) {
  return transition(doMove, element, options, metadata);
}

export function reveal (element, options, metadata) {
  return transition(doReveal, element, options, metadata);
}
