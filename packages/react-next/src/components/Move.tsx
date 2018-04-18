import * as React from 'react';
import Collecter, { CommonProps, AnimationCallback } from './Collector';

interface Props extends CommonProps {
  duration?: number;
}

export default class Move extends React.Component<Props> {
  animate: AnimationCallback = data => {
    console.log('starting');
    console.log(data);

    return new Promise(resolve => {
      setTimeout(() => {
        console.log('finished');
        resolve();
      }, this.props.duration || 100);
    });
  };

  render() {
    return <Collecter data={this.animate}>{this.props.children}</Collecter>;
  }
}
