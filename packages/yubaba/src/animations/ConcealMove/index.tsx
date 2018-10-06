import * as React from 'react';
import { css } from 'emotion';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
  AnimationData,
} from '../../Collector';
import { recalculateLocationFromScroll } from '../../lib/dom';
import noop from '../../lib/noop';
import { standard } from '../../lib/curves';
import { zIndexStack } from '../../lib/style';

export interface ConcealMoveProps extends CollectorChildrenProps {
  /**
   * How long the animation should take over {duration}ms.
   */
  duration: number;

  /**
   * Delays the animation from starting for {delay}ms.
   */
  delay?: number;

  /**
   * zIndex to be applied to the moving element.
   */
  zIndex: number;

  /**
   * Timing function to be used in the transition, see: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
   */
  timingFunction: string;
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
    zIndex: zIndexStack.concealMove,
  };

  renderAnimation = (
    data: AnimationData,
    options: { moveToTarget?: boolean; fadeOut?: boolean } = {}
  ) => {
    if (!data.fromTarget.targetDOMData) {
      throw new Error(`yubaba
targetElement was missing.`);
    }

    const { duration, timingFunction, zIndex } = this.props;
    // Scroll could have changed between unmount and this prepare step.
    const fromTargetSizeLocation = recalculateLocationFromScroll(data.fromTarget);

    return data.fromTarget.render({
      ref: noop,
      style: {
        zIndex,
        opacity: options.fadeOut ? 0 : 1,
        transition: `transform ${duration}ms ${timingFunction}, height ${duration}ms ${timingFunction}, width ${duration}ms ${timingFunction}, opacity ${duration /
          2}ms ${timingFunction}`,
        position: 'absolute',
        transformOrigin: '0 0',
        willChange: 'transform, height, width',
        top: fromTargetSizeLocation.location.top,
        left: fromTargetSizeLocation.location.left,
        height: options.moveToTarget
          ? data.toTarget.size.height
          : fromTargetSizeLocation.size.height,
        width: options.moveToTarget ? data.toTarget.size.width : fromTargetSizeLocation.size.width,
        overflow: 'hidden',
        transform: options.moveToTarget
          ? `translate3d(${data.toTarget.location.left - data.fromTarget.location.left}px, ${data
              .toTarget.location.top - data.fromTarget.location.top}px, 0)`
          : undefined,
      },
      className: options.moveToTarget
        ? css`
            > * {
              transition: transform ${duration}ms ${timingFunction};
              transform: translate3d(
                -${data.fromTarget.targetDOMData.location.left - data.fromTarget.location.left}px,
                -${data.fromTarget.targetDOMData.location.top - data.fromTarget.location.top}px,
                0
              );
            }
          `
        : undefined,
    });
  };

  beforeAnimate: AnimationCallback = (data, onFinish) => {
    onFinish();
    return this.renderAnimation(data);
  };

  animate: AnimationCallback = (data, onFinish) => {
    const { duration } = this.props;

    setTimeout(onFinish, duration);

    return this.renderAnimation(data, { moveToTarget: true });
  };

  afterAnimate: AnimationCallback = (data, onFinish, setTargetProps) => {
    setTargetProps({
      style: () => ({
        opacity: 1,
      }),
    });

    setTimeout(onFinish, 100);

    return this.renderAnimation(data, { moveToTarget: true, fadeOut: true });
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
