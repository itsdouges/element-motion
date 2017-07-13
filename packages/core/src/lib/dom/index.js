// @flow

import { calculateHypotenuse } from '../math';

export function calculateElementSize (element: HTMLElement) {
  return {
    width: element.clientWidth,
    height: element.clientHeight,
  };
}

export function getDocumentScroll () {
  const scrollTop = document.documentElement && document.documentElement.scrollTop
    ? document.documentElement.scrollTop
    : document.body && document.body.scrollTop;

  const scrollLeft = document.documentElement && document.documentElement.scrollLeft
    ? document.documentElement.scrollLeft
    : document.body && document.body.scrollLeft;

  return {
    scrollTop: scrollTop || 0,
    scrollLeft: scrollLeft || 0,
  };
}

export function calculateElementLocation (element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const { scrollLeft, scrollTop } = getDocumentScroll();

  return {
    left: rect.left + scrollLeft,
    top: rect.top + scrollTop,
    raw: {
      rect,
      scrollTop,
      scrollLeft,
    },
  };
}

export function calculateElementCircumcircle (element: HTMLElement) {
  const size = calculateElementSize(element);
  const diameter = calculateHypotenuse(size);
  const location = calculateElementLocation(element);

  return {
    ...location,
    diameter,
  };
}

export function calculateWindowCentre () {
  return {
    left: Math.ceil(window.innerWidth / 2),
    top: Math.ceil(window.innerHeight / 2),
  };
}

const addPxIfNeeded = (key: string, value: string | number): string => {
  switch (key) {
    case 'width':
    case 'height':
    case 'top':
    case 'left':
      return typeof value === 'number' ? `${value}px` : value;

    default:
      return String(value);
  }
};

type Styles = { [string]: string | number };

export function applyStyles (element: HTMLElement, styles: Styles) {
  Object.keys(styles).forEach((key: any) => {
    // eslint-disable-next-line no-param-reassign
    element.style[key] = addPxIfNeeded(key, styles[key]);
  });
}

export function calculateElementCenterInViewport (element: HTMLElement) {
  const location = calculateElementLocation(element);
  const size = calculateElementSize(element);

  return {
    top: location.top + Math.ceil(size.width / 2),
    left: location.left - Math.ceil(size.height / 2),
  };
}

type XY = {
  x?: number,
  y?: number,
};

export function buildTranslateTransform ({ x, y }: XY) {
  if (!x || !y) {
    return '';
  }

  return `translate3d(${x}px, ${y}px, 0)`;
}

export function buildScaleTransform ({ scale3d, scale }: Styles) {
  if (!scale3d && !scale) {
    return '';
  }

  return scale3d ? `scale3d(${scale3d})` : `scale(${scale || 0})`;
}

type CreateOptions = {
  parentElement?: HTMLElement,
  cloneFrom: HTMLElement,
};

export function createElement (styles: Styles, { parentElement, cloneFrom }: CreateOptions = {}) {
  const newElement = document.createElement('div');
  const innerElement = (cloneFrom && cloneFrom.cloneNode(true));
  const parent = (parentElement || document.body);

  if (innerElement) {
    applyStyles(innerElement, {
      margin: 0,
    });

    innerElement.id = '';
    newElement.appendChild(innerElement);
  }

  applyStyles(newElement, styles);
  // transformScale(newElement, styles);
  parent && parent.appendChild(newElement);

  return newElement;
}
