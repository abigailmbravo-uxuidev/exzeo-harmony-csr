import React from 'react';
import { shallow } from 'enzyme';
import AddressCard from './AddressCard';
import addressTestData from '../../Common/addressTestData';

it('renders without crashing', () => {
  const wrapper = shallow(<AddressCard
    addressKeyEnter={() => function () {}}
    address={addressTestData}
    index={1}
    addressSelection={() => function () {}}
  />);
  expect(wrapper);
});
