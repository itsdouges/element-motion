import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  MotionCallback,
  CollectorActions,
} from '../../../core/src/Collector';
import { recalculateElementBoundingBoxFromScroll } from '../../../core/src/lib/dom';
import { standard } from '../../../core/src/lib/curves';
import { combine, zIndexStack } from '../../../core/src/lib/style';
import { Duration } from '../types';
import { throwIf } from '../../../core/src/lib/log';
import { dynamic } from '../../../core/src/lib/duration';
import noop from '../../../core/src/lib/noop';

export interface MoveProps extends CollectorChildrenProps {
  /**
   * How long the motion should take over {duration}ms.
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
   * Internally this is used for the <FocalRevealMove /> motion.
   */
  useFocalTarget: boolean;

  /**
   * Set to false to disable transforming the origin to the X position of the destination element.
   * Defaults to true.
   */
  transformX?: boolean;

  /**
   * Set to false to disable transforming the origin to the Y position of the destination element.
   * Defaults to true.
   */
  transformY?: boolean;

  /**
   * Enables scaling of the x-axis.
   * Defaults to true.
   */
  scaleX?: boolean;

  /**
   * Enables scaling of the y-axis.
   * Defaults to true.
   */
  scaleY?: boolean;

  /**
   * Will set "position: relative" on the element during a transition.
   * Useful for creating a stacking context to position the element where you want in the stack.
   * Use "zIndex" prop to set the appropriate position in the stack.
   */
  createStackingContext?: boolean;
}

export default class Move extends React.Component<MoveProps> {
  static defaultProps = {
    duration: 'dynamic',
    timingFunction: standard(),
    zIndex: zIndexStack.move,
    useFocalTarget: false,
    transformX: true,
    transformY: true,
    scaleX: true,
    scaleY: true,
  };

  abort = noop;

  beforeAnimate: MotionCallback = (data, onFinish, setChildProps) => {
    const {
      zIndex,
      useFocalTarget,
      transformX,
      transformY,
      scaleX,
      scaleY,
      createStackingContext,
    } = this.props;

    if (process.env.NODE_ENV === 'development') {
      throwIf(
        useFocalTarget && !data.destination.focalTargetElementBoundingBox,
        `<FocalTarget /> was not found, if you haven't defined one make sure to add one as a descendant of your target Motion.`
      );
    }

    // Scroll could have changed between unmount and this prepare step.
    const originTarget = recalculateElementBoundingBoxFromScroll(data.origin.elementBoundingBox);
    const destinationTarget =
      useFocalTarget && data.destination.focalTargetElementBoundingBox
        ? data.destination.focalTargetElementBoundingBox
        : data.destination.elementBoundingBox;
    const translateToX = transformX
      ? originTarget.location.left - data.destination.elementBoundingBox.location.left
      : 0;
    const translateToY = transformY
      ? originTarget.location.top - data.destination.elementBoundingBox.location.top
      : 0;
    const scaleToX = scaleX ? originTarget.size.width / destinationTarget.size.width : 1;
    const scaleToY = scaleY ? originTarget.size.height / destinationTarget.size.height : 1;

    setChildProps({
      style: prevStyles => ({
        ...prevStyles,
        zIndex,
        position: createStackingContext ? 'relative' : undefined,
        transformOrigin: '0 0',
        visibility: 'visible',
        willChange: combine('transform')(prevStyles.willChange),
        transform: combine(prevStyles.transform, '')(
          `translate3d(${translateToX}px, ${translateToY}px, 0) scale3d(${scaleToX}, ${scaleToY}, 1)`
        ),
      }),
    });

    onFinish();
  };

  animate: MotionCallback = (data, onFinish, setChildProps) => {
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

    const id = window.setTimeout(() => onFinish(), calculatedDuration);
    this.abort = () => {
      window.clearTimeout(id);
    };
  };

  render() {
    const { children } = this.props;

    return (
      <Collector
        data={{
          action: CollectorActions.motion,
          payload: {
            beforeAnimate: this.beforeAnimate,
            animate: this.animate,
            abort: this.abort,
          },
        }}
      >
        {children}
      </Collector>
    );
  }
}
