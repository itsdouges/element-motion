import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { MemoryRouter, Link } from 'react-router-dom';
import { WrappedBaba as Baba } from '../Baba';
import Target from '../FocalTarget';
import { getElementBoundingBox } from '../lib/dom';
import defer from '../lib/defer';
import * as utils from '../__tests__/utils';

jest.mock('../lib/dom');
window.requestAnimationFrame = (cb: Function) => cb();

const wait = async (ticks = 1) => {
  for (let i = 0; i < ticks; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve();
  }
};

const enterNextPhase = async (wrapper: ReactWrapper) => {
  jest.runAllTimers();
  await wait(2);
  wrapper.update();
};

const startAnimation = (wrapper: ReactWrapper) => {
  wrapper.setProps({
    start: true,
  });
  wrapper.update();
};

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

    startAnimation(wrapper);
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

    startAnimation(wrapper);
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

    startAnimation(wrapper);
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

    startAnimation(wrapper);
    await deferred.promise;

    expect(callback.mock.calls[0][0].destination.elementBoundingBox).toMatchSnapshot();
  });

  it('should render markup in a portal created in an animation', () => {
    const Animation = utils.createTestAnimation({
      beforeAnimateJsx: <div>hello world</div>,
    });
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="pass-through-context">
            <Animation>{props => <div {...props} />}</Animation>
          </Baba>
        }
        to={<Baba name="pass-through-context">{props => <main {...props} />}</Baba>}
        start={false}
      />
    );

    startAnimation(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
  });

  it('should render markup in a portal created by multiple animations', () => {
    const Animation = utils.createTestAnimation({ beforeAnimateJsx: <div>hello world</div> });
    const AnimationTwo = utils.createTestAnimation({ beforeAnimateJsx: <span>number two</span> });
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="pass-through-context">
            <Animation>
              <AnimationTwo>{props => <div {...props} />}</AnimationTwo>
            </Animation>
          </Baba>
        }
        to={<Baba name="pass-through-context">{props => <main {...props} />}</Baba>}
        start={false}
      />
    );

    startAnimation(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
  });

  it('should update markup in a portal created by multiple animations in animate phase', async () => {
    jest.useFakeTimers();
    const Animation = utils.createTestAnimation({
      beforeAnimateJsx: <div>hello world</div>,
      animateJsx: <div>updated</div>,
    });
    const AnotherAnimation = utils.createTestAnimation();
    const AnimationTwo = utils.createTestAnimation({ beforeAnimateJsx: <span>number two</span> });
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="pass-through-context">
            <Animation>
              <AnotherAnimation>
                <AnimationTwo>{props => <div {...props} />}</AnimationTwo>
              </AnotherAnimation>
            </Animation>
          </Baba>
        }
        to={<Baba name="pass-through-context">{props => <main {...props} />}</Baba>}
        start={false}
      />
    );

    startAnimation(wrapper);
    await enterNextPhase(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
  });

  it('should update markup created in an animation in animate phase', async () => {
    jest.useFakeTimers();
    const Animation = utils.createTestAnimation({
      beforeAnimateJsx: <div>before animate phase</div>,
      animateJsx: <div>animate phase</div>,
      afterAnimateJsx: <div>after animate phase</div>,
    });
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="pass-through-context">
            <Animation>{props => <div {...props} />}</Animation>
          </Baba>
        }
        to={<Baba name="pass-through-context">{props => <main {...props} />}</Baba>}
        start={false}
      />
    );

    startAnimation(wrapper);
    await enterNextPhase(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
  });

  it('should update markup created in an animation in after animate phase', async () => {
    jest.useFakeTimers();
    const Animation = utils.createTestAnimation({
      beforeAnimateJsx: <div>before animate phase</div>,
      animateJsx: <div>animate phase</div>,
      afterAnimateJsx: <div>after animate phase</div>,
    });
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <Baba name="pass-through-context">
            <Animation>{props => <div {...props} />}</Animation>
          </Baba>
        }
        to={<Baba name="pass-through-context">{props => <main {...props} />}</Baba>}
        start={false}
      />
    );

    startAnimation(wrapper);
    await enterNextPhase(wrapper);
    await enterNextPhase(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
  });

  it('should pass through context to animations created react elements', () => {
    const Animation = utils.createTestAnimation({
      beforeAnimateJsx: <Link to="/">hello, world</Link>,
    });
    const wrapper = mount(
      <utils.BabaUnderTest
        from={
          <MemoryRouter>
            <Baba name="pass-through-context">
              <Animation>{props => <div {...props} />}</Animation>
            </Baba>
          </MemoryRouter>
        }
        to={
          <MemoryRouter>
            <Baba name="pass-through-context">{props => <main {...props} />}</Baba>
          </MemoryRouter>
        }
        start={false}
      />
    );

    expect(() =>
      wrapper.setProps({
        start: true,
      })
    ).not.toThrow();
  });
});
