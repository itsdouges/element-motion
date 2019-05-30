import * as React from 'react';
import { mount } from 'enzyme'; // eslint-disable-line
import { WrappedMotion as Motion } from '../Motion';
import { WrappedVisibilityManager as VisibilityManager } from '../VisibilityManager';
import * as utils from '../__tests__/utils';
import defer from '../lib/defer';

window.requestAnimationFrame = (cb: Function) => cb();

describe('<VisibilityManager />', () => {
  it('should be visible after start motion has been mounted', () => {
    const TestMotion = utils.createTestMotion();

    const wrapper = mount(
      <VisibilityManager>
        {props => (
          <span {...props}>
            <Motion name="fff">
              <TestMotion>{({ ref, style }) => <div ref={ref} style={style} />}</TestMotion>
            </Motion>
          </span>
        )}
      </VisibilityManager>
    );
    wrapper.update();

    expect(wrapper.find('span').prop('style')).toEqual({ visibility: 'visible' });
  });

  it('should be hidden on initial mount', () => {
    const wrapper = mount(<VisibilityManager>{props => <span {...props} />}</VisibilityManager>);
    wrapper.update();

    expect(wrapper.find('span').prop('style')).toEqual({ visibility: 'hidden' });
  });

  it('should be visible on initial mount', () => {
    const wrapper = mount(
      <VisibilityManager isInitiallyVisible>{props => <span {...props} />}</VisibilityManager>
    );
    wrapper.update();

    expect(wrapper.find('span').prop('style')).toEqual({ visibility: 'visible' });
  });

  it('should be hidden during motion via self motion', () => {
    const TestMotion = utils.createTestMotion();
    const wrapper = mount(
      <utils.MotionUnderTest
        from={shown => (
          <VisibilityManager isInitiallyVisible>
            {props => (
              <span {...props}>
                <Motion triggerSelfKey={`${shown}`}>
                  <TestMotion>{({ ref, style }) => <div ref={ref} style={style} />}</TestMotion>
                </Motion>
              </span>
            )}
          </VisibilityManager>
        )}
        to={null}
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    wrapper.update();

    expect(wrapper.find('span').prop('style')).toEqual({ visibility: 'hidden' });
  });

  it('should be hidden during motion', () => {
    const TestMotion = utils.createTestMotion();
    const wrapper = mount(
      <utils.MotionUnderTest
        from={shown => (
          <VisibilityManager isInitiallyVisible>
            {props => (
              <span {...props}>
                <Motion triggerSelfKey={`${shown}`}>
                  <TestMotion>{({ ref, style }) => <div ref={ref} style={style} />}</TestMotion>
                </Motion>
              </span>
            )}
          </VisibilityManager>
        )}
        to={null}
        start={false}
      />
    );

    wrapper.setProps({
      start: true,
    });
    wrapper.update();

    expect(wrapper.find('span').prop('style')).toEqual({ visibility: 'hidden' });
  });

  it('should hide manager children if motion is already in flight', () => {
    const TestMotion = utils.createTestMotion();
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="aaa">
            <TestMotion>{({ ref, style }) => <div ref={ref} style={style} />}</TestMotion>
          </Motion>
        }
        to={
          <VisibilityManager>
            {props => (
              <span {...props}>
                <Motion name="aaa">{({ ref, style }) => <div ref={ref} style={style} />}</Motion>
              </span>
            )}
          </VisibilityManager>
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

  it('should show manager children when motion is finished', async () => {
    const deferred = defer();
    const TestMotion = utils.createTestMotion();
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="eee">
            <TestMotion>{({ ref, style }) => <div ref={ref} style={style} />}</TestMotion>
          </Motion>
        }
        to={
          <VisibilityManager>
            {props => (
              <span {...props}>
                <Motion name="eee" onFinish={deferred.resolve}>
                  {({ ref, style }) => <div ref={ref} style={style} />}
                </Motion>
              </span>
            )}
          </VisibilityManager>
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

  it('should hide all nested manager children if motion is already in flight', async () => {
    const TestMotion = utils.createTestMotion();
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="eee">
            <TestMotion>{({ ref, style }) => <div ref={ref} style={style} />}</TestMotion>
          </Motion>
        }
        to={
          <VisibilityManager>
            {topProps => (
              <div>
                <div id="parent1" {...topProps} />

                <VisibilityManager>
                  {innerProps => (
                    <div id="parent2" {...innerProps}>
                      <Motion name="eee">
                        {({ ref, style }) => <div ref={ref} style={style} />}
                      </Motion>
                    </div>
                  )}
                </VisibilityManager>
              </div>
            )}
          </VisibilityManager>
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

  it('should show all nested manager children when motion is finished', async () => {
    const deferred = defer();
    const TestMotion = utils.createTestMotion();
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="eee">
            <TestMotion>{({ ref, style }) => <div ref={ref} style={style} />}</TestMotion>
          </Motion>
        }
        to={
          <VisibilityManager>
            {topProps => (
              <div>
                <div id="parent1" {...topProps} />

                <VisibilityManager>
                  {innerProps => (
                    <div id="parent2" {...innerProps}>
                      <Motion name="eee" onFinish={deferred.resolve}>
                        {({ ref, style }) => <div ref={ref} style={style} />}
                      </Motion>
                    </div>
                  )}
                </VisibilityManager>
              </div>
            )}
          </VisibilityManager>
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
