import React from 'react';
import { shallow } from 'enzyme';
import { AgentsCard } from './AgentsCard';
import mockAgency from '../mockAgency';

describe('Testing AgentsCard component', () => {
  it('should render', () => {
    const props = { getAgency: x => x };
    const wrapper = shallow(<AgentsCard {...props} agency={mockAgency} agent={{ mailingAddress: {} }} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
