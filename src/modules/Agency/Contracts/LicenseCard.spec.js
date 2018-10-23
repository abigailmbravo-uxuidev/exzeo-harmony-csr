import React from 'react';
import { shallow } from 'enzyme';

import LicenseCard from './LicenseCard';

describe('Testing ContractsCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<LicenseCard license={{ product: [], agent: [] }} editContract={x => x} />);
    expect(wrapper).toBeTruthy();
  });
});
