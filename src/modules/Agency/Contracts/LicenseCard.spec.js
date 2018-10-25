import React from 'react';
import { shallow } from 'enzyme';
import LicenseCard from './LicenseCard';
import mockAgency from '../mockAgency';

describe('Testing LicenseCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<LicenseCard license={mockAgency.contracts[0]} editContract={x => x} />);
    expect(wrapper).toBeTruthy();
  });
});
