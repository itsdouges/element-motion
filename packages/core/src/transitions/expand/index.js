import { calculateHypotenuse } from '../../lib/math';
import {
  calculateElementSize,
  calculateElementLocation,
  calculateWindowCentre,
  calculateElementCenterInViewport,
} from '../../lib/dom';

export default function expand (element, { background, reverse, cover }, metadata = {}) {
  const location = metadata.location || calculateElementLocation(element, true);
  const size = metadata.size || calculateElementSize(element);
  const minSize = Math.min(size.width, size.height);

  const elementHypotenuse = cover ? calculateHypotenuse(size) : minSize;

  const windowHypotenuse = calculateHypotenuse({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const viewportCenter = calculateWindowCentre();
  const elementCenterInViewport = calculateElementCenterInViewport(element);

  const difference = {
    width: viewportCenter.left - elementCenterInViewport.left,
    height: viewportCenter.top - elementCenterInViewport.top,
  };

  const hypotenuseDifference = calculateHypotenuse(difference);

  const scale = Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize);

  return {
    name: 'expand',
    options: {
      newElement: true,
      applyScaleTransform: true,
      transitions: ['transform'],
    },
    from: {
      left: location.left - ((elementHypotenuse - size.width) / 2),
      top: location.top - ((elementHypotenuse - size.height) / 2),
      width: elementHypotenuse,
      height: elementHypotenuse,
      borderRadius: '50%',
      background: background || 'orange',
      position: 'absolute',
      scale: reverse ? scale : undefined,
      zIndex: 9997,
    },
    to: {
      scale: reverse ? 1 : scale,
    },
  };
}