import { calculateElementSize, calculateElementLocation } from 'dom';
import { percentageDifference } from 'math';

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
    options: {
      callbackToApplyTo: true,
      ignoreApplyStyles: true,
      cloneElement: true,
      applyScaleTransform: true,
      applyTranslateTransform: true,
      transitions: ['transform'],
      createInBody: true,
    },
    from: {
      ...fromLocation,
      ...fromSize,
      margin: 0,
      position: 'fixed',
    },
    to,
  };
}
