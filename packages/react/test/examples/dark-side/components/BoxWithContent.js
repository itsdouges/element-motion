// @flow

import React from 'react';
import Box from './Box';
import TransitionContainer from '../../../../src/TransitionContainer';
import withTransition from '../../../../src/withTransition';

const BoxWithReverseTransition = withTransition([{
  transition: 'expand',
  duration: 0.5,
  background: '#782128',
  reverse: true,
  cover: true,
}, {
  transition: 'move',
  duration: 0.5,
  matchSize: true,
}])(Box);

const BoxWithContent = ({ onClick, src, description, name }: any) => (
  <TransitionContainer pair={name} className="content-bg">
    <div className="content-text">
      {name.toUpperCase().split('').map((char) => <span>{char}</span>)}
    </div>

    <div className="content-margin">
      <BoxWithReverseTransition
        className="box-highlighted"
        transitionPair={name}
        type="big"
        onClick={onClick}
        src={src}
      />

      {description}
    </div>
  </TransitionContainer>
);

export default BoxWithContent;
