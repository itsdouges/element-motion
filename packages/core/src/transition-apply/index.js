/* eslint no-param-reassign:0, no-unused-expressions:0 */

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

export default function apply (element, from, to, {
  onStart,
  onFinish,
  duration = 1,
}) {
  if (onStart) {
    onStart();
  }

  const finish = () => {
    element.removeEventListener('transitionend', finish, false);
    if (onFinish) {
      onFinish();
    }
  };

  element.style.transition = `transform ${duration}s`;
  element.addEventListener('transitionend', finish, false);

  if (to.x || to.y) {
    translate(element.style, to);
  }

  if (to.scaleX && to.scaleY) {
    scale(element.style, to);
  }
}
