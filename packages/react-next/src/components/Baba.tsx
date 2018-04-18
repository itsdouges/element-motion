import * as React from 'react';
import Collector, {
  SupplyData,
  SupplyReactNode,
  SupplyRef,
  Data,
  AnimationResult,
} from './Collector';
import { getElementSizeLocation } from '../lib/dom';
import * as childrenStore from '../lib/childrenStore';

type StartAnimation = () => Promise<AnimationResult>;
type AnimationBlock = StartAnimation[];

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

  EXAMPLE TWO - Two animations with a wait.

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
      <Wait>
        <Move duration={150}>
          {(ref) => <Image innerRef={ref} />}
        </Move>
      </Wait>
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
  data: Data[];

  componentWillUnmount() {
    if (childrenStore.has(this.props.name)) {
      throw new Error(`
        Two <Baba name="${this.props.name}" /> were unmounted in a row - the magic happens
        when a Baba component is unmounted, then it's target is mounted. Watch out!
      `);
    }

    this.store();
  }

  componentDidMount() {
    return this.execute();
  }

  store() {
    // Store position data so we can use it later.
    childrenStore.set(this.props.name, {
      ...getElementSizeLocation(this.element as HTMLElement),
      element: this.element as HTMLElement,
      reactNode: this.reactNode,
      data: this.data,
    });

    // If a target isn't found in 100ms, clear it out.
    setTimeout(() => {
      childrenStore.remove(this.props.name);
    }, 100);
  }

  execute() {
    const target = childrenStore.get(this.props.name);
    if (target) {
      const { data, reactNode, location, size, raw } = target;

      const blocks = data.reduce<AnimationBlock[]>(
        (arr, data) => {
          switch (data.action) {
            case 'animation': {
              const animate = data.payload;

              // Add to the last block in the array.
              arr[arr.length - 1].push(() =>
                animate({
                  reactNode,
                  location,
                  size,
                  raw,
                })
              );

              return arr;
            }

            case 'wait': {
              // Found a wait action, start a new block.
              arr.push([]);
              return arr;
            }

            default: {
              return arr;
            }
          }
        },
        [[]]
      );

      // Trigger each blocks animations, one block at a time.
      return blocks.reduce<Promise<AnimationResult>>(
        (promise, block) => promise.then(() => Promise.all(block.map(animate => animate()))),
        Promise.resolve({} as AnimationResult)
      );
    }

    return undefined;
  }

  setRef: SupplyRef = ref => {
    this.element = ref;
  };

  setReactNode: SupplyReactNode = reactNode => {
    this.reactNode = reactNode;
  };

  setData: SupplyData = data => {
    this.data = data;
  };

  render() {
    return (
      <Collector
        receiveData={this.setData}
        receiveReactNode={this.setReactNode}
        receiveRef={this.setRef}
      >
        {this.props.children}
      </Collector>
    );
  }
}
