/* eslint no-param-reassign:0 */

function translate (styles, { x, y }) {
  styles.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function scale (styles, { scaleX, scaleY }) {
  styles.transformOrigin = '0 0';
  styles.backfaceVisibility = 'hidden';

  const transform = `scaleX(${scaleX}) scaleY(${scaleY})`;

  if (styles.transform) {
    styles.transform = `${styles.transform} ${transform}`;
  } else {
    styles.transform = transform;
  }
}

export default function apply (element, from, to) {
  element.style.transition = 'transform 1s';

  console.log(to);

  if (to.x || to.y) {
    translate(element.style, to);
  }

  if (to.scaleX && to.scaleY) {
    scale(element.style, to);
  }
}
