// @flow

import type { Metadata } from '../../lib/location';

type Options = {
  showFromElement: HTMLElement,
  reverse?: boolean,
};

export default function reveal (element: HTMLElement, options: Options, metadata: Metadata = {}) {
  const from = {
    height: options.showFromElement.clientHeight,
    width: options.showFromElement.clientWidth,
    overflow: 'hidden',
    'z-index': 9998,
  };

  const to = {
    height: element.clientHeight,
    width: element.clientWidth,
    'z-index': 9998,
  };

  return {
    name: 'reveal',
    options: {
      immediatelyApplyFrom: true,
      resetHeightOnFinish: !options.reverse,
      applyStyles: true,
      transitions: ['width', 'height'],
      ...metadata,
    },
    styles: options.reverse ? to : from,
    // $FlowFixMe - This isn't in the new world yet.
    keyframes: options.reverse ? from : to,
  };
}
