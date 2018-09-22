import * as React from 'react';
import Collector, { CollectorChildrenProps, CollectorActions, CollectorData } from '../Collector';

/**
 * ## Wait
 *
 * Wait is used to pause the execution of all parent animations until all children animations have completed.
 */
export default class Wait extends React.Component<CollectorChildrenProps> {
  data: CollectorData = {
    action: CollectorActions.wait,
  };

  render() {
    return <Collector data={this.data}>{this.props.children}</Collector>;
  }
}
