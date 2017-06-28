export default function reveal (element, { showFromElement, reverse }) {
  const from = {
    height: showFromElement.clientHeight,
    width: showFromElement.clientWidth,
    overflow: 'hidden',
  };

  const to = {
    height: element.clientHeight,
    width: element.clientWidth,
  };

  return {
    name: 'reveal',
    options: {
      immediatelyApplyFrom: true,
      resetHeightOnFinish: !reverse,
      applyStyles: true,
      transitions: ['width', 'height'],
    },
    from: reverse ? to : from,
    to: reverse ? from : to,
  };
}
