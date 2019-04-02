export const combine = (t1: string, delimeter = ',') => (t2?: string | number) => {
  if (t2) {
    return `${t1}${delimeter} ${t2}`;
  }

  return t1;
};

export const zIndexStack = {
  circleExpand: 1000,
  circleShrink: 1000,
  swipe: 1000,
  move: 1000,
  fadeMove: 1001,
  concealMove: 1000,
};
