import React from 'react';
import { shallow } from 'enzyme';
import PolicySearchCard from './PolicySearchCard';
import policyTestData from '../Common/policyTestData';

it('renders without crashing', () => {
  const wrapper = shallow(<PolicySearchCard
    policyKeyEnter={() => function () {}}
    policy={policyTestData}
    index={1}
    policySelection={() => function () {}}
  />);
  expect(wrapper);
});
