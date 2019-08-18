export const isReducedMotion = () => {
  const { matches } = window.matchMedia('(prefers-reduced-motion: reduce)');
  return matches;
};
