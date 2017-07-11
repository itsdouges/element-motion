// @flow

export default function fadeout () {
  return {
    name: 'fadeout',
    options: {
      applyStyles: true,
      transitions: ['opacity'],
    },
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  };
}
