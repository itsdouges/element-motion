// @flow

import React from 'react';
import Box from './Box';

import { withAnimation, AnimateContainer } from '../../../packages/react/src';

// Note both animations happen at the same time because they're
// inside their own array!
const BoxWithReverseTransition = withAnimation([[{
  animationName: 'circle-shrink',
  duration: 700,
  background: '#3d7596',
  // Note fadeout is true! If it's false, it will disappear immediately after the
  // animation.
  fadeout: 200,
}, {
  animationName: 'move',
  duration: 400,
}]])(Box);

const BoxWithContent = ({ onClick }: any) => (
  <AnimateContainer pair="box-to-box" className="content-margin">
    <BoxWithReverseTransition className="box-highlighted" animationPair="box-to-box" type="big" onClick={onClick} />
  </AnimateContainer>
);

export default BoxWithContent;
