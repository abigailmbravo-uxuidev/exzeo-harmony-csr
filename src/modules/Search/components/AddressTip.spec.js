import React from 'react';
import { shallow } from 'enzyme';
import AddressTip from './AddressTip';

describe('Test the AddressTip tooltip component', () => {
  it('renders when provided correctly structured agency', () => {
    const wrapper = shallow(<AddressTip />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
