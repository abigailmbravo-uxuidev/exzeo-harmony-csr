import React from 'react';
import { shallow } from 'enzyme';
import ContactAddress from './ContactAddress';


describe('Test the ContactAddress Component', () => {
  it('Should Render', () => {
    const mailingAddress = {
      address1: '123 Some Way',
      city: 'Tampa',
      state: 'FL',
      zip: '33600'
    };
    const wrapper = shallow(<ContactAddress mailingAddress={mailingAddress} />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
