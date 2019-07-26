import { bezierToFunc } from './curves';

/**
 * Key is the percentage.
 * First element is the property name.
 * Second element is the property value.
 */
export interface KeyframeDefinition {
  // TODO: This is currently only allowing one property per property.
  // e.g: transform: scale(1);
  // We should change it to support any amount of properties.
  [key: number]: [string, string];
}

export const keyframes = (duration: number, bezierCurve: string) => {
  const frameTime = 1000 / 60;
  const nFrames = Math.round(duration / frameTime);
  const percentIncrement = 100 / nFrames;
  const timingFunction = bezierToFunc(bezierCurve, duration);

  return (callback: (step: number) => [string, string, string]) => {
    const animation = {};
    const inverseAnimation = {};

    for (let i = 0; i <= nFrames; i += 1) {
      const step = Number(timingFunction(i / nFrames).toFixed(5));
      const percentage = Number((i * percentIncrement).toFixed(5));
      const [property, animationKeyframe, animationInverseKeyframe] = callback(step);
      animation[percentage] = [property, animationKeyframe];
      inverseAnimation[percentage] = [property, animationInverseKeyframe];
    }

    return { animation, inverseAnimation };
  };
};

/**
 * Will compose keyframe percentages together.
 */
export const composeKeyframes = (
  prev: KeyframeDefinition | undefined,
  next: KeyframeDefinition,
  delimeter: string = ' '
): KeyframeDefinition => {
  if (!prev) {
    return next;
  }

  const composed: KeyframeDefinition = {
    ...prev,
  };

  Object.keys(next).forEach(key => {
    const [prevProperty, prevValue] = composed[key];
    const [nextProperty, nextValue] = next[key];

    if (prevProperty === nextProperty) {
      composed[key] = [prevProperty, `${prevValue}${delimeter}${nextValue}`];
    }
  });

  return composed;
};
