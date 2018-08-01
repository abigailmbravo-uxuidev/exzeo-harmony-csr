import React from 'react';
import { shallow } from 'enzyme';
import AgentCard from './AgentCard';
import agentTestData from '../../../common/agentTestData';

describe('Test AgentCard component', () => {
  it('renders when provided correctly structured agency', () => {
    const wrapper = shallow(
      <AgentCard
        handleKeypress={() => null}
        handleClick={() => null}
        agent={agentTestData}
      />
    );

    const link = wrapper.find(`#${agentTestData.licenseNumber}`);

    expect(wrapper.exists()).toBeTruthy();
    expect(link).toHaveLength(1);
    link.simulate('click');
  });
});
