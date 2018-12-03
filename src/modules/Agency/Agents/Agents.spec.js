import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { Agents } from './Agents';

describe('Testing Agents component', () => {
  it('should render', () => {
    const props = {
      orphans: [{ agentCode: '555', agencies: [] }],
      updateAgency() {},
      updateAgent() {},
      addAgent() {},
      getAgency() {},
      agents: [{ agentCode: '1234', agencies: [] }]
    };
    const wrapper = shallow(<Agents {...props} agency={mockAgency} />);
    expect(wrapper.exists()).toBeTruthy();

    const wi = wrapper.instance();

    wi.toggleRemoveAgentModal(0);
    wi.openAgentDetailNewModal();
    wi.openAgentDetailEditModal(0);
    wi.toggleExistingAgentModal();
    wi.onHandleEditAgent(props.agents[0]);
    wi.onHandleSaveAgent(props.agents[0]);
    wi.handleRemoveAgent(props.agents[0]);
    wi.isInAgencyLicenseArray();
    wi.toggleSwitchAgentOfRecord('1234');
    wi.handleSwitchAOR({});
    wi.handleAddExistingAgent({ selectedAgentCode: '555' });
  });
});