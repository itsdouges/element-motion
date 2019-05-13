import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
  AnimationData,
} from '../../Collector';
import * as math from '../../lib/math';
import { recalculateElementBoundingBoxFromScroll } from '../../lib/dom';
import noop from '../../lib/noop';
import { standard } from '../../lib/curves';
import { zIndexStack } from '../../lib/style';
import { dynamic } from '../../lib/duration';
import { Duration } from '../types';

export interface FadeMoveProps extends CollectorChildrenProps {
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

export default class FadeMove extends React.Component<FadeMoveProps> {
  static defaultProps = {
    duration: 'dynamic',
    timingFunction: standard(),
    zIndex: zIndexStack.fadeMove,
  };

  calculatedDuration: number = 0;

  renderAnimation = (data: AnimationData, options: { moveToTarget?: boolean } = {}) => {
    const { timingFunction, duration, zIndex } = this.props;
    // Scroll could have changed between unmount and this prepare step, let's recalculate
    // just in case.
    const fromTargetSizeLocation = recalculateElementBoundingBoxFromScroll(
      data.origin.elementBoundingBox
    );
    const fromEndXOffset =
      data.destination.elementBoundingBox.location.left - fromTargetSizeLocation.location.left;
    const fromEndYOffset =
      data.destination.elementBoundingBox.location.top - fromTargetSizeLocation.location.top;
    this.calculatedDuration =
      duration === 'dynamic'
        ? dynamic(fromTargetSizeLocation, data.destination.elementBoundingBox)
        : duration;

    return data.origin.render({
      ref: noop,
      style: {
        ...fromTargetSizeLocation.location,
        zIndex,
        transition: `transform ${this.calculatedDuration}ms ${timingFunction}, opacity ${this
          .calculatedDuration / 2}ms ${timingFunction}`,
        position: 'absolute',
        transformOrigin: '0 0',
        transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
        opacity: 1,
        // Elminate any margins so they don't affect the transition.
        margin: 0,
        height: `${fromTargetSizeLocation.size.height}px`,
        width: `${fromTargetSizeLocation.size.width}px`,
        ...(options.moveToTarget
          ? {
              transform: `translate3d(${fromEndXOffset}px, ${fromEndYOffset}px, 0) scale3d(${math.percentageDifference(
                data.destination.elementBoundingBox.size.width,
                fromTargetSizeLocation.size.width
              )}, ${math.percentageDifference(
                data.destination.elementBoundingBox.size.height,
                fromTargetSizeLocation.size.height
              )}, 1)`,
              opacity: 0,
            }
          : {}),
      },
    });
  };

  beforeAnimate: AnimationCallback = (data, onFinish, setChildProps) => {
    setChildProps({
      style: prevStyle => ({
        ...prevStyle,
        opacity: 0,
      }),
    });

    onFinish();

    return this.renderAnimation(data);
  };

  animate: AnimationCallback = (data, onFinish) => {
    setTimeout(onFinish, this.calculatedDuration);
    return this.renderAnimation(data, { moveToTarget: true });
  };

  afterAnimate: AnimationCallback = (_, onFinish, setChildProps) => {
    setChildProps({
      style: prevStyle => ({
        ...prevStyle,
        opacity: 1,
      }),
    });

    onFinish();
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
