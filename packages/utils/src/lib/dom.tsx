export function eventListener<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  event: K,
  cb: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions | undefined
) {
  element.addEventListener<K>(event, cb, options);
  return () => element.removeEventListener(event, cb, options);
}

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

export interface ElementBoundingBoxOpts {
  useOffsetSize?: boolean;
}

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

export function getElementBoundingBox(
  element: HTMLElement,
  options: ElementBoundingBoxOpts = {}
): ElementBoundingBox {
  const rect = element.getBoundingClientRect();
  const { scrollLeft, scrollTop } = getDocumentScroll();

  return {
    size: {
      width: options.useOffsetSize ? element.offsetWidth : rect.width,
      height: options.useOffsetSize ? element.offsetHeight : rect.height,
    },
    location: {
      // Will return the true distance from the top of the page (viewport + scroll)
      left: rect.left + scrollLeft,
      top: rect.top + scrollTop,
    },
    raw: {
      rect,
      scrollTop,
      scrollLeft,
    },
  };
}

export function calculateElementCenterInViewport(elementBoundingBox: ElementBoundingBox) {
  return {
    top: elementBoundingBox.location.top + Math.ceil(elementBoundingBox.size.width / 2),
    left: elementBoundingBox.location.left - Math.ceil(elementBoundingBox.size.height / 2),
  };
}

export function getWindowDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function calculateWindowCentre() {
  return {
    left: Math.ceil(window.innerWidth / 2),
    top: Math.ceil(window.innerHeight / 2),
  };
}

/**
 * Used to pad the location with an updated scroll position.
 * This is used because the destination and origin elements are calculated in the same frame
 * but the scroll could have changed just after the origin has changed but before the destintation.
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

export function isPartiallyInViewport(bounding: ElementBoundingBox) {
  const windowDimensions = getWindowDimensions();
  const verticallyInsideViewport =
    bounding.raw.rect.top <= windowDimensions.height &&
    bounding.raw.rect.top + bounding.size.height >= 0;
  const horizontallyInsideViewport =
    bounding.raw.rect.left <= windowDimensions.width &&
    bounding.raw.rect.left + bounding.size.width >= 0;

  return verticallyInsideViewport && horizontallyInsideViewport;
}
