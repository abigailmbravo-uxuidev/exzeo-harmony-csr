import React from 'react';
import { shallow } from 'enzyme';
import AgencyContactAddress from './AgencyContactAddress';


describe('Test the AgencyContactAddress Component', () => {
  it('Should Render', () => {
    const mailingAddress = {
      address1: '123 Some Way',
      city: 'Tampa',
      state: 'FL',
      zip: '33600'
    };
    const wrapper = shallow(<AgencyContactAddress mailingAddress={mailingAddress} />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
