// @flow

import React from 'react';

const Box = ({ type, className, ...props }: { className?: string, type: 'big' | 'small' }) => (
  <div {...props} className={`box box-${type}${className ? ` ${className}` : ''}`} />
);

export default Box;
