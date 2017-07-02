// @flow

import React from 'react';

const Box = ({ type, className, src, ...props }: { className?: string, type: 'big' | 'small', src: string }) => (
  <div
    {...props}
    className={`box box-${type}${className ? ` ${className}` : ''}`}
    style={{ backgroundImage: `url(/dist/${require(`../images/${src}`)})` }}
  />
);

export default Box;
