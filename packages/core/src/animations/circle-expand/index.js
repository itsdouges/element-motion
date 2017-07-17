// @flow

import type { Metadata } from '../../lib/location';

import { calculateHypotenuse } from '../../lib/math';
import {
  calculateWindowCentre,
  calculateElementCenterInViewport,
} from '../../lib/dom';
import calculateFromSizeLocation from '../../lib/location';

type Options = {
  background?: string,
  cover?: boolean,
  zIndex?: number,
};

export default function circleExpand (element: HTMLElement, options: Options, metadata: Metadata = {}) {
  const sizeLocation = calculateFromSizeLocation(element, metadata);
  const minSize = Math.min(sizeLocation.width, sizeLocation.height);

  const elementHypotenuse = options.cover === false ? minSize : calculateHypotenuse(sizeLocation);

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
      ...metadata,
    },
    from: {
      left: sizeLocation.left - ((elementHypotenuse - sizeLocation.width) / 2),
      top: sizeLocation.top - ((elementHypotenuse - sizeLocation.height) / 2),
      width: elementHypotenuse,
      height: elementHypotenuse,
      borderRadius: '50%',
      background: options.background,
      position: 'absolute',
      zIndex: options.zIndex || 9997,
    },
    to: {
      keyframes: [{
        transform: `scale(${options.reverse ? scale : 1})`,
      }, {
        transform: `scale(${options.reverse ? 1 : scale})`,
      }],
    },
  };
}
