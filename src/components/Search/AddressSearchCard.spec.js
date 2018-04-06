import React from 'react';
import { shallow } from 'enzyme';
import AddressSearchCard from './AddressSearchCard';
import addressTestData from '../Common/addressTestData';

it('renders without crashing', () => {
  const wrapper = shallow(<AddressSearchCard
    addressKeyEnter={() => function () {}}
    address={addressTestData}
    index={1}
    addressSelection={() => function () {}}
  />);
  expect(wrapper);
});
