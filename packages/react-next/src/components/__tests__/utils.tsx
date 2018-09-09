import * as React from 'react';
import Collector, { CollectorActions, CollectorChildrenProps } from '../Collector';
import noop from '../../lib/noop';
import { GetElementSizeLocationReturnValue } from '../../lib/dom';

export const BabaUnderTest = ({
  from,
  to,
  start,
}: {
  from: React.ReactNode;
  to: React.ReactNode;
  start: boolean;
}) => (start ? <aside>{to}</aside> : <main>{from}</main>);

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
