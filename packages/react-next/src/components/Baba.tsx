import * as React from 'react';
import Collector, {
  SupplyData,
  SupplyRenderChildren,
  SupplyRef,
  ChildrenAsFunction,
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
  onFinish?: () => {};
}

interface State {
  shown: boolean;
}

export default class Baba extends React.PureComponent<Props, State> {
  state: State = {
    shown: false,
  };

  element: HTMLElement | null;
  renderChildren: ChildrenAsFunction;
  data: Data[];
  hasStoredBefore: boolean = false;
  cancelClear?: () => void;

  componentDidMount() {
    if (childrenStore.has(this.props.name)) {
      // A child has already been stored, so this is probably the matching pair.
      // Lets execute!
      return this.execute();
    } else {
      // Ok nothing is there yet, show our children and store DOM data for later.
      // We'll be waiting for another <Baba /> instance to mount.
      this.setState({
        shown: true,
      });
      this.store();
    }

    return undefined;
  }

  componentWillUnmount() {
    this.delayedClear();
  }

  componentDidUpdate() {
    if (this.hasStoredBefore) {
      // This instance has stored before, and we've been updated. Let's store DOM data for later.
      this.store();
    }
  }

  delayedClear() {
    const id = setTimeout(() => {
      childrenStore.remove(this.props.name);
    }, 50);

    return () => clearTimeout(id);
  }

  store() {
    childrenStore.set(this.props.name, {
      ...getElementSizeLocation(this.element as HTMLElement),
      element: this.element as HTMLElement,
      render: this.renderChildren,
      data: this.data,
    });

    this.hasStoredBefore = true;
  }

  execute() {
    const fromTarget = childrenStore.get(this.props.name);
    if (fromTarget) {
      const { data, ...target } = fromTarget;

      const blocks = fromTarget.data.reduce<AnimationBlock[]>(
        (arr, data) => {
          switch (data.action) {
            case 'animation': {
              const animate = data.payload;

              // Add to the last block in the array.
              arr[arr.length - 1].push(() =>
                animate({
                  caller: this,
                  fromTarget: target,
                  toTarget: {
                    render: this.renderChildren,
                    ...getElementSizeLocation(this.element as HTMLElement),
                  },
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
      return blocks
        .reduce<Promise<AnimationResult>>(
          (promise, block) => promise.then(() => Promise.all(block.map(animate => animate()))),
          Promise.resolve({} as AnimationResult)
        )
        .then(() => {
          // We're finished all the transitions! Show the child element.
          this.setState({
            shown: true,
          });

          // We don't need the previous children now. Now this instance is the new target!
          // Store DOM data for later so when another target is mounted, the data is there.
          this.store();

          if (this.props.onFinish) {
            this.props.onFinish();
          }
        });
    }

    return undefined;
  }

  setRef: SupplyRef = ref => {
    this.element = ref;
  };

  setReactNode: SupplyRenderChildren = renderChildren => {
    this.renderChildren = renderChildren;
  };

  setData: SupplyData = data => {
    this.data = data;
  };

  render() {
    return (
      <Collector
        receiveData={this.setData}
        receiveRenderChildren={this.setReactNode}
        receiveRef={this.setRef}
        style={{
          opacity: this.state.shown ? 1 : 0,
        }}
      >
        {this.props.children}
      </Collector>
    );
  }
}
