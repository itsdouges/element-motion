// @flow

import React from 'react';
import Box from './Box';
import TransitionContainer from '../../../../src/TransitionContainer';
import withTransition from '../../../../src/withTransition';

const BoxWithReverseTransition = withTransition([{
  transition: 'expand',
  duration: 0.4,
  background: '#3d7596',
  reverse: true,
  cover: true,
}, {
  transition: 'move',
  duration: 0.75,
  matchSize: true,
}])(Box);

const BoxWithContent = ({ onClick }: any) => (
  <TransitionContainer pair="box-to-box" className="content-margin">
    <BoxWithReverseTransition className="box-highlighted" transitionPair="box-to-box" type="big" onClick={onClick} />
  </TransitionContainer>
);

export default BoxWithContent;
