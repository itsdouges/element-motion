import {
  createElement,
  applyStyles,
  transformTranslate,
  transformScale,
} from './lib/dom';

// NOTE: createInBody is forced to be true for now as the node in react is immediately removed
// after the transition begins. If it's in that contain, the transition element is removed too!
function setTarget (element, { newElement, cloneElement, createInBody = true }, fromElement) {
  let target;

  if (newElement) {
    target = createElement(fromElement, {
      parentElement: createInBody ? document.body : element.parentElement,
    });
  } else if (cloneElement) {
    target = createElement(fromElement, {
      cloneFrom: element,
      parentElement: createInBody ? document.body : element.parentElement,
    });
  } else {
    target = element;
  }

  return target;
}

function setEvents (element, { onStart, resolve, autoCleanup, name, resetHeightOnFinish }) {
  if (onStart) {
    onStart({
      target: element,
    });
  }

  let transitionCleaned = false;

  const cleanup = () => {
    if (transitionCleaned) { return; }
    transitionCleaned = true;
    // This was erroring. Why?
    element.parentElement && element.parentElement.removeChild(element);
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
      transition: name,
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
  // eslint-disable-next-line no-param-reassign
  element.style.transition = transitions
    .map((transition) => `${transition} ${duration}s`)
    .join(',');

  if (immediatelyApplyFrom && styleApply) {
    requestAnimationFrame(() => {
      applyStyles(element, from);
    });
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
    name,
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
    name,
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
