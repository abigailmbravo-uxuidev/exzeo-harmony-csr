import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';


import DeleteLicenseModal from './DeleteLicenseModal';

describe('Testing DeleteLicenseModal component', () => {

  const mockStore = configureStore([]);
  const store = mockStore({});

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
        handleCancel() {}
    };
    const wrapper = mount(<DeleteLicenseModal store={store} {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
