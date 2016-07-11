export function calculateHypotenuse ({ width, height }) {
  const x2 = Math.pow(width, 2);
  const y2 = Math.pow(height, 2);

  const hypotenuse = Math.sqrt(x2 + y2);
  return Math.ceil(hypotenuse);
}

export function percentageDifference (from, to) {
  return from / to;
}
