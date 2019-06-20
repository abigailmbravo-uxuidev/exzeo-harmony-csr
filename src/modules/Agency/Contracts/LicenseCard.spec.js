import React from 'react';
import { shallow } from 'enzyme';
import LicenseCard from './LicenseCard';
import mockAgency from '../mockAgency';

describe('Testing LicenseCard component', () => {
  it('should render', () => {
    const license = mockAgency.licenses[0];
    const wrapper = shallow(
      <LicenseCard
        key={license.licenseNumber}
        license={license}
        editContract={() => {}}
      />
    );
    expect(wrapper).toBeTruthy();
  });

  it('should render License info', () => {
    const license = mockAgency.licenses[0];
    const wrapper = shallow(
      <LicenseCard
        key={license.licenseNumber}
        license={license}
        editContract={() => {}}
      />
    );
    expect(wrapper.find('.license-csp')).toHaveLength(1);
    expect(wrapper.find('.license-csp').text()).toEqual(
      'TX - test040b | 10/27/2018'
    );
  });
});
