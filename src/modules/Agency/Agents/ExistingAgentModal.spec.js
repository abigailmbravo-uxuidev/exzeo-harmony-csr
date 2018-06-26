import React from 'react';
import { shallow } from 'enzyme';
import { ExistingAgentModal } from './ExistingAgentModal';
import mockAgency from '../mockAgency';

describe('Testing AgentsModal component', () => {
  it('should render', () => {
    const props = {
      agency: mockAgency,
      handleSubmit() {},
      listOfAgents: [],
      initialValues: {},
      toggleModal() {}
    };
    const wrapper = shallow(<ExistingAgentModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
