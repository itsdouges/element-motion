export const combine = (newValue: string = '', delimeter = ',') => (
  prevValue?: string | number
) => {
  if (prevValue) {
    return `${newValue}${delimeter} ${prevValue}`;
  }
  return newValue;
};

export const zIndexStack = {
  circleExpand: 1000,
  circleShrink: 1000,
  swipe: 1000,
  move: 1000,
  fadeMove: 1001,
  concealMove: 1000,
};
