import * as React from 'react';
import Baba from '../../Baba';
import { CollectorChildrenAsFunction } from '../../Collector';
import ReshapingContainer, { ReshapingContainerProps } from '../ReshapingContainer';
import SimpleReveal from '../SimpleReveal';

interface RevealReshapingContainerProps extends ReshapingContainerProps {
  /**
   * Children as function.
   * Will receive an object with className, style, and ref.
   */
  children: CollectorChildrenAsFunction;
}

interface RevealReshapingContainerState {
  renderCount: number;
}

export default class RevealReshapingContainer extends React.PureComponent<
  RevealReshapingContainerProps,
  RevealReshapingContainerState
> {
  static defaultProps = ReshapingContainer.defaultProps;

  state: RevealReshapingContainerState = {
    renderCount: 0,
  };

  /**
   * Incremeent render count every time a render occurs.
   * We're abusing react "key" to trigger animations for now.
   */
  static getDerivedStateFromProps(
    _: RevealReshapingContainerProps,
    state: RevealReshapingContainerState
  ) {
    return {
      renderCount: state.renderCount + 1,
    };
  }

  componentDidMount() {
    if (this.props.padding.indexOf('em') >= 0 || this.props.padding.indexOf('%') >= 0) {
      throw new Error(
        `Only px values are supported for props.padding in ${ReshapingContainer.name}`
      );
    }
  }

  /**
   * We're using this to increase the clip-path box of the Reveal animation so the children contents
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
    const { children, duration, id, timingFunction } = this.props;

    return (
      <ReshapingContainer {...this.props}>
        {reshaping => (
          <Baba name={`${id}-children`} key={this.state.renderCount}>
            <SimpleReveal
              duration={duration}
              offset={this.getInversePaddingParts()}
              timingFunction={timingFunction}
            >
              {baba =>
                children({
                  ...baba,
                  style: {
                    ...baba.style,
                    ...reshaping.style,
                  },
                })
              }
            </SimpleReveal>
          </Baba>
        )}
      </ReshapingContainer>
    );
  }
}
