// @flow

import type { TransitionOptions } from './Transition';

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
