// @flow

export default function fadeout () {
  return {
    name: 'fadeout',
    to: {
      keyframes: [{
        opacity: 1,
      }, {
        opacity: 0,
      }],
    },
  };
}
