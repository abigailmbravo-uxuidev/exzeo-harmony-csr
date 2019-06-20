import React from 'react';
import { mount } from 'enzyme';
import ContactAddress from './ContactAddress';

describe('Test the ContactAddress Component', () => {
  it('Should Render with All Address Fields', () => {
    const mailingAddress = {
      address1: '123 Some Way',
      address2: 'APT # 123',
      city: 'Tampa',
      state: 'FL',
      zip: '33600'
    };
    const wrapper = mount(<ContactAddress mailingAddress={mailingAddress} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.contact-address').text()).toMatch(
      '123 Some Way, APT # 123, Tampa, FL 33600'
    );
  });

  it('Should Render with Missing Address 2 Field', () => {
    const mailingAddress = {
      address1: '123 Some Way',
      city: 'Tampa',
      state: 'FL',
      zip: '33600'
    };
    const wrapper = mount(<ContactAddress mailingAddress={mailingAddress} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.contact-address').text()).toMatch(
      '123 Some Way, Tampa, FL 33600'
    );
  });
});
