import React from 'react';
import { shallow } from 'enzyme';
import SearchPolicy from './SearchPolicy';

describe('Policy Search', () => {
  it('renders Policy Search container', () => {
    const wrapper = shallow(<SearchPolicy />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
