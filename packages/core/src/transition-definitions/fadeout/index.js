export default function fadeout () {
  return {
    options: {
      applyStyles: true,
    },
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  };
}
