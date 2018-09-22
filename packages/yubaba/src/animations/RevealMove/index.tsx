import * as React from 'react';
import { css } from 'emotion';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorData,
  CollectorActions,
} from '../../Collector';
import { recalculateLocationFromScroll } from '../../lib/dom';
import { standard } from '../../lib/curves';

export interface RevealMoveProps extends CollectorChildrenProps {
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

  /**
   * Used to generally get around issues where target elements are centered horizontally.
   * Since we are animating their width the inital transform offset is not needed.
   */
  skipInitialTransformOffset?: boolean;
}

/**
 * ## RevealMove
 *
 * Flex centering makes things difficult.
 * For vertically aligned items consider either wrapping your element inside another div or turning on skipInitialTransformOffset.
 * For horizontally aligned items it's little bit tricker. Try turning on skipInitialTransformOffset.
 */
export default class RevealMove extends React.Component<RevealMoveProps> {
  static defaultProps = {
    duration: 500,
    timingFunction: standard(),
  };

  renderAnimation: (opts: { start: boolean; onFinish: () => void }) => React.ReactElement<{}>;

  beforeAnimate: AnimationCallback = (data, onFinish, setTargetProps) => {
    if (!data.toTarget.targetDOMData) {
      throw new Error(`yubaba
targetElement was missing.`);
    }

    const duration = this.props.duration as number;
    const { timingFunction } = this.props;
    // Scroll could have changed between unmount and this prepare step, let's recalculate
    // just in case.
    const fromTargetSizeLocation = recalculateLocationFromScroll(data.fromTarget);
    const toStartXOffset = fromTargetSizeLocation.location.left - data.toTarget.location.left;
    const toStartYOffset = fromTargetSizeLocation.location.top - data.toTarget.location.top;

    const style = {
      zIndex: this.props.zIndex || 10001,
      opacity: 1,
      transformOrigin: '0 0',
      visibility: 'visible',
      willChange: 'transform, height, width',
      transform: this.props.skipInitialTransformOffset
        ? ''
        : `translate3d(${toStartXOffset}px, ${toStartYOffset}px, 0)`,
      height: data.toTarget.targetDOMData.size.height,
      width: data.toTarget.targetDOMData.size.width,
      overflow: 'hidden',
    };

    setTargetProps({
      style,
      className: css`
        > * {
          transform: translate3d(
            -${data.toTarget.targetDOMData.location.left - data.toTarget.location.left}px,
            -${data.toTarget.targetDOMData.location.top - data.toTarget.location.top}px,
            0
          );
        }
      `,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!data.toTarget.targetDOMData) {
          throw new Error(`yubaba
targetElement was missing.`);
        }

        setTargetProps({
          style: {
            transition: `transform ${duration}ms ${timingFunction}, height ${duration}ms ${timingFunction}, width ${duration}ms ${timingFunction}`,
          },
          className: css`
            > * {
              transition: transform ${duration}ms ${timingFunction};
              transform: translate3d(
                -${data.toTarget.targetDOMData.location.left - data.toTarget.location.left}px,
                -${data.toTarget.targetDOMData.location.top - data.toTarget.location.top}px,
                0
              );
            }
          `,
        });

        requestAnimationFrame(onFinish);
      });
    });
  };

  animate: AnimationCallback = (data, onFinish, setTargetProps) => {
    const duration = this.props.duration as number;
    const { timingFunction } = this.props;

    setTargetProps({
      style: {
        transform: 'translate3d(0, 0, 0)',
        height: data.toTarget.size.height,
        width: data.toTarget.size.width,
      },
      className: css`
        > * {
          transition: transform ${duration}ms ${timingFunction};
          transform: translate3d(0, 0, 0);
        }
      `,
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

    return <Collector data={data}>{this.props.children}</Collector>;
  }
}
