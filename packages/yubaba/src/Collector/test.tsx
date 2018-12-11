import * as React from 'react';
import { render, mount } from 'enzyme';
import Collector, { CollectorActions, CollectorData, CollectorContext } from '../Collector';

describe('<Collector />', () => {
  const element = document.createElement('div');
  const createData = (): CollectorData => ({
    action: CollectorActions.animation,
    payload: {
      animate: () => Promise.resolve(),
      beforeAnimate: () => Promise.resolve(),
      afterAnimate: () => Promise.resolve(),
      abort: () => {},
    },
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should collect ref from direct child', () => {
    const callback = jest.fn();

    render(<Collector receiveRef={callback}>{({ ref }) => ref(element) || <div />}</Collector>);

    expect(callback).toBeCalledWith(element);
  });

  it('should collect ref from nested ref collect', () => {
    const callback = jest.fn();

    render(
      <Collector receiveRef={callback}>
        <Collector>{({ ref }) => ref(element) || <div />}</Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith(element);
  });

  it('should collect ref from really nested ref collect', () => {
    const callback = jest.fn();

    render(
      <Collector receiveRef={callback}>
        <Collector>
          <Collector>
            <Collector>
              <Collector>{({ ref }) => ref(element) || <div />}</Collector>
            </Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith(element);
  });

  it('should call pass ref on each node', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    render(
      <Collector receiveRef={callback1}>
        <Collector receiveRef={callback2}>
          <Collector receiveRef={callback3}>{({ ref }) => ref(element) || <div />}</Collector>
        </Collector>
      </Collector>
    );

    expect(callback1).toBeCalledWith(element);
    expect(callback2).toBeCalledWith(element);
    expect(callback3).toBeCalledWith(element);
  });

  it('should callback when unmounting with react node', () => {
    const child = () => <div />;
    const callback = jest.fn();

    render(
      <Collector receiveRenderChildren={callback}>
        <Collector>
          <Collector>
            <Collector>
              <Collector>
                <Collector>{child}</Collector>
              </Collector>
            </Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith(child);
  });

  it('should collect animation from direct child', () => {
    const data: CollectorData = createData();
    const callback = jest.fn();

    render(
      <Collector receiveData={callback}>
        <Collector data={data}>{({ ref }) => ref(element) || <div />}</Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith([data]);
  });

  it('should collect animation from deeply nested child', () => {
    const data: CollectorData = createData();
    const callback = jest.fn();

    render(
      <Collector receiveData={callback}>
        <Collector>
          <Collector>
            <Collector>
              <Collector>
                <Collector data={data}>{({ ref }) => ref(element) || <div />}</Collector>
              </Collector>
            </Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith([data]);
  });

  it('should incrementally collect animations from children', () => {
    const data1: CollectorData = createData();
    const data2: CollectorData = createData();
    const data3: CollectorData = createData();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    render(
      <Collector receiveData={callback3}>
        <Collector receiveData={callback2} data={data1}>
          <Collector receiveData={callback1} data={data2}>
            <Collector data={data3}>{({ ref }) => ref(element) || <div />}</Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback1).toBeCalledWith([data3]);
    expect(callback2).toBeCalledWith([data2, data3]);
    expect(callback3).toBeCalledWith([data1, data2, data3]);
  });

  it('should collect all animations from each collector at the top', () => {
    const data1 = createData();
    const wait: CollectorData = { action: CollectorActions.wait };
    const data2 = createData();
    const callback = jest.fn();

    render(
      <Collector receiveData={callback}>
        <Collector data={data1}>
          <Collector data={wait}>
            <Collector data={data2}>{({ ref }) => ref(element) || <div />}</Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith([data1, wait, data2]);
  });

  it('should use empty object for default style', () => {
    const callback = jest.fn();

    render(
      <Collector>
        <Collector>
          <Collector>
            <Collector>{({ style }) => callback(style) || <div />}</Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toHaveBeenCalledWith({});
  });

  it('should merge all styles and pass to children function', () => {
    const callback = jest.fn();

    render(
      <Collector style={{ margin: 0 }}>
        <Collector>
          <Collector style={{ opacity: 1 }}>
            <Collector>{({ style }) => callback(style) || <div />}</Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toHaveBeenCalledWith({
      margin: 0,
      opacity: 1,
    });
  });

  it('should pass style on immediate collector', () => {
    const callback = jest.fn();

    render(
      <Collector style={{ opacity: 1 }}>{({ style }) => callback(style) || <div />}</Collector>
    );

    expect(callback).toHaveBeenCalledWith({
      opacity: 1,
    });
  });

  it('should collect extra data beneath a rendered child', () => {
    const callback = jest.fn();
    const containerRef = document.createElement('div');
    const targetRef = document.createElement('span');
    containerRef.appendChild(targetRef);

    mount(
      <Collector receiveRef={callback} receiveFocalTargetRef={callback}>
        <Collector>
          {({ ref }) => (
            <div ref={ref}>
              <CollectorContext.Consumer>
                {collect => <span ref={collect.focalTargetRef} />}
              </CollectorContext.Consumer>
            </div>
          )}
        </Collector>
      </Collector>
    );

    expect(callback).toHaveBeenCalledWith(targetRef);
    expect(callback).toHaveBeenLastCalledWith(containerRef);
  });
});
