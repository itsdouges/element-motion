import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  MotionCallback,
  CollectorActions,
  MotionData,
} from '../../../core/src/Collector';
import { calculateHypotenuse } from '../../../core/src/lib/math';
import {
  calculateWindowCentre,
  calculateElementCenterInViewport,
  recalculateElementBoundingBoxFromScroll,
  getWindowDimensions,
} from '../../../core/src/lib/dom';
import SimpleKeyframe from '../SimpleKeyframe';
import { standard, accelerate } from '../../../core/src/lib/curves';
import { zIndexStack } from '../../../core/src/lib/style';
import { dynamic } from '../../../core/src/lib/duration';
import { Duration } from '../types';

export interface CircleExpandProps extends CollectorChildrenProps {
  /**
   * Background, same usage as usual css.
   */
  background: string;

  /**
   * How long the motion should take over {duration}ms.
   */
  duration: Duration;

  /**
   * zIndex to be applied to the moving element.
   */
  zIndex: number;
}

export default class CircleExpand extends React.Component<CircleExpandProps> {
  static defaultProps = {
    duration: 'dynamic',
    zIndex: zIndexStack.circleExpand,
  };

  renderMotion = (data: MotionData, options: { step?: number; onFinish: () => void }) => {
    const { duration, background, zIndex } = this.props;

    // Scroll could have changed between unmount and this prepare step, let's recalculate just in case.
    const originBoundingBox = recalculateElementBoundingBoxFromScroll(
      data.origin.elementBoundingBox
    );
    const minSize = Math.min(originBoundingBox.size.width, originBoundingBox.size.height);
    const fromTargetHypotenuse = calculateHypotenuse(originBoundingBox.size);
    const fromTargetCenterInViewport = calculateElementCenterInViewport(originBoundingBox);
    const viewportCenter = calculateWindowCentre();
    const windowDimensions = getWindowDimensions();
    const windowHypotenuse = calculateHypotenuse(windowDimensions);
    const difference = {
      width: viewportCenter.left - fromTargetCenterInViewport.left,
      height: viewportCenter.top - fromTargetCenterInViewport.top,
    };
    const hypotenuseDifference = calculateHypotenuse(difference);
    const scale = Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize);
    const calculatedDuration =
      duration === 'dynamic'
        ? dynamic(originBoundingBox, {
            location: { left: 0, top: 0 },
            size: windowDimensions,
            raw: {} as any,
          })
        : duration;

    return (
      <SimpleKeyframe
        style={{
          zIndex,
          left:
            originBoundingBox.location.left -
            (fromTargetHypotenuse - originBoundingBox.size.width) / 2,
          top:
            originBoundingBox.location.top -
            (fromTargetHypotenuse - originBoundingBox.size.height) / 2,
          width: fromTargetHypotenuse,
          height: fromTargetHypotenuse,
          borderRadius: '50%',
          position: 'absolute',
          background,
          transition: `transform ${accelerate()} ${calculatedDuration}ms, opacity ${standard()} ${calculatedDuration /
            2}ms`,
          transform: 'scale(1)',
          willChange: 'transform',
          opacity: 1,
        }}
        keyframes={[
          {
            transform: `scale(${scale})`,
          },
          {
            transform: `scale(${scale})`,
            opacity: 0,
          },
        ]}
        step={options.step}
        onFinish={options.onFinish}
      />
    );
  };

  beforeAnimate: MotionCallback = (data, onFinish) => {
    onFinish();
    return this.renderMotion(data, { onFinish });
  };

  animate: MotionCallback = (data, onFinish) => {
    return this.renderMotion(data, { onFinish, step: 0 });
  };

  afterAnimate: MotionCallback = (data, onFinish) => {
    return this.renderMotion(data, { onFinish, step: 1 });
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
