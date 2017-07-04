// @flow

import React from 'react';

const Box = ({ type, className, src, onClick }: { className?: string, type: 'big' | 'small', src: string }) => (
  <div
    onClick={onClick}
    className={`box box-${type}${className ? ` ${className}` : ''}`}
    // $FlowFixMe - Dynamic import
    style={{ backgroundImage: `url(${require(`../images/${src}`)})` }}
  />
);

export default Box;
