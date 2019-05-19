import * as React from 'react';
import Collector, { CollectorActions, CollectorChildrenProps } from '../Collector';
import noop from '../lib/noop';
import { ElementBoundingBox } from '../lib/dom';

/**
 * Pass function in for `from` or `start` and it will always be rendered.
 */
export const AnimatorUnderTest = ({
  from,
  to,
  start,
}: {
  from: React.ReactNode | ((start: boolean) => React.ReactNode);
  to: React.ReactNode | ((start: boolean) => React.ReactNode);
  start: boolean;
}) => {
  const showTo = typeof to === 'function' || start;
  const showFrom = typeof from === 'function' || !start;
  const toElement = typeof to === 'function' ? to(start) : to;
  const fromElement = typeof from === 'function' ? from(start) : from;

  return (
    <React.Fragment>
      {showFrom && <aside>{fromElement}</aside>}
      {showTo && <main>{toElement}</main>}
    </React.Fragment>
  );
};

export const createTestAnimation = ({
  onBeforeAnimate = noop,
  onAnimate = noop,
  onAfterAnimate = noop,
  beforeAnimateJsx,
  animateJsx,
  afterAnimateJsx,
  beforeAnimateTargetProps,
  animateTargetProps,
  afterAnimateTargetProps,
}: any = {}): React.StatelessComponent<CollectorChildrenProps> => ({ children }) => (
  <Collector
    data={{
      action: CollectorActions.animation,
      payload: {
        beforeAnimate: (data, onFinish, setChildProps) => {
          onBeforeAnimate(data);
          setTimeout(onFinish, 0);
          if (beforeAnimateTargetProps) {
            setChildProps(beforeAnimateTargetProps);
          }

          return beforeAnimateJsx;
        },
        animate: (data, onFinish, setChildProps) => {
          onAnimate(data);
          setTimeout(onFinish, 0);
          if (animateTargetProps) {
            setChildProps(animateTargetProps);
          }

          return animateJsx;
        },
        afterAnimate: (data, onFinish, setChildProps) => {
          onAfterAnimate(data);
          setTimeout(onFinish, 0);
          if (afterAnimateTargetProps) {
            setChildProps(afterAnimateTargetProps);
          }
          return afterAnimateJsx;
        },
      },
    }}
  >
    {children}
  </Collector>
);

export const domData = (): ElementBoundingBox => ({
  size: {
    width: 100,
    height: 200,
  },
  location: {
    left: 0,
    top: 0,
  },
  raw: {
    rect: {} as ClientRect,
    scrollTop: 0,
    scrollLeft: 0,
  },
});
