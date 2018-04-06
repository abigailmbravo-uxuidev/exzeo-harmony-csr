import React from 'react';
import { shallow } from 'enzyme';
import AddressTip from './AddressTip';

it('renders without crashing', () => {
  const wrapper = shallow(<AddressTip />);
  expect(wrapper);
});
