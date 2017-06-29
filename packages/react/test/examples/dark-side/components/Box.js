// @flow

import React from 'react';

const Box = ({ type, className, src, ...props }: { className?: string, type: 'big' | 'small' }) => (
  <div {...props} className={`box box-${type}${className ? ` ${className}` : ''}`} style={{ backgroundImage: `url(${src})` }} />
);

export default Box;
