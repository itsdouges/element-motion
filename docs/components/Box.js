// @flow

import React from 'react';

const Box = ({ type, className, src, ...props }: { className?: string, type: 'big' | 'small', src: string }) => (
  <div
    {...props}
    className={`box box-${type}${className ? ` ${className}` : ''}`}
    // $FlowFixMe - Dynamic import
    style={{ backgroundImage: `url(${require(`../images/${src}`)})` }}
  />
);

export default Box;
