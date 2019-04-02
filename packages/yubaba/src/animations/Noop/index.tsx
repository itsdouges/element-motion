import * as React from 'react';
import Collector, { CollectorChildrenProps, CollectorActions } from '../../Collector';

interface NoopProps extends CollectorChildrenProps {
  duration: number;
}

export default class Noop extends React.Component<NoopProps> {
  static defaultProps = {
    duration: 0,
  };

  render() {
    const { children, duration } = this.props;

    return (
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
  }
}
