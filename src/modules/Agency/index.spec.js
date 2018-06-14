import React from 'react';
import { shallow } from 'enzyme';
import Agency from './index';
import mockAgency from './mockAgency';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const props = {
      agency: mockAgency,
      match: { url: '/agency' }
    };
    const wrapper = shallow(<Agency {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
