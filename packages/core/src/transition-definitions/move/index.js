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
      scaleX: percentageDifference(toSize.width, fromSize.width),
      scaleY: percentageDifference(toSize.height, fromSize.height),
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
