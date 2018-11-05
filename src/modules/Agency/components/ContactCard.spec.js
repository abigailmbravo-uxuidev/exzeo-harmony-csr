import React from 'react';
import { shallow } from 'enzyme';

import { ContactCard } from './ContactCard';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<ContactCard contact={{ firstName: 'test' }} />);
    expect(wrapper).toBeTruthy();
  });
});
