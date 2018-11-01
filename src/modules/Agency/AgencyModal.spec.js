import React from 'react';
import { shallow } from 'enzyme';

import { AgencyModal } from './AgencyModal';
import mockAgency from './mockAgency';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const props = {
      change() {},
      closeModal() {},
      sameAsMailingValue: true,
      agency: mockAgency,
      handleSubmit() {},
      updateAgency() {},
      fieldValues: {
        sameAsMailing: true
      }
    };
    const wrapper = shallow(<AgencyModal initialValues={mockAgency} {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
    wi.saveAgency(mockAgency);
  });
});
