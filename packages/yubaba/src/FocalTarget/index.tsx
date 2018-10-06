import * as React from 'react';
import { CollectorContext, SupplyRefHandler } from '../Collector';
import noop from '../lib/noop';

interface FocalTargetChildProps {
  ref: SupplyRefHandler;
}

interface FocalTargetProps {
  children: (props: FocalTargetChildProps) => React.ReactNode;
}

export default class FocalTarget extends React.Component<FocalTargetProps> {
  render() {
    const { children } = this.props;
    return (
      <CollectorContext.Consumer>
        {collect => {
          return children({ ref: collect ? collect.focalTargetRef : noop });
        }}
      </CollectorContext.Consumer>
    );
  }
}
