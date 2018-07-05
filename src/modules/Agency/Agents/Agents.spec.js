import React from 'react';
import { shallow } from 'enzyme';
import { Agents } from './Agents';
import mockAgency from '../mockAgency';

describe('Testing Agents component', () => {
  it('should render', () => {
    const props = { getAgency: x => x };
    const wrapper = shallow(<Agents {...props} agency={mockAgency} />);
    expect(wrapper.exists()).toBeTruthy();

    const wi = wrapper.instance();

    const agent = { agentCode: 60562 };

    wi.removeAgentModal()(agent);
    wi.toggleNewAgentModal(mockAgency);
    wi.toggleAgentModal('Edit')(null, mockAgency);
    wi.toggleAgentModal('Edit')(agent, null);
    wi.toggleAgentModal('Edit')(agent, mockAgency);
    wi.toggleExistingAgentModal();
  });
});
