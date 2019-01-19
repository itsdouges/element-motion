import { css, keyframes } from 'emotion';
import { ElementBoundingBox } from './dom';

interface CoverOpts {
  transformX?: boolean;
  transformY?: boolean;
}

type Point = [number, number];

export function cover(
  origin: ElementBoundingBox,
  destination: ElementBoundingBox,
  opts: CoverOpts = {}
) {
  const toStartXOffset = opts.transformX ? origin.location.left - destination.location.left : 0;
  const toStartYOffset = opts.transformY ? origin.location.top - destination.location.top : 0;

  return {
    transform: `translate3d(${toStartXOffset}px, ${toStartYOffset}px, 0) scale3d(${origin.size
      .width / destination.size.width}, ${origin.size.height / destination.size.height}, 1)`,
  };
}

const porabola = (vertex: Point, point: Point) => (percent: number): Point => {
  const [x0, y0] = vertex;
  const [x1, y1] = point;
  const y = ((y0 - y1) / (x0 - x1)) * (1 - percent / 100) + y1;
  const x = percent * ((x1 - x0) / 100) + x0;
  console.log(percent, [x, y]);
  return [x, y];
};

export function arcLeft(
  origin: ElementBoundingBox,
  destination: ElementBoundingBox,
  durationMs: number
): string {
  const translateX = origin.location.left - destination.location.left;
  const translateY = origin.location.top - destination.location.top;
  const vertex: Point = [origin.location.left, origin.location.top];
  const point: Point = [destination.location.left, destination.location.top];

  const kframes = keyframes`
      ${Array(100)
        .fill(undefined)
        .map((_, percent) => {
          const [x, y] = porabola(vertex, point)(percent);
          return `
        ${percent}% {
        transform: translate3d(${x}px, ${y}px, 0);
      }`;
        })
        .join('')}
  `;

  return css`
    animation: ${kframes} ${durationMs}ms linear;
    /* Stops the animation on the destination. */
    animation-fill-mode: forwards;
  `;
}

export function arcRight(
  origin: ElementBoundingBox,
  destination: ElementBoundingBox,
  durationMs: number
): string {
  const translateX = origin.location.left - destination.location.left;
  const translateY = origin.location.top - destination.location.top;
  const scaleX = origin.size.width / destination.size.width;
  const scaleY = origin.size.height / destination.size.height;
  const kframes = keyframes`
      0% {
        transform: translate3d(${translateX}px, ${translateY}px, 0) scale3d(${scaleX}, ${scaleY}, 1);
      }

      50% {
        transform: translate3d(0, ${translateY}px, 0) scale3d(1, 1, 1);
      }

      100% {
        transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
      }
  `;

  return css`
    animation: ${kframes} ${durationMs}ms linear;
    /* Stops the animation on the destination. */
    animation-fill-mode: forwards;
  `;
}
