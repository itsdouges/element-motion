// @flow

import React from 'react';
import Box from './Box';
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
  <div>
    <BoxWithReverseTransition transitionPair="box-to-box" type="big" onClick={onClick} />
  </div>
);

export default BoxWithContent;
