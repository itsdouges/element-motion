import * as React from 'react';
import Collecter, { CollectorChildrenProps, CollectorActions, CollectorData } from '../Collector';

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
    return <Collecter data={this.data}>{this.props.children}</Collecter>;
  }
}
