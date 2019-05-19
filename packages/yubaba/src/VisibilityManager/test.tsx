import * as React from 'react';
import { mount } from 'enzyme';
import { WrappedAnimator as Animator } from '../Animator';
import { WrappedVisibilityManager as VisibilityManager } from '../VisibilityManager';
import * as utils from '../__tests__/utils';
import defer from '../lib/defer';

describe('<VisibilityManager />', () => {
  it('should be visible after start animation has been mounted', () => {
    const Animation = utils.createTestAnimation();

    const wrapper = mount(
      <VisibilityManager>
        {props => (
          <span {...props}>
            <Animator name="fff">
              <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
            </Animator>
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

  it('should be hidden during animation', () => {
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.AnimatorUnderTest
        from={shown => (
          <VisibilityManager isInitiallyVisible>
            {props => (
              <span {...props}>
                <Animator name="aaa" key={`${shown}`}>
                  <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
                </Animator>
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

  it('should hide manager children if animation is already in flight', () => {
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.AnimatorUnderTest
        from={
          <Animator name="aaa">
            <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
          </Animator>
        }
        to={
          <VisibilityManager>
            {props => (
              <span {...props}>
                <Animator name="aaa">
                  {({ ref, style }) => <div ref={ref} style={style} />}
                </Animator>
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

  it('should show manager children when animation is finished', async () => {
    const deferred = defer();
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.AnimatorUnderTest
        from={
          <Animator name="eee">
            <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
          </Animator>
        }
        to={
          <VisibilityManager>
            {props => (
              <span {...props}>
                <Animator name="eee" onFinish={deferred.resolve}>
                  {({ ref, style }) => <div ref={ref} style={style} />}
                </Animator>
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

  it('should hide all nested manager children if animation is already in flight', async () => {
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.AnimatorUnderTest
        from={
          <Animator name="eee">
            <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
          </Animator>
        }
        to={
          <VisibilityManager>
            {topProps => (
              <div>
                <div id="parent1" {...topProps} />

                <VisibilityManager>
                  {innerProps => (
                    <div id="parent2" {...innerProps}>
                      <Animator name="eee">
                        {({ ref, style }) => <div ref={ref} style={style} />}
                      </Animator>
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

  it('should show all nested manager children when animation is finished', async () => {
    const deferred = defer();
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.AnimatorUnderTest
        from={
          <Animator name="eee">
            <Animation>{({ ref, style }) => <div ref={ref} style={style} />}</Animation>
          </Animator>
        }
        to={
          <VisibilityManager>
            {topProps => (
              <div>
                <div id="parent1" {...topProps} />

                <VisibilityManager>
                  {innerProps => (
                    <div id="parent2" {...innerProps}>
                      <Animator name="eee" onFinish={deferred.resolve}>
                        {({ ref, style }) => <div ref={ref} style={style} />}
                      </Animator>
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
