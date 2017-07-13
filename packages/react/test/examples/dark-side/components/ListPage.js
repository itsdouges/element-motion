// @flow

import React from 'react';
import Photo from './Photo';
import Transition from '../../../../src/Transition';
import items from './data';
import createScrollStore from './KeepScrollPosition';

const RestoreScrollPositionOnMount = createScrollStore();

const ListPage = ({ onClick }: { onClick: Function }) => (
  <div className="container">
    <RestoreScrollPositionOnMount />

    <img alt="Empire Insignia" src={`${require('../images/logo.png')}`} className="insignia" />

    <div className="container-inner">
      {items.map((item) => (
        <Transition
          key={item.name}
          pair={item.name}
          transitions={[[{
            transition: 'circle-expand',
            background: item.color,
            duration: 600,
            fadeout: 500,
          }, {
            transition: 'move',
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
        </Transition>
      ))}
    </div>

    <div className="vader-container">
      <div className="vader-bg" />
    </div>
  </div>
);

export default ListPage;
