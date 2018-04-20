import * as React from 'react';
import Collecter, { CommonProps, Actions, Data } from './Collector';

export default class Wait extends React.Component<CommonProps> {
  data: Data = {
    action: Actions.wait,
  };

  render() {
    return <Collecter data={this.data}>{this.props.children}</Collecter>;
  }
}
