// @flow

import type { Styles } from './lib/dom';

import { createElement } from './lib/dom';

function getTargetElement (element, { newElement, cloneElement, fromStyles }) {
  let target;

  if (newElement) {
    target = createElement(fromStyles, {
      parentElement: document.body,
    });
  } else if (cloneElement) {
    target = createElement(fromStyles, {
      cloneFrom: element,
      parentElement: document.body,
    });
  } else {
    target = element;
  }

  return target;
}

export type AnimationKeyframes = Array<Styles>;

function prepareAnimation (element, { delay, duration, resolvePromise, animationName, onStart }) {
  let cleanedUp = false;

  return (animateTo: { keyframes: AnimationKeyframes }) => {
    if (onStart) {
      onStart({
        animationName,
        target: element,
      });
    }

    // $FlowFixMe - animate isn't on HTMLElement atm. We should fix this.
    const animation = element.animate(animateTo.keyframes, {
      delay,
      duration,
      easing: 'ease-in-out',
      fill: 'forwards',
    });

    animation.onfinish = () => {
      return resolvePromise({
        animationName,
        target: element,
        cleanup: () => {
          if (cleanedUp) {
            return;
          }

          cleanedUp = true;
          element.parentElement && element.parentElement.removeChild(element);
        },
      });
    };
  };
}

type AnimationOptions = {
  animation: {
    name: string,
    options: Object,
    from: Styles,
  },
  options: {
    duration: number,
    delay?: number,
    onStart?: ({
      animationName: string,
      target: HTMLElement,
    }) => {},
  },
  resolve: ({
    animationName: string,
    target: HTMLElement,
    cleanup: Function,
  }) => {};
};

export default function animator (element: HTMLElement, { animation, resolve, options }: AnimationOptions) {
  const target = getTargetElement(element, {
    ...animation.options,
    fromStyles: animation.from,
  });

  return prepareAnimation(target, {
    delay: options.delay,
    duration: options.duration || 500,
    onStart: options.onStart,
    resolvePromise: resolve,
    animationName: animation.name,
  });
}
