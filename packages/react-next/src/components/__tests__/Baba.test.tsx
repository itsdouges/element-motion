import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Baba from '../Baba';
import Collector, { Actions, Data } from '../Collector';
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

  const createAnimationPayload = (animate: any): Data => ({
    action: Actions.animation,
    payload: {
      animate,
      prepare: () => Promise.resolve(),
      abort: () => {},
      cleanup: () => {},
    },
  });

  const shallowRender = () => {
    const wrapper = shallow(
      <Baba name="my-animation">
        <div />
      </Baba>,
      {
        disableLifecycleMethods: true,
      }
    );

    stubAllReceivers(wrapper);

    return {
      wrapper,
      mount: () => wrapper.instance().componentDidMount(),
    };
  };

  describe('storing DOM data when unmounting', () => {
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
    const prepare = (data: Data[]) => {
      (childrenStore.has as jest.Mock).mockReturnValue(true);
      (childrenStore.get as jest.Mock).mockReturnValue({ data });
    };

    it('should pass through data to animation', async () => {
      const { wrapper, mount } = shallowRender();
      const animation = jest.fn().mockResolvedValue({});
      const data: Data[] = [createAnimationPayload(animation)];
      prepare(data);

      await mount();

      expect(animation.mock.calls[0][0].caller).toEqual(wrapper.instance());
    });

    it('should wait until animation has finished if a wait was found', async () => {
      const { wrapper, mount } = shallowRender();
      const longAnimation = () => Promise.resolve({});
      const animation = jest.fn().mockResolvedValue({});
      const data: Data[] = [
        createAnimationPayload(longAnimation),
        { action: Actions.wait },
        createAnimationPayload(animation),
      ];
      prepare(data);

      const promise = mount();

      await longAnimation();
      expect(animation).not.toHaveBeenCalled();
      await promise;
      expect(animation).toHaveBeenCalled();
    });

    it('should hide children when starting animating', () => {
      const { wrapper, mount } = shallowRender();
      const animation = jest.fn().mockResolvedValue({});
      const data: Data[] = [createAnimationPayload(animation)];
      prepare(data);

      mount();

      expect(wrapper.find(Collector).props().style).toEqual({ opacity: 0 });
    });

    it('should show children when finished animating', async () => {
      const { wrapper, mount } = shallowRender();
      const animation = jest.fn().mockResolvedValue({});
      const data: Data[] = [createAnimationPayload(animation)];
      prepare(data);

      await mount();
      wrapper.update();

      expect(wrapper.find(Collector).props().style).toEqual({ opacity: 1 });
    });

    it('should store data after finishing so the next target can pick it up', async () => {
      const { wrapper, mount } = shallowRender();
      const animation = jest.fn().mockResolvedValue({});
      const data: Data[] = [createAnimationPayload(animation)];
      prepare(data);
      stubAllReceivers(wrapper);

      await mount();

      expect(childrenStore.set as jest.Mock).toHaveBeenCalled();
    });
  });
});
