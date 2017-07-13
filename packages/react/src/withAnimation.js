// @flow

import type { Animation } from 'yubaba-core';

import React from 'react';
import Animate from './Animate';

type Props = {
  animationPair: string,
};

const withTransition = (animations: Array<Animation>) => (WrappedComponent: ReactClass<*>) => {
  return ({ animationPair, ...props }: Props) => (
    <Animate pair={animationPair} animations={animations}>
      <WrappedComponent {...props} />
    </Animate>
  );
};

export default withTransition;
