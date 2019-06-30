import * as React from 'react';
import Collector, { CollectorChildrenProps, CollectorActions } from '../Collector';

const Wait: React.FC<CollectorChildrenProps> = (props: CollectorChildrenProps) => (
  <Collector
    data={{
      action: CollectorActions.wait,
    }}
  >
    {props.children}
  </Collector>
);

export default Wait;
