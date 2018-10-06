import * as React from 'react';
import { css } from 'emotion';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
} from '../../Collector';
import { standard } from '../../lib/curves';
import { combine } from '../../lib/style';

export interface RevealProps extends CollectorChildrenProps {
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
  zIndex?: number;

  /**
   * Timing function to be used in the transition, see: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
   */
  timingFunction: string;

  /**
   * Set to false to disable transforming the children to the X position of the focal element.
   * Defaults to true.
   */
  childrenTransformX: boolean;

  /**
   * Set to false to disable transforming the children to the Y position of the focal element.
   * Defaults to `true`.
   */
  childrenTransformY: boolean;

  /**
   * Will transition using clip-path over height and width.
   * This results in a more resilient transition since page flow isn't affected at the cost of browser support.
   * See: https://caniuse.com/#feat=css-clip-path
   */
  useClipPath?: boolean;
}

/**
 * ## Reveal
 */
export default class Reveal extends React.Component<RevealProps> {
  static defaultProps = {
    duration: 500,
    timingFunction: standard(),
    childrenTransformX: true,
    childrenTransformY: true,
  };

  beforeAnimate: AnimationCallback = (data, onFinish, setTargetProps) => {
    if (!data.toTarget.targetDOMData) {
      throw new Error(`yubaba
targetElement was missing.`);
    }

    const { childrenTransformX, childrenTransformY, useClipPath } = this.props;

    const offsetChildrenX = childrenTransformX
      ? data.toTarget.targetDOMData.location.left - data.toTarget.location.left
      : 0;
    const offsetChildrenY = childrenTransformY
      ? data.toTarget.targetDOMData.location.top - data.toTarget.location.top
      : 0;

    const revealStyles = useClipPath
      ? {
          clipPath: `inset(0 ${data.toTarget.size.width -
            data.toTarget.targetDOMData.size.width}px ${data.toTarget.size.height -
            data.toTarget.targetDOMData.size.height}px 0)`,
        }
      : {
          height: data.toTarget.targetDOMData.size.height,
          width: data.toTarget.targetDOMData.size.width,
        };

    setTargetProps({
      style: prevStyles =>
        data.toTarget.targetDOMData
          ? {
              ...prevStyles,
              ...revealStyles,
              opacity: 1,
              visibility: 'visible',
              willChange: combine('height, width, clip-path')(prevStyles.willChange),
              overflow: 'hidden',
            }
          : undefined,
      className: () =>
        data.toTarget.targetDOMData
          ? css({
              '> *': {
                transform: `translate3d(-${offsetChildrenX}px, -${offsetChildrenY}px, 0)`,
              },
            })
          : undefined,
    });

    onFinish();
  };

  animate: AnimationCallback = (data, onFinish, setTargetProps) => {
    const { timingFunction, duration, useClipPath } = this.props;

    const revealStyles = useClipPath
      ? {
          clipPath: 'inset(0 0 0 0)',
        }
      : {
          height: data.toTarget.size.height,
          width: data.toTarget.size.width,
        };

    setTargetProps({
      style: prevStyles => ({
        ...prevStyles,
        ...revealStyles,
        transition: combine(
          `height ${duration}ms ${timingFunction}, width ${duration}ms ${timingFunction}, clip-path ${duration}ms ${timingFunction}`
        )(prevStyles.transition),
      }),
      className: () =>
        css({
          '> *': {
            transform: `translate3d(0, 0, 0)`,
            transition: `transform ${duration}ms ${timingFunction}`,
          },
        }),
    });

    setTimeout(() => onFinish(), duration);
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
