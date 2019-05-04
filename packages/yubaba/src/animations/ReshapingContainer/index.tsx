import * as React from 'react';
import Baba from '../../Baba';
import Move from '../Move';
import { CollectorChildrenAsFunction } from '../../Collector';
import SimpleReveal from '../SimpleReveal';
import { Duration } from '../types';

interface ReshapingContainerProps {
  /**
   * This should be a unique identifier across your whole app.
   */
  id: string;

  /**
   * Children as function.
   * Will receive an object with className, style, and ref.
   */
  children: CollectorChildrenAsFunction;

  /**
   * Defaults to "div".
   * Any valid HTML tag allowed.
   */
  as: string;

  /**
   * Used the same as the CSS property.
   */
  background?: string;

  /**
   * Used the same as the CSS property.
   */
  boxShadow?: string;

  /**
   * Padding.
   * Use only px values, otherwise same as the CSS property.
   */
  padding: string;

  /**
   * Used the same as the CSS property.
   */
  maxWidth?: string;

  /**
   * Used the same as the CSS property.
   */
  maxHeight?: string;

  /**
   * Used the same as the CSS property.
   */
  minWidth?: string;

  /**
   * Used the same as the CSS property.
   */
  minHeight?: string;

  /**
   * Used the same as the CSS property.
   */
  margin?: string;

  /**
   * Takes either "dynamic" or a number in ms.
   * How long the animation should take over {duration}ms.
   * Defaults to "dynamic".
   */
  duration?: Duration;

  /**
   * Used the same as the CSS property.
   */
  display?: string;

  /**
   * Timing function to be used in the transition.
   */
  timingFunction?: string;
}

interface ReshapingContainerState {
  renderCount: number;
}

export default class ReshapingContainer extends React.PureComponent<
  ReshapingContainerProps,
  ReshapingContainerState
> {
  static defaultProps = {
    as: 'div',
    padding: '',
  };

  state: ReshapingContainerState = {
    renderCount: 0,
  };

  /**
   * Incremeent render count every time a render occurs.
   * We're abusing react "key" to trigger animations for now.
   */
  static getDerivedStateFromProps(_: ReshapingContainerProps, state: ReshapingContainerState) {
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
    const {
      children,
      background,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      boxShadow,
      margin,
      padding,
      duration,
      id,
      display,
      timingFunction,
      ...rest
    } = this.props;
    const ComponentAs = rest.as as any;

    return (
      <Baba name={`${id}-container`} key={this.state.renderCount}>
        <Move duration={duration} timingFunction={timingFunction}>
          {baba => (
            <ComponentAs
              ref={baba.ref}
              style={{
                position: 'relative',
                minWidth,
                maxWidth,
                minHeight,
                maxHeight,
                margin,
                padding,
                display,
              }}
            >
              <div
                aria-hidden="true"
                className={baba.className}
                style={{
                  ...baba.style,
                  background,
                  boxShadow,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
              />

              <Baba name={`${id}-children`} key={this.state.renderCount}>
                <SimpleReveal
                  duration={duration}
                  offset={this.getInversePaddingParts()}
                  timingFunction={timingFunction}
                >
                  {props => children(props)}
                </SimpleReveal>
              </Baba>
            </ComponentAs>
          )}
        </Move>
      </Baba>
    );
  }
}
