import { calculateHypotenuse } from '../math';

export function calculateElementSize (element) {
  return {
    width: element.clientWidth,
    height: element.clientHeight,
  };
}

export function calculateElementLocation (element, calculateViewportScrollOffset) {
  // const rect = element.getBoundingClientRect();
  // const offsetY = calculateViewportScrollOffset ? window.scrollY : 0;
  // const offsetX = calculateViewportScrollOffset ? window.scrollX : 0;

  return {
    left: element.offsetLeft, //rect.left + offsetX,
    top: element.offsetTop, //rect.top + offsetY,
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

/* eslint no-param-reassign:0 */
export function applyStyles (element, styles) {
  Object.keys(styles).forEach((key) => {
    element.style[key] = styles[key];
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

export function transformScale (element, { scale, transformOrigin }) {
  if (!scale) {
    return;
  }

  const scaleModifier = `scale(${scale})`;
  let transform = element.style.transform;
  if (transform.indexOf('scale') > -1) {
    transform = transform.replace(/scale\(.*\)/, scaleModifier);
  } else if (transform.length > 0) {
    transform = `${element.style.transform} scale(${scale})`;
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

  applyStyles(newElement, {
    ...styles,
  });

  transformScale(newElement, styles);

  parentElement.appendChild(newElement);
  return newElement;
}
