export default function reveal (element, { showFromElement, reverse }) {
  const from = {
    height: showFromElement.clientHeight,
    width: showFromElement.clientWidth,
    overflow: 'hidden',
    'z-index': 9998,
  };

  const to = {
    height: element.clientHeight,
    width: element.clientWidth,
    'z-index': 9998,
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
