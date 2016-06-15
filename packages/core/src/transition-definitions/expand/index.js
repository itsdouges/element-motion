import { calculateHypotenuse } from 'math';
import {
  calculateElementSize,
  calculateElementLocation,
  calculateWindowCentre,
  calculateElementCenterInViewport,
} from 'dom';

export default function expand (element) {
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

  const scale = Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize);

  return {
    newElement: true,
    from: {
      ...location,
      width: minSize,
      height: minSize,
      borderRadius: '50%',
      backgroundColor: 'orange',
    },
    to: {
      scale,
    },
  };
}
