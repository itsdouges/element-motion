import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
} from '../../Collector';
import * as math from '../../lib/math';
import { recalculateLocationFromScroll } from '../../lib/dom';
import { standard } from '../../lib/curves';
import { combine, zIndexStack } from '../../lib/style';

export interface MoveProps extends CollectorChildrenProps {
  /**
   * How long the animation should take over {duration}ms.
   */
  duration: number;

  /**
   * zIndex to be applied to the moving element.
   */
  zIndex: number;

  /**
   * Timing function to be used in the transition, see: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
   */
  timingFunction: string;

  /**
   * Will use <FocalTarget /> size and location for destination transform calculation.
   * Internally this is used for the <RevealMove /> animation.
   */
  useFocalTarget: boolean;

  /**
   * Set to false to disable transforming the origin to the X position of the destination element.
   * Defaults to true.
   */
  transformX?: boolean;

  /**
   * Set to false to disable transforming the origin to the Y position of the destination element.
   * Defaults to `true`.
   */
  transformY?: boolean;
}

/**
 * ## Move
 *
 * Move will animate the end target from the start target, to the end position.
 * It will match both size and position of the start target.
 *
 * Note that it will not fade between elements, so this animation really only looks good
 * when transitioning the same (or very similar) element.
 *
 * If you want to transition distinct elements I'd suggestion using CrossFadeMove, however
 * it is slightly more expensive to animate.
 */
export default class Move extends React.Component<MoveProps> {
  static defaultProps = {
    duration: 500,
    timingFunction: standard(),
    zIndex: zIndexStack.move,
    useFocalTarget: false,
    transformX: true,
    transformY: true,
  };

  beforeAnimate: AnimationCallback = (data, onFinish, setChildProps) => {
    const { zIndex, useFocalTarget, transformX, transformY } = this.props;

    if (useFocalTarget && !data.destination.focalTargetElementBoundingBox) {
      throw new Error(`yubaba
targetElement was missing.`);
    }

    // Scroll could have changed between unmount and this prepare step.
    const originTarget = recalculateLocationFromScroll(data.origin.elementBoundingBox);
    const destinationTarget =
      useFocalTarget && data.destination.focalTargetElementBoundingBox
        ? data.destination.focalTargetElementBoundingBox
        : data.destination.elementBoundingBox;
    const toStartXOffset = transformX
      ? originTarget.location.left - data.destination.elementBoundingBox.location.left
      : 0;
    const toStartYOffset = transformY
      ? originTarget.location.top - data.destination.elementBoundingBox.location.top
      : 0;

    setChildProps({
      style: prevStyles => ({
        ...prevStyles,
        zIndex,
        opacity: 1,
        transformOrigin: '0 0',
        visibility: 'visible',
        willChange: combine('transform')(prevStyles.willChange),
        transform: `translate3d(${toStartXOffset}px, ${toStartYOffset}px, 0) scale3d(${math.percentageDifference(
          originTarget.size.width,
          destinationTarget.size.width
        )}, ${math.percentageDifference(
          originTarget.size.height,
          destinationTarget.size.height
        )}, 1)`,
      }),
    });

    onFinish();
  };

  animate: AnimationCallback = (_, onFinish, setChildProps) => {
    const { duration, timingFunction } = this.props;

    setChildProps({
      style: prevStyles => ({
        ...prevStyles,
        transition: combine(
          `transform ${duration}ms ${timingFunction}, opacity ${duration / 2}ms ${timingFunction}`
        )(prevStyles.transition),
        transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
      }),
    });

    setTimeout(() => onFinish(), duration);
  };

  render() {
    const { children } = this.props;

    return (
      <Collector
        data={{
          action: CollectorActions.animation,
          payload: {
            beforeAnimate: this.beforeAnimate,
            animate: this.animate,
          },
        }}
      >
        {children}
      </Collector>
    );
  }
}
