import * as React from 'react';
import Baba from '../../Baba';
import Move from '../Move';
import { InlineStyles } from '../../Collector';
import { Duration } from '../types';

export interface ReshapingContainerProps {
  /**
   * This should be a unique identifier across your whole app.
   */
  id: string;

  /**
   * Children as function.
   * Will receive an object with className, style, and ref.
   */
  children: (opts: { style: InlineStyles }) => React.ReactNode;

  /**
   * Defaults to "div".
   * Any valid HTML tag allowed.
   */
  as: string;

  /**
   * Used the same as the CSS property.
   * E.g. "3px"
   */
  borderRadius?: string;

  /**
   * Used the same as the CSS property.
   * E.g. "rgba(0, 0, 0, 0.5)"
   */
  background?: string;

  /**
   * Used the same as the CSS property.
   * E.g. "0 1px 50px rgba(32, 33, 36, 0.1)"
   */
  boxShadow?: string;

  /**
   * Padding.
   * Use only px values, otherwise same as the CSS property.
   * E.g. "10px"
   */
  padding: string;

  /**
   * Used the same as the CSS property.
   * E.g. "500px"
   */
  maxWidth?: string;

  /**
   * Used the same as the CSS property.
   * * E.g. "500px"
   */
  maxHeight?: string;

  /**
   * Used the same as the CSS property.
   * * E.g. "500px"
   */
  minWidth?: string;

  /**
   * Used the same as the CSS property.
   * * E.g. "500px"
   */
  minHeight?: string;

  /**
   * Used the same as the CSS property.
   * E.g. "20px auto"
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
   * Defaults to what the "as" prop is.
   */
  display?: string;

  /**
   * Used the same as the CSS property.
   * E.g. "relative"
   */
  position?: string;

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
      borderRadius,
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
                borderRadius,
              }}
            >
              <div
                aria-hidden="true"
                className={baba.className}
                style={{
                  ...baba.style,
                  background,
                  boxShadow,
                  borderRadius,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Position relative/zIndex needed to position this above the floating background. */}
              {children({ style: { position: 'relative', zIndex: 2 } })}
            </ComponentAs>
          )}
        </Move>
      </Baba>
    );
  }
}
