import * as React from 'react';
import { shallow } from 'enzyme';
import Baba from '../Baba';
import Collector, { Actions, Data } from '../Collector';
import * as childrenStore from '../../lib/childrenStore';
import * as dom from '../../lib/dom';

jest.mock('../../lib/childrenStore');
jest.mock('../../lib/dom');

describe('<Baba />', () => {
  afterEach(() => {
    jest.resetAllMocks();
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

    return {
      wrapper,
      mount: () => wrapper.instance().componentDidMount(),
    };
  };

  describe('storing DOM data when mounting', () => {
    it('should store data in named key', () => {
      const { mount } = shallowRender();

      mount();

      expect((childrenStore.set as jest.Mock).mock.calls[0][0]).toEqual('my-animation');
    });

    it('should store position data', () => {
      const { mount, wrapper } = shallowRender();
      const ref = {} as HTMLElement;
      const sizeLocation = { size: {}, location: {} };
      const { receiveRef } = wrapper.find(Collector).props();
      receiveRef(ref);
      (dom.getElementSizeLocation as jest.Mock).mockReturnValueOnce(sizeLocation);

      mount();

      expect((childrenStore.set as jest.Mock).mock.calls[0][1]).toMatchObject({
        ...sizeLocation,
      });
    });

    it('should store ref', () => {
      const { wrapper, mount } = shallowRender();
      const ref = {} as HTMLElement;
      const { receiveRef } = wrapper.find(Collector).props();
      receiveRef(ref);

      mount();

      expect((childrenStore.set as jest.Mock).mock.calls[0][1]).toMatchObject({
        element: ref,
      });
    });

    it('should store react node', () => {
      const { wrapper, mount } = shallowRender();
      const render = () => <div />;
      const { receiveRenderChildren } = wrapper.find(Collector).props();
      receiveRenderChildren(render);

      mount();

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

  describe('updated props', () => {
    it('should update store', () => {
      const wrapper = shallow(
        <Baba name="my-animation">
          <div />
        </Baba>
      );
      (childrenStore.set as jest.Mock).mockReset();

      wrapper.setProps({});

      expect(childrenStore.set as jest.Mock).toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('should clear out child store if pair isnt found in time', () => {
      const { wrapper } = shallowRender();
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
      const data: Data[] = [{ action: Actions.animation, payload: animation }];
      prepare(data);

      await mount();

      expect(animation).toHaveBeenCalledWith({
        caller: wrapper.instance(),
        fromTarget: {},
        toTarget: {},
      });
    });

    it('should wait until animation has finished if a wait was found', async () => {
      const { wrapper, mount } = shallowRender();
      const longAnimation = () => Promise.resolve({});
      const animation = jest.fn().mockResolvedValue({});
      const data: Data[] = [
        { action: Actions.animation, payload: longAnimation },
        { action: Actions.wait },
        { action: Actions.animation, payload: animation },
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
      const data: Data[] = [{ action: Actions.animation, payload: animation }];
      prepare(data);

      mount();

      expect(wrapper.find(Collector).props().style).toEqual({ opacity: 0 });
    });

    it('should show children when finished animating', async () => {
      const { wrapper, mount } = shallowRender();
      const animation = jest.fn().mockResolvedValue({});
      const data: Data[] = [{ action: Actions.animation, payload: animation }];
      prepare(data);

      await mount();
      wrapper.update();

      expect(wrapper.find(Collector).props().style).toEqual({ opacity: 1 });
    });

    it('should store data so the next target can pick it up', async () => {
      const { wrapper, mount } = shallowRender();
      const animation = jest.fn().mockResolvedValue({});
      const data: Data[] = [{ action: Actions.animation, payload: animation }];
      prepare(data);

      await mount();

      expect(childrenStore.set as jest.Mock).toHaveBeenCalled();
    });
  });
});
