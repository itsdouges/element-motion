import * as React from 'react';
import { mount } from 'enzyme';
import 'jest-enzyme';
import { Baba } from '../Baba';
import { getElementSizeLocation } from '../lib/dom';
import { defer } from '../lib/defer';
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
    (getElementSizeLocation as jest.Mock).mockReturnValue(elementData);
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

  it('should make children visible inside first baba element before animating has been triggered', () => {
    const Animation = utils.createTestAnimation();

    const wrapper = mount(
      <Baba name="anim-2">
        <Animation>{props => <div {...props} />}</Animation>
      </Baba>
    );

    expect(wrapper.find('div')).toHaveProp('style', { opacity: 1 });
  });

  it('should hide children inside target baba element when animating has been triggered', () => {
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="anim-3">
            <Animation>{props => <div {...props} />}</Animation>
          </Baba>
        }
        to={<Baba name="anim-3">{props => <div {...props} />}</Baba>}
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    wrapper.update();

    expect(wrapper.find('div')).toHaveProp('style', { opacity: 0 });
  });

  it('should show children when when flipping back to an already mounted baba', () => {
    const wrapper = mount(
      <utils.BabaUnderTest
        from={start => (
          <Baba name="flip-back" in={!start}>
            {props => <div {...props} />}
          </Baba>
        )}
        to={<Baba name="flip-back">{props => <div {...props} />}</Baba>}
        start
      />
    );

    wrapper.setProps({
      start: false,
    });
    wrapper.update();

    expect(wrapper.find('div')).toHaveProp('style', { opacity: 1 });
  });

  it('should keep showing baba elements that have no matching pair when flipping in prop', () => {
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.BabaUnderTest
        from={start => (
          <Baba name="keep-showing" in={!start}>
            <Animation>{props => <div {...props} />}</Animation>
          </Baba>
        )}
        to={
          <Baba name="sdadsdad">
            {props => (
              <Animation>
                <span {...props} />
              </Animation>
            )}
          </Baba>
        }
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    wrapper.update();

    expect(wrapper.find('div')).toHaveProp('style', { opacity: 1 });
  });

  it('should show children inside target baba element when animating has completed', async () => {
    const Animation = utils.createTestAnimation();
    const deferred = defer();
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="anim-3">
            <Animation>{props => <div {...props} />}</Animation>
          </Baba>
        }
        to={
          <Baba name="anim-3" onFinish={deferred.resolve}>
            {props => <div {...props} />}
          </Baba>
        }
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    await deferred.promise;
    wrapper.update();

    expect(wrapper.find('div')).toHaveProp('style', { opacity: 1 });
  });
});
