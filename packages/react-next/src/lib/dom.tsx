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

interface GetElementSizeLocationOptions {
  useOffsetSize?: boolean;
}

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
