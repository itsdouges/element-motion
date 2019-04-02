import * as React from 'react';
import { mount } from 'enzyme';
import { WrappedBaba as Baba } from '../Baba';
import { WrappedBabaManager as BabaManager } from '../BabaManager';
import * as utils from '../__tests__/utils';
import defer from '../lib/defer';

describe('<BabaManager />', () => {
  it('should show manager content when waiting for animation', () => {
    const Animation = utils.createTestAnimation();

    const wrapper = mount(
      <BabaManager>
        {props => (
          <span {...props}>
            <Baba name="fff">
              <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
            </Baba>
          </span>
        )}
      </BabaManager>
    );

    expect(wrapper.find('span').prop('style')).toEqual({ visibility: 'visible' });
  });

  it('should hide manager children if animation is already in flight', () => {
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="aaa">
            <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
          </Baba>
        }
        to={
          <BabaManager>
            {props => (
              <span {...props}>
                <Baba name="aaa">{({ ref, style }) => <div ref={ref} style={style} />}</Baba>
              </span>
            )}
          </BabaManager>
        }
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    wrapper.update();

    expect(wrapper.find('span').prop('style')).toEqual({ visibility: 'hidden' });
  });

  it('should show manager children when animation is finished', async () => {
    const deferred = defer();
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="eee">
            <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
          </Baba>
        }
        to={
          <BabaManager>
            {props => (
              <span {...props}>
                <Baba name="eee" onFinish={deferred.resolve}>
                  {({ ref, style }) => <div ref={ref} style={style} />}
                </Baba>
              </span>
            )}
          </BabaManager>
        }
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    await deferred.promise;
    wrapper.update();

    expect(wrapper.find('span').prop('style')).toEqual({ visibility: 'visible' });
  });

  it('should hide all nested manager children if animation is already in flight', async () => {
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="eee">
            <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
          </Baba>
        }
        to={
          <BabaManager>
            {topProps => (
              <div>
                <div id="parent1" {...topProps} />

                <BabaManager>
                  {innerProps => (
                    <div id="parent2" {...innerProps}>
                      <Baba name="eee">{({ ref, style }) => <div ref={ref} style={style} />}</Baba>
                    </div>
                  )}
                </BabaManager>
              </div>
            )}
          </BabaManager>
        }
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    wrapper.update();

    expect(wrapper.find('#parent1').prop('style')).toEqual({ visibility: 'hidden' });
    expect(wrapper.find('#parent2').prop('style')).toEqual({ visibility: 'hidden' });
  });

  it('should show all nested manager children when animation is finished', async () => {
    const deferred = defer();
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="eee">
            <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
          </Baba>
        }
        to={
          <BabaManager>
            {topProps => (
              <div>
                <div id="parent1" {...topProps} />

                <BabaManager>
                  {innerProps => (
                    <div id="parent2" {...innerProps}>
                      <Baba name="eee" onFinish={deferred.resolve}>
                        {({ ref, style }) => <div ref={ref} style={style} />}
                      </Baba>
                    </div>
                  )}
                </BabaManager>
              </div>
            )}
          </BabaManager>
        }
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    await deferred.promise;
    wrapper.update();

    expect(wrapper.find('#parent1').prop('style')).toEqual({ visibility: 'visible' });
    expect(wrapper.find('#parent2').prop('style')).toEqual({ visibility: 'visible' });
  });
});
