import * as React from 'react';
import { mount } from 'enzyme';
import 'jest-enzyme';
import { WrappedBaba as Baba } from '../Baba';
import Target from '../FocalTarget';
import { getElementBoundingBox } from '../lib/dom';
import defer from '../lib/defer';
import * as utils from '../__tests__/utils';

jest.mock('../lib/dom');

describe('<Baba />', () => {
  it('should callback when animation has finished', done => {
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="anim-0">
            <Animation>{props => <div {...props} />}</Animation>
          </Baba>
        }
        to={
          <Baba name="anim-0" onFinish={done}>
            <div />
          </Baba>
        }
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
  });

  it('should pass dom data to child animation', async () => {
    const callback = jest.fn();
    const elementData = utils.domData();
    (getElementBoundingBox as jest.Mock).mockReturnValue(elementData);
    const deferred = defer();
    const Animation = utils.createTestAnimation({
      onAnimate: callback,
    });
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="anim-1">
            <Animation>{props => <div {...props} />}</Animation>
          </Baba>
        }
        to={
          <Baba name="anim-1" onFinish={deferred.resolve}>
            <div />
          </Baba>
        }
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    await deferred.promise;

    expect(callback.mock.calls[0]).toMatchSnapshot();
  });

  it('should pass dom data to child animation when using in prop', async () => {
    const callback = jest.fn();
    const elementData = utils.domData();
    (getElementBoundingBox as jest.Mock).mockReturnValue(elementData);
    const deferred = defer();
    const Animation = utils.createTestAnimation({
      onAnimate: callback,
    });
    const wrapper = mount(
      <utils.BabaUnderTest
        from={start => (
          <Baba name="anim-aa" in={!start}>
            <Animation>{props => <div {...props} />}</Animation>
          </Baba>
        )}
        to={
          <Baba name="anim-aa" onFinish={deferred.resolve}>
            <div />
          </Baba>
        }
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    await deferred.promise;

    expect(callback.mock.calls[0]).toMatchSnapshot();
  });

  it('should pass target dom data to child animation', async () => {
    const callback = jest.fn();
    const elementData = utils.domData();
    (getElementBoundingBox as jest.Mock).mockReturnValue(elementData);
    const deferred = defer();
    const Animation = utils.createTestAnimation({
      onAnimate: callback,
    });
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="anim-bb">
            <Animation>{props => <div {...props} />}</Animation>
          </Baba>
        }
        to={
          <Baba name="anim-bb" onFinish={deferred.resolve}>
            <Animation>
              {animProps => (
                <Target>
                  {props => (
                    <main {...animProps}>
                      <div {...props} />
                    </main>
                  )}
                </Target>
              )}
            </Animation>
          </Baba>
        }
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    await deferred.promise;

    expect(callback.mock.calls[0][0].destination.elementBoundingBox).toMatchSnapshot();
  });
});
