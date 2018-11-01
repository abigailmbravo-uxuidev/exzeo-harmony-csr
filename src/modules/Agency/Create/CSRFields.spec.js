import React from 'react';
import { shallow } from 'enzyme';

import { CSRFields } from './CSRFields';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<CSRFields />);
    expect(wrapper).toBeTruthy();
  });
});
