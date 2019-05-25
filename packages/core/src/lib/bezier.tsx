/* eslint-disable no-restricted-properties */
import { Point } from './types';

export const bezier = (start: Point, end: Point, controlPoint1: Point, controlPoint2: Point) => {
  const cX = 3 * (controlPoint1.x - start.x);
  const bX = 3 * (controlPoint2.x - controlPoint1.x) - cX;
  const aX = end.x - start.x - cX - bX;

  const cY = 3 * (controlPoint1.y - start.y);
  const bY = 3 * (controlPoint2.y - controlPoint1.y) - cY;
  const aY = end.y - start.y - cY - bY;

  return (time: number): Point => {
    const x = aX * Math.pow(time, 3) + bX * Math.pow(time, 2) + cX * time + start.x;
    const y = aY * Math.pow(time, 3) + bY * Math.pow(time, 2) + cY * time + start.y;

    return { x, y };
  };
};
