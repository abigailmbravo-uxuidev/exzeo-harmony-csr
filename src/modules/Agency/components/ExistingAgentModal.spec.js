import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { ExistingAgentModal } from './ExistingAgentModal';

describe('Testing AgentsModal component', () => {
  it('should render', () => {
    const props = {
      agency: mockAgency,
      header: 'test',
      handleSubmit() {},
      listOfAgents: [],
      initialValues: {},
      onToggleModal() {},
      handleSelection() {}
    };
    const wrapper = shallow(<ExistingAgentModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
