// @flow

import type { Metadata } from '../../lib/location';

import { calculateHypotenuse } from '../../lib/math';
import {
  calculateElementSize,
  calculateWindowCentre,
  calculateElementCenterInViewport,
} from '../../lib/dom';
import calculateFromLocation from '../../lib/location';

type Options = {
  background?: string,
  cover?: boolean,
  zIndex?: number,
};

export default function circleExpand (element: HTMLElement, options: Options, metadata: Metadata = {}) {
  const location = calculateFromLocation(element, metadata);
  const size = metadata.size || calculateElementSize(element);
  const minSize = Math.min(size.width, size.height);

  const elementHypotenuse = options.cover === false ? minSize : calculateHypotenuse(size);

  const windowHypotenuse = calculateHypotenuse({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const viewportCenter = calculateWindowCentre();
  const elementCenterInViewport = calculateElementCenterInViewport(element);

  const difference = {
    width: viewportCenter.left - elementCenterInViewport.left,
    height: viewportCenter.top - elementCenterInViewport.top,
  };

  const hypotenuseDifference = calculateHypotenuse(difference);

  const scale = Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize);

  return {
    name: 'circle-expand',
    options: {
      newElement: true,
      applyScaleTransform: true,
      transitions: ['transform'],
    },
    from: {
      left: location.left - ((elementHypotenuse - size.width) / 2),
      top: location.top - ((elementHypotenuse - size.height) / 2),
      width: elementHypotenuse,
      height: elementHypotenuse,
      borderRadius: '50%',
      background: options.background,
      position: 'absolute',
      scale: options.reverse ? scale : undefined,
      zIndex: options.zIndex || 9997,
    },
    to: {
      scale: options.reverse ? 1 : scale,
    },
  };
}
