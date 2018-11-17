export const combine = (t1: string | string[]) => (t2?: string | string[]) => {
  if (t2) {
    const arr: string[] = [];
    return arr.concat(t1).concat(t2);
  }

  return t1;
};

export const zIndexStack = {
  circleExpand: 1000,
  circleShrink: 1000,
  move: 1000,
  fadeMove: 1001,
  concealMove: 1000,
};
