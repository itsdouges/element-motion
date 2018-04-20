import * as React from 'react';
import { render, mount } from 'enzyme';
import Collector, { Actions, Data } from '../Collector';
import { timingSafeEqual } from 'crypto';

describe('<Collector />', () => {
  const element = document.createElement('div');
  const createData = (): Data => ({
    action: Actions.animation,
    payload: () => Promise.resolve({}),
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should collect ref from direct child', () => {
    const callback = jest.fn();

    render(<Collector receiveRef={callback}>{({ ref }) => ref(element)}</Collector>);

    expect(callback).toBeCalledWith(element);
  });

  it('should collect ref from nested ref collect', () => {
    const callback = jest.fn();

    render(
      <Collector receiveRef={callback}>
        <Collector>{({ ref }) => ref(element)}</Collector>
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
              <Collector>{({ ref }) => ref(element)}</Collector>
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
          <Collector receiveRef={callback3}>{({ ref }) => ref(element)}</Collector>
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
    const data: Data = createData();
    const callback = jest.fn();

    render(
      <Collector receiveData={callback}>
        <Collector data={data}>{({ ref }) => ref(element)}</Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith([data]);
  });

  it('should collect animation from deeply nested child', () => {
    const data: Data = createData();
    const callback = jest.fn();

    render(
      <Collector receiveData={callback}>
        <Collector>
          <Collector>
            <Collector>
              <Collector>
                <Collector data={data}>{({ ref }) => ref(element)}</Collector>
              </Collector>
            </Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith([data]);
  });

  it('should incrementally collect animations from children', () => {
    const data1: Data = createData();
    const data2: Data = createData();
    const data3: Data = createData();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    render(
      <Collector receiveData={callback3}>
        <Collector receiveData={callback2} data={data1}>
          <Collector receiveData={callback1} data={data2}>
            <Collector data={data3}>{({ ref }) => ref(element)}</Collector>
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
    const wait: Data = { action: Actions.wait };
    const data2 = createData();
    const callback = jest.fn();

    render(
      <Collector receiveData={callback}>
        <Collector data={data1}>
          <Collector data={wait}>
            <Collector data={data2}>{({ ref }) => ref(element)}</Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith([data1, wait, data2]);
  });
});
