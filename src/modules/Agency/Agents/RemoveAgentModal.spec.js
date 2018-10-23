import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { RemoveAgentModal } from './RemoveAgentModal';

describe('Testing RemoveAgentModal component', () => {
  it('should render', () => {
    const props = {
      agency: mockAgency,
      handleSubmit() {},
      handleConfirm() {},
      listOfAgents: [],
      initialValues: {},
      toggleModal: () => x => x
    };
    const wrapper = shallow(<RemoveAgentModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper.instance().props.handleConfirm(mockAgency, x => x, props);
  });
});
