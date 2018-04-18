import * as React from 'react';
import Collecter, { CommonProps } from './Collector';

export default class Wait extends React.Component<CommonProps> {
  render() {
    return <Collecter data={{ action: 'wait' }}>{this.props.children}</Collecter>;
  }
}
