import * as React from 'react';
import Collector, { CollectorChildrenProps, CollectorActions } from '../../Collector';

/**
 * @hidden
 */
const Noop: React.StatelessComponent<CollectorChildrenProps & { duration: number }> = ({
  children,
  duration,
}) => (
  <Collector
    data={{
      action: CollectorActions.animation,
      payload: {
        beforeAnimate: (_, onFinish) => {
          onFinish();
        },
        animate: (_, onFinish) => {
          setTimeout(onFinish, duration);
        },
        afterAnimate: (_, onFinish) => {
          onFinish();
        },
      },
    }}
  >
    {children}
  </Collector>
);

export default Noop;
