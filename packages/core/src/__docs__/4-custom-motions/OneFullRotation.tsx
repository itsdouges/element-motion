import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  MotionCallback,
  CollectorActions,
} from '../../Collector';
import { combine } from '../../lib/style';

export default class OneFullRotation extends React.Component<CollectorChildrenProps> {
  beforeAnimate: MotionCallback = (_, onFinish, setChildProps) => {
    setChildProps({
      style: prevStyle => ({
        ...prevStyle,
        opacity: 1,
        transformOrigin: 'center',
        transform: combine(prevStyle.transform, '')('rotate(360deg)'),
      }),
    });

    onFinish();
  };

  animate: MotionCallback = (_, onFinish, setChildProps) => {
    setTimeout(onFinish, 400);

    setChildProps({
      style: prevStyle => ({
        ...prevStyle,
        transition: 'transform 400ms',
        transform: 'none',
      }),
    });
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
          },
        }}
      >
        {children}
      </Collector>
    );
  }
}
