import * as React from 'react';
import Collector, { CollectorActions, CollectorChildrenProps } from '../Collector';
import noop from '../lib/noop';
import { GetElementSizeLocationReturnValue } from '../lib/dom';

/**
 * Pass function in for `from` or `start` and it will always be rendered.
 */
export const BabaUnderTest = ({
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
        beforeAnimate: (data, onFinish, setTargetProps) => {
          onBeforeAnimate(data);
          setTimeout(onFinish, 0);
          if (beforeAnimateTargetProps) {
            setTargetProps(beforeAnimateTargetProps);
          }

          return beforeAnimateJsx;
        },
        animate: (data, onFinish, setTargetProps) => {
          onAnimate(data);
          setTimeout(onFinish, 0);
          if (animateTargetProps) {
            setTargetProps(animateTargetProps);
          }
          return animateJsx;
        },
        afterAnimate: (data, onFinish, setTargetProps) => {
          onAfterAnimate(data);
          setTimeout(onFinish, 0);
          if (afterAnimateTargetProps) {
            setTargetProps(afterAnimateTargetProps);
          }
          return afterAnimateJsx;
        },
      },
    }}
  >
    {children}
  </Collector>
);

export const domData = (): GetElementSizeLocationReturnValue => ({
  size: {
    width: 100,
    height: 200,
  },
  location: {
    left: 0,
    top: 0,
  },
  raw: {
    // tslint:disable-next-line
    rect: {} as ClientRect,
    scrollTop: 0,
    scrollLeft: 0,
  },
});
