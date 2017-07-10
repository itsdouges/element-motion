// @flow

import React from 'react';
import Box from './Box';
import TransitionContainer from '../../../../src/TransitionContainer';
import Transition from '../../../../src/Transition';

const BoxWithContent = ({ onClick, src, description, name, color }: any) => (
  <TransitionContainer pair={name} className="content-bg" style={{ backgroundColor: color }}>
    <div className="content-text">
      {name.toUpperCase().split('').map((char, index) =>
        // eslint-disable-next-line react/no-array-index-key
        <span key={index}>{char}</span>)}
    </div>

    <div className="content-margin">
      <Transition
        pair={name}
        transitions={[{
          transition: 'expand',
          duration: 0.3,
          background: color,
          reverse: true,
          cover: true,
        }, {
          transition: 'move',
          duration: 0.4,
          matchSize: true,
        }]}
      >
        <Box
          className="box-highlighted"
          transitionPair={name}
          type="big"
          onClick={onClick}
          src={src}
        />
      </Transition>

      {description}
    </div>
  </TransitionContainer>
);

export default BoxWithContent;
