import * as React from 'react';
import { keyframes } from 'emotion';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
} from '../../Collector';
import { recalculateElementBoundingBoxFromScroll } from '../../lib/dom';
import { standard } from '../../lib/curves';
import { combine, zIndexStack } from '../../lib/style';
import { Duration } from '../types';
import { dynamic } from '../../lib/duration';
import noop from '../../lib/noop';
import { arcMove } from '../../lib/arcMove';

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

  beforeAnimate: AnimationCallback = (data, onFinish, setChildProps) => {
    const { zIndex } = this.props;

    // Scroll could have changed between unmount and this prepare step.
    const originTarget = recalculateElementBoundingBoxFromScroll(data.origin.elementBoundingBox);
    const destinationTarget = data.destination.elementBoundingBox;
    const toStartXOffset =
      originTarget.location.left - data.destination.elementBoundingBox.location.left;
    const toStartYOffset =
      originTarget.location.top - data.destination.elementBoundingBox.location.top;

    const points = arcMove(data.origin.elementBoundingBox, data.destination.elementBoundingBox);
    const hey = points.reduce((kfs, point, index) => {
      // eslint-disable-next-line no-param-reassign
      kfs[`${index + 1}%`] = { transform: `translate3d(${point.x}px, ${point.y}px, 0)` };
      return kfs;
    }, {});

    this.keyframes = keyframes(hey);

    console.log(hey);

    setChildProps({
      style: prevStyles => ({
        ...prevStyles,
        zIndex,
        // transformOrigin: '0 0',
        visibility: 'visible',
        willChange: combine('transform')(prevStyles.willChange),
        transform: combine(prevStyles.transform, '')(
          `translate3d(${toStartXOffset}px, ${toStartYOffset}px, 0) scale3d(${originTarget.size
            .width / destinationTarget.size.width},
            ${originTarget.size.height / destinationTarget.size.height}
          , 1)`
        ),
      }),
    });

    onFinish();
  };

  animate: AnimationCallback = (_, onFinish, setChildProps) => {
    const { timingFunction } = this.props;

    const calculatedDuration = 100000;
    // duration === 'dynamic'
    //   ? dynamic(data.origin.elementBoundingBox, data.destination.elementBoundingBox)
    //   : duration;

    setChildProps({
      style: prevStyles => ({
        ...prevStyles,
        animation: `${this.keyframes} ${calculatedDuration}ms ${timingFunction}`,
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
