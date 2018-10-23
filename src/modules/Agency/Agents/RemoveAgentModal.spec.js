import React from 'react';
import { shallow } from 'enzyme';
import { RemoveAgentModal } from './RemoveAgentModal';
import mockAgency from '../mockAgency';

describe('Testing RemoveAgentModal component', () => {
  it('should render', () => {
    const props = {
      agency: mockAgency,
      handleSubmit() {},
      updateAgency() {},
      listOfAgents: [],
      initialValues: {},
      toggleModal: () => x => x
    };
    const wrapper = shallow(<RemoveAgentModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper.instance().removeAgent(mockAgency.license[0].agent[0], x => x, props);
  });
});
