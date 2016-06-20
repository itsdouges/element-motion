export default function reveal (element, { showFromElement }) {
  return {
    callbackToApplyTo: true,
    immediatelyApplyFrom: true,
    from: {
      height: showFromElement.clientHeight,
      width: showFromElement.clientWidth,
      overflow: 'hidden',
    },
    to: {
      height: element.clientHeight,
      width: element.clientWidth,
    },
  };
}
