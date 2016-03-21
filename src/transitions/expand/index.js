import { calculateHypotenuse } from 'helpers/math';
import {
  calculateElementSize,
  calculateElementLocation,
  calculateWindowCentre,
  calculateElementCenterInViewport,
} from 'helpers/dom';

export function expand (element) {
  const location = calculateElementLocation(element);
  const size = calculateElementSize(element);
  const minSize = Math.min(size.width, size.height);

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

  return {
    from: {
      ...location,
      width: minSize,
      height: minSize,
    },
    to: {
      scale: Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize),
    },
    finally: {
      opacity: 0,
    },
  };
}
