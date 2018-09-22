import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorData,
  CollectorActions,
} from '../../Collector';
import { calculateHypotenuse } from '../../lib/math';
import { calculateWindowCentre, calculateElementCenterInViewport } from '../../lib/dom';
import SimpleKeyframe from '../SimpleKeyframe';

export interface CircleShrinkProps extends CollectorChildrenProps {
  /**
   * Background, same usage as usual css.
   */
  background: string;

  /**
   * How long the animation should take over {duration}ms.
   */
  duration?: number;
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
  };

  renderAnimation: (
    opts: { step: number | undefined; onFinish: () => void }
  ) => React.ReactElement<{}>;

  beforeAnimate: AnimationCallback = (data, onFinish) => {
    const duration = this.props.duration as number;
    const minSize = Math.min(data.toTarget.size.width, data.toTarget.size.height);
    const toTargetHypotenuse = calculateHypotenuse(data.toTarget.size);
    const toTargetCenterInViewport = calculateElementCenterInViewport(data.toTarget);
    const viewportCenter = calculateWindowCentre();
    const windowHypotenuse = calculateHypotenuse({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const difference = {
      width: viewportCenter.left - toTargetCenterInViewport.left,
      height: viewportCenter.top - toTargetCenterInViewport.top,
    };
    const hypotenuseDifference = calculateHypotenuse(difference);
    const scale = Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize);

    this.renderAnimation = (opts: { step?: number | undefined; onFinish: () => void }) => (
      <SimpleKeyframe
        style={{
          left: data.toTarget.location.left - (toTargetHypotenuse - data.toTarget.size.width) / 2,
          top: data.toTarget.location.top - (toTargetHypotenuse - data.toTarget.size.height) / 2,
          width: toTargetHypotenuse,
          height: toTargetHypotenuse,
          borderRadius: '50%',
          position: 'absolute',
          background: this.props.background,
          willChange: 'transform',
          zIndex: 1110,
          transition: `transform ease-out ${duration}ms, opacity ease-out ${duration}ms`,
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
        step={opts.step}
        onFinish={opts.onFinish}
      />
    );

    // Finish next animation frame. We are just placing the circle ready to go
    // for the animate step.
    requestAnimationFrame(() => onFinish());

    return this.renderAnimation({ onFinish, step: undefined });
  };

  animate: AnimationCallback = (_, onFinish) => {
    return this.renderAnimation({ onFinish, step: 0 });
  };

  afterAnimate: AnimationCallback = (_, onFinish) => {
    return this.renderAnimation({ onFinish, step: 1 });
  };

  render() {
    const data: CollectorData = {
      action: CollectorActions.animation,
      payload: {
        beforeAnimate: this.beforeAnimate,
        animate: this.animate,
        afterAnimate: this.afterAnimate,
      },
    };

    return <Collector data={data}>{this.props.children}</Collector>;
  }
}
