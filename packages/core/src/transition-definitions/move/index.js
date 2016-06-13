import { calculateElementSize, calculateElementLocation } from 'dom';
import { percentageDifference } from 'math';

export default function move (fromElement, { resize } = {}) {
  const fromLocation = calculateElementLocation(fromElement);
  const fromSize = calculateElementSize(fromElement);

  const to = (toElement) => {
    const toSize = resize ? calculateElementSize(toElement) : calculateElementSize(fromElement);
    const toLocation = calculateElementLocation(toElement);

    return {
      ...toLocation,
      ...toSize,
      scaleX: resize && percentageDifference(toSize.width, fromSize.width),
      scaleY: resize && percentageDifference(toSize.height, fromSize.height),
      transformOrigin: '0 0',
    };
  };

  return {
    from: {
      ...fromLocation,
      ...fromSize,
    },
    to,
  };
}
