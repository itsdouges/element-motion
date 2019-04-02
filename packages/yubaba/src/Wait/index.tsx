import * as React from 'react';
import Collector, { CollectorChildrenProps, CollectorActions, CollectorData } from '../Collector';

export default class Wait extends React.Component<CollectorChildrenProps> {
  data: CollectorData = {
    action: CollectorActions.wait,
  };

  render() {
    return <Collector data={this.data}>{this.props.children}</Collector>;
  }
}
