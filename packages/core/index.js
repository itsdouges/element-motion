import apply from 'transition-apply';
import deferred from 'lib/deferred';
import definitionsFactory from 'transition-definitions';

function transition (type, element, options) {
  const transitionDefinition = definitionsFactory[type](element, options);
  const defer = deferred();

  const start = apply(element, {
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
    },
  };

  if (options.autoStart) {
    params.start();
  }

  return params;
}

const transitions = {};

Object.keys(definitionsFactory).forEach((key) => {
  transitions[key] = (element, options) => transition(key, element, options);
});

module.exports = transitions;
