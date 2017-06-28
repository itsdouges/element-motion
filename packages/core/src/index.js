import transitioner from './transitioner';
import deferred from './lib/deferred';
import doExpand from './definitions/expand';
import doFadeout from './definitions/fadeout';
import doMove from './definitions/move';
import doReveal from './definitions/reveal';

function transition (transitionFunc, element, options) {
  const transitionDefinition = transitionFunc(element, options);
  const defer = deferred();

  const start = transitioner(element, {
    options,
    transition: transitionDefinition,
    resolve: defer.resolve,
  });

  const params = {
    promise: defer.promise,
    start: (data) => {
      console.log('found data?', data);
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

export function expand (element, options) {
  return transition(doExpand, element, options);
}

export function fadeout (element, options) {
  return transition(doFadeout, element, options);
}

export function move (element, options) {
  return transition(doMove, element, options);
}

export function reveal (element, options) {
  return transition(doReveal, element, options);
}
