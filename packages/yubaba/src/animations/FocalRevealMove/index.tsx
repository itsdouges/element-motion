import * as React from 'react';
import FocalReveal, { FocalRevealProps } from '../FocalReveal';
import Move, { MoveProps } from '../Move';

export default class FocalRevealMove extends React.Component<FocalRevealProps & MoveProps> {
  static defaultProps = {
    ...FocalReveal.defaultProps,
    ...Move.defaultProps,
  };

  render() {
    const { children, ...props } = this.props;
    return (
      <FocalReveal {...props}>
        <Move {...props} useFocalTarget>
          {children}
        </Move>
      </FocalReveal>
    );
  }
}
