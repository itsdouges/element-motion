// @flow

import type { Metadata } from '../../lib/location';

import circleExpand from '../circle-expand';

type Options = {
  background?: string,
  cover?: boolean,
  zIndex?: number,
};

export default function circleShrink (element: HTMLElement, options: Options, metadata: Metadata = {}) {
  return {
    ...circleExpand(element, {
      ...options,
      reverse: true,
    }, metadata),
    name: 'circle-shrink',
    toOnly: true,
  };
}
