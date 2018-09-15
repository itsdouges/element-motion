import * as React from 'react';
import Collecter, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorData,
  CollectorActions,
} from '../../Collector';
import SimpleKeyframe from '../SimpleKeyframe';

export interface SwipeProps extends CollectorChildrenProps {
  /**
   * Background, same usage as usual css.
   */
  background: string;

  /**
   * Direction the swipe will be heading towards.
   */
  direction: 'left' | 'right' | 'up' | 'down';

  /**
   * How long the animation should take over {duration}ms.
   */
  duration?: number;
}

/**
 * ## Swipe
 *
 * Swipe will animate a block swiping over the viewport.
 */
export default class Swipe extends React.Component<SwipeProps> {
  static defaultProps = {
    duration: 500,
  };

  renderAnimation: (
    opts: { step: number | undefined; onFinish: () => void }
  ) => React.ReactElement<{}>;

  beforeAnimate: AnimationCallback = (_, onFinish) => {
    const duration = this.props.duration as number;

    this.renderAnimation = (opts: { step: number | undefined; onFinish: () => void }) => {
      const directionMap = {
        left: '100%, 0, 0',
        right: '-100%, 0, 0',
        down: '0, -100%, 0',
        up: '0, 100%, 0',
      };

      return (
        <SimpleKeyframe
          step={opts.step}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: this.props.background,
            transform: `translate3d(${directionMap[this.props.direction]})`,
            transition: `transform ease-out ${duration}ms, opacity ease-in-out ${duration}ms`,
          }}
          keyframes={[
            {
              transform: 'translate3d(0, 0, 0)',
            },
            {
              transform: 'translate3d(0, 0, 0)',
              opacity: 0,
            },
          ]}
          onFinish={opts.onFinish}
        />
      );
    };

    requestAnimationFrame(onFinish);

    return this.renderAnimation({ onFinish, step: undefined });
  };

  animate: AnimationCallback = (_, onFinish) => {
    return this.renderAnimation({ onFinish, step: 0 });
  };

  afterAnimate: AnimationCallback = (_, onFinish) => {
    return this.renderAnimation({ onFinish, step: 1 });
  };

  render() {
    const data: CollectorData = {
      action: CollectorActions.animation,
      payload: {
        beforeAnimate: this.beforeAnimate,
        animate: this.animate,
        afterAnimate: this.afterAnimate,
      },
    };

    return <Collecter data={data}>{this.props.children}</Collecter>;
  }
}
