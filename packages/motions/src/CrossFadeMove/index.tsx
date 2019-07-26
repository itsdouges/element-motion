import * as React from 'react';
import FadeMove, { FadeMoveProps } from '../FadeMove';
import Move, { MoveProps } from '../Move';

export default class CrossFadeMove extends React.Component<Partial<FadeMoveProps & MoveProps>> {
  render() {
    const { children, ...props } = this.props;
    return (
      <FadeMove {...props}>
        <Move {...props}>{children!}</Move>
      </FadeMove>
    );
  }
}
