import React from 'react';
import { shallow } from 'enzyme';
import { RemoveAgentModal } from './RemoveAgentModal';
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
    const wrapper = shallow(<RemoveAgentModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
