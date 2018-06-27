import React from 'react';
import { shallow } from 'enzyme';
import { ExistingAgentModal } from './ExistingAgentModal';
import mockAgency from '../mockAgency';

describe('Testing AgentsModal component', () => {
  it('should render', () => {
    const props = {
      updateAgency() {},
      agency: mockAgency,
      handleSubmit() {},
      listOfAgents: [],
      initialValues: { agencyLicense: [mockAgency.license[0].licenseNumber] },
      toggleModal() {}
    };
    const wrapper = shallow(<ExistingAgentModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper.instance().saveAgent({ agencyLicense: [mockAgency.license[0].licenseNumber] }, x => x, props);
  });
});
