import * as React from 'react';
// import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';
import Collecter, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorData,
  CollectorActions,
} from '../Collector';
import { calculateHypotenuse } from '../../lib/math';
import {
  calculateWindowCentre,
  calculateElementCenterInViewport,
  recalculateLocationFromScroll,
} from '../../lib/dom';
import SimpleKeyframe from '../SimpleKeyframe';

export interface CircleExpandProps extends CollectorChildrenProps {
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
  };

  renderAnimation: (opts: { step: number; onFinish: () => void }) => React.ReactElement<{}>;

  afterAnimate: AnimationCallback = (_, onFinish) => this.renderAnimation({ onFinish, step: 1 });

  animate: AnimationCallback = (data, onFinish) => {
    // Scroll could have changed between unmount and this prepare step, let's recalculate just in case.
    const fromTargetSizeLocation = recalculateLocationFromScroll(data.fromTarget);

    const duration = this.props.duration as number;
    const minSize = Math.min(fromTargetSizeLocation.size.width, fromTargetSizeLocation.size.height);
    const fromTargetHypotenuse = calculateHypotenuse(fromTargetSizeLocation.size);
    const fromTargetCenterInViewport = calculateElementCenterInViewport(fromTargetSizeLocation);
    const viewportCenter = calculateWindowCentre();
    const windowHypotenuse = calculateHypotenuse({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const difference = {
      width: viewportCenter.left - fromTargetCenterInViewport.left,
      height: viewportCenter.top - fromTargetCenterInViewport.top,
    };
    const hypotenuseDifference = calculateHypotenuse(difference);
    const scale = Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize);

    this.renderAnimation = (opts: { step: number; onFinish: () => void }) => (
      <SimpleKeyframe
        key="circle-expand"
        style={{
          left:
            fromTargetSizeLocation.location.left -
            (fromTargetHypotenuse - fromTargetSizeLocation.size.width) / 2,
          top:
            fromTargetSizeLocation.location.top -
            (fromTargetHypotenuse - fromTargetSizeLocation.size.height) / 2,
          width: fromTargetHypotenuse,
          height: fromTargetHypotenuse,
          borderRadius: '50%',
          position: 'absolute',
          background: this.props.background,
          zIndex: 10000,
          transition: `transform ease-in ${duration}ms, opacity ease-in ${duration / 2}ms`,
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
        step={opts.step}
        onFinish={opts.onFinish}
      />
    );

    return this.renderAnimation({ onFinish, step: 0 });
  };

  render() {
    const data: CollectorData = {
      action: CollectorActions.animation,
      payload: {
        animate: this.animate,
        afterAnimate: this.afterAnimate,
      },
    };

    return <Collecter data={data}>{this.props.children}</Collecter>;
  }
}
