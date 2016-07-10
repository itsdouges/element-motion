/* eslint no-param-reassign:0, no-unused-expressions:0 */
import {
  createElement,
  applyStyles,
  transformTranslate,
  transformScale,
} from 'dom';

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
      applyStyles(element, from);
    }
  }
}

export default function apply (element, { options, from, to }, {
  onStart,
  onFinish,
  delay = 1,
  duration = 0.5,
  autoCleanup,
}, {
  resolve,
}) {
  const target = setTarget(element, options, from);

  setEvents(target, {
    onStart,
    onFinish,
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

  const transition = (toOverride) => {
    const toOptions = toOverride || to;

    setTimeout(() => {
      requestAnimationFrame(() => {
        if (options.applyTranslateTransform) {
          transformTranslate(target, {
            x: toOptions.left - from.left,
            y: toOptions.top - from.top,
          });
        }

        if (options.applyScaleTransform) {
          transformScale(target, toOptions);
        }

        if (options.applyStyles) {
          applyStyles(target, toOptions);
        }
      });
    }, delay);
  };

  return transition;
}
