import * as React from 'react';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';
import Collecter, { CommonProps, AnimationCallback, Data, Actions } from './Collector';
import * as math from '../lib/math';
import SimpleTween from './SimpleTween';

interface Props extends CommonProps {
  duration?: number;
}

export default class Move extends React.Component<Props> {
  static defaultProps = {
    duration: 300,
  };

  noop = () => {};

  // This animation will transition the from node to the to node
  // and the to node to the to node, with a fade in between so we
  // get a nice seamless transition.
  animate: AnimationCallback = data => {
    return new Promise(resolve => {
      const fromEndXOffset = data.toTarget.location.left - data.fromTarget.location.left;
      const fromEndYOffset = data.toTarget.location.top - data.fromTarget.location.top;
      const toStartXOffset = data.fromTarget.location.left - data.toTarget.location.left;
      const toStartYOffset = data.fromTarget.location.top - data.toTarget.location.top;
      const elementToMountChildren = document.createElement('div');
      const duration = this.props.duration as number;
      const noTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
      document.body.appendChild(elementToMountChildren);

      const from = {
        transition: `transform ${duration}ms, opacity ${duration / 2}ms`,
        position: 'absolute',
        transformOrigin: '0 0',
      };

      // This will preserve react context.
      unstable_renderSubtreeIntoContainer(
        data.caller,
        <>
          <SimpleTween
            duration={this.props.duration as number}
            from={{
              ...data.fromTarget.location,
              ...from,
              transform: noTransform,
              opacity: 1,
            }}
            to={{
              transform: `translate3d(${fromEndXOffset}px, ${fromEndYOffset}px, 0) scale3d(${math.percentageDifference(
                data.toTarget.size.width,
                data.fromTarget.size.width
              )}, ${math.percentageDifference(
                data.toTarget.size.height,
                data.fromTarget.size.height
              )}, 1)`,
              opacity: 0,
            }}
            onFinish={() => {
              unmountComponentAtNode(elementToMountChildren);
              document.body.removeChild(elementToMountChildren);
              resolve();
            }}
          >
            {data.fromTarget.render({ ref: this.noop, style: {} })}
          </SimpleTween>

          <SimpleTween
            duration={this.props.duration as number}
            from={{
              ...data.toTarget.location,
              ...from,
              opacity: 0,
              transform: `translate3d(${toStartXOffset}px, ${toStartYOffset}px, 0) scale3d(${math.percentageDifference(
                data.fromTarget.size.width,
                data.toTarget.size.width
              )}, ${math.percentageDifference(
                data.fromTarget.size.height,
                data.toTarget.size.height
              )}, 1)`,
            }}
            to={{
              transform: noTransform,
              opacity: 1,
            }}
            // TODO: Add a TweenManager or something so we receive one
            // hook to tell us all tweens are finished.
            onFinish={() => {}}
          >
            {data.toTarget.render({ ref: this.noop, style: {} })}
          </SimpleTween>
        </>,
        elementToMountChildren
      );
    });
  };

  render() {
    const data: Data = {
      action: Actions.animation,
      payload: this.animate,
    };

    return <Collecter data={data}>{this.props.children}</Collecter>;
  }
}
