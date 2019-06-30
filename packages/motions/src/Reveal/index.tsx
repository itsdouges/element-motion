import * as React from 'react';
import {
  Collector,
  CollectorChildrenProps,
  MotionCallback,
  CollectorActions,
  noop,
  combine,
  standard,
  dynamic,
} from '@element-motion/utils';
import { Duration } from '../types';

export interface RevealProps extends CollectorChildrenProps {
  /**
   * Takes either "dynamic" or a number in ms.
   * How long the motion should take over {duration}ms.
   * Defaults to "dynamic".
   */
  duration: Duration;

  /**
   * Timing function to be used in the transition.
   */
  timingFunction: string;

  /**
   * This will increase (or decrease) the size of the clip-path box.
   * Use with caution.
   * [top, right, bottom, left]
   */
  offset: [number, number, number, number];

  /**
   * Will transition using clip-path over height and width.
   * This results in a more resilient transition since page flow isn't affected at the cost of browser support.
   * See: https://caniuse.com/#feat=css-clip-path
   *
   * Defaults to true.
   */
  useClipPath?: boolean;
}

export default class Reveal extends React.Component<RevealProps> {
  static defaultProps = {
    duration: 'dynamic',
    timingFunction: standard(),
    offset: [0, 0, 0, 0],
    useClipPath: true,
  };

  abort = noop;

  beforeAnimate: MotionCallback = (data, onFinish, setChildProps) => {
    const { useClipPath } = this.props;
    const [topOffset, rightOffset, bottomOffset, leftOffset] = this.props.offset;

    if (useClipPath) {
      const right =
        data.destination.elementBoundingBox.size.width -
        data.origin.elementBoundingBox.size.width +
        rightOffset;
      const bottom =
        data.destination.elementBoundingBox.size.height -
        data.origin.elementBoundingBox.size.height +
        bottomOffset;

      setChildProps({
        style: prevStyles =>
          data.origin.elementBoundingBox
            ? {
                ...prevStyles,
                WebkitClipPath: `inset(${topOffset}px ${right}px ${bottom}px ${leftOffset}px)`,
                clipPath: `inset(${topOffset}px ${right}px ${bottom}px ${leftOffset}px)`,
                willChange: combine('clip-path, -webkit-clip-path')(prevStyles.willChange),
              }
            : undefined,
      });
    } else {
      setChildProps({
        style: prevStyles => ({
          ...prevStyles,
          ...data.origin.elementBoundingBox.size,
          overflow: 'hidden',
          willChange: combine('width, height')(prevStyles.willChange),
        }),
      });
    }

    onFinish();
  };

  animate: MotionCallback = (data, onFinish, setChildProps) => {
    const { timingFunction, duration, useClipPath } = this.props;
    const calculatedDuration =
      duration === 'dynamic'
        ? dynamic(data.origin.elementBoundingBox, data.destination.elementBoundingBox)
        : duration;

    if (useClipPath) {
      setChildProps({
        style: prevStyles => ({
          ...prevStyles,
          WebkitClipPath: 'inset(0px)',
          clipPath: 'inset(0px)',
          transition: combine(
            `-webkit-clip-path ${calculatedDuration}ms ${timingFunction}, clip-path ${calculatedDuration}ms ${timingFunction}`
          )(prevStyles.transition),
        }),
      });
    } else {
      setChildProps({
        style: prevStyles => ({
          ...prevStyles,
          ...data.destination.elementBoundingBox.size,
          transition: combine(
            `height ${calculatedDuration}ms ${timingFunction}, width ${calculatedDuration}ms ${timingFunction}`
          )(prevStyles.transition),
        }),
      });
    }

    const id = window.setTimeout(() => onFinish(), calculatedDuration);
    this.abort = () => {
      window.clearTimeout(id);
    };
  };

  render() {
    const { children } = this.props;

    return (
      <Collector
        data={{
          action: CollectorActions.motion,
          payload: {
            beforeAnimate: this.beforeAnimate,
            animate: this.animate,
            abort: this.abort,
          },
        }}
      >
        {children}
      </Collector>
    );
  }
}
