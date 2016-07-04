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

  // Rethink this implementation.
  if (typeof calculations.to === 'function') {
    const applyCallback = apply(element, calculations, params);

    return (toElement) => {
      const to = calculations.to(toElement);

      applyCallback(to);
    };
  }

  return apply(element, calculations, params);
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
