import * as React from 'react';
import { render, mount } from 'enzyme';
import RefCollect from '../RefCollector';

describe('<RefCollector />', () => {
  const element = document.createElement('div');

  it('should collect ref from direct child', () => {
    const callback = jest.fn();

    render(<RefCollect getRef={callback}>{getRef => getRef(element)}</RefCollect>);

    expect(callback).toBeCalledWith(element);
  });

  it('should collect ref from nested ref collect', () => {
    const callback = jest.fn();

    render(
      <RefCollect getRef={callback}>
        <RefCollect>{supplyRef => supplyRef(element)}</RefCollect>
      </RefCollect>
    );

    expect(callback).toBeCalledWith(element);
  });

  it('should collect ref from really nested ref collect', () => {
    const callback = jest.fn();

    render(
      <RefCollect getRef={callback}>
        <RefCollect>
          <RefCollect>
            <RefCollect>
              <RefCollect>{supplyRef => supplyRef(element)}</RefCollect>
            </RefCollect>
          </RefCollect>
        </RefCollect>
      </RefCollect>
    );

    expect(callback).toBeCalledWith(element);
  });

  it('should call pass ref on each node', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    render(
      <RefCollect getRef={callback1}>
        <RefCollect getRef={callback2}>
          <RefCollect getRef={callback3}>{supplyRef => supplyRef(element)}</RefCollect>
        </RefCollect>
      </RefCollect>
    );

    expect(callback1).toBeCalledWith(element);
    expect(callback2).toBeCalledWith(element);
    expect(callback3).toBeCalledWith(element);
  });

  it('should callback when unmounting with react node', () => {
    // TODO: Enzyme doesn't work with instances atm.
  });
});
