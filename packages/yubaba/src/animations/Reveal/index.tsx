import * as React from 'react';
import { css } from 'emotion';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
} from '../../Collector';
import { standard } from '../../lib/curves';
import { combine } from '../../lib/style';
import { dynamic } from '../../lib/duration';
import { Duration } from '../types';

export interface RevealProps extends CollectorChildrenProps {
  /**
   * How long the animation should take over {duration}ms.
   */
  duration: Duration;

  /**
   * zIndex to be applied to the moving element.
   */
  zIndex?: number;

  /**
   * Timing function to be used in the transition.
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

export default class Reveal extends React.Component<RevealProps> {
  static defaultProps = {
    duration: 'dynamic',
    timingFunction: standard(),
    childrenTransformX: true,
    childrenTransformY: true,
  };

  beforeAnimate: AnimationCallback = (data, onFinish, setChildProps) => {
    if (!data.destination.focalTargetElementBoundingBox) {
      throw new Error(`yubaba
<FocalTarget /> was not found, if you haven't defined one make sure to add one as a descendant of your target Baba.`);
    }

    const { childrenTransformX, childrenTransformY, useClipPath } = this.props;

    const offsetChildrenX = childrenTransformX
      ? data.destination.focalTargetElementBoundingBox.location.left -
        data.destination.elementBoundingBox.location.left
      : 0;
    const offsetChildrenY = childrenTransformY
      ? data.destination.focalTargetElementBoundingBox.location.top -
        data.destination.elementBoundingBox.location.top
      : 0;

    const revealStyles = useClipPath
      ? {
          clipPath: `inset(0 ${data.destination.elementBoundingBox.size.width -
            data.destination.focalTargetElementBoundingBox.size.width}px ${data.destination
            .elementBoundingBox.size.height -
            data.destination.focalTargetElementBoundingBox.size.height}px 0)`,
        }
      : {
          height: data.destination.focalTargetElementBoundingBox.size.height,
          width: data.destination.focalTargetElementBoundingBox.size.width,
        };

    setChildProps({
      style: prevStyles =>
        data.destination.focalTargetElementBoundingBox
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
        data.destination.focalTargetElementBoundingBox
          ? css({
              '> *': {
                transform: `translate3d(-${offsetChildrenX}px, -${offsetChildrenY}px, 0)`,
              },
            })
          : undefined,
    });

    onFinish();
  };

  animate: AnimationCallback = (data, onFinish, setChildProps) => {
    const { timingFunction, duration, useClipPath } = this.props;
    const calculatedDuration =
      duration === 'dynamic'
        ? dynamic(data.origin.elementBoundingBox, data.destination.elementBoundingBox)
        : duration;

    const revealStyles = useClipPath
      ? {
          clipPath: 'inset(0 0 0 0)',
        }
      : {
          height: data.destination.elementBoundingBox.size.height,
          width: data.destination.elementBoundingBox.size.width,
        };

    setChildProps({
      style: prevStyles => ({
        ...prevStyles,
        ...revealStyles,
        transition: combine(
          `height ${calculatedDuration}ms ${timingFunction}, width ${calculatedDuration}ms ${timingFunction}, clip-path ${calculatedDuration}ms ${timingFunction}`
        )(prevStyles.transition),
      }),
      className: () =>
        css({
          '> *': {
            transform: `translate3d(0, 0, 0)`,
            transition: `transform ${calculatedDuration}ms ${timingFunction}`,
          },
        }),
    });

    setTimeout(() => onFinish(), calculatedDuration);
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
