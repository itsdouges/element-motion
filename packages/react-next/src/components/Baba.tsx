import * as React from 'react';
import Collector from './Collector';
import { getElementSizeLocation } from '../lib/dom';
import * as childrenStore from '../lib/childrenStore';

/*
  v1 API

  EXAMPLE ONE - Single move animation.

  Pass ref all the way up to Baba, collecting configuration up.

  // This would move image1 over to image2 when this unmounts.
  <Baba name="image1-to-image2">
    <Move duration={300}>
      {(ref) => <Image innerRef={ref} />}
    </Move>
  </Baba>

  // This would move image2 over to image1 when this unmounts.
  <Baba name="image1-to-image2">
    <Move duration={150}>
      {(ref) => <Image innerRef={ref} />}
    </Move>
  </Baba>

  EXAMPLE TWO - Two animations.

  // 1. move image1 over to image2
  // 2. AT THE SAME TIME circle expand to cover viewport
  <Baba name="image1-to-image2">
    <CircleExpand duration={300} background="#3d7596">
      <Move duration={150}>
        {(ref) => <Image innerRef={ref} />}
      </Move>
    </CircleExpand>
  </Baba>

  // 1. move image1 over to image2
  // 2. WAIT until other transitions are finished, then
  // move shrink a circle from viewport to over image2
  <Baba name="image1-to-image2">
    <CircleExpand duration={300} background="#3d7596">
      <WaitForChildren>
        <Move duration={150}>
          {(ref) => <Image innerRef={ref} />}
        </Move>
      </WaitForChildren>
    </CircleExpand>
  </Baba>
*/

interface Props {
  name: string;
  children: React.ReactNode;
}

export default class Baba extends React.PureComponent<Props> {
  element: HTMLElement | null;
  reactNode: React.ReactNode;

  componentWillUnmount() {
    if (childrenStore.has(this.props.name)) {
      throw new Error(`
        Two <Baba name="${this.props.name}" /> were unmounted in a row - the magic happens
        when a Baba component is unmounted, then it's target is mounted. Watch out!
      `);
    }

    // Store position data so we can use it later.
    childrenStore.set(this.props.name, {
      ...getElementSizeLocation(this.element as HTMLElement),
      element: this.element as HTMLElement,
      reactNode: this.reactNode,
    });
  }

  componentDidMount() {
    const target = childrenStore.get(this.props.name);
    if (target) {
    }
  }

  setRef = (ref: HTMLElement | null) => {
    this.element = ref;
  };

  setReactNode = (reactNode: React.ReactNode) => {
    this.reactNode = reactNode;
  };

  render() {
    return (
      <Collector receiveReactNode={this.setReactNode} receiveRef={this.setRef}>
        {this.props.children}
      </Collector>
    );
  }
}
