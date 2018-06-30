import * as React from 'react';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';
import Collecter, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorData,
  CollectorActions,
} from '../Collector';
import * as math from '../../lib/math';
import { recalculateLocationFromScroll } from '../../lib/dom';
import SimpleTween from '../SimpleTween';

/**
 * @hidden
 */
const noop = () => {};

export interface MoveProps extends CollectorChildrenProps {
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
}

/**
 * ## Move
 *
 * Move will animate the fromNode to the toNode while transitioning
 * between the two nodes for a seamless transition.
 */
export default class Move extends React.Component<MoveProps> {
  finishAnimation: () => Promise<any>;
  finishCleanup: () => void;
  realAbort: () => void;

  static defaultProps = {
    duration: 300,
    timingFunction: '',
  };

  prepare: AnimationCallback = data => {
    // Scroll could have changed between unmount and this prepare step, let's recalculate
    // just in case.
    const fromTargetSizeLocation = recalculateLocationFromScroll(data.fromTarget);
    const fromEndXOffset = data.toTarget.location.left - fromTargetSizeLocation.location.left;
    const fromEndYOffset = data.toTarget.location.top - fromTargetSizeLocation.location.top;
    const toStartXOffset = fromTargetSizeLocation.location.left - data.toTarget.location.left;
    const toStartYOffset = fromTargetSizeLocation.location.top - data.toTarget.location.top;
    const elementToMountChildren = document.createElement('div');
    const duration = this.props.duration as number;
    const noTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
    const { timingFunction } = this.props;
    document.body.appendChild(elementToMountChildren);

    const from = {
      transition: `transform ${duration}ms ${timingFunction}, opacity ${duration /
        2}ms ${timingFunction}`,
      position: 'absolute',
      transformOrigin: '0 0',
    };

    const render = (start: boolean, finished = () => {}) =>
      // This will preserve react context.
      unstable_renderSubtreeIntoContainer(
        data.caller,
        <>
          <SimpleTween
            key="1"
            start={start}
            duration={this.props.duration as number}
            from={{
              ...fromTargetSizeLocation.location,
              ...from,
              transform: noTransform,
              opacity: 1,
              zIndex: this.props.zIndex || 20000,
            }}
            to={{
              transform: `translate3d(${fromEndXOffset}px, ${fromEndYOffset}px, 0) scale3d(${math.percentageDifference(
                data.toTarget.size.width,
                fromTargetSizeLocation.size.width
              )}, ${math.percentageDifference(
                data.toTarget.size.height,
                fromTargetSizeLocation.size.height
              )}, 1)`,
              opacity: 0,
            }}
            onFinish={() => {}}
          >
            {data.fromTarget.render({
              ref: noop,
              style: {
                // Elminate any margins so they don't affect the transition.
                margin: 0,
                height: `${fromTargetSizeLocation.size.height}px`,
                width: `${fromTargetSizeLocation.size.width}px`,
              },
            })}
          </SimpleTween>

          <SimpleTween
            key="2"
            start={start}
            duration={this.props.duration as number}
            from={{
              ...data.toTarget.location,
              ...from,
              // NOTE: We want to minimize the background bleeding through into the animation.
              // Make the "end" element appear very quickly minimizes this.
              transition: `transform ${duration}ms ${timingFunction}, opacity 10ms ${timingFunction}`,
              zIndex: this.props.zIndex ? this.props.zIndex - 1 : 19999,
              opacity: 0,
              transform: `translate3d(${toStartXOffset}px, ${toStartYOffset}px, 0) scale3d(${math.percentageDifference(
                fromTargetSizeLocation.size.width,
                data.toTarget.size.width
              )}, ${math.percentageDifference(
                fromTargetSizeLocation.size.height,
                data.toTarget.size.height
              )}, 1)`,
            }}
            to={{
              opacity: 1,
              transform: noTransform,
            }}
            onFinish={finished}
          >
            {data.toTarget.render({
              ref: noop,
              style: {
                // Elminate any margins so they don't affect the transition.
                margin: 0,
                height: `${data.toTarget.size.height}px`,
                width: `${data.toTarget.size.width}px`,
              },
            })}
          </SimpleTween>
        </>,
        elementToMountChildren
      );

    render(false);

    this.finishCleanup = () => {
      document.body.removeChild(elementToMountChildren);
      unmountComponentAtNode(elementToMountChildren);
    };

    this.finishAnimation = () => {
      return new Promise(resolve => {
        render(true, resolve);
      });
    };

    return Promise.resolve();
  };

  abort = () => {
    this.finishCleanup();
  };

  cleanup = () => {
    this.finishCleanup();
  };

  animate: AnimationCallback = () => {
    if (this.props.delay) {
      return new Promise(resolve => {
        window.setTimeout(() => {
          this.finishAnimation().then(resolve);
        }, this.props.delay);
      });
    }
    return this.finishAnimation();
  };

  render() {
    const data: CollectorData = {
      action: CollectorActions.animation,
      payload: {
        animate: this.animate,
        abort: this.abort,
        beforeAnimate: this.prepare,
        cleanup: this.cleanup,
      },
    };

    return <Collecter data={data}>{this.props.children}</Collecter>;
  }
}
