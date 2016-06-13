/* eslint no-param-reassign:0, no-unused-expressions:0 */
import { clone } from 'dom';

function translate (styles, { x, y }) {
  styles.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function scale (styles, { scaleX, scaleY, transformOrigin }) {
  styles.transformOrigin = transformOrigin;
  styles.backfaceVisibility = 'hidden';

  const transform = `scaleX(${scaleX}) scaleY(${scaleY})`;

  if (styles.transform) {
    styles.transform = `${styles.transform} ${transform}`;
  } else {
    styles.transform = transform;
  }
}

export default function apply (element, calculations, {
  onStart,
  onFinish,
  duration = 1,
}) {
  const priorityElement = calculations.newElement ? clone(element) : element;

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

  window.requestAnimationFrame(() => {
    if ((to.left && from.left) || (to.top && from.top)) {
      translate(priorityElement.style, {
        x: to.left - from.left,
        y: to.top - from.top,
      });
    }

    if (to.scaleX && to.scaleY) {
      scale(priorityElement.style, to);
    }
  });
}
