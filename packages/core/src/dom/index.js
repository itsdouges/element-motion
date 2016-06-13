import { calculateHypotenuse } from 'math';

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

export function calculateElementCircumcircle (element) {
  const size = calculateElementSize(element);
  const diameter = calculateHypotenuse(size);
  const location = calculateElementLocation(element);

  return {
    ...location,
    diameter,
  };
}

export function calculateWindowCentre () {
  return {
    x: Math.ceil(window.innerWidth / 2),
    y: Math.ceil(window.innerHeight / 2),
  };
}

export function calculateElementCenterInViewport (element) {
  const location = calculateElementLocation(element);
  const size = calculateElementSize(element);

  return {
    x: location.top + Math.ceil(size.width / 2),
    y: location.left - Math.ceil(size.height / 2),
  };
}
