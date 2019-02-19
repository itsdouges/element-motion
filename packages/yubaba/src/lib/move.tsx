import { css, keyframes } from 'emotion';
import { ElementBoundingBox } from './dom';
import { standard } from './curves';

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

type BezierPoint = [number, number];

/**
 * Taken from https://github.com/thibauts/bezier-curve.
 */
function bezier(time: number, p: [BezierPoint, BezierPoint, BezierPoint, BezierPoint]) {
  const order = p.length - 1; // curve order is number of control point - 1
  const d = p[0].length; // control point dimensionality

  // create a source vector array copy that will be
  // used to store intermediate results
  const v = p.map(point => {
    return point.slice();
  });

  // for each order reduce the control point array by updating
  // each control point with its linear interpolation to the next
  for (let i = order; i > 0; i -= 1) {
    for (let j = 0; j < order; j += 1) {
      // interpolate each component
      for (let k = 0; k < d; k += 1) {
        v[j][k] = (1 - time) * v[j][k] + time * v[j + 1][k];
      }
    }
  }

  return v[0];
}

export function arcLeft(
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

      40% {
        transform: translate3d(${translateX}px, ${translateY * 0.1}px, 0) scale3d(1, 1, 1);
      }

      60% {
        transform: translate3d(${translateX * 0.9}px, 0, 0) scale3d(1, 1, 1);
      }

      100% {
        transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
      }
  `;

  return css`
    animation: ${kframes} ${durationMs}ms ${standard()};
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
    animation: ${kframes} ${durationMs}ms ${standard()};
    /* Stops the animation on the destination. */
    animation-fill-mode: forwards;
  `;
}
