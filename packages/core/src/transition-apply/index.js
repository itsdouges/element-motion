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

export default function apply (element, calculations, {
  onStart,
  onFinish,
  delay = 1,
  duration = 0.5,
  cleanup,
}) {
  let target;

  if (calculations.newElement) {
    target = createElement(calculations.from, {
      parentElement: element.parentElement,
    });
  } else if (calculations.cloneElement) {
    target = createElement(calculations.from, {
      cloneFrom: element,
      parentElement: element.parentElement,
    });
  } else {
    target = element;
  }

  const { to, from } = calculations;
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

    if (cleanup && (calculations.newElement || calculations.cloneElement)) {
      target.parentElement.removeChild(target);
    }

    if (calculations.resetHeightOnFinish) {
      applyStyles(target, {
        height: 'auto',
        width: 'auto',
      });
    }
  };

  target.style.transition = `transform ${duration}s, width ${duration}s, height ${duration}s`;
  target.addEventListener('transitionend', transitionEndEvent, false);

  if (calculations.immediatelyApplyFrom) {
    applyStyles(target, calculations.from);
  }

  // TODO: Can we avoid this somehow?
  setTimeout(() => {
    if ((to.left && from.left) || (to.top && from.top)) {
      transformTranslate(target, {
        x: to.left - from.left,
        y: to.top - from.top,
      });
    }

    if (to.scale) {
      transformScale(target, to);
    }
  }, delay);

  if (calculations.callbackToApplyTo) {
    return () => {
      applyStyles(target, calculations.to);
    };
  }

  return undefined;
}
