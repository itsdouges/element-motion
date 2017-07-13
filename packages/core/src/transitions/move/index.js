// @flow

import type { Metadata } from '../../lib/location';

import { calculateElementSize, calculateElementLocation } from '../../lib/dom';
import { percentageDifference } from '../../lib/math';
import calculateFromLocation from '../../lib/location';

type Options = {
  matchSize?: boolean,
  zIndex?: number,
};

export default function move (fromElement: HTMLElement, options: Options = {}, metadata: Metadata = {}) {
  const fromLocation = calculateFromLocation(fromElement, metadata);
  const fromSize = metadata.size || calculateElementSize(fromElement);

  return {
    name: 'move',
    options: {
      cloneElement: true,
      ...metadata,
    },
    from: {
      ...fromLocation,
      ...fromSize,
      margin: 0,
      transformOrigin: '0 0',
      position: 'absolute',
      zIndex: options.zIndex || 9999,
    },
    to: (toElement: HTMLElement) => {
      const toSize = options.matchSize === false ? calculateElementSize(fromElement) : calculateElementSize(toElement);
      const toLocation = calculateElementLocation(toElement);

      const x = toLocation.left - fromLocation.left;
      const y = toLocation.top - fromLocation.top;

      return {
        keyframes: [{
          transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
        }, {
          transform: `translate3d(${x}px, ${y}px, 0) scale3d(${percentageDifference(toSize.width, fromSize.width)}, ${percentageDifference(toSize.height, fromSize.height)}, 1)`,
        }],
      };
    },
  };
}
