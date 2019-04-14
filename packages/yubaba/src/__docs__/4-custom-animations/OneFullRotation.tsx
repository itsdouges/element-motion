import * as React from 'react';
import Collector, {
  CollectorChildrenProps,
  AnimationCallback,
  CollectorActions,
} from '../../Collector';
import { combine } from '../../lib/style';

export default class OneFullRotation extends React.Component<CollectorChildrenProps> {
  beforeAnimate: AnimationCallback = (_, onFinish, setChildProps) => {
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

  animate: AnimationCallback = (_, onFinish, setChildProps) => {
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
          action: CollectorActions.animation,
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
