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

  const to = (toElement: HTMLElement) => {
    const toSize = options.matchSize === false ? calculateElementSize(fromElement) : calculateElementSize(toElement);
    const toLocation = calculateElementLocation(toElement);

    return {
      ...toLocation,
      ...toSize,
      transformOrigin: '0 0',
      scale3d: options.matchSize === false || `${percentageDifference(toSize.width, fromSize.width)}, ${percentageDifference(toSize.height, fromSize.height)}, 1`,
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
      zIndex: options.zIndex || 9999,
    },
    to,
  };
}
