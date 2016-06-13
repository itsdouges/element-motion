import { calculateElementSize, calculateElementLocation } from 'helpers/dom';

export default function move (fromElement, { matchSize } = {}) {
  const to = (toElement) => {
    const size = matchSize ? calculateElementSize(toElement) : calculateElementSize(fromElement);
    const location = calculateElementLocation(toElement);

    // calculate difference to move, and scale.

    return {
      ...location,
      ...size,
    };
  };

  const location = calculateElementLocation(fromElement);
  const size = calculateElementSize(fromElement);

  return {
    from: {
      ...location,
      ...size,
    },
    to,
  };
}
