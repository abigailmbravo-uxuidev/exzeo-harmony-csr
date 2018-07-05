import React from 'react';
import { shallow } from 'enzyme';
import { AgencyHeader } from './AgencyHeader';

describe('Testing AgencyHeader component', () => {
  it('should render', () => {
    const wrapper = shallow(<AgencyHeader />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
