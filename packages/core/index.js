import apply from 'transition-apply';
const context = require.context('transition-definitions', true, /^((?!spec).)*\.js$/);
import deferred from 'lib/deferred';

function transition (type, element, params) {
  const calc = require(`transition-definitions/${type}/index.js`).default;

  const calculations = calc(element, params);
  const defer = deferred();
  const start = apply(element, calculations, params, defer);

  const settings = {
    promise: defer.promise,
    start: (data) => {
      const to = (typeof calculations.to === 'function') ?
        calculations.to(data) :
        undefined;

      start(to);
    },
  };

  if (params.autoStart) {
    settings.start();
    delete settings.start;
  }

  return settings;
}

function cleanKey (key) {
  return key.replace('-', '').replace('./', '').replace('/index.js', '');
}

const transitions = {};

context.keys().forEach((key) => {
  const cleanedKey = cleanKey(key);
  transitions[cleanedKey] = (element, params) => transition(cleanedKey, element, params);
});

module.exports = transitions;
