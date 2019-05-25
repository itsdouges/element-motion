import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
} from '../../Collector';

export default class SupportingAnimation extends React.Component<CollectorChildrenProps> {
  beforeAnimate: AnimationCallback = (_, onFinish) => {
    onFinish();

    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          zIndex: 9999999,
          transform: 'scaleX(0)',
        }}
      />
    );
  };

  animate: AnimationCallback = (_, onFinish) => {
    setTimeout(onFinish, 400);

    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#468cee',
          zIndex: 9999999,
          transform: 'none',
          transition: 'transform 400ms',
        }}
      />
    );
  };

  afterAnimate: AnimationCallback = (_, onFinish) => {
    setTimeout(onFinish, 200);

    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          zIndex: 9999999,
          transform: 'none',
          transition: 'opacity 200ms',
          opacity: 0,
        }}
      />
    );
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
