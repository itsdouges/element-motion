import * as React from 'react';
import { css } from 'emotion';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
  AnimationData,
} from '../../Collector';
import * as math from '../../lib/math';
import { recalculateLocationFromScroll } from '../../lib/dom';
import noop from '../../lib/noop';
import { standard } from '../../lib/curves';
import { zIndexStack } from '../../lib/style';

export interface FadeMoveProps extends CollectorChildrenProps {
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
 * ## FadeMove
 *
 * FadeMove will create two new elements (positioned absolutely in the body),
 * position them at the start element and then cross fade move them to the end element.
 *
 * This animation works best if you have two elements that aren't the same, but you'd like
 * to transition them to each other.
 *
 * If you're transitioning the same element I'd suggest using Move, as it is a cheaper
 * animation.
 */
export default class FadeMove extends React.Component<FadeMoveProps> {
  static defaultProps = {
    duration: 500,
    timingFunction: standard(),
    zIndex: zIndexStack.fadeMove,
  };

  renderAnimation = (data: AnimationData, options: { moveToTarget?: boolean } = {}) => {
    const { timingFunction, duration, zIndex } = this.props;
    // Scroll could have changed between unmount and this prepare step, let's recalculate
    // just in case.
    const originBoundingBox = recalculateLocationFromScroll(data.origin.elementBoundingBox);
    const fromEndXOffset =
      data.destination.elementBoundingBox.location.left - originBoundingBox.location.left;
    const fromEndYOffset =
      data.destination.elementBoundingBox.location.top - originBoundingBox.location.top;

    return data.origin.render({
      ref: noop,
      className: css({
        ...originBoundingBox.location,
        zIndex,
        transition: `transform ${duration}ms ${timingFunction}, opacity ${duration /
          2}ms ${timingFunction}`,
        position: 'absolute',
        transformOrigin: '0 0',
        transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
        opacity: 1,
        // Elminate any margins so they don't affect the transition.
        margin: 0,
        height: `${originBoundingBox.size.height}px`,
        width: `${originBoundingBox.size.width}px`,
        ...(options.moveToTarget
          ? {
              transform: `translate3d(${fromEndXOffset}px, ${fromEndYOffset}px, 0) scale3d(${math.percentageDifference(
                data.destination.elementBoundingBox.size.width,
                originBoundingBox.size.width
              )}, ${math.percentageDifference(
                data.destination.elementBoundingBox.size.height,
                originBoundingBox.size.height
              )}, 1)`,
              opacity: 0,
            }
          : {}),
      }),
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

  render() {
    const { children } = this.props;

    return (
      <Collector
        data={{
          action: CollectorActions.animation,
          payload: {
            beforeAnimate: this.beforeAnimate,
            animate: this.animate,
          },
        }}
      >
        {children}
      </Collector>
    );
  }
}
