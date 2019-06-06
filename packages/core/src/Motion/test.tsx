import * as React from 'react';
import { mount, ReactWrapper, shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { MemoryRouter, Link } from 'react-router-dom';
import { WrappedMotion as Motion } from '../Motion';
import Target from '../FocalTarget';
import { getElementBoundingBox } from '../lib/dom';
import defer from '../lib/defer';
import * as store from '../lib/store';
import * as utils from '../__tests__/utils';

jest.mock('../../package.json', () => ({
  version: '0.0.0',
  name: '@element-motion/core',
}));
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

const startMotion = (wrapper: ReactWrapper) => {
  wrapper.setProps({
    start: true,
  });
  wrapper.update();
};

describe('<Motion />', () => {
  it('should warn if name isnt defined', () => {
    console.warn = jest.fn();
    process.env.NODE_ENV = 'development';

    mount(<Motion>{props => <div {...props} />}</Motion>);

    expect(console.warn).toHaveBeenCalledWith(`@element-motion/core v0.0.0

"name" prop needs to be defined. Without it you may have problems matching up motion targets. You will not get this error when using "triggerSelfKey" prop.`);
  });

  it('should not warn if not using name when doing self targetted motion', () => {
    console.warn = jest.fn();
    process.env.NODE_ENV = 'development';

    shallow(<Motion triggerSelfKey="hi">{props => <div {...props} />}</Motion>);

    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should not warn when using name', () => {
    console.warn = jest.fn();
    process.env.NODE_ENV = 'development';

    shallow(
      <Motion name="hello" triggerSelfKey="hi">
        {props => <div {...props} />}
      </Motion>
    );

    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should callback when motion has finished', done => {
    (getElementBoundingBox as jest.Mock).mockReturnValue(utils.domData());
    const TestMotion = utils.createTestMotion();
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="anim-0">
            <TestMotion>{props => <div {...props} />}</TestMotion>
          </Motion>
        }
        to={
          <Motion name="anim-0" onFinish={done}>
            {motion => <div {...motion} />}
          </Motion>
        }
        start={false}
      />
    );

    startMotion(wrapper);
  });

  it('should pass dom data to child motion', async () => {
    const callback = jest.fn();
    const elementData = utils.domData();
    (getElementBoundingBox as jest.Mock).mockReturnValue(elementData);
    const deferred = defer();
    const TestMotion = utils.createTestMotion({
      onAnimate: callback,
    });
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="anim-1">
            <TestMotion>{props => <div {...props} />}</TestMotion>
          </Motion>
        }
        to={
          <Motion name="anim-1" onFinish={deferred.resolve}>
            {motion => <div {...motion} />}
          </Motion>
        }
        start={false}
      />
    );

    startMotion(wrapper);
    await deferred.promise;

    expect(callback.mock.calls[0]).toMatchSnapshot();
  });

  it('should pass dom data to child motion when using in prop', async () => {
    const callback = jest.fn();
    const elementData = utils.domData();
    (getElementBoundingBox as jest.Mock).mockReturnValue(elementData);
    const deferred = defer();
    const TestMotion = utils.createTestMotion({
      onAnimate: callback,
    });
    const wrapper = mount(
      <utils.MotionUnderTest
        from={start => (
          <Motion name="anim-aa" in={!start}>
            <TestMotion>{props => <div {...props} />}</TestMotion>
          </Motion>
        )}
        to={
          <Motion name="anim-aa" onFinish={deferred.resolve}>
            {motion => <div {...motion} />}
          </Motion>
        }
        start={false}
      />
    );

    startMotion(wrapper);
    await deferred.promise;

    // element and render will be undefined.
    expect(callback.mock.calls[0]).toMatchSnapshot();
  });

  it('should pass target dom data to child motion', async () => {
    const callback = jest.fn();
    const elementData = utils.domData();
    (getElementBoundingBox as jest.Mock).mockReturnValue(elementData);
    const deferred = defer();
    const TestMotion = utils.createTestMotion({
      onAnimate: callback,
    });
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="anim-bb">
            <TestMotion>{props => <div {...props} />}</TestMotion>
          </Motion>
        }
        to={
          <Motion name="anim-bb" onFinish={deferred.resolve}>
            <TestMotion>
              {motion => (
                <Target>
                  {props => (
                    <main {...motion}>
                      <div {...props} />
                    </main>
                  )}
                </Target>
              )}
            </TestMotion>
          </Motion>
        }
        start={false}
      />
    );

    startMotion(wrapper);
    await deferred.promise;

    expect(callback.mock.calls[0][0].destination.elementBoundingBox).toMatchSnapshot();
  });

  it('should render markup in a portal created in a motion', () => {
    const TestMotion = utils.createTestMotion({
      beforeAnimateJsx: <div>hello world</div>,
    });
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="pass-through-context">
            <TestMotion>{props => <div {...props} />}</TestMotion>
          </Motion>
        }
        to={<Motion name="pass-through-context">{props => <main {...props} />}</Motion>}
        start={false}
      />
    );

    startMotion(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
  });

  it('should render markup in a portal created by multiple motions', () => {
    const TestMotion = utils.createTestMotion({ beforeAnimateJsx: <div>hello world</div> });
    const MotionTwo = utils.createTestMotion({ beforeAnimateJsx: <span>number two</span> });
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="pass-through-context">
            <TestMotion>
              <MotionTwo>{props => <div {...props} />}</MotionTwo>
            </TestMotion>
          </Motion>
        }
        to={<Motion name="pass-through-context">{props => <main {...props} />}</Motion>}
        start={false}
      />
    );

    startMotion(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
  });

  it('should update markup in a portal created by multiple motions in animate phase', async () => {
    jest.useFakeTimers();
    const TestMotion = utils.createTestMotion({
      beforeAnimateJsx: <div>hello world</div>,
      animateJsx: <div>updated</div>,
    });
    const AnotherMotion = utils.createTestMotion();
    const MotionTwo = utils.createTestMotion({ beforeAnimateJsx: <span>number two</span> });
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="pass-through-context">
            <TestMotion>
              <AnotherMotion>
                <MotionTwo>{props => <div {...props} />}</MotionTwo>
              </AnotherMotion>
            </TestMotion>
          </Motion>
        }
        to={<Motion name="pass-through-context">{props => <main {...props} />}</Motion>}
        start={false}
      />
    );

    startMotion(wrapper);
    await enterNextPhase(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
    jest.useRealTimers();
  });

  it('should update markup created in a motion in animate phase', async () => {
    jest.useFakeTimers();
    const TestMotion = utils.createTestMotion({
      beforeAnimateJsx: <div>before animate phase</div>,
      animateJsx: <div>animate phase</div>,
      afterAnimateJsx: <div>after animate phase</div>,
    });
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="pass-through-context">
            <TestMotion>{props => <div {...props} />}</TestMotion>
          </Motion>
        }
        to={<Motion name="pass-through-context">{props => <main {...props} />}</Motion>}
        start={false}
      />
    );

    startMotion(wrapper);
    await enterNextPhase(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
    jest.useRealTimers();
  });

  it('should update markup created in a motion in after animate phase', async () => {
    jest.useFakeTimers();
    const TestMotion = utils.createTestMotion({
      beforeAnimateJsx: <div>before animate phase</div>,
      animateJsx: <div>animate phase</div>,
      afterAnimateJsx: <div>after animate phase</div>,
    });
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <Motion name="pass-through-context">
            <TestMotion>{props => <div {...props} />}</TestMotion>
          </Motion>
        }
        to={<Motion name="pass-through-context">{props => <main {...props} />}</Motion>}
        start={false}
      />
    );

    startMotion(wrapper);
    await enterNextPhase(wrapper);
    await enterNextPhase(wrapper);

    expect(wrapper.find('Portal')).toMatchSnapshot();
    jest.useRealTimers();
  });

  it('should pass through context to motions created react elements', () => {
    const TestMotion = utils.createTestMotion({
      beforeAnimateJsx: <Link to="/">hello, world</Link>,
    });
    const wrapper = mount(
      <utils.MotionUnderTest
        from={
          <MemoryRouter>
            <Motion name="pass-through-context">
              <TestMotion>{props => <div {...props} />}</TestMotion>
            </Motion>
          </MemoryRouter>
        }
        to={
          <MemoryRouter>
            <Motion name="pass-through-context">{props => <main {...props} />}</Motion>
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

  describe('persisted motions', () => {
    it('should animate from persisted', done => {
      const TestMotion = utils.createTestMotion();
      const wrapper = mount(
        <utils.MotionUnderTest
          from={start => (
            <Motion name="anim-over-persisted" in={!start}>
              <TestMotion>{props => <div {...props} />}</TestMotion>
            </Motion>
          )}
          to={
            <Motion onFinish={done} name="anim-over-persisted">
              {props => <main {...props} />}
            </Motion>
          }
          start={false}
        />
      );

      wrapper.setProps({ start: true });
    });

    it('should throw when changing into "in" after initial mount', () => {
      process.env.NODE_ENV = 'development';
      const TestMotion = utils.createTestMotion();
      const wrapper = mount(
        <Motion name="dont-use-in">
          <TestMotion>{props => <div {...props} />}</TestMotion>
        </Motion>
      );

      expect(() =>
        wrapper.setProps({
          in: true,
        })
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('self targetted motions', () => {
    it('should animate over self', done => {
      const TestMotion = utils.createTestMotion();
      const wrapper = mount(
        <Motion name="anim-over-self" onFinish={done} triggerSelfKey="hello">
          <TestMotion>{motion => <div {...motion} />}</TestMotion>
        </Motion>
      );

      wrapper.setProps({ triggerSelfKey: 'update-pls' });
    });

    it('should throw when changing into "triggerSelfKey" after initial mount', () => {
      process.env.NODE_ENV = 'development';
      const TestMotion = utils.createTestMotion();
      const wrapper = mount(
        <Motion name="dont-use-trigger-self">
          <TestMotion>{props => <div {...props} />}</TestMotion>
        </Motion>
      );

      expect(() =>
        wrapper.setProps({
          triggerSelfKey: 'id-123',
        })
      ).toThrowErrorMatchingSnapshot();
    });

    it('should throw when using both "in" and "triggerSelfKey" props after initial mount', () => {
      process.env.NODE_ENV = 'development';
      const TestMotion = utils.createTestMotion();
      const wrapper = mount(
        <Motion name="dont-use-in-and-trigger-self">
          <TestMotion>{props => <div {...props} />}</TestMotion>
        </Motion>
      );

      expect(() =>
        wrapper.setProps({
          triggerSelfKey: 'id-123',
          in: true,
        })
      ).toThrowErrorMatchingSnapshot();
    });

    it('should abort when unmounting after beginning motion', () => {
      const onCleanup = jest.fn();
      const TestMotion = utils.createTestMotion({ onCleanup });
      const wrapper = mount(
        <Motion name="self-cleanup" triggerSelfKey="hello-world">
          <TestMotion>{props => <div {...props} />}</TestMotion>
        </Motion>
      );
      wrapper.setProps({
        triggerSelfKey: '1',
      });

      wrapper.unmount();

      expect(onCleanup).toHaveBeenCalled();
    });

    it('should not store dom data when unmounting when trigger self key is set', () => {
      const onCleanup = jest.fn();
      const TestMotion = utils.createTestMotion({ onCleanup });
      const wrapper = mount(
        <Motion name="self-cleanup" triggerSelfKey="hello-world">
          <TestMotion>{props => <div {...props} />}</TestMotion>
        </Motion>
      );

      wrapper.unmount();

      expect(store.has('hello-world')).toEqual(false);
    });

    describe('aborting motions', () => {
      it('should block cleanup if motions have aborted previously', async () => {
        // This stops the double cleanup apparent in self targetted motions.
        jest.useFakeTimers();
        const onCleanup = jest.fn();
        const TestMotion = utils.createTestMotion({ onCleanup });
        const wrapper = mount(
          <Motion name="self-cleanup" triggerSelfKey="hello-world">
            <TestMotion>{props => <div {...props} />}</TestMotion>
          </Motion>
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
