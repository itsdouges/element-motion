import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
} from '../../Collector';
import SimpleKeyframe from '../SimpleKeyframe';
import { standard, decelerate } from '../../lib/curves';
import { zIndexStack } from '../../lib/style';

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
  duration: number;

  /**
   * zIndex to be applied to the moving element.
   */
  zIndex: number;
}

export default class Swipe extends React.Component<SwipeProps> {
  static defaultProps = {
    duration: 500,
    zIndex: zIndexStack.swipe,
  };

  renderAnimation = (options: { step: number | undefined; onFinish: () => void }) => {
    const { duration, background, direction, zIndex } = this.props;

    const directionMap = {
      left: '100%, 0, 0',
      right: '-100%, 0, 0',
      down: '0, -100%, 0',
      up: '0, 100%, 0',
    };

    return (
      <SimpleKeyframe
        step={options.step}
        style={{
          zIndex,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background,
          transform: `translate3d(${directionMap[direction]})`,
          transition: `transform ${decelerate()} ${duration}ms, opacity ${standard()} ${duration}ms`,
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
        onFinish={options.onFinish}
      />
    );
  };

  beforeAnimate: AnimationCallback = (_, onFinish) => {
    onFinish();
    return this.renderAnimation({ onFinish, step: undefined });
  };

  animate: AnimationCallback = (_, onFinish) => {
    return this.renderAnimation({ onFinish, step: 0 });
  };

  afterAnimate: AnimationCallback = (_, onFinish) => {
    return this.renderAnimation({ onFinish, step: 1 });
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
