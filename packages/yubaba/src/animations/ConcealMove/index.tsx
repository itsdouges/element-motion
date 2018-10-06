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
    if (!data.origin.focalTargetElementBoundingBox) {
      throw new Error(`yubaba
targetElement was missing.`);
    }

    const { duration, timingFunction, zIndex } = this.props;
    // Scroll could have changed between unmount and this prepare step.
    const originSizeLocation = recalculateLocationFromScroll(data.origin.elementBoundingBox);

    return data.origin.render({
      ref: noop,
      style: {
        zIndex,
        opacity: options.fadeOut ? 0 : 1,
        transition: `transform ${duration}ms ${timingFunction}, height ${duration}ms ${timingFunction}, width ${duration}ms ${timingFunction}, opacity ${duration /
          2}ms ${timingFunction}`,
        position: 'absolute',
        transformOrigin: '0 0',
        willChange: 'transform, height, width',
        top: originSizeLocation.location.top,
        left: originSizeLocation.location.left,
        height: options.moveToTarget
          ? data.destination.elementBoundingBox.size.height
          : originSizeLocation.size.height,
        width: options.moveToTarget
          ? data.destination.elementBoundingBox.size.width
          : originSizeLocation.size.width,
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
              transition: transform ${duration}ms ${timingFunction};
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

  beforeAnimate: AnimationCallback = (data, onFinish) => {
    onFinish();
    return this.renderAnimation(data);
  };

  animate: AnimationCallback = (data, onFinish) => {
    const { duration } = this.props;

    setTimeout(onFinish, duration);

    return this.renderAnimation(data, { moveToTarget: true });
  };

  afterAnimate: AnimationCallback = (data, onFinish, setChildProps) => {
    setChildProps({
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
