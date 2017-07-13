import { createElement } from './lib/dom';

// NOTE: createInBody is forced to be true for now as the node in react is immediately removed
// after the transition begins. If it's in that contain, the transition element is removed too!
function getTargetElement (element, { newElement, cloneElement, createInBody = true }, fromStyles) {
  let target;

  if (newElement) {
    target = createElement(fromStyles, {
      parentElement: createInBody ? document.body : element.parentElement,
    });
  } else if (cloneElement) {
    target = createElement(fromStyles, {
      cloneFrom: element,
      parentElement: createInBody ? document.body : element.parentElement,
    });
  } else {
    target = element;
  }

  return target;
}

function prepareAnimation (element, { delay, duration, resolvePromise, transitionName, onStart }) {
  let cleanedUp = false;

  return (transitionTo) => {
    if (onStart) {
      onStart({
        transition: transitionName,
        target: element,
      });
    }

    const animation = element.animate(transitionTo.keyframes, {
      delay,
      duration,
      easing: 'ease-in-out',
      fill: 'forwards',
    });

    animation.onfinish = () => {
      return resolvePromise({
        transition: transitionName,
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

export default function transitioner (element, {
  transition,
  resolve,
  options: {
    onStart,
    delay,
    duration = 500,
  },
}) {
  const target = getTargetElement(element, transition.options || {}, transition.from || {});

  return prepareAnimation(target, {
    transitionName: transition.name,
    resolvePromise: resolve,
    duration,
    delay,
    onStart,
  });
}
