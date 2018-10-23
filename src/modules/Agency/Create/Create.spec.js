import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { Create } from './Create';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const props = {
      handleSubmit() {},
      licenseValue: '',
      sameAsMailingValue: false,
      submitting: false,
      pristine: false,
      change() {},
      agency: {},
      orphans: []
    };
    const wrapper = shallow(<Create {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
