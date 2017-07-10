// @flow

import React from 'react';
import Box from './Box';
import TransitionContainer from '../../../../src/TransitionContainer';
import withTransition from '../../../../src/withTransition';

const BoxWithReverseTransition = withTransition([{
  transition: 'expand',
  duration: 0.3,
  background: '#782128',
  reverse: true,
  cover: true,
}, {
  transition: 'move',
  duration: 0.4,
  matchSize: true,
}])(Box);

const BoxWithContent = ({ onClick, src, description, name }: any) => (
  <TransitionContainer pair={name} className="content-bg">
    <div className="content-text">
      {name.toUpperCase().split('').map((char, index) =>
        // eslint-disable-next-line react/no-array-index-key
        <span key={index}>{char}</span>)}
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
