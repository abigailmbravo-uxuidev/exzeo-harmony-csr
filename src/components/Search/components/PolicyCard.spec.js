import React from 'react';
import { shallow } from 'enzyme';
import PolicyCard from './PolicyCard';
import policyTestData from '../../Common/policyTestData';

it('renders without crashing', () => {
  const wrapper = shallow(<PolicyCard
    policyKeyEnter={() => function () {}}
    policy={policyTestData}
    index={1}
    policySelection={() => function () {}}
  />);
  expect(wrapper);
});
