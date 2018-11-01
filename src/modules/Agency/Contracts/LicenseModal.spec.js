import React from 'react';
import { shallow } from 'enzyme';
import { LicenseModal } from './LicenseModal';
import mockAgency from '../mockAgency';

describe('Testing License modal', () => {
  it('should render', () => {
    const props = {
      closeModal() {},
      saveLicense() {},
      handleSubmit() {},
      onSubmit() {},
      initialValues: mockAgency.licenses[0]
    };
    const wrapper = shallow(<LicenseModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render form elements', () => {
    const props = {
      closeModal() {},
      saveLicense() {},
      handleSubmit() {},
      onSubmit() {},
      initialValues: mockAgency.licenses[0]
    };
    const wrapper = shallow(<LicenseModal {...props} />);
    expect(wrapper.find('Field')).toHaveLength(4);
    expect(wrapper.find('button')).toHaveLength(2);
  });
});
