import React from 'react';
import { shallow } from 'enzyme';
import AgentCard from './AgentCard';
import agentTestData from '../../Common/agentTestData';

it('renders without crashing', () => {
  const wrapper = shallow(<AgentCard
    agentKeyEnter={() => function () {}}
    agent={agentTestData}
    index={1}
    agentSelection={() => function () {}}
  />);
  expect(wrapper);
});
