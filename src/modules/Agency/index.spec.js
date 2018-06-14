import React from 'react';
import { shallow } from 'enzyme';
import Agency from './index';

describe('Testing Agency Base component', () => {
  it('should render', () => {
    const props = {
      agency: { agencyCode: 123 },
      match: { url: '/agency' }
    };
    const wrapper = shallow(<Agency {...props} />);
    expect(wrapper).toBeTruthy;
  });
});
