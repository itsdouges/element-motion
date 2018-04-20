import * as React from 'react';
import Collecter, { CommonProps, Actions, Data } from './Collector';

/**
 * Wait is used to pause a parent animation until all parent
 * animations have completed.
 *
 * @export
 * @class Wait
 * @extends {React.Component<CommonProps>}
 */
export default class Wait extends React.Component<CommonProps> {
  data: Data = {
    action: Actions.wait,
  };

  render() {
    return <Collecter data={this.data}>{this.props.children}</Collecter>;
  }
}
