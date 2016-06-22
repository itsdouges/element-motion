/* eslint no-param-reassign:0, no-unused-expressions:0 */
import { createElement, applyStyles } from 'dom';

function transformTranslate (element, { x, y }) {
  applyStyles(element, {
    transform: `translate3d(${x}px, ${y}px, 0)`,
  });
}

function transformScale (element, { scale, transformOrigin }) {
  const transform = `${element.style.transform} scale(${scale})`;

  applyStyles(element, {
    transformOrigin,
    backfaceVisibility: 'hidden',
    outline: '1px solid transparent',
    webkitBackgroundClip: 'content-box',
    transform,
  });
}

export default function apply (element, { options, from, to }, {
  onStart,
  onFinish,
  delay = 0,
  duration = 0.5,
  cleanup,
}) {
  let target;

  if (options.newElement) {
    target = createElement(from, {
      parentElement: element.parentElement,
    });
  } else if (options.cloneElement) {
    target = createElement(from, {
      cloneFrom: element,
      parentElement: element.parentElement,
    });
  } else {
    target = element;
  }

  if (onStart) {
    onStart();
    onStart = undefined;
  }

  const transitionEndEvent = () => {
    target.removeEventListener('transitionend', transitionEndEvent, false);
    if (onFinish) {
      onFinish();
      onFinish = undefined;
    }

    if (cleanup && (options.newElement || options.cloneElement)) {
      target.parentElement.removeChild(target);
    }

    if (options.resetHeightOnFinish) {
      applyStyles(target, {
        height: 'auto',
        width: 'auto',
      });
    }
  };

  target.style.transition = `transform ${duration}s, width ${duration}s, height ${duration}s`;
  target.addEventListener('transitionend', transitionEndEvent, false);

  if (options.immediatelyApplyFrom) {
    applyStyles(target, from);
  }

  const transition = () => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        if ((to.left && from.left) || (to.top && from.top)) {
          transformTranslate(target, {
            x: to.left - from.left,
            y: to.top - from.top,
          });
        }

        if (to.scale) {
          transformScale(target, to);
        }

        if (!options.ignoreApplyStyles) {
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
