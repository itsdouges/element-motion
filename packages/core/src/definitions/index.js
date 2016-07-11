const context = require.context('./', true, /^((?!spec).)*\.js$/);

const transitions = {};

context.keys()
  .map((key) => ({
    cleaned: key.replace('-', '').replace('./', '').replace('/index.js', ''),
    original: key,
  }))
  .filter((key) => key.cleaned !== 'index.js')
  .forEach((key) => (transitions[key.cleaned] = context(key.original).default));

export default transitions;
