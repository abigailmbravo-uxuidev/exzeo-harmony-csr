import React from 'react';
import { shallow } from 'enzyme';
import AgentSearch from './AgentSearch';

describe('Test AgencySearch component', () => {
  it('renders without props being passed', () => {
    const wrapper = shallow(<AgentSearch />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('has a disabled submit button when passed \'submitting\' prop', () => {
    const wrapper = shallow(<AgentSearch submitting={true} />);
    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });
});
