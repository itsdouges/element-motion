import apply from 'transition-apply';
const context = require.context('transition-definitions', true, /^((?!spec).)*\.js$/);
import deferred from 'lib/deferred';

function transition (type, element, options) {
  const calc = require(`transition-definitions/${type}/index.js`).default;

  const transitionDefinition = calc(element, options);
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
    delete params.start;
  }

  return params;
}

function cleanKey (key) {
  return key.replace('-', '').replace('./', '').replace('/index.js', '');
}

const transitions = {};

context.keys().forEach((key) => {
  const cleanedKey = cleanKey(key);
  transitions[cleanedKey] = (element, options) => transition(cleanedKey, element, options);
});

module.exports = transitions;
