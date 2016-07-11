export default function fadeout () {
  return {
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
