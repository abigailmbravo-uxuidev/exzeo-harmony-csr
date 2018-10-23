import React from 'react';
import { shallow } from 'enzyme';

import { AgencyModal } from './AgencyModal';
import mockAgency from './mockAgency';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const props = {
      change() {},
      sameAsMailingValue: true,
      agency: mockAgency,
      handleSubmit() {},
      fieldValues: {
        sameAsMailing: true
      }
    };
    const wrapper = shallow(<AgencyModal initialValues={mockAgency} {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
