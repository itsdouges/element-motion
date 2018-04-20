import * as React from 'react';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';
import Collecter, { CommonProps, AnimationCallback, Data, Actions } from './Collector';
import * as math from '../lib/math';
import noop from '../lib/noop';
import SimpleTween from './SimpleTween';

interface Props extends CommonProps {
  duration?: number;
}

/**
 * Move will animate the fromNode to the toNode while transitioning
 * between the two nodes for a seamless transition.
 *
 * @export
 * @class Move
 * @extends {React.Component<Props>}
 */
export default class Move extends React.Component<Props> {
  static defaultProps = {
    duration: 300,
  };

  prepare = () => {
    return Promise.resolve();
  };

  abort = () => {};

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
              zIndex: 20000,
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
            {data.fromTarget.render({
              ref: noop,
              style: {
                // Elminate any margins so they don't affect the transition.
                margin: 0,
              },
            })}
          </SimpleTween>

          <SimpleTween
            duration={this.props.duration as number}
            from={{
              ...data.toTarget.location,
              ...from,
              zIndex: 19999,
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
            }}
            // TODO: Add a TweenManager or something so we receive one
            // hook to tell us all tweens are finished.
            onFinish={() => {}}
          >
            {data.toTarget.render({
              ref: noop,
              style: {
                // Elminate any margins so they don't affect the transition.
                margin: 0,
              },
            })}
          </SimpleTween>
        </>,
        elementToMountChildren
      );
    });
  };

  render() {
    const data: Data = {
      action: Actions.animation,
      payload: {
        animate: this.animate,
        abort: this.abort,
        prepare: this.prepare,
      },
    };

    return <Collecter data={data}>{this.props.children}</Collecter>;
  }
}
