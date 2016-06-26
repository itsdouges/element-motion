/* eslint no-param-reassign:0, no-unused-expressions:0 */
import {
  createElement,
  applyStyles,
  transformTranslate,
  transformScale,
} from 'dom';

export default function apply (element, { options, from, to }, {
  onStart,
  onFinish,
  delay = 1,
  duration = 0.5,
  cleanup,
}) {
  let target;

  if (options.newElement) {
    target = createElement(from, {
      parentElement: options.createInBody ? document.body : element.parentElement,
    });
  } else if (options.cloneElement) {
    target = createElement(from, {
      cloneFrom: element,
      parentElement: options.createInBody ? document.body : element.parentElement,
    });
  } else {
    target = element;
  }

  if (onStart) {
    onStart(target);
    onStart = undefined;
  }

  const transitionEndEvent = () => {
    target.removeEventListener('transitionend', transitionEndEvent, false);
    if (onFinish) {
      onFinish(target);
      onFinish = undefined;
    }

    if (cleanup) {
      target.parentElement.removeChild(target);
    }

    if (options.resetHeightOnFinish) {
      applyStyles(target, {
        height: 'auto',
        width: 'auto',
      });
    }
  };

  target.style.transition = options.transitions
    .map((transition) => `${transition} ${duration}s`)
    .join(',');

  target.addEventListener('transitionend', transitionEndEvent, false);

  if (options.immediatelyApplyFrom) {
    if (options.applyStyles) {
      applyStyles(target, from);
    }
  }

  const transition = () => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        if (options.applyTranslateTransform) {
          transformTranslate(target, {
            x: to.left - from.left,
            y: to.top - from.top,
          });
        }

        if (options.applyScaleTransform) {
          transformScale(target, to);
        }

        if (options.applyStyles) {
          applyStyles(target, to);
        }
      });
    }, delay);
  };

  if (options.callbackToApplyTo) {
    return transition;
  }

  return transition();
}
