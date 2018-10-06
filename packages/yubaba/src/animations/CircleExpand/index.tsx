import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
  AnimationData,
} from '../../Collector';
import { calculateHypotenuse } from '../../lib/math';
import {
  calculateWindowCentre,
  calculateElementCenterInViewport,
  recalculateLocationFromScroll,
} from '../../lib/dom';
import SimpleKeyframe from '../SimpleKeyframe';
import { standard, accelerate } from '../../lib/curves';
import { zIndexStack } from '../../lib/style';

export interface CircleExpandProps extends CollectorChildrenProps {
  /**
   * Background, same usage as usual css.
   */
  background: string;

  /**
   * How long the animation should take over {duration}ms.
   */
  duration: number;

  /**
   * zIndex to be applied to the moving element.
   */
  zIndex: number;
}

/**
 * ## CircleExpand
 *
 * CircleExpand will animate a circle from the entire window
 * to cover end target, and then fade out.
 *
 * Generally you will use CircleExpand and CircleShrink together
 * to seamlessly transition the background between pages.
 */
export default class CircleExpand extends React.Component<CircleExpandProps> {
  static defaultProps = {
    duration: 500,
    zIndex: zIndexStack.circleExpand,
  };

  renderAnimation = (data: AnimationData, options: { step?: number; onFinish: () => void }) => {
    const { duration, background, zIndex } = this.props;

    // Scroll could have changed between unmount and this prepare step, let's recalculate just in case.
    const originBoundingBox = recalculateLocationFromScroll(data.origin.elementBoundingBox);
    const minSize = Math.min(originBoundingBox.size.width, originBoundingBox.size.height);
    const originHypotenuse = calculateHypotenuse(originBoundingBox.size);
    const originCenterInViewport = calculateElementCenterInViewport(originBoundingBox);
    const viewportCenter = calculateWindowCentre();
    const windowHypotenuse = calculateHypotenuse({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const difference = {
      width: viewportCenter.left - originCenterInViewport.left,
      height: viewportCenter.top - originCenterInViewport.top,
    };
    const hypotenuseDifference = calculateHypotenuse(difference);
    const scale = Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize);

    return (
      <SimpleKeyframe
        style={{
          zIndex,
          left:
            originBoundingBox.location.left - (originHypotenuse - originBoundingBox.size.width) / 2,
          top:
            originBoundingBox.location.top - (originHypotenuse - originBoundingBox.size.height) / 2,
          width: originHypotenuse,
          height: originHypotenuse,
          borderRadius: '50%',
          position: 'absolute',
          background,
          transition: `transform ${accelerate()} ${duration}ms, opacity ${standard()} ${duration /
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

  beforeAnimate: AnimationCallback = (data, onFinish) => {
    onFinish();
    return this.renderAnimation(data, { onFinish });
  };

  animate: AnimationCallback = (data, onFinish) => {
    return this.renderAnimation(data, { onFinish, step: 0 });
  };

  afterAnimate: AnimationCallback = (data, onFinish) => {
    return this.renderAnimation(data, { onFinish, step: 1 });
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
            afterAnimate: this.afterAnimate,
          },
        }}
      >
        {children}
      </Collector>
    );
  }
}
