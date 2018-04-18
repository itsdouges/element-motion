import * as React from 'react';
import { render, mount } from 'enzyme';
import Collector, { Action } from '../Collector';
import { timingSafeEqual } from 'crypto';

describe('<Collectoror />', () => {
  const element = document.createElement('div');

  it('should collect ref from direct child', () => {
    const callback = jest.fn();

    render(<Collector receiveRef={callback}>{getRef => getRef(element)}</Collector>);

    expect(callback).toBeCalledWith(element);
  });

  it('should collect ref from nested ref collect', () => {
    const callback = jest.fn();

    render(
      <Collector receiveRef={callback}>
        <Collector>{supplyRef => supplyRef(element)}</Collector>
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
              <Collector>{supplyRef => supplyRef(element)}</Collector>
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
          <Collector receiveRef={callback3}>{supplyRef => supplyRef(element)}</Collector>
        </Collector>
      </Collector>
    );

    expect(callback1).toBeCalledWith(element);
    expect(callback2).toBeCalledWith(element);
    expect(callback3).toBeCalledWith(element);
  });

  it('should callback when unmounting with react node', () => {
    const child = <div />;
    const callback = jest.fn();

    render(
      <Collector receiveReactNode={callback}>
        <Collector>
          <Collector>
            <Collector>
              <Collector>
                <Collector>{() => child}</Collector>
              </Collector>
            </Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith(child);
  });

  it('should collect animation from direct child', () => {
    const animation = () => Promise.resolve({});
    const callback = jest.fn();

    render(
      <Collector receiveData={callback}>
        <Collector data={animation}>{supplyRef => supplyRef(element)}</Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith([animation]);
  });

  it('should collect animation from deeply nested child', () => {
    const animation = () => Promise.resolve({});
    const callback = jest.fn();

    render(
      <Collector receiveData={callback}>
        <Collector>
          <Collector>
            <Collector>
              <Collector>
                <Collector data={animation}>{supplyRef => supplyRef(element)}</Collector>
              </Collector>
            </Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith([animation]);
  });

  it('should incrementally collect animations from children', () => {
    const animation1 = () => Promise.resolve({});
    const animation2 = () => Promise.resolve({});
    const animation3 = () => Promise.resolve({});
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    render(
      <Collector receiveData={callback3}>
        <Collector receiveData={callback2} data={animation1}>
          <Collector receiveData={callback1} data={animation2}>
            <Collector data={animation3}>{supplyRef => supplyRef(element)}</Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback1).toBeCalledWith([animation3]);
    expect(callback2).toBeCalledWith([animation2, animation3]);
    expect(callback3).toBeCalledWith([animation1, animation2, animation3]);
  });

  it('should collect all animations from each collector at the top', () => {
    const animation1 = () => Promise.resolve({});
    const action: Action = 'wait';
    const wait = { action };
    const animation3 = () => Promise.resolve({});
    const callback = jest.fn();

    render(
      <Collector receiveData={callback}>
        <Collector data={animation1}>
          <Collector data={wait}>
            <Collector data={animation3}>{supplyRef => supplyRef(element)}</Collector>
          </Collector>
        </Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith([animation1, wait, animation3]);
  });
});
