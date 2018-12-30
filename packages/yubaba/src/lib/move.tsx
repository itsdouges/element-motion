import { ElementBoundingBox } from './dom';

interface CoverOpts {
  transformX?: boolean;
  transformY?: boolean;
}

export function cover(
  origin: ElementBoundingBox,
  destination: ElementBoundingBox,
  opts: CoverOpts = {}
) {
  const toStartXOffset = opts.transformX ? origin.location.left - destination.location.left : 0;
  const toStartYOffset = opts.transformY ? origin.location.top - destination.location.top : 0;

  return {
    transform: `translate3d(${toStartXOffset}px, ${toStartYOffset}px, 0) scale3d(${origin.size
      .width / destination.size.width}, ${origin.size.height / destination.size.height}, 1)`,
  };
}

export function arcLeft(origin: ElementBoundingBox, destination: ElementBoundingBox) {}

export function arcRight(origin: ElementBoundingBox, destination: ElementBoundingBox) {}
