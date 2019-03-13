import React from 'react';
import { shallow } from 'enzyme';

import DeleteLicenseModal from './DeleteLicenseModal';

describe('Testing DeleteLicenseModal component', () => {
  it('should render', () => {
    const props = {
        license: {
            state: 'FL',
            licenseNumber: 'a3333',
            licenseType: 'Resident',
            licenseEffectiveDate: '2019-03-13T00:00:00.000Z'
        },
        handleSubmit() {},
        handleOnSubmit() {},
        handleCancel() {},
        header: 'Save',
        headerIcon: 'fa-circle',
        text: 'Save Data',
        modalClassName: 'Save'
    };
    const wrapper = shallow(<DeleteLicenseModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper.find('Button').everyWhere((x) => {
      x.simulate('click');
      return x;
    });
  });
});
