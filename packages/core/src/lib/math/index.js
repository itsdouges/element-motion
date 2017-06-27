export function calculateHypotenuse ({ width, height }) {
  const x2 = width ** 2;
  const y2 = height ** 2;

  const hypotenuse = Math.sqrt(x2 + y2);
  return Math.ceil(hypotenuse);
}

export function percentageDifference (from, to) {
  return from / to;
}
