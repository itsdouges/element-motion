import * as React from 'react';
import { css } from 'emotion';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorData,
  CollectorActions,
} from '../../Collector';
import { recalculateLocationFromScroll } from '../../lib/dom';
import noop from '../../lib/noop';
import { standard } from '../../lib/curves';

export interface ConcealMoveProps extends CollectorChildrenProps {
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
 * ## ConcealMove
 *
 * Flex centering makes things difficult.
 * For vertically aligned items consider either wrapping your element inside another div or turning on skipInitialTransformOffset.
 * For horizontally aligned items it's little bit tricker. Try turning on skipInitialTransformOffset.
 */
export default class ConcealMove extends React.Component<ConcealMoveProps> {
  static defaultProps = {
    duration: 500,
    timingFunction: standard(),
  };

  renderAnimation: (opts: { start: boolean; onFinish: () => void }) => React.ReactElement<{}>;

  beforeAnimate: AnimationCallback = (data, onFinish) => {
    const duration = this.props.duration as number;
    const { timingFunction } = this.props;
    // Scroll could have changed between unmount and this prepare step, let's recalculate
    // just in case.
    const fromTargetSizeLocation = recalculateLocationFromScroll(data.fromTarget);

    requestAnimationFrame(() => requestAnimationFrame(onFinish));

    return data.fromTarget.render({
      ref: noop,
      style: {
        transition: `transform ${duration}ms ${timingFunction}, height ${duration}ms ${timingFunction}, width ${duration}ms ${timingFunction}, opacity ${duration /
          2}ms ${timingFunction}`,
        position: 'absolute',
        transformOrigin: '0 0',
        willChange: 'transform, height, width',
        zIndex: this.props.zIndex || 19999,
        top: fromTargetSizeLocation.location.top,
        left: fromTargetSizeLocation.location.left,
        height: fromTargetSizeLocation.size.height,
        width: fromTargetSizeLocation.size.width,
        overflow: 'hidden',
      },
    });
  };

  animate: AnimationCallback = (data, onFinish) => {
    if (!data.fromTarget.targetDOMData) {
      throw new Error(`yubaba
targetElement was missing.`);
    }

    const duration = this.props.duration as number;
    const { timingFunction } = this.props;
    const fromTargetSizeLocation = recalculateLocationFromScroll(data.fromTarget);

    setTimeout(onFinish, this.props.duration);

    return data.fromTarget.render({
      ref: noop,
      style: {
        transition: `transform ${duration}ms ${timingFunction}, height ${duration}ms ${timingFunction}, width ${duration}ms ${timingFunction}, opacity ${duration /
          2}ms ${timingFunction}`,
        position: 'absolute',
        transformOrigin: '0 0',
        willChange: 'transform, height, width',
        zIndex: this.props.zIndex || 19999,
        top: fromTargetSizeLocation.location.top,
        left: fromTargetSizeLocation.location.left,
        height: data.toTarget.size.height,
        width: data.toTarget.size.width,
        overflow: 'hidden',
        transform: `translate3d(${data.toTarget.location.left -
          data.fromTarget.location.left}px, ${data.toTarget.location.top -
          data.fromTarget.location.top}px, 0)`,
      },
      className: css`
        > * {
          transition: transform ${duration}ms ${timingFunction};
          transform: translate3d(
            -${data.fromTarget.targetDOMData.location.left - data.fromTarget.location.left}px,
            -${data.fromTarget.targetDOMData.location.top - data.fromTarget.location.top}px,
            0
          );
        }
      `,
    });
  };

  afterAnimate: AnimationCallback = (data, onFinish, setTargetProps) => {
    if (!data.fromTarget.targetDOMData) {
      throw new Error(`yubaba
targetElement was missing.`);
    }

    const duration = this.props.duration as number;
    const { timingFunction } = this.props;
    const fromTargetSizeLocation = recalculateLocationFromScroll(data.fromTarget);

    setTargetProps({
      style: {
        opacity: 1,
      },
    });

    setTimeout(onFinish, 100);

    return data.fromTarget.render({
      ref: noop,
      style: {
        transition: `transform ${duration}ms ${timingFunction}, height ${duration}ms ${timingFunction}, width ${duration}ms ${timingFunction}, opacity ${duration /
          2}ms ${timingFunction}`,
        position: 'absolute',
        transformOrigin: '0 0',
        willChange: 'transform, height, width',
        zIndex: this.props.zIndex || 19999,
        top: fromTargetSizeLocation.location.top,
        left: fromTargetSizeLocation.location.left,
        height: data.toTarget.size.height,
        width: data.toTarget.size.width,
        overflow: 'hidden',
        transform: `translate3d(${data.toTarget.location.left -
          data.fromTarget.location.left}px, ${data.toTarget.location.top -
          data.fromTarget.location.top}px, 0)`,
        opacity: 0,
      },
      className: css`
        > * {
          transition: transform ${duration}ms ${timingFunction};
          transform: translate3d(
            -${data.fromTarget.targetDOMData.location.left - data.fromTarget.location.left}px,
            -${data.fromTarget.targetDOMData.location.top - data.fromTarget.location.top}px,
            0
          );
        }
      `,
    });
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
