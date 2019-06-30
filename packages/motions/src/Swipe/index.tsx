import * as React from 'react';
import {
  Collector,
  CollectorChildrenProps,
  MotionCallback,
  CollectorActions,
  standard,
  zIndexStack,
  decelerate,
} from '@element-motion/utils';
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
   * How long the motion should take over {duration}ms.
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

  renderMotion = (options: { step: number | undefined; onFinish: () => void }) => {
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

  beforeAnimate: MotionCallback = (_, onFinish) => {
    onFinish();
    return this.renderMotion({ onFinish, step: undefined });
  };

  animate: MotionCallback = (_, onFinish) => {
    return this.renderMotion({ onFinish, step: 0 });
  };

  afterAnimate: MotionCallback = (_, onFinish) => {
    return this.renderMotion({ onFinish, step: 1 });
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
            afterAnimate: this.afterAnimate,
          },
        }}
      >
        {children}
      </Collector>
    );
  }
}
