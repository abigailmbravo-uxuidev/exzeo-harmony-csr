import React from 'react';
import { shallow } from 'enzyme';
import SearchAgency from './SearchAgency';

describe('Agency Search', () => {
  it('renders Agency Search container', () => {
    const wrapper = shallow(<SearchAgency />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
