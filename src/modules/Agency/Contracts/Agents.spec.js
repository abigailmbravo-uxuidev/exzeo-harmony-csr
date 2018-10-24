import React from 'react';
import { shallow } from 'enzyme';

import Agents from './Agents';


describe('Testing AgentsCard component', () => {
  it('should render', () => {
    const fields = [{}];
    const props = {
      agent: [{ agentCode: 1, agentInfo: {} }],
      fields,
      handleRemoveAgent() {}
    };
    const wrapper = shallow(<Agents {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper.find('.btn').everyWhere((x) => {
      x.simulate('click');
      return x;
    });
  });
});
