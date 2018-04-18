import * as React from 'react';
import { shallow } from 'enzyme';
import Baba from '../Baba';
import Collector, { Actions, Data } from '../Collector';
import * as childrenStore from '../../lib/childrenStore';
import * as dom from '../../lib/dom';

jest.mock('../../lib/childrenStore');
jest.mock('../../lib/dom');

describe('<Baba />', () => {
  describe('when unmounting', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should store data in named key', () => {
      const wrapper = shallow(
        <Baba name="my-animation">
          <div />
        </Baba>
      );

      wrapper.unmount();

      expect((childrenStore.set as jest.Mock).mock.calls[0][0]).toEqual('my-animation');
    });

    it('should store position data', () => {
      const wrapper = shallow(
        <Baba name="my-animation">
          <div />
        </Baba>
      );
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
      const wrapper = shallow(
        <Baba name="my-animation">
          <div />
        </Baba>
      );
      const ref = {} as HTMLElement;
      const { receiveRef } = wrapper.find(Collector).props();
      receiveRef(ref);

      wrapper.unmount();

      expect((childrenStore.set as jest.Mock).mock.calls[0][1]).toMatchObject({
        element: ref,
      });
    });

    it('should store react node', () => {
      const wrapper = shallow(
        <Baba name="my-animation">
          <div />
        </Baba>
      );
      const reactNode = { node: 'node' };
      const { receiveReactNode } = wrapper.find(Collector).props();
      receiveReactNode(reactNode);

      wrapper.unmount();

      expect((childrenStore.set as jest.Mock).mock.calls[0][1]).toMatchObject({
        reactNode: reactNode,
      });
    });

    it('should throw if child was already set', () => {
      const wrapper = shallow(
        <Baba name="my-animation">
          <div />
        </Baba>
      );
      (childrenStore.has as jest.Mock).mockReturnValue(true);

      expect(() => wrapper.unmount()).toThrowErrorMatchingSnapshot();
    });

    it('should clear out child store if pair isnt found in time', () => {
      const wrapper = shallow(
        <Baba name="my-animation">
          <div />
        </Baba>
      );
      jest.useFakeTimers();

      wrapper.unmount();

      jest.runAllTimers();
      jest.useRealTimers();
      expect(childrenStore.remove).toBeCalledWith('my-animation');
    });
  });

  describe('triggering animations', () => {
    it('should trigger animations on unmount', async () => {
      const wrapper = shallow(
        <Baba name="my-animation">
          <div />
        </Baba>,
        { disableLifecycleMethods: true }
      );
      const animation = jest.fn();
      animation.mockResolvedValue({});
      const data: Data[] = [{ action: Actions.animation, payload: animation }];
      (childrenStore.get as jest.Mock).mockReturnValue({ data });

      await wrapper.instance().componentDidMount();

      expect(animation).toHaveBeenCalled();
    });

    it('should wait until animation has finished if a wait was found', async () => {
      const wrapper = shallow(
        <Baba name="my-animation">
          <div />
        </Baba>,
        { disableLifecycleMethods: true }
      );
      const longAnimation = () => Promise.resolve({});
      const animation = jest.fn();
      animation.mockResolvedValue({});
      const data: Data[] = [
        { action: Actions.animation, payload: longAnimation },
        { action: Actions.wait },
        { action: Actions.animation, payload: animation },
      ];
      (childrenStore.get as jest.Mock).mockReturnValue({ data });

      const promise = wrapper.instance().componentDidMount();

      await longAnimation();
      expect(animation).not.toHaveBeenCalled();
      await promise;
      expect(animation).toHaveBeenCalled();
    });
  });
});
