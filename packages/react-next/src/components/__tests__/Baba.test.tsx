import * as React from 'react';
import { mount } from 'enzyme';
import { Baba } from '../Baba';
import Collector, { CollectorActions, CollectorChildrenProps } from '../Collector';
import { getElementSizeLocation, GetElementSizeLocationReturnValue } from '../../lib/dom';
import noop from '../../lib/noop';
import { defer } from '../../lib/defer';

jest.mock('../../lib/dom');

describe('<Baba />', () => {
  const createTestAnimation = ({
    onBeforeAnimate = noop,
    onAnimate = noop,
    onAfterAnimate = noop,
    beforeAnimateJsx,
    animateJsx,
    afterAnimateJsx,
    beforeAnimateTargetProps,
    animateTargetProps,
    afterAnimateTargetProps,
  }: any = {}): React.StatelessComponent<CollectorChildrenProps> => ({ children }) => (
    <Collector
      data={{
        action: CollectorActions.animation,
        payload: {
          beforeAnimate: (data, onFinish, setTargetProps) => {
            onBeforeAnimate(data);
            setTimeout(onFinish, 0);
            if (beforeAnimateTargetProps) {
              setTargetProps(beforeAnimateTargetProps);
            }
            return beforeAnimateJsx;
          },
          animate: (data, onFinish, setTargetProps) => {
            onAnimate(data);
            setTimeout(onFinish, 0);
            if (animateTargetProps) {
              setTargetProps(animateTargetProps);
            }
            return animateJsx;
          },
          afterAnimate: (data, onFinish, setTargetProps) => {
            onAfterAnimate(data);
            setTimeout(onFinish, 0);
            if (afterAnimateTargetProps) {
              setTargetProps(afterAnimateTargetProps);
            }
            return afterAnimateJsx;
          },
        },
      }}
    >
      {children}
    </Collector>
  );

  const BabaUnderTest = ({ from, to, start }) =>
    start ? <aside>{to}</aside> : <main>{from}</main>;

  const domData = (): GetElementSizeLocationReturnValue => ({
    size: {
      width: 100,
      height: 200,
    },
    location: {
      left: 0,
      top: 0,
    },
    raw: {
      // tslint:disable-next-line
      rect: {} as ClientRect,
      scrollTop: 0,
      scrollLeft: 0,
    },
  });

  it('should callback when animation has finished', done => {
    const Animation = createTestAnimation();
    const wrapper = mount(
      <BabaUnderTest
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
    const elementData = domData();
    (getElementSizeLocation as jest.Mock).mockReturnValue(elementData);
    const deferred = defer();
    const Animation = createTestAnimation({
      onAnimate: callback,
    });
    const wrapper = mount(
      <BabaUnderTest
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
    const Animation = createTestAnimation();

    const wrapper = mount(
      <Baba name="anim-2">
        <Animation>{props => <div {...props} />}</Animation>
      </Baba>
    );

    expect(wrapper.find('div')).toHaveProp('style', { opacity: 1 });
  });

  it('should hide children inside target baba element when animating has been triggered', () => {
    const Animation = createTestAnimation();
    const wrapper = mount(
      <BabaUnderTest
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

  it('should show children inside target baba element when animating has completed', async () => {
    const Animation = createTestAnimation();
    const deferred = defer();
    const wrapper = mount(
      <BabaUnderTest
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
