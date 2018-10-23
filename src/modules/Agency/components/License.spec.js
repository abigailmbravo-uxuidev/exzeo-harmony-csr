import React from 'react';
import { shallow } from 'enzyme';

import License from './License';


describe('Testing AgentsCard component', () => {
  it('should render', () => {
    const props = { licenseValue: '123', fields: [] };
    const wrapper = shallow(<License {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
