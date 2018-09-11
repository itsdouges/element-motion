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
export interface GetElementSizeLocationOptions {
  useOffsetSize?: boolean;
}

/**
 * @hidden
 */
export interface GetElementSizeLocationReturnValue {
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
export function getElementSizeLocation(
  element: HTMLElement,
  options: GetElementSizeLocationOptions = {}
): GetElementSizeLocationReturnValue {
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
export function calculateElementCenterInViewport(sizeLocation: GetElementSizeLocationReturnValue) {
  return {
    top: sizeLocation.location.top + Math.ceil(sizeLocation.size.width / 2),
    left: sizeLocation.location.left - Math.ceil(sizeLocation.size.height / 2),
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
export function recalculateLocationFromScroll(
  sizeLocation: GetElementSizeLocationReturnValue
): GetElementSizeLocationReturnValue {
  const { scrollTop, scrollLeft } = getDocumentScroll();
  const scrollTopDiff = scrollTop - sizeLocation.raw.scrollTop;
  const scrollLeftDiff = scrollLeft - sizeLocation.raw.scrollLeft;

  return {
    ...sizeLocation,
    location: {
      top: sizeLocation.location.top + scrollTopDiff,
      left: sizeLocation.location.left + scrollLeftDiff,
    },
  };
}
