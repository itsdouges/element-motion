import * as React from 'react';
import { mount, ReactWrapper, shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { MemoryRouter, Link } from 'react-router-dom';
import { WrappedAnimator as Animator } from '../Animator';
import Target from '../FocalTarget';
import { getElementBoundingBox } from '../lib/dom';
import defer from '../lib/defer';
import * as store from '../lib/animatorStore';
import * as utils from '../__tests__/utils';

jest.mock('../../package.json', () => ({ default: { version: '0.0.0' } }));
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

describe('<Animator />', () => {
  it('should warn if name isnt defined', () => {
    console.warn = jest.fn();
    process.env.NODE_ENV = 'development';

    mount(<Animator>{props => <div {...props} />}</Animator>);

    expect(console.warn).toHaveBeenCalledWith(`yubaba v0.0.0

"name" prop needs to be defined. Without it you may have problems matching up animator targets. You will not get this error when using "triggerSelfKey" prop.`);
  });

  it('should not warn if not using name when doing self targetted animator', () => {
    console.warn = jest.fn();
    process.env.NODE_ENV = 'development';

    shallow(<Animator triggerSelfKey="hi">{props => <div {...props} />}</Animator>);

    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should not warn when using name', () => {
    console.warn = jest.fn();
    process.env.NODE_ENV = 'development';

    shallow(
      <Animator name="hello" triggerSelfKey="hi">
        {props => <div {...props} />}
      </Animator>
    );

    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should callback when animation has finished', done => {
    (getElementBoundingBox as jest.Mock).mockReturnValue(utils.domData());
    const Animation = utils.createTestAnimation();
    const wrapper = mount(
      <utils.AnimatorUnderTest
        from={
          <Animator name="anim-0">
            <Animation>{props => <div {...props} />}</Animation>
          </Animator>
        }
        to={
          <Animator name="anim-0" onFinish={done}>
            <div />
          </Animator>
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
      <utils.AnimatorUnderTest
        from={
          <Animator name="anim-1">
            <Animation>{props => <div {...props} />}</Animation>
          </Animator>
        }
        to={
          <Animator name="anim-1" onFinish={deferred.resolve}>
            <div />
          </Animator>
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
      <utils.AnimatorUnderTest
        from={start => (
          <Animator name="anim-aa" in={!start}>
            <Animation>{props => <div {...props} />}</Animation>
          </Animator>
        )}
        to={
          <Animator name="anim-aa" onFinish={deferred.resolve}>
            <div />
          </Animator>
        }
        start={false}
      />
    );

    startAnimation(wrapper);
    await deferred.promise;

    // element and render will be undefined.
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
      <utils.AnimatorUnderTest
        from={
          <Animator name="anim-bb">
            <Animation>{props => <div {...props} />}</Animation>
          </Animator>
        }
        to={
          <Animator name="anim-bb" onFinish={deferred.resolve}>
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
          </Animator>
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
      <utils.AnimatorUnderTest
        from={
          <Animator name="pass-through-context">
            <Animation>{props => <div {...props} />}</Animation>
          </Animator>
        }
        to={<Animator name="pass-through-context">{props => <main {...props} />}</Animator>}
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
      <utils.AnimatorUnderTest
        from={
          <Animator name="pass-through-context">
            <Animation>
              <AnimationTwo>{props => <div {...props} />}</AnimationTwo>
            </Animation>
          </Animator>
        }
        to={<Animator name="pass-through-context">{props => <main {...props} />}</Animator>}
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
      <utils.AnimatorUnderTest
        from={
          <Animator name="pass-through-context">
            <Animation>
              <AnotherAnimation>
                <AnimationTwo>{props => <div {...props} />}</AnimationTwo>
              </AnotherAnimation>
            </Animation>
          </Animator>
        }
        to={<Animator name="pass-through-context">{props => <main {...props} />}</Animator>}
        start={false}
      />
    );

    startAnimation(wrapper);
    await enterNextPhase(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
    jest.useRealTimers();
  });

  it('should update markup created in an animation in animate phase', async () => {
    jest.useFakeTimers();
    const Animation = utils.createTestAnimation({
      beforeAnimateJsx: <div>before animate phase</div>,
      animateJsx: <div>animate phase</div>,
      afterAnimateJsx: <div>after animate phase</div>,
    });
    const wrapper = mount(
      <utils.AnimatorUnderTest
        from={
          <Animator name="pass-through-context">
            <Animation>{props => <div {...props} />}</Animation>
          </Animator>
        }
        to={<Animator name="pass-through-context">{props => <main {...props} />}</Animator>}
        start={false}
      />
    );

    startAnimation(wrapper);
    await enterNextPhase(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
    jest.useRealTimers();
  });

  it('should update markup created in an animation in after animate phase', async () => {
    jest.useFakeTimers();
    const Animation = utils.createTestAnimation({
      beforeAnimateJsx: <div>before animate phase</div>,
      animateJsx: <div>animate phase</div>,
      afterAnimateJsx: <div>after animate phase</div>,
    });
    const wrapper = mount(
      <utils.AnimatorUnderTest
        from={
          <Animator name="pass-through-context">
            <Animation>{props => <div {...props} />}</Animation>
          </Animator>
        }
        to={<Animator name="pass-through-context">{props => <main {...props} />}</Animator>}
        start={false}
      />
    );

    startAnimation(wrapper);
    await enterNextPhase(wrapper);
    await enterNextPhase(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
    jest.useRealTimers();
  });

  it('should pass through context to animations created react elements', () => {
    const Animation = utils.createTestAnimation({
      beforeAnimateJsx: <Link to="/">hello, world</Link>,
    });
    const wrapper = mount(
      <utils.AnimatorUnderTest
        from={
          <MemoryRouter>
            <Animator name="pass-through-context">
              <Animation>{props => <div {...props} />}</Animation>
            </Animator>
          </MemoryRouter>
        }
        to={
          <MemoryRouter>
            <Animator name="pass-through-context">{props => <main {...props} />}</Animator>
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

  describe('persisted animations', () => {
    it('should animate from persisted', done => {
      const Animation = utils.createTestAnimation();
      const wrapper = mount(
        <utils.AnimatorUnderTest
          from={start => (
            <Animator name="anim-over-persisted" in={!start}>
              <Animation>{props => <div {...props} />}</Animation>
            </Animator>
          )}
          to={
            <Animator onFinish={done} name="anim-over-persisted">
              {props => <main {...props} />}
            </Animator>
          }
          start={false}
        />
      );

      wrapper.setProps({ start: true });
    });

    it('should throw when changing into "in" after initial mount', () => {
      process.env.NODE_ENV = 'development';
      const Animation = utils.createTestAnimation();
      const wrapper = mount(
        <Animator name="dont-use-in">
          <Animation>{props => <div {...props} />}</Animation>
        </Animator>
      );

      expect(() =>
        wrapper.setProps({
          in: true,
        })
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('self targetted animations', () => {
    it('should animate over self', done => {
      const Animation = utils.createTestAnimation();
      const wrapper = mount(
        <Animator name="anim-over-self" onFinish={done} triggerSelfKey="hello">
          <Animation>{anim => <div {...anim} />}</Animation>
        </Animator>
      );

      wrapper.setProps({ triggerSelfKey: 'update-pls' });
    });

    it('should throw when changing into "triggerSelfKey" after initial mount', () => {
      process.env.NODE_ENV = 'development';
      const Animation = utils.createTestAnimation();
      const wrapper = mount(
        <Animator name="dont-use-trigger-self">
          <Animation>{props => <div {...props} />}</Animation>
        </Animator>
      );

      expect(() =>
        wrapper.setProps({
          triggerSelfKey: 'id-123',
        })
      ).toThrowErrorMatchingSnapshot();
    });

    it('should throw when using both "in" and "triggerSelfKey" props after initial mount', () => {
      process.env.NODE_ENV = 'development';
      const Animation = utils.createTestAnimation();
      const wrapper = mount(
        <Animator name="dont-use-in-and-trigger-self">
          <Animation>{props => <div {...props} />}</Animation>
        </Animator>
      );

      expect(() =>
        wrapper.setProps({
          triggerSelfKey: 'id-123',
          in: true,
        })
      ).toThrowErrorMatchingSnapshot();
    });

    it('should abort when unmounting after beginning animation', () => {
      const onCleanup = jest.fn();
      const Animation = utils.createTestAnimation({ onCleanup });
      const wrapper = mount(
        <Animator name="self-cleanup" triggerSelfKey="hello-world">
          <Animation>{props => <div {...props} />}</Animation>
        </Animator>
      );
      wrapper.setProps({
        triggerSelfKey: '1',
      });

      wrapper.unmount();

      expect(onCleanup).toHaveBeenCalled();
    });

    it('should not store dom data when unmounting when trigger self key is set', () => {
      const onCleanup = jest.fn();
      const Animation = utils.createTestAnimation({ onCleanup });
      const wrapper = mount(
        <Animator name="self-cleanup" triggerSelfKey="hello-world">
          <Animation>{props => <div {...props} />}</Animation>
        </Animator>
      );

      wrapper.unmount();

      expect(store.has('hello-world')).toEqual(false);
    });

    describe('aborting animations', () => {
      it('should block cleanup if animations have aborted previously', async () => {
        // This stops the double cleanup apparent in self targetted animations.
        jest.useFakeTimers();
        const onCleanup = jest.fn();
        const Animation = utils.createTestAnimation({ onCleanup });
        const wrapper = mount(
          <Animator name="self-cleanup" triggerSelfKey="hello-world">
            <Animation>{props => <div {...props} />}</Animation>
          </Animator>
        );

        wrapper.setProps({
          triggerSelfKey: '1',
        });
        await enterNextPhase(wrapper);
        wrapper.setProps({
          triggerSelfKey: '2',
        });
        await enterNextPhase(wrapper);
        await enterNextPhase(wrapper);

        expect(onCleanup).toHaveBeenCalledTimes(1);
        jest.useRealTimers();
      });
    });
  });
});
