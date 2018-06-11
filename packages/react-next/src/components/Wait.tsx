import * as React from 'react';
import Collecter, { CommonProps, Actions, Data } from './Collector';

/**
 * ## Wait
 *
 * Wait is used to pause the execution of all parent animations until all children animations have completed.
 */
export default class Wait extends React.Component<CommonProps> {
  data: Data = {
    action: Actions.wait,
  };

  render() {
    return <Collecter data={this.data}>{this.props.children}</Collecter>;
  }
}
