// @flow

export default function fadeout () {
  return {
    name: 'fadeout',
    from: {},
    options: {},
    to: {
      keyframes: [{
        opacity: 1,
      }, {
        opacity: 0,
      }],
    },
  };
}
