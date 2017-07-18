// @flow

import React from 'react';
import Photo from './Photo';
import AnimationContainer from '../../../../src/AnimateContainer';
import Animate from '../../../../src/Animate';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';

const DetailsPage = ({ onClick, src, description, name, color }: any) => (
  <AnimationContainer pair={name} className="content-bg" style={{ backgroundColor: color }}>
    <ScrollToTopOnMount />

    <div className="content-text">
      {name.toUpperCase().split('').map((char, index) =>
        // eslint-disable-next-line react/no-array-index-key
        <span key={index}>{char}</span>)}
    </div>

    <div className="content-margin">
      <Animate
        pair={name}
        animations={[[{
          animationName: 'move',
          duration: 400,
        }, {
          animationName: 'circle-shrink',
          duration: 400,
          background: color,
          fadeout: 500,
        }]]}
      >
        <Photo
          className="box-highlighted"
          onClick={onClick}
          type="big"
          src={src}
        />
      </Animate>

      {description}
    </div>
  </AnimationContainer>
);

export default DetailsPage;
