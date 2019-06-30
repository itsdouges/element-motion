import { throwIf } from './log';

export const standard = () => 'cubic-bezier(0.4, 0.0, 0.2, 1)';

export const accelerate = () => 'cubic-bezier(0.4, 0.0, 1, 1)';

export const decelerate = () => 'cubic-bezier(0.0, 0.0, 0.2, 1)';

const extractBezier = (curve: string): number[] => {
  throwIf(
    curve.indexOf('cubic-bezier') === -1,
    `Expected CSS3 bezier curve e.g. "cubic-bezier(0.4, 0.0, 1, 1)"`
  );

  const matches = curve.match(/\d?\.?\d/g);
  if (matches) {
    return matches.map(Number);
  }

  return [];
};

export const bezierToFunc = (curve: string, duration: number) => {
  const [x1, y1, x2, y2] = extractBezier(curve);
  const epsilon = 1000 / 60 / duration / 4;

  const curveX = (t: number): number => {
    const v = 1 - t;
    return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
  };

  const curveY = (t: number): number => {
    const v = 1 - t;
    return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
  };

  return (t: number): number => {
    const x = t;
    let t0 = 0;
    let t1 = 1;
    let t2 = x;
    let x3 = 0;

    while (t0 < t1) {
      x3 = curveX(t2);
      if (Math.abs(x3 - x) < epsilon) {
        return curveY(t2);
      }

      if (x > x3) {
        t0 = t2;
      } else {
        t1 = t2;
      }

      t2 = (t1 - t0) * 0.5 + t0;
    }

    // Failure
    return curveY(t2);
  };
};
