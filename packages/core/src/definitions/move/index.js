import { calculateElementSize, calculateElementLocation } from '../../lib/dom';
import { percentageDifference } from '../../lib/math';

export default function move (fromElement, { matchSize } = {}) {
  const fromLocation = calculateElementLocation(fromElement);
  const fromSize = calculateElementSize(fromElement);

  const to = (toElement) => {
    const toSize = matchSize ? calculateElementSize(toElement) : calculateElementSize(fromElement);
    const toLocation = calculateElementLocation(toElement);

    return {
      ...toLocation,
      ...toSize,
      scale: matchSize && percentageDifference(toSize.width, fromSize.width),
      transformOrigin: '0 0',
    };
  };

  return {
    name: 'move',
    options: {
      cloneElement: true,
      applyScaleTransform: true,
      applyTranslateTransform: true,
      transitions: ['transform'],
      createInBody: true,
      immediatelyApplyFrom: true,
    },
    from: {
      ...fromLocation,
      ...fromSize,
      margin: 0,
      position: 'fixed',
      'z-index': 9999,
    },
    to,
  };
}
