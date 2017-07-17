// @flow

import type { Metadata } from '../../lib/location';

import { getElementSizeLocation } from '../../lib/dom';
import calculateFromSizeLocation from '../../lib/location';
import { percentageDifference } from '../../lib/math';

type Options = {
  zIndex?: number,
};

export default function move (fromElement: HTMLElement, options: Options = {}, metadata: Metadata = {}) {
  const fromSizeLocation = calculateFromSizeLocation(fromElement, metadata);

  return {
    name: 'move',
    options: {
      cloneElement: true,
      ...metadata,
    },
    from: {
      ...fromSizeLocation,
      margin: 0,
      transformOrigin: '0 0',
      position: 'absolute',
      zIndex: options.zIndex || 9999,
    },
    to: (toElement: HTMLElement) => {
      const toSizeLocation = getElementSizeLocation(toElement);

      const x = toSizeLocation.left - fromSizeLocation.left;
      const y = toSizeLocation.top - fromSizeLocation.top;

      return {
        keyframes: [{
          transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
        }, {
          transform: `translate3d(${x}px, ${y}px, 0) scale3d(${percentageDifference(toSizeLocation.width, fromSizeLocation.width)}, ${percentageDifference(toSizeLocation.height, fromSizeLocation.height)}, 1)`,
        }],
      };
    },
  };
}
