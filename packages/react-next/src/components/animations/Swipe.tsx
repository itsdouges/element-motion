import * as React from 'react';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';
import Collecter, { CommonProps, AnimationCallback, Data, Actions } from '../Collector';
import SimpleKeyframe from '../SimpleKeyframe';

interface Props extends CommonProps {
  background: string;
  direction: 'left' | 'right' | 'up' | 'down';
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
export default class Swipe extends React.Component<Props> {
  finishAnimation: () => Promise<any>;
  renderAnimation: (at?: number) => Promise<any>;
  finishAfterAnimate: () => Promise<any>;
  finishCleanup: () => void;

  static defaultProps = {
    duration: 500,
  };

  beforeAnimate: AnimationCallback = data => {
    return new Promise(resolve => {
      window.requestAnimationFrame(() => {
        const duration = this.props.duration as number;
        const elementToMountChildren = document.createElement('div');
        document.body.appendChild(elementToMountChildren);

        this.renderAnimation = (at?: number) => {
          const directionMap = {
            left: '100%, 0, 0',
            right: '-100%, 0, 0',
            down: '0, -100%, 0',
            up: '0, 100%, 0',
          };

          return new Promise(resolve => {
            unstable_renderSubtreeIntoContainer(
              data.caller,
              <SimpleKeyframe
                at={at}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: this.props.background,
                  transform: `translate3d(${directionMap[this.props.direction]})`,
                  transition: `transform ease-out ${duration}ms, opacity ease-in-out ${duration}ms`,
                }}
                keyframes={[
                  {
                    transform: 'translate3d(0, 0, 0)',
                  },
                  {
                    transform: 'translate3d(0, 0, 0)',
                    opacity: 0,
                  },
                ]}
                onFinish={resolve}
              />,
              elementToMountChildren
            );
          });
        };

        this.renderAnimation();

        resolve();

        this.finishCleanup = () => {
          unmountComponentAtNode(elementToMountChildren);
          document.body.removeChild(elementToMountChildren);
        };

        this.finishAfterAnimate = () => this.renderAnimation(1);
      });
    });
  };

  afterAnimate: AnimationCallback = () => {
    return this.finishAfterAnimate();
  };

  abort = () => this.finishCleanup();

  cleanup = () => {
    this.finishCleanup();
  };

  animate: AnimationCallback = () => {
    return this.renderAnimation(0);
  };

  render() {
    const data: Data = {
      action: Actions.animation,
      payload: {
        animate: this.animate,
        abort: this.abort,
        beforeAnimate: this.beforeAnimate,
        afterAnimate: this.afterAnimate,
        cleanup: this.cleanup,
      },
    };

    return <Collecter data={data}>{this.props.children}</Collecter>;
  }
}
