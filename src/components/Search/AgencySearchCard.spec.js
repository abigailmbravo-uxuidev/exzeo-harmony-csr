import React from 'react';
import { shallow } from 'enzyme';
import AgencySearchCard from './AgencySearchCard';
import agencyTestData from '../Common/agencyTestData';

it('renders without crashing', () => {
  const wrapper = shallow(<AgencySearchCard
    agencyKeyEnter={() => function () {}}
    agency={agencyTestData}
    index={1}
    agencySelection={() => function () {}}
  />);
  expect(wrapper);
});
