import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
} from '../../Collector';
import { standard } from '../../lib/curves';
import { combine } from '../../lib/style';
import { dynamic } from '../../lib/duration';
import noop from '../../lib/noop';
import { Duration } from '../types';

export interface RevealProps extends CollectorChildrenProps {
  /**
   * Takes either "dynamic" or a number in ms.
   * How long the animation should take over {duration}ms.
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
}

export default class Reveal extends React.Component<RevealProps> {
  static defaultProps = {
    duration: 'dynamic',
    timingFunction: standard(),
    offset: [0, 0, 0, 0],
  };

  abort = noop;

  beforeAnimate: AnimationCallback = (data, onFinish, setChildProps) => {
    const [topOffset, rightOffset, bottomOffset, leftOffset] = this.props.offset;

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
              clipPath: `inset(${topOffset}px ${right}px ${bottom}px ${leftOffset}px)`,
              opacity: 1,
              visibility: 'visible',
              willChange: combine('clip-path')(prevStyles.willChange),
            }
          : undefined,
    });

    onFinish();
  };

  animate: AnimationCallback = (data, onFinish, setChildProps) => {
    const { timingFunction, duration } = this.props;
    const calculatedDuration =
      duration === 'dynamic'
        ? dynamic(data.origin.elementBoundingBox, data.destination.elementBoundingBox)
        : duration;

    setChildProps({
      style: prevStyles => ({
        ...prevStyles,
        clipPath: 'inset(0px)',
        transition: combine(`clip-path ${calculatedDuration}ms ${timingFunction}`)(
          prevStyles.transition
        ),
      }),
    });

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
          action: CollectorActions.animation,
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
