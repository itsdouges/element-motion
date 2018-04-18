import * as React from 'react';
import { render, mount } from 'enzyme';
import Collector, { AnimationCallback } from '../Collector';

describe('<Collectoror />', () => {
  const element = document.createElement('div');

  it('should collect ref from direct child', () => {
    const callback = jest.fn();

    render(<Collector getRef={callback}>{getRef => getRef(element)}</Collector>);

    expect(callback).toBeCalledWith(element);
  });

  it('should collect ref from nested ref collect', () => {
    const callback = jest.fn();

    render(
      <Collector getRef={callback}>
        <Collector>{supplyRef => supplyRef(element)}</Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith(element);
  });

  it('should collect ref from really nested ref collect', () => {
    const callback = jest.fn();

    render(
      <Collector getRef={callback}>
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
      <Collector getRef={callback1}>
        <Collector getRef={callback2}>
          <Collector getRef={callback3}>{supplyRef => supplyRef(element)}</Collector>
        </Collector>
      </Collector>
    );

    expect(callback1).toBeCalledWith(element);
    expect(callback2).toBeCalledWith(element);
    expect(callback3).toBeCalledWith(element);
  });

  it('should callback when unmounting with react node', () => {
    // TODO: Enzyme + new context api don't work with mount atm.
  });

  it('should collect animation from direct child', () => {
    const animation = {} as AnimationCallback;
    const callback = jest.fn();

    render(
      <Collector getAnimations={callback}>
        <Collector animation={animation}>{supplyRef => supplyRef(element)}</Collector>
      </Collector>
    );

    expect(callback).toBeCalledWith([animation]);
  });
});
