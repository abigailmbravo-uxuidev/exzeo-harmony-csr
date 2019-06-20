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
      handleSave() {},
      handleSaveAgent() {},
      listAnswersAsKey: []
    };
    const wrapper = shallow(<AgentModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper
      .instance()
      .handleSave({ agencyLicense: ['5435435'] }, x => x, props);
  });
});
