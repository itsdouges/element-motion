import { calculateElementSize, calculateElementLocation } from '../../lib/dom';
import { percentageDifference } from '../../lib/math';
import calculateFromLocation from '../../lib/location';

export default function move (fromElement, { matchSize } = {}, metadata = {}) {
  const fromLocation = calculateFromLocation(fromElement, metadata);
  const fromSize = metadata.size || calculateElementSize(fromElement);

  const to = (toElement) => {
    const toSize = matchSize ? calculateElementSize(toElement) : calculateElementSize(fromElement);
    const toLocation = calculateElementLocation(toElement, true);

    return {
      ...toLocation,
      ...toSize,
      scale3d: matchSize && `${percentageDifference(toSize.width, fromSize.width)}, ${percentageDifference(toSize.height, fromSize.height)}, 1`,
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
      position: 'absolute',
      zIndex: 9999,
    },
    to,
  };
}
