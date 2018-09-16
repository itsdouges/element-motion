import * as React from 'react';
import Collecter, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorData,
  CollectorActions,
} from '../../Collector';
import * as math from '../../lib/math';
import { recalculateLocationFromScroll } from '../../lib/dom';
import { standard } from '../../lib/curves';

export interface FLIPMoveProps extends CollectorChildrenProps {
  /**
   * How long the animation should take over {duration}ms.
   */
  duration?: number;

  /**
   * Delays the animation from starting for {delay}ms.
   */
  delay?: number;

  /**
   * zIndex to be applied to the moving element.
   */
  zIndex?: number;

  /**
   * Timing function to be used in the transition, see: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
   */
  timingFunction?: string;
}

/**
 * ## FLIPMove
 *
 * FLIPMove will animate the end target from the start target, to the end position.
 * It will match both size and position of the start target.
 *
 * Note that it will not fade between elements, so this animation really only looks good
 * when transitioning the same (or very similar) element.
 *
 * If you want to transition distinct elements I'd suggestion using CrossFadeMove, however
 * it is slightly more expensive to animate.
 */
export default class FLIPMove extends React.Component<FLIPMoveProps> {
  static defaultProps = {
    duration: 500,
    timingFunction: standard(),
  };

  renderAnimation: (opts: { start: boolean; onFinish: () => void }) => React.ReactElement<{}>;

  beforeAnimate: AnimationCallback = (data, onFinish, setTargetProps) => {
    // Scroll could have changed between unmount and this prepare step, let's recalculate
    // just in case.
    const fromTargetSizeLocation = recalculateLocationFromScroll(data.fromTarget);
    const toStartXOffset = fromTargetSizeLocation.location.left - data.toTarget.location.left;
    const toStartYOffset = fromTargetSizeLocation.location.top - data.toTarget.location.top;
    const duration = this.props.duration as number;
    const { timingFunction } = this.props;

    const style = {
      zIndex: this.props.zIndex || 10001,
      opacity: 1,
      transformOrigin: '0 0',
      visibility: 'visible',
      willChange: 'transform',
      transform: `translate3d(${toStartXOffset}px, ${toStartYOffset}px, 0) scale3d(${math.percentageDifference(
        fromTargetSizeLocation.size.width,
        data.toTarget.size.width
      )}, ${math.percentageDifference(
        fromTargetSizeLocation.size.height,
        data.toTarget.size.height
      )}, 1)`,
    };

    setTargetProps({
      style,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTargetProps({
          style: {
            transition: `transform ${duration}ms ${timingFunction}, opacity ${duration /
              2}ms ${timingFunction}`,
          },
        });

        requestAnimationFrame(onFinish);
      });
    });
  };

  animate: AnimationCallback = (_, onFinish, setTargetProps) => {
    setTargetProps({
      style: {
        transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
      },
    });

    setTimeout(() => onFinish(), this.props.duration);
  };

  render() {
    const data: CollectorData = {
      action: CollectorActions.animation,
      payload: {
        beforeAnimate: this.beforeAnimate,
        animate: this.animate,
      },
    };

    return <Collecter data={data}>{this.props.children}</Collecter>;
  }
}
