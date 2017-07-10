import { calculateHypotenuse } from '../math';

export function calculateElementSize (element) {
  return {
    width: element.clientWidth,
    height: element.clientHeight,
  };
}

export function getDocumentScroll () {
  const scrollTop = document.documentElement.scrollTop
    ? document.documentElement.scrollTop
    : document.body.scrollTop;

  const scrollLeft = document.documentElement.scrollLeft
    ? document.documentElement.scrollLeft
    : document.body.scrollLeft;

  return {
    scrollTop,
    scrollLeft,
  };
}

export function calculateElementLocation (element) {
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

export function calculateElementCircumcircle (element) {
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

const addPxIfNeeded = (key, value) => {
  switch (key) {
    case 'width':
    case 'height':
    case 'top':
    case 'left':
      return typeof value === 'number' ? `${value}px` : value;

    default:
      return value;
  }
};

/* eslint no-param-reassign:0 */
export function applyStyles (element, styles) {
  Object.keys(styles).forEach((key) => {
    element.style[key] = addPxIfNeeded(key, styles[key]);
  });
}

export function calculateElementCenterInViewport (element) {
  const location = calculateElementLocation(element);
  const size = calculateElementSize(element);

  return {
    top: location.top + Math.ceil(size.width / 2),
    left: location.left - Math.ceil(size.height / 2),
  };
}

export function transformTranslate (element, { x, y }) {
  if (!x || !y) {
    return;
  }

  applyStyles(element, {
    transform: `translate3d(${x}px, ${y}px, 0)`,
  });
}

export function transformScale (element, { scale3d, scale, transformOrigin }) {
  if (!scale3d && !scale) {
    return;
  }

  // scale3d takes presedence
  const scaleModifier = scale3d ? `scale3d(${scale3d})` : `scale(${scale})`;

  let transform = element.style.transform;
  if (transform.indexOf('scale') > -1) {
    // replace any prexisting transform with a new one.
    transform = transform.replace(/scale\(.*\)|scale3d\(.*\)/, scaleModifier);
  } else if (transform.length > 0) {
    transform = `${element.style.transform} ${scaleModifier}`;
  } else {
    transform = scaleModifier;
  }

  applyStyles(element, {
    transformOrigin,
    backfaceVisibility: 'hidden',
    webkitBackgroundClip: 'content-box',
    transform,
  });
}

// eslint-disable-next-line
function logStyle (element, styles) {
  return Object.keys(styles).reduce((obj, key) => ({
    ...obj,
    [key]: element.style[key],
  }), {});
}

export function createElement (styles, { parentElement = document.body, cloneFrom } = {}) {
  const newElement = document.createElement('div');
  const innerElement = (cloneFrom && cloneFrom.cloneNode(true));
  if (innerElement) {
    applyStyles(innerElement, {
      margin: 0,
    });

    innerElement.id = '';
    newElement.appendChild(innerElement);
  }

  applyStyles(newElement, styles);
  transformScale(newElement, styles);
  parentElement.appendChild(newElement);

  return newElement;
}
