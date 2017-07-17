// @flow

export default function fadeout () {
  return {
    name: 'fadeout',
    options: {},
    styles: {},
    keyframes: [{
      opacity: 1,
    }, {
      opacity: 0,
    }],
  };
}
