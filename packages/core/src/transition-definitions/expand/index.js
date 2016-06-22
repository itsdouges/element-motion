import { calculateHypotenuse } from 'math';
import {
  calculateElementSize,
  calculateElementLocation,
  calculateWindowCentre,
  calculateElementCenterInViewport,
} from 'dom';

export default function expand (element, { background }) {
  const location = calculateElementLocation(element);
  const size = calculateElementSize(element);
  const minSize = Math.min(size.width, size.height);

  const elementHypotenuse = calculateHypotenuse(size);

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
    options: {
      newElement: true,
      applyScaleTransform: true,
    },
    from: {
      left: location.left - ((elementHypotenuse - size.width) / 2),
      top: location.top - ((elementHypotenuse - size.height) / 2),
      width: elementHypotenuse,
      height: elementHypotenuse,
      borderRadius: '50%',
      background: background || 'orange',
      position: 'fixed',
    },
    to: {
      scale,
    },
  };
}
