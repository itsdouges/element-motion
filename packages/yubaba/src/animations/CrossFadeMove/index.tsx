import * as React from 'react';
import FadeMove, { FadeMoveProps } from '../FadeMove';
import Move, { MoveProps } from '../Move';

export default class CrossFadeMove extends React.Component<FadeMoveProps & MoveProps> {
  render() {
    const { children, ...props } = this.props;
    return (
      <Move {...props}>
        <FadeMove {...props}>{children}</FadeMove>
      </Move>
    );
  }
}
