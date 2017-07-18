// @flow

import { getElementSizeLocation, getDocumentScroll } from './dom';

export type Metadata = {
  sizeLocation?: {
    width: number,
    height: number,
    top: number,
    left: number,
    raw: {
      scrollTop: number,
      scrollLeft: number,
    },
  },
};

type Options = {
  useOffsetsize?: boolean,
};

export default function calculateFromSizeLocation (
  node: HTMLElement,
  metadata: Metadata,
  { useOffsetSize }: Options = {},
) {
  const initialSizeLocation = metadata.sizeLocation;
  if (!initialSizeLocation) {
    return getElementSizeLocation(node, { useOffsetSize });
  }

  const { scrollTop, scrollLeft } = getDocumentScroll();
  const scrollTopDiff = (scrollTop - initialSizeLocation.raw.scrollTop);
  const scrollLeftDiff = (scrollLeft - initialSizeLocation.raw.scrollLeft);

  return {
    ...initialSizeLocation,
    top: initialSizeLocation.top + scrollTopDiff,
    left: initialSizeLocation.left + scrollLeftDiff,
  };
}
