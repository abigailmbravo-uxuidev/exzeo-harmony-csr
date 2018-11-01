import React from 'react';
import { shallow } from 'enzyme';

import AgencyDetails from './AgencyDetails';

describe('Testing AgencyDetails component', () => {
  it('should render', () => {
    const wrapper = shallow(<AgencyDetails />);
    expect(wrapper).toBeTruthy();
  });
});
