import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Baba from '../Baba';
import Collector, { CollectorActions, CollectorData } from '../Collector';
import * as childrenStore from '../../lib/childrenStore';
import * as dom from '../../lib/dom';
import * as BabaManager from '../BabaManager';

jest.mock('../../lib/childrenStore');
jest.mock('../../lib/dom');
jest.mock('../BabaManager', () => ({
  withBabaManagerContext: component => component,
}));

describe('<Baba />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const stubAllReceivers = (wrapper: ShallowWrapper) => {
    const collector = wrapper.find(Collector);
    const { receiveData, receiveRef, receiveRenderChildren } = collector.props();

    receiveData([]);
    receiveRef(document.createElement('div'));
    receiveRenderChildren(() => <div />);
  };

  const buildAnimPayload = (animate: any): CollectorData => ({
    action: CollectorActions.animation,
    payload: {
      beforeAnimate: () => Promise.resolve(),
      animate,
      afterAnimate: () => Promise.resolve(),
      abort: () => {},
      cleanup: () => {},
    },
  });

  const shallowRender = (props = {}, disableLifecycleMethods = true) => {
    const wrapper = shallow(
      <Baba name="my-animation" {...props}>
        <div />
      </Baba>,
      {
        disableLifecycleMethods,
      }
    );

    stubAllReceivers(wrapper);

    return {
      wrapper,
      mount: () => wrapper.instance().componentDidMount(),
    };
  };

  const shallowRenderWithLifecycle = (props = {}) => shallowRender(props, false);

  describe('storing DOM data for later', () => {
    describe('via "in" prop', () => {
      it('should store data in named key', () => {
        const { wrapper } = shallowRenderWithLifecycle({ in: true });

        wrapper.setProps({ in: false });

        expect((childrenStore.set as jest.Mock).mock.calls[0][0]).toEqual('my-animation');
      });

      it('should store position data', () => {
        const { wrapper } = shallowRenderWithLifecycle({ in: true });
        const ref = {} as HTMLElement;
        const sizeLocation = { size: {}, location: {} };
        const { receiveRef } = wrapper.find(Collector).props();
        receiveRef(ref);
        (dom.getElementSizeLocation as jest.Mock).mockReturnValueOnce(sizeLocation);

        wrapper.setProps({ in: false });

        expect((childrenStore.set as jest.Mock).mock.calls[0][1]).toMatchObject({
          ...sizeLocation,
        });
      });

      it('should store ref', () => {
        const { wrapper } = shallowRenderWithLifecycle({ in: true });
        const ref = {} as HTMLElement;
        const { receiveRef } = wrapper.find(Collector).props();
        receiveRef(ref);

        wrapper.setProps({ in: false });

        expect((childrenStore.set as jest.Mock).mock.calls[0][1]).toMatchObject({
          element: ref,
        });
      });

      it('should store react node', () => {
        const { wrapper } = shallowRenderWithLifecycle({ in: true });
        const render = () => <div />;
        const { receiveRenderChildren } = wrapper.find(Collector).props();
        receiveRenderChildren(render);

        wrapper.setProps({ in: false });

        expect((childrenStore.set as jest.Mock).mock.calls[0][1]).toMatchObject({
          render,
        });
      });

      it('should show children immediately', () => {
        const wrapper = shallow(
          <Baba name="my-animation" in>
            <div />
          </Baba>
        );

        expect(wrapper.find(Collector).props().style).toEqual({ opacity: 1 });
      });
    });

    describe('when unmounting', () => {
      it('should store data in named key', () => {
        const { wrapper } = shallowRender();

        wrapper.unmount();

        expect((childrenStore.set as jest.Mock).mock.calls[0][0]).toEqual('my-animation');
      });

      it('should store position data', () => {
        const { wrapper } = shallowRender();
        const ref = {} as HTMLElement;
        const sizeLocation = { size: {}, location: {} };
        const { receiveRef } = wrapper.find(Collector).props();
        receiveRef(ref);
        (dom.getElementSizeLocation as jest.Mock).mockReturnValueOnce(sizeLocation);

        wrapper.unmount();

        expect((childrenStore.set as jest.Mock).mock.calls[0][1]).toMatchObject({
          ...sizeLocation,
        });
      });

      it('should store ref', () => {
        const { wrapper } = shallowRender();
        const ref = {} as HTMLElement;
        const { receiveRef } = wrapper.find(Collector).props();
        receiveRef(ref);

        wrapper.unmount();

        expect((childrenStore.set as jest.Mock).mock.calls[0][1]).toMatchObject({
          element: ref,
        });
      });

      it('should store react node', () => {
        const { wrapper } = shallowRender();
        const render = () => <div />;
        const { receiveRenderChildren } = wrapper.find(Collector).props();
        receiveRenderChildren(render);

        wrapper.unmount();

        expect((childrenStore.set as jest.Mock).mock.calls[0][1]).toMatchObject({
          render,
        });
      });

      it('should show children immediately', () => {
        const wrapper = shallow(
          <Baba name="my-animation">
            <div />
          </Baba>
        );

        expect(wrapper.find(Collector).props().style).toEqual({ opacity: 1 });
      });
    });
  });

  describe('cleanup', () => {
    it('should clear out child store if a match isnt found in time', () => {
      const { wrapper, mount } = shallowRender();
      stubAllReceivers(wrapper);
      mount();
      jest.useFakeTimers();

      wrapper.unmount();

      jest.runAllTimers();
      jest.useRealTimers();
      expect(childrenStore.remove).toBeCalledWith('my-animation');
    });
  });

  describe('triggering animations', () => {
    const prepare = (data: CollectorData[]) => {
      (childrenStore.has as jest.Mock).mockReturnValue(true);
      (childrenStore.get as jest.Mock).mockReturnValue({ data });
    };

    describe('when "in" prop changes to true', () => {
      it('should pass through data to animation', done => {
        const onFinish = () => {
          expect(animation.mock.calls[0][0].caller).toEqual(wrapper.instance());
          done();
        };

        const { wrapper } = shallowRenderWithLifecycle({ in: false, onFinish });
        const animation = jest.fn().mockResolvedValue({});
        const data: CollectorData[] = [buildAnimPayload(animation)];
        prepare(data);

        wrapper.setProps({ in: true });
      });

      it('should wait until animation has finished if a wait was found', async done => {
        const onFinish = () => {
          done();
          expect(animation).toHaveBeenCalled();
        };
        const { wrapper } = shallowRenderWithLifecycle({ in: false, onFinish });
        const longAnimation = () => Promise.resolve({});
        const animation = jest.fn().mockResolvedValue({});
        const data: CollectorData[] = [
          buildAnimPayload(longAnimation),
          { action: CollectorActions.wait },
          buildAnimPayload(animation),
        ];
        prepare(data);

        wrapper.setProps({ in: true });

        await longAnimation();
        expect(animation).not.toHaveBeenCalled();
      });

      it('should hide children when starting animating', () => {
        const { wrapper } = shallowRenderWithLifecycle({ in: false });
        const animation = jest.fn().mockResolvedValue({});
        const data: CollectorData[] = [buildAnimPayload(animation)];
        prepare(data);

        wrapper.setProps({ in: true });

        expect(wrapper.find(Collector).props().style).toEqual({ opacity: 0 });
      });

      it('should show children when finished animating', async done => {
        const onFinish = () => {
          wrapper.update();
          expect(wrapper.find(Collector).props().style).toEqual({ opacity: 1 });
          done();
        };
        const { wrapper } = shallowRenderWithLifecycle({ in: false, onFinish });
        const animation = jest.fn().mockResolvedValue({});
        const data: CollectorData[] = [buildAnimPayload(animation)];
        prepare(data);

        wrapper.setProps({ in: true });
      });

      it('should store data after finishing so the next target can pick it up', async done => {
        const onFinish = () => {
          expect(childrenStore.set as jest.Mock).toHaveBeenCalled();
          done();
        };
        const { wrapper } = shallowRenderWithLifecycle({ in: false, onFinish });
        const animation = jest.fn().mockResolvedValue({});
        const data: CollectorData[] = [buildAnimPayload(animation)];
        prepare(data);
        stubAllReceivers(wrapper);

        wrapper.setProps({ in: true });
      });
    });

    describe('when mounting', () => {
      it('should pass through data to animation', done => {
        const onFinish = () => {
          expect(animation.mock.calls[0][0].caller).toEqual(wrapper.instance());
          done();
        };
        const { wrapper, mount } = shallowRender({ onFinish });
        const animation = jest.fn().mockResolvedValue({});
        const data: CollectorData[] = [buildAnimPayload(animation)];
        prepare(data);

        mount();
      });

      it('should wait until animation has finished if a wait was found', async done => {
        const onFinish = () => {
          expect(animation).toHaveBeenCalled();
          done();
        };
        const { wrapper, mount } = shallowRender({ onFinish });
        const longAnimation = () => Promise.resolve({});
        const animation = jest.fn().mockResolvedValue({});
        const data: CollectorData[] = [
          buildAnimPayload(longAnimation),
          { action: CollectorActions.wait },
          buildAnimPayload(animation),
        ];
        prepare(data);

        mount();

        await longAnimation();
        expect(animation).not.toHaveBeenCalled();
      });

      it('should hide children when starting animating', () => {
        const { wrapper, mount } = shallowRender();
        const animation = jest.fn().mockResolvedValue({});
        const data: CollectorData[] = [buildAnimPayload(animation)];
        prepare(data);

        mount();

        expect(wrapper.find(Collector).props().style).toEqual({ opacity: 0 });
      });

      it('should show children when finished animating', () => {
        const onFinish = () => {
          wrapper.update();

          expect(wrapper.find(Collector).props().style).toEqual({ opacity: 1 });
        };
        const { wrapper, mount } = shallowRender({ onFinish });
        const animation = jest.fn().mockResolvedValue({});
        const data: CollectorData[] = [buildAnimPayload(animation)];
        prepare(data);

        mount();
      });

      it('should store data after finishing so the next target can pick it up', done => {
        const onFinish = () => {
          expect(childrenStore.set as jest.Mock).toHaveBeenCalled();
          done();
        };

        const { wrapper, mount } = shallowRender({ onFinish });
        const animation = jest.fn().mockResolvedValue({});
        const data: CollectorData[] = [buildAnimPayload(animation)];
        prepare(data);
        stubAllReceivers(wrapper);

        mount();
        (childrenStore.set as jest.Mock).mockReset();
      });
    });
  });
});
