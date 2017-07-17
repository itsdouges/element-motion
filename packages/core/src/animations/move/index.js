// @flow

import type { Metadata } from '../../lib/location';

import { getElementSizeLocation } from '../../lib/dom';
import calculateFromSizeLocation from '../../lib/location';
import { percentageDifference } from '../../lib/math';

type Options = {
  zIndex?: number,
};

export default function move (fromElement: HTMLElement, options: Options = {}, metadata: Metadata = {}) {
  const { raw, ...sizeLocation } = calculateFromSizeLocation(fromElement, metadata);

  return {
    name: 'move',
    options: {
      cloneElement: true,
      ...metadata,
    },
    styles: {
      ...sizeLocation,
      margin: 0,
      transformOrigin: '0 0',
      position: 'absolute',
      zIndex: options.zIndex || 9999,
    },
    keyframes: (toElement: HTMLElement) => {
      const toSizeLocation = getElementSizeLocation(toElement);

      const x = toSizeLocation.left - sizeLocation.left;
      const y = toSizeLocation.top - sizeLocation.top;

      return [{
        transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
      }, {
        transform: `translate3d(${x}px, ${y}px, 0) scale3d(${percentageDifference(toSizeLocation.width, sizeLocation.width)}, ${percentageDifference(toSizeLocation.height, sizeLocation.height)}, 1)`,
      }];
    },
  };
}
