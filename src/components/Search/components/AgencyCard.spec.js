import React from 'react';
import { shallow } from 'enzyme';
import AgencyCard from './AgencyCard';
import agencyTestData from '../../Common/agencyTestData';

it('renders without crashing', () => {
  const wrapper = shallow(<AgencyCard
    agencyKeyEnter={() => function () {}}
    agency={agencyTestData}
    index={1}
    agencySelection={() => function () {}}
  />);
  expect(wrapper);
});
