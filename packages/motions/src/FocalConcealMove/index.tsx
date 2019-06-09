import * as React from 'react';
import { css } from 'emotion';
import Collector, {
  CollectorChildrenProps,
  MotionCallback,
  CollectorActions,
  MotionData,
} from '../../../core/src/Collector';
import { recalculateElementBoundingBoxFromScroll } from '../../../core/src/lib/dom';
import noop from '../../../core/src/lib/noop';
import { standard } from '../../../core/src/lib/curves';
import { zIndexStack } from '../../../core/src/lib/style';
import { dynamic } from '../../../core/src/lib/duration';
import { Duration } from '../types';

export interface FocalConcealMoveProps extends CollectorChildrenProps {
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
}

export default class FocalConcealMove extends React.Component<FocalConcealMoveProps> {
  static defaultProps = {
    duration: 'dynamic',
    timingFunction: standard(),
    zIndex: zIndexStack.concealMove,
  };

  calculatedDuration: number = 0;

  renderMotion = (
    data: MotionData,
    options: { moveToTarget?: boolean; fadeOut?: boolean } = {}
  ) => {
    if (!data.origin.focalTargetElementBoundingBox) {
      throw new Error(`@element-motion/core
<FocalTarget /> was not found, if you haven't defined one make sure to add one as a descendant of your target Motion.`);
    }

    const { duration, timingFunction, zIndex } = this.props;
    // Scroll could have changed between unmount and this prepare step.
    const fromTargetSizeLocation = recalculateElementBoundingBoxFromScroll(
      data.origin.elementBoundingBox
    );
    this.calculatedDuration =
      duration === 'dynamic'
        ? dynamic(fromTargetSizeLocation, data.destination.elementBoundingBox)
        : duration;

    return data.origin.render({
      ref: noop,
      style: {
        zIndex,
        opacity: options.fadeOut ? 0 : 1,
        transition: `transform ${this.calculatedDuration}ms ${timingFunction}, height ${
          this.calculatedDuration
        }ms ${timingFunction}, width ${this.calculatedDuration}ms ${timingFunction}, opacity ${this
          .calculatedDuration / 2}ms ${timingFunction}`,
        position: 'absolute',
        transformOrigin: '0 0',
        willChange: 'transform, height, width',
        top: fromTargetSizeLocation.location.top,
        left: fromTargetSizeLocation.location.left,
        height: options.moveToTarget
          ? data.destination.elementBoundingBox.size.height
          : fromTargetSizeLocation.size.height,
        width: options.moveToTarget
          ? data.destination.elementBoundingBox.size.width
          : fromTargetSizeLocation.size.width,
        overflow: 'hidden',
        transform: options.moveToTarget
          ? `translate3d(${data.destination.elementBoundingBox.location.left -
              data.origin.elementBoundingBox.location.left}px, ${data.destination.elementBoundingBox
              .location.top - data.origin.elementBoundingBox.location.top}px, 0)`
          : undefined,
      },
      className: options.moveToTarget
        ? css`
            > * {
              transition: transform ${this.calculatedDuration}ms ${timingFunction};
              transform: translate3d(
                -${data.origin.focalTargetElementBoundingBox.location.left - data.origin.elementBoundingBox.location.left}px,
                -${data.origin.focalTargetElementBoundingBox.location.top - data.origin.elementBoundingBox.location.top}px,
                0
              );
            }
          `
        : undefined,
    });
  };

  beforeAnimate: MotionCallback = (data, onFinish) => {
    onFinish();
    return this.renderMotion(data);
  };

  animate: MotionCallback = (data, onFinish) => {
    setTimeout(onFinish, this.calculatedDuration);

    return this.renderMotion(data, { moveToTarget: true });
  };

  afterAnimate: MotionCallback = (data, onFinish, setChildProps) => {
    setChildProps({
      style: () => ({
        opacity: 1,
      }),
    });

    setTimeout(onFinish, 100);

    return this.renderMotion(data, { moveToTarget: true, fadeOut: true });
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
            afterAnimate: this.afterAnimate,
          },
        }}
      >
        {children}
      </Collector>
    );
  }
}
