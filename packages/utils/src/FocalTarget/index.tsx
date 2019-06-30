import * as React from 'react';
import { CollectorContext, SupplyRefHandler } from '../Collector';
import noop from '../lib/noop';

interface FocalTargetChildProps {
  ref: SupplyRefHandler;
}

interface FocalTargetProps {
  children: (props: FocalTargetChildProps) => React.ReactNode;
}

const FocalTarget: React.FC<FocalTargetProps> = (props: FocalTargetProps) => (
  <CollectorContext.Consumer>
    {collect => {
      return props.children({ ref: collect ? collect.focalTargetRef : noop });
    }}
  </CollectorContext.Consumer>
);

export default FocalTarget;
