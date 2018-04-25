import * as React from 'react';
import { shallow } from 'enzyme';
import BabaManager, { InjectedProps, BabaContext } from '../BabaManager';

describe('<BabaManager />', () => {
  it('should hide child initially', () => {
    const render = jest.fn();

    shallow(<BabaManager>{render}</BabaManager>);

    expect(render).toHaveBeenCalledWith({ style: { opacity: 0 } });
  });

  it('should show child when child says its ready', () => {
    const render = jest.fn();
    const wrapper = shallow(<BabaManager>{render}</BabaManager>);
    const { value: context } = wrapper.props();

    context.onFinish();

    expect(render).toHaveBeenLastCalledWith({ style: { opacity: 1 } });
  });
});
