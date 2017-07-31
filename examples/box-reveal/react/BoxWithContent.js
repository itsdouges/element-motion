// @flow

import React from 'react';
import Box from './Box';
import AnimateContainer from '../../../../src/AnimateContainer';
import withAnimation from '../../../../src/withAnimation';

const BoxWithReverseTransition = withAnimation([{
  transition: 'expand',
  duration: 0.4,
  background: '#3d7596',
  reverse: true,
  cover: true,
}, {
  transition: 'move',
  duration: 0.7,
  matchSize: true,
}])(Box);

const BoxWithContent = ({ onClick }: any) => (
  <AnimateContainer pair="box-to-box" className="content-margin">
    <BoxWithReverseTransition className="box-highlighted" animationPair="box-to-box" type="big" onClick={onClick} />
  </AnimateContainer>
);

export default BoxWithContent;
