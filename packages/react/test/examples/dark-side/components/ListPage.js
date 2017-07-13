// @flow

import React from 'react';
import Photo from './Photo';
import Animate from '../../../../src/Animate';
import items from './data';
import createScrollStore from './KeepScrollPosition';

const RestoreScrollPositionOnMount = createScrollStore();

const ListPage = ({ onClick }: { onClick: Function }) => (
  <div className="container">
    <RestoreScrollPositionOnMount />

    <img alt="Empire Insignia" src={`${require('../images/logo.png')}`} className="insignia" />

    <div className="container-inner">
      {items.map((item) => (
        <Animate
          key={item.name}
          pair={item.name}
          animations={[[{
            animationName: 'circle-expand',
            background: item.color,
            duration: 600,
            fadeout: 500,
          }, {
            animationName: 'move',
            duration: 500,
          }]]}
        >
          <Photo
            {...item}
            key={item.name}
            type="small"
            className="box-highlighted"
            onClick={() => onClick(item)}
          />
        </Animate>
      ))}
    </div>

    <div className="vader-container">
      <div className="vader-bg" />
    </div>
  </div>
);

export default ListPage;
