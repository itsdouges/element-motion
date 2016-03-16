export function calculateElementSize (element) {
  return {
    width: element.clientWidth,
    height: element.clientHeight,
  };
}

export function calculateElementLocation (element) {
  const rect = element.getBoundingClientRect();

  return {
    x: rect.left + document.body.clientLeft,
    y: rect.top + document.body.clientTop,
  };
}
