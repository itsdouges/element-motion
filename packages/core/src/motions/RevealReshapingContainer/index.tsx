import * as React from 'react';
import { WrappedMotion as Motion } from '../../Motion';
import { CollectorChildrenAsFunction } from '../../Collector';
import ReshapingContainer, { ReshapingContainerProps } from '../ReshapingContainer';
import Reveal from '../Reveal';
import Move from '../Move';

interface RevealReshapingContainerProps extends ReshapingContainerProps {
  /**
   * Children as function.
   * Will receive an object with className, style, and ref.
   */
  children: CollectorChildrenAsFunction;
}

export default class RevealReshapingContainer extends React.PureComponent<
  RevealReshapingContainerProps
> {
  static defaultProps = ReshapingContainer.defaultProps;

  componentDidMount() {
    if (
      (process.env.NODE_ENV === 'development' && this.props.padding.indexOf('em') >= 0) ||
      this.props.padding.indexOf('%') >= 0
    ) {
      throw new Error(
        `Only px values are supported for props.padding in ${ReshapingContainer.name}`
      );
    }
  }

  /**
   * We're using this to increase the clip-path box of the Reveal motion so the children contents
   * line up with the parent container in this component.
   */
  getInversePaddingParts() {
    const parts = this.props.padding.split(' ').map(p => -Number(p.replace('px', '')));

    switch (parts.length) {
      case 0:
        return undefined;

      case 1:
        parts.push(parts[0]);
        parts.push(parts[0]);
        parts.push(parts[0]);
        break;

      case 2:
        parts.push(parts[0]);
        parts.push(parts[1]);
        break;

      case 3:
        parts.push(parts[1]);
        break;

      case 4:
      default:
        break;
    }

    return parts as [number, number, number, number];
  }

  render() {
    const { children, duration, timingFunction, triggerKey } = this.props;

    // The Move transition using transform fucks out in Safari with clip-path resulting in clip-path not transitioning
    return (
      <ReshapingContainer {...this.props}>
        {reshaping => (
          <Motion triggerSelfKey={triggerKey}>
            <Move scaleX={false} scaleY={false}>
              <Reveal
                duration={duration}
                offset={this.getInversePaddingParts()}
                timingFunction={timingFunction}
              >
                {motion =>
                  children({
                    ...motion,
                    style: {
                      ...motion.style,
                      ...reshaping.style,
                    },
                  })
                }
              </Reveal>
            </Move>
          </Motion>
        )}
      </ReshapingContainer>
    );
  }
}
