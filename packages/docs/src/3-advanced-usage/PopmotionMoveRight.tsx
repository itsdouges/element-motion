import React, { useRef } from 'react';
import { styler, tween, easing } from 'popmotion';
import Collector, { CollectorActions } from '../../../core/src/Collector';

const MoveRight = (props: any) => {
  const elementStyler = useRef<any>();

  return (
    <Collector
      data={{
        action: CollectorActions.motion,
        payload: {
          beforeAnimate: (elements, onFinish) => {
            elementStyler.current = styler(elements.destination.element);
            onFinish();
          },
          animate: (_, onFinish) => {
            tween({ from: 0, to: { x: 300 }, duration: 1000, ease: easing.backOut }).start({
              complete: () => onFinish(),
              update: elementStyler.current.set,
            });
          },
        },
      }}
    >
      {props.children}
    </Collector>
  );
};

export default MoveRight;
