import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
} from '../../Collector';
import * as math from '../../lib/math';
import { recalculateElementBoundingBoxFromScroll } from '../../lib/dom';
import { standard } from '../../lib/curves';
import { combine, zIndexStack } from '../../lib/style';
import { Duration } from '../types';
import { dynamic } from '../../lib/duration';

export interface MoveProps extends CollectorChildrenProps {
  /**
   * How long the animation should take over {duration}ms.
   */
  duration: Duration;

  /**
   * zIndex to be applied to the moving element.
   */
  zIndex: number;

  /**
   * Timing function to be used in the transition.
   */
  timingFunction: string;

  /**
   * Will use <FocalTarget /> size and location for destination transform calculation.
   * Internally this is used for the <FocalRevealMove /> animation.
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

export default class Move extends React.Component<MoveProps> {
  static defaultProps = {
    duration: 'dynamic',
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
<FocalTarget /> was not found, if you haven't defined one make sure to add one as a descendant of your target Baba.`);
    }

    // Scroll could have changed between unmount and this prepare step.
    const originTarget = recalculateElementBoundingBoxFromScroll(data.origin.elementBoundingBox);
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
        transform: combine(prevStyles.transform, '')(
          `translate3d(${toStartXOffset}px, ${toStartYOffset}px, 0) scale3d(${math.percentageDifference(
            originTarget.size.width,
            destinationTarget.size.width
          )}, ${math.percentageDifference(
            originTarget.size.height,
            destinationTarget.size.height
          )}, 1)`
        ),
      }),
    });

    onFinish();
  };

  animate: AnimationCallback = (data, onFinish, setChildProps) => {
    const { duration, timingFunction } = this.props;

    const calculatedDuration =
      duration === 'dynamic'
        ? dynamic(data.origin.elementBoundingBox, data.destination.elementBoundingBox)
        : duration;

    setChildProps({
      style: prevStyles => ({
        ...prevStyles,
        transition: combine(
          `transform ${calculatedDuration}ms ${timingFunction}, opacity ${calculatedDuration /
            2}ms ${timingFunction}`
        )(prevStyles.transition),
        transform: 'none',
      }),
    });

    setTimeout(() => onFinish(), calculatedDuration);
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
