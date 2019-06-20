import React from 'react';
import { shallow } from 'enzyme';
import PolicyCard from './PolicyCard';
import policyTestData from '../../../components/Common/policyTestData';

it('renders without crashing', () => {
  const wrapper = shallow(
    <PolicyCard
      policyKeyEnter={x => x}
      policy={policyTestData}
      index={1}
      policySelection={x => x}
    />
  );
  expect(wrapper);
});
