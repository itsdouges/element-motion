import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
  AnimationData,
} from '../../Collector';
import { calculateHypotenuse } from '../../lib/math';
import { calculateWindowCentre, calculateElementCenterInViewport } from '../../lib/dom';
import SimpleKeyframe from '../SimpleKeyframe';
import { standard, decelerate } from '../../lib/curves';
import { zIndexStack } from '../../lib/style';

export interface CircleShrinkProps extends CollectorChildrenProps {
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
 * ## CircleShrink
 *
 * CircleShrink will animate a circle from the entire window
 * to cover end target, and then fade out.
 *
 * Generally you will use CircleShrink and CircleExpand together
 * to seamlessly transition the background between pages.
 */
export default class CircleShrink extends React.Component<CircleShrinkProps> {
  static defaultProps = {
    duration: 500,
    zIndex: zIndexStack.circleShrink,
  };

  renderAnimation = (data: AnimationData, options: { step?: number; onFinish: () => void }) => {
    const { duration, background, zIndex } = this.props;

    const minSize = Math.min(
      data.destination.elementBoundingBox.size.width,
      data.destination.elementBoundingBox.size.height
    );
    const destinationHypotenuse = calculateHypotenuse(data.destination.elementBoundingBox.size);
    const destinationCenterInViewport = calculateElementCenterInViewport(
      data.destination.elementBoundingBox
    );
    const viewportCenter = calculateWindowCentre();
    const windowHypotenuse = calculateHypotenuse({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const difference = {
      width: viewportCenter.left - destinationCenterInViewport.left,
      height: viewportCenter.top - destinationCenterInViewport.top,
    };
    const hypotenuseDifference = calculateHypotenuse(difference);
    const scale = Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize);

    return (
      <SimpleKeyframe
        style={{
          zIndex,
          left:
            data.destination.elementBoundingBox.location.left -
            (destinationHypotenuse - data.destination.elementBoundingBox.size.width) / 2,
          top:
            data.destination.elementBoundingBox.location.top -
            (destinationHypotenuse - data.destination.elementBoundingBox.size.height) / 2,
          width: destinationHypotenuse,
          height: destinationHypotenuse,
          borderRadius: '50%',
          position: 'absolute',
          background,
          willChange: 'transform',
          transition: `transform ${decelerate()} ${duration}ms, opacity ${standard()} ${duration}ms`,
          transform: `scale(${scale})`,
        }}
        keyframes={[
          {
            transform: 'scale(1)',
          },
          {
            transform: 'scale(1)',
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
