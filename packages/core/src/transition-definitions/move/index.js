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
      scale: resize && percentageDifference(toSize.width, fromSize.width),
      transformOrigin: '0 0',
    };
  };

  return {
    cloneElement: true,
    from: {
      ...fromLocation,
      ...fromSize,
      margin: 0,
      position: 'fixed',
    },
    to,
  };
}
