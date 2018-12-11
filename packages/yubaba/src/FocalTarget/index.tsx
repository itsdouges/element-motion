import * as React from 'react';
import { CollectorContext, SupplyRefHandler } from '../Collector';
import noop from '../lib/noop';

interface FocalTargetChildProps {
  ref: SupplyRefHandler;
}

interface FocalTargetProps {
  children: (props: FocalTargetChildProps) => React.ReactNode;
}

export default class Target extends React.Component<FocalTargetProps> {
  render() {
    return (
      <CollectorContext.Consumer>
        {collect => {
          return this.props.children({ ref: collect ? collect.focalTargetRef : noop });
        }}
      </CollectorContext.Consumer>
    );
  }
}
