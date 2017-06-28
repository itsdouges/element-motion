// @flow

import type { Options } from './Transition';

import React from 'react';
import Transition from './Transition';

type Props = {
  transitionPair: string,
};

type HOCOptions = Options & {
  transition: 'move',
};

const withTransition = ({ transition, ...options }: HOCOptions) => (WrappedComponent: ReactClass<*>) => {
  return ({ transitionPair, ...props }: Props) => (
    <Transition pair={transitionPair} transition={transition} options={options}>
      <WrappedComponent {...props} />
    </Transition>
  );
};

export default withTransition;
