import * as React from 'react';
import { keyframes } from 'emotion';
import Collector, {
  CollectorChildrenProps,
  MotionCallback,
  CollectorActions,
} from '../../../core/src/Collector';
import { recalculateElementBoundingBoxFromScroll } from '../../../core/src/lib/dom';
import { standard } from '../../../core/src/lib/curves';
import { combine, zIndexStack } from '../../../core/src/lib/style';
import { Duration } from '../types';
import { dynamic } from '../../../core/src/lib/duration';
import noop from '../../../core/src/lib/noop';
import { arcMove } from '../../../core/src/lib/arcMove';

export interface ArcMoveProps extends CollectorChildrenProps {
  /**
   * How long the animation should take over {duration}ms.
   */
  duration: Duration;

  /**
   * zIndex to be applied to the moving element.
   */
  zIndex: number;

  /**
   * Timing function to be used in the transition.
   */
  timingFunction: string;
}

export default class ArcMove extends React.Component<ArcMoveProps> {
  static defaultProps = {
    duration: 'dynamic',
    timingFunction: standard(),
    zIndex: zIndexStack.move,
  };

  abort = noop;

  keyframes: string;

  calculatedDuration: number;

  beforeAnimate: MotionCallback = (data, onFinish, setChildProps) => {
    const { zIndex, duration } = this.props;

    // Scroll could have changed between unmount and this prepare step.
    const originTarget = recalculateElementBoundingBoxFromScroll(data.origin.elementBoundingBox);
    // const destinationTarget = data.destination.elementBoundingBox;
    const toStartXOffset =
      originTarget.location.left - data.destination.elementBoundingBox.location.left;
    const toStartYOffset =
      originTarget.location.top - data.destination.elementBoundingBox.location.top;
    // const movingRight =
    // originTarget.location.left < data.destination.elementBoundingBox.location.left;

    const moveRight =
      originTarget.location.left < data.destination.elementBoundingBox.location.left;
    const points = arcMove(originTarget, data.destination.elementBoundingBox);
    const hey = points.reduce((kfs, point, index) => {
      // eslint-disable-next-line no-param-reassign
      kfs[`${index}%`] = {
        transform: `${
          moveRight ? `translate3d(${toStartXOffset}px, ${toStartYOffset}px, 0) ` : ''
        }translate3d(${point.x}px, ${point.y}px, 0)`,
      };
      return kfs;
    }, {});

    this.keyframes = keyframes(hey);

    this.calculatedDuration =
      duration === 'dynamic'
        ? dynamic(data.origin.elementBoundingBox, data.destination.elementBoundingBox)
        : duration;

    setChildProps({
      style: prevStyles => ({
        ...prevStyles,
        zIndex,
        transformOrigin: '0 0',
        visibility: 'visible',
        willChange: combine('transform')(prevStyles.willChange),
        animation: `${this.keyframes} ${this.calculatedDuration}ms linear`,
        animationFillMode: 'forwards',
        animationPlayState: 'paused',
      }),
    });

    onFinish();
  };

  animate: MotionCallback = (_, onFinish, setChildProps) => {
    setChildProps({
      style: prevStyles => ({
        ...prevStyles,
        animationPlayState: 'running',
      }),
    });

    const id = window.setTimeout(() => onFinish(), this.calculatedDuration);
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
