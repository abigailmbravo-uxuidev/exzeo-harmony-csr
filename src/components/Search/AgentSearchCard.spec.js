import React from 'react';
import { shallow } from 'enzyme';
import AgentSearchCard from './AgentSearchCard';
import agentTestData from '../Common/agentTestData';

it('renders without crashing', () => {
  const wrapper = shallow(<AgentSearchCard
    agentKeyEnter={() => function () {}}
    agent={agentTestData}
    index={1}
    agentSelection={() => function () {}}
  />);
  expect(wrapper);
});
