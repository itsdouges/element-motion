// @flow

import React from 'react';
import Photo from './Photo';
import Transition from '../../../../src/Transition';
import items from './data';
import ScrollToTopOnMount from '../../ScrollToTOpOnMount';

const ListPage = ({ onClick }: { onClick: Function }) => (
  <div className="container">
    <ScrollToTopOnMount />
    <img alt="Empire Insignia" src={`${require('../images/logo.png')}`} className="insignia" />

    <div className="container-inner">
      {items.map((item) => (
        <Transition
          key={item.name}
          pair={item.name}
          transitions={[{
            transition: 'expand',
            duration: 0.4,
            background: item.color,
          }, {
            transition: 'move',
            duration: 0.5,
          }]}
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
