import React from 'react';
import { shallow } from 'enzyme';
import { AgentModal } from './AgentModal';
import mockAgency from '../mockAgency';

describe('Testing AgentsModal component', () => {
  it('should render', () => {
    const props = {
      agency: mockAgency,
      handleSubmit() {},
      agencyLicenseArray: [],
      initialValues: {},
      toggleModal: () => () => {},
      editType: 'Edit',
      updateAgency() {},
      updateAgent() {},
      addAgent() {}
    };
    const wrapper = shallow(<AgentModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper.instance().update({ agencyLicense: ['5435435'] }, x => x, props);
    wrapper.instance().add({ agencyLicense: ['5435435'] }, x => x, props);
  });
});
