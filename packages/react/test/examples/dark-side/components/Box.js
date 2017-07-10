// @flow

import React from 'react';

type Props = { className?: string, type: 'big' | 'small', src: string, onClick: Function };

const Box = ({ type, className, src, onClick }: Props) => (
  <div
    role="presentation"
    onClick={onClick}
    className={`box box-${type}${className ? ` ${className}` : ''}`}
    // $FlowFixMe - Dynamic import
    style={{ backgroundImage: `url(${require(`../images/${src}`)})` }}
  />
);

export default Box;
