import React from 'react';
import { shallow } from 'enzyme';

import AgentDetails from './AgentDetails';

describe('Testing AgentDetails component', () => {
  it('should render', () => {
    const wrapper = shallow(<AgentDetails />);
    expect(wrapper).toBeTruthy();
  });
});
