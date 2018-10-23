import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { Agents } from './Agents';

describe('Testing Agents component', () => {
  it('should render', () => {
    const props = { getAgency: x => x, agents: [{ agentCode: '1234' }] };
    const wrapper = shallow(<Agents {...props} agency={mockAgency} />);
    expect(wrapper.exists()).toBeTruthy();

    const wi = wrapper.instance();

    wi.toggleRemoveAgentModal(0);
    wi.openAgentDetailNewModal();
    wi.openAgentDetailEditModal(0);
    wi.toggleExistingAgentModal();
  });
});
