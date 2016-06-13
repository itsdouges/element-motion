import apply from 'transition-apply';
const context = require.context('transition-definitions', true, /^((?!spec).)*\.js$/);

/**
 * transition
 *
 * Will return a callback if the transition requires a "to element".
 *
 * @param  {string} type Transition type.
 * @param  {DOMElement} element [description]
 * @return {Function} ToElement callback if required, else undefined.
 */
function transition (type, element, params) {
  const calc = require(`transition-definitions/${type}/index.js`).default;

  const calculations = calc(element, params);

  if (typeof calculations.to === 'function') {
    return (toElement) => {
      calculations.to = calculations.to(toElement);

      apply(element, calculations, params);
    };
  }

  apply(element, calculations, params);

  return undefined;
}

const transitions = {};

context.keys().forEach((key) => {
  const cleanKey = key.replace('./', '').replace('/index.js', '');
  transitions[cleanKey] = (element, params) => transition(cleanKey, element, params);
});

module.exports = transitions;
