// @flow

import type { Transition as TransitionOptions } from 'yubaba-core';

import React from 'react';
import Transition from './Transition';

type Props = {
  transitionPair: string,
};

const withTransition = (transitions: Array<TransitionOptions>) => (WrappedComponent: ReactClass<*>) => {
  return ({ transitionPair, ...props }: Props) => (
    <Transition pair={transitionPair} transitions={transitions}>
      <WrappedComponent {...props} />
    </Transition>
  );
};

export default withTransition;
