import { calculateElementSize, calculateElementLocation } from 'core/helpers/dom';

export default function move (fromElement, { matchSize } = {}) {
  const to = (toElement) => {
    const size = matchSize ? calculateElementSize(toElement) : calculateElementSize(fromElement);
    const location = calculateElementLocation(toElement);

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
