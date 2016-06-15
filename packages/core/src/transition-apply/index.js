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
    padding: '1px',
    webkitBackgroundClip: 'content-box',
    transform,
  });
}

export default function apply (element, calculations, {
  onStart,
  onFinish,
  duration = 1,
}) {
  const priorityElement = calculations.newElement ? createElement(calculations.from, {
    parentElement: element.parentElement
    ,
  }) : element;

  const { to, from } = calculations;
  if (onStart) {
    onStart();
    onStart = undefined;
  }

  const finish = () => {
    priorityElement.removeEventListener('transitionend', finish, false);
    if (onFinish) {
      onFinish();
      onFinish = undefined;
    }
  };

  priorityElement.style.transition = `transform ${duration}s`;
  priorityElement.addEventListener('transitionend', finish, false);

  // Can we avoid this somehow?
  setTimeout(() => {
    if ((to.left && from.left) || (to.top && from.top)) {
      transformTranslate(priorityElement, {
        x: to.left - from.left,
        y: to.top - from.top,
      });
    }

    if (to.scale) {
      transformScale(priorityElement, to);
    }
  }, 10);
}
