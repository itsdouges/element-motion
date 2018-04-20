import * as React from 'react';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';
import Collecter, { CommonProps, AnimationCallback, Data, Actions } from '../Collector';
import { calculateHypotenuse } from '../../lib/math';
import { calculateWindowCentre, calculateElementCenterInViewport } from '../../lib/dom';
import SimpleTween from '../SimpleTween';

interface Props extends CommonProps {
  background: string;
  duration?: number;
}

/**
 * CircleShrink will animate a circle from the entire window
 * to cover end target, and then fade out.
 *
 * Generally you will use CircleShrink and CircleExpand together
 * to seamlessly transition the background between pages.
 *
 * @export
 * @class CircleShrink
 * @extends {React.Component<Props>}
 */
export default class CircleShrink extends React.Component<Props> {
  finishAnimation: () => Promise<any>;
  finishCleanup: () => void;

  static defaultProps = {
    duration: 500,
  };

  prepare: AnimationCallback = data => {
    console.log('hi');
    return new Promise(resolve => {
      window.requestAnimationFrame(() => {
        const duration = this.props.duration as number;
        const minSize = Math.min(data.toTarget.size.width, data.toTarget.size.height);
        const toTargetHypotenuse = calculateHypotenuse(data.toTarget.size);
        const toTargetCenterInViewport = calculateElementCenterInViewport(data.toTarget);
        const viewportCenter = calculateWindowCentre();
        const windowHypotenuse = calculateHypotenuse({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        const difference = {
          width: viewportCenter.left - toTargetCenterInViewport.left,
          height: viewportCenter.top - toTargetCenterInViewport.top,
        };
        const hypotenuseDifference = calculateHypotenuse(difference);
        const scale = Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize);
        const elementToMountChildren = document.createElement('div');
        document.body.appendChild(elementToMountChildren);

        const render = (start: boolean, finish: () => void = () => {}) => {
          unstable_renderSubtreeIntoContainer(
            data.caller,
            <SimpleTween
              duration={duration}
              start={start}
              from={{
                left:
                  data.toTarget.location.left - (toTargetHypotenuse - data.toTarget.size.width) / 2,
                top:
                  data.toTarget.location.top - (toTargetHypotenuse - data.toTarget.size.height) / 2,
                width: toTargetHypotenuse,
                height: toTargetHypotenuse,
                borderRadius: '50%',
                position: 'absolute',
                background: this.props.background,
                zIndex: 10000,
                transition: `transform ease-out ${duration}ms`,
                transform: `scale(${scale})`,
              }}
              to={{
                transform: 'scale(1)',
              }}
              onFinish={finish}
            />,
            elementToMountChildren
          );
        };

        render(false);
        resolve();

        this.finishAnimation = () => {
          return new Promise(resolve => {
            render(true, () => {
              resolve();
            });
          });
        };

        this.finishCleanup = () => {
          unmountComponentAtNode(elementToMountChildren);
          document.body.removeChild(elementToMountChildren);
        };
      });
    });
  };

  abort = () => {};

  cleanup = () => {
    this.finishCleanup();
  };

  animate: AnimationCallback = () => {
    return this.finishAnimation();
  };

  render() {
    const data: Data = {
      action: Actions.animation,
      payload: {
        animate: this.animate,
        abort: this.abort,
        prepare: this.prepare,
        cleanup: this.cleanup,
      },
    };

    return <Collecter data={data}>{this.props.children}</Collecter>;
  }
}
