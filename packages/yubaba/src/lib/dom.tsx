/**
 * @hidden
 */
export function getDocumentScroll() {
  const scrollTop =
    document.documentElement && document.documentElement.scrollTop
      ? document.documentElement.scrollTop
      : document.body && document.body.scrollTop;

  const scrollLeft =
    document.documentElement && document.documentElement.scrollLeft
      ? document.documentElement.scrollLeft
      : document.body && document.body.scrollLeft;

  return {
    scrollTop: scrollTop || 0,
    scrollLeft: scrollLeft || 0,
  };
}

/**
 * @hidden
 */
export interface ElementBoundingBoxOpts {
  useOffsetSize?: boolean;
}

/**
 * @hidden
 */
export interface ElementBoundingBox {
  size: {
    width: number;
    height: number;
  };
  location: {
    left: number;
    top: number;
  };
  raw: {
    rect: ClientRect | DOMRect;
    scrollTop: number;
    scrollLeft: number;
  };
}

/**
 * @hidden
 */
export function getElementBoundingBox(
  element: HTMLElement,
  options: ElementBoundingBoxOpts = {}
): ElementBoundingBox {
  const rect = element.getBoundingClientRect();
  const { scrollLeft, scrollTop } = getDocumentScroll();
  const topOffset = (rect.height - element.offsetHeight) / 2;
  const leftOffset = (rect.width - element.offsetWidth) / 2;

  return {
    size: {
      width: options.useOffsetSize ? element.offsetWidth : rect.width,
      height: options.useOffsetSize ? element.offsetHeight : rect.height,
    },
    location: {
      left: rect.left + scrollLeft + leftOffset,
      top: rect.top + scrollTop + topOffset,
    },
    raw: {
      rect,
      scrollTop,
      scrollLeft,
    },
  };
}

/**
 * @hidden
 */
export function calculateElementCenterInViewport(elementBoundingBox: ElementBoundingBox) {
  return {
    top: elementBoundingBox.location.top + Math.ceil(elementBoundingBox.size.width / 2),
    left: elementBoundingBox.location.left - Math.ceil(elementBoundingBox.size.height / 2),
  };
}

/**
 * @hidden
 */
export function calculateWindowCentre() {
  return {
    left: Math.ceil(window.innerWidth / 2),
    top: Math.ceil(window.innerHeight / 2),
  };
}

/**
 * @hidden
 */
export function recalculateElementBoundingBoxFromScroll(
  elementBoundingBox: ElementBoundingBox
): ElementBoundingBox {
  const { scrollTop, scrollLeft } = getDocumentScroll();
  const scrollTopDiff = scrollTop - elementBoundingBox.raw.scrollTop;
  const scrollLeftDiff = scrollLeft - elementBoundingBox.raw.scrollLeft;

  return {
    ...elementBoundingBox,
    location: {
      top: elementBoundingBox.location.top + scrollTopDiff,
      left: elementBoundingBox.location.left + scrollLeftDiff,
    },
  };
}
