import { ElementBoundingBox, getWindowDimensions } from '../dom';
import { calculateHypotenuse, clamp } from '../math';

/**
 * Element [0] is the expanding time.
 * Element [1] is the collapsing time.
 */
const distanceTiming = {
  medium: [250, 200],
  large: [300, 250],
};

const MEDIUM_TRAVEL_PERCENT = 39;

/**
 * @hidden
 */
export function getScreenSizeWeight(width: number) {
  const weightedWidth = Number((width / 900).toFixed(2));
  return clamp(weightedWidth, 1, 1.5);
}

/**
 * Will return a number bounded around how far the element had to travel which will
 * always be a whole number.
 *
 * According to google via https://material.io/design/motion/speed.html#duration:
 * - Small (travelled 0-5% of the screen) = 100ms
 * - Medium (travelled 6-39% of the screen) = 250ms expand, 200ms collapse
 * - Large (travelled 40%+ of the screen) = 300ms expand, 250ms collapse
 *
 * If the origin is smaller than the destination, it will use expand time.
 * Else it will use collapse time.
 *
 * @param origin ElementBoundingBox
 * @param destination ElementBoundingBox
 */
export function dynamic(origin: ElementBoundingBox, destination: ElementBoundingBox): number {
  const screenDimensions = getWindowDimensions();
  const screenHypotenuse = calculateHypotenuse(screenDimensions);
  const distanceBetweenElements = calculateHypotenuse({
    width: origin.location.left - destination.location.left,
    height: origin.location.top - destination.location.top,
  });
  const sizeDifference = calculateHypotenuse(destination.size) - calculateHypotenuse(origin.size);
  const percentOfScreenTravelled = Math.ceil(
    ((sizeDifference + distanceBetweenElements) / screenHypotenuse) * 100
  );
  // If size difference is greater than zero then we are expanding.
  // If expanding we dip into the first element of timing. Else the second.
  const timingIndex = sizeDifference >= 0 ? 0 : 1;
  // We use the screen size to determine the weight, which in turn is used
  // in the final calculation of the duration.
  const screenWeight = getScreenSizeWeight(screenDimensions.width);

  let duration;

  if (percentOfScreenTravelled <= MEDIUM_TRAVEL_PERCENT) {
    duration = distanceTiming.medium[timingIndex];
  } else {
    duration = distanceTiming.large[timingIndex];
  }

  return Math.ceil(duration * screenWeight);
}
