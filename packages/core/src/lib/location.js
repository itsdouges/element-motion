// @flow

import { calculateElementLocation, getDocumentScroll } from './dom';

type Metadata = {
  location?: {
    top: number,
    left: number,
    raw: {
      scrollTop: number,
      scrollLeft: number,
    },
  },
};

export default function calculateLocation (node: HTMLElement, metadata: Metadata) {
  const initialLocation = metadata.location;
  if (!initialLocation) {
    return calculateElementLocation(node);
  }

  const { scrollTop, scrollLeft } = getDocumentScroll();
  const scrollTopDiff = (scrollTop - initialLocation.raw.scrollTop);
  const scrollLeftDiff = (scrollLeft - initialLocation.raw.scrollLeft);

  return {
    top: initialLocation.top + scrollTopDiff,
    left: initialLocation.left + scrollLeftDiff,
  };
}
