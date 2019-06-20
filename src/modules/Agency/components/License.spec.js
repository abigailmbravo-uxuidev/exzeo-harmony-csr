import React from 'react';
import { shallow } from 'enzyme';

import License from './License';

describe('Testing AgentsCard component', () => {
  it('should render', () => {
    const fields = [{}, {}];
    Array.prototype.remove = x => x; //eslint-disable-line
    const props = { licenseValue: '123', fields, isAgency: true };
    const wrapper = shallow(<License {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    wrapper.find('.btn').everyWhere(x => {
      x.simulate('click');
      return x;
    });
  });
});
