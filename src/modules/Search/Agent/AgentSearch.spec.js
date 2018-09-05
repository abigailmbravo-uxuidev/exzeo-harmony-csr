import React from 'react';
import { shallow } from 'enzyme';
import AgentSearch from './AgentSearch';

describe('Test AgencySearch component', () => {
  it('renders without props being passed', () => {
    const wrapper = shallow(<AgentSearch />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
