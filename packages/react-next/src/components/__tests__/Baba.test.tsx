import * as React from 'react';
import { shallow } from 'enzyme';
import Baba from '../Baba';
import RefCollector from '../RefCollector';
import * as childrenStore from '../../lib/childrenStore';
import * as dom from '../../lib/dom';

jest.mock('../../lib/childrenStore');
jest.mock('../../lib/dom');

describe('<Baba />', () => {
  describe('when unmounting', () => {
    afterEach(() => {
      (childrenStore.set as jest.Mock).mockReset();
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
      const { getRef } = wrapper.find(RefCollector).props();
      getRef(ref);
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
      const { getRef } = wrapper.find(RefCollector).props();
      getRef(ref);

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
      const { getReactNode } = wrapper.find(RefCollector).props();
      getReactNode(reactNode);

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
  });
});
