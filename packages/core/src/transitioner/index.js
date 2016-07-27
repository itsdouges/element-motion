/* eslint no-param-reassign:0, no-unused-expressions:0 */
import {
  createElement,
  applyStyles,
  transformTranslate,
  transformScale,
} from 'lib/dom';

function setTarget (element, { newElement, cloneElement, createInBody }, from) {
  let target;

  if (newElement) {
    target = createElement(from, {
      parentElement: createInBody ? document.body : element.parentElement,
    });
  } else if (cloneElement) {
    target = createElement(from, {
      cloneFrom: element,
      parentElement: createInBody ? document.body : element.parentElement,
    });
  } else {
    target = element;
  }

  return target;
}

function setEvents (element, { onStart, resolve, autoCleanup, resetHeightOnFinish }) {
  if (onStart) {
    onStart({
      target: element,
    });
  }

  const cleanup = () => {
    element.parentElement.removeChild(element);
  };

  const transitionEndEvent = () => {
    element.removeEventListener('transitionend', transitionEndEvent, false);

    if (resetHeightOnFinish) {
      applyStyles(element, {
        height: 'auto',
        width: 'auto',
      });
    }

    if (autoCleanup) {
      cleanup();
    }

    return resolve({
      target: element,
      cleanup,
    });
  };

  element.addEventListener('transitionend', transitionEndEvent, false);
}

function setInitialStyles (element, {
  from,
  immediatelyApplyFrom,
  styleApply,
  duration,
  transitions,
}) {
  element.style.transition = transitions
    .map((transition) => `${transition} ${duration}s`)
    .join(',');

  if (immediatelyApplyFrom) {
    if (styleApply) {
      requestAnimationFrame(() => {
        applyStyles(element, from);
      });
    }
  }
}

function transitionFactory (element, {
  applyTranslateTransform,
  applyScaleTransform,
  applyStyle,
  delay,
  from,
}) {
  return (to) => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        if (applyTranslateTransform) {
          transformTranslate(element, {
            x: to.left - from.left,
            y: to.top - from.top,
          });
        }

        if (applyScaleTransform) {
          transformScale(element, to);
        }

        if (applyStyle) {
          applyStyles(element, to);
        }
      });
    }, delay);
  };
}

export default function transitioner (element, {
  transition: {
    from,
    options,
  },
  options: {
    onStart,
    delay = 5,
    duration = 0.5,
    autoCleanup,
  },
  resolve,
}) {
  const target = setTarget(element, options, from);

  setEvents(target, {
    onStart,
    autoCleanup,
    resetHeightOnFinish: options.resetHeightOnFinish,
    resolve,
  });

  setInitialStyles(target, {
    immediatelyApplyFrom: options.immediatelyApplyFrom,
    styleApply: options.applyStyles,
    transitions: options.transitions,
    duration,
    from,
  });

  return transitionFactory(target, {
    from,
    applyTranslateTransform: options.applyTranslateTransform,
    applyScaleTransform: options.applyScaleTransform,
    applyStyle: options.applyStyles,
    delay,
  });
}
