import * as React from 'react';
import { CollectorContext, SupplyRefHandler } from '../Collector';
import noop from '../lib/noop';

interface TargetChildProps {
  ref: SupplyRefHandler;
}

interface TargetProps {
  children: (props: TargetChildProps) => React.ReactNode;
}

export default class Target extends React.Component<TargetProps> {
  render() {
    return (
      <CollectorContext.Consumer>
        {collect => {
          return this.props.children({ ref: collect ? collect.targetRef : noop });
        }}
      </CollectorContext.Consumer>
    );
  }
}
