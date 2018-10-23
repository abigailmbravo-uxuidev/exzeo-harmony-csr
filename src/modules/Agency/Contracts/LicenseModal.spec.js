import React from 'react';
import { shallow } from 'enzyme';

import { LicenseModal } from './LicenseModal';

describe('Testing ContractsCard component', () => {
  it('should render', () => {
    const props = {
      toggleModal() {},
      handleSubmit() {},
      agentValue: []
    };
    const wrapper = shallow(<LicenseModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
