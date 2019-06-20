import React from 'react';
import { shallow } from 'enzyme';

import ContactCard from './ContactCard';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<ContactCard contact={{ firstName: 'test' }} />);
    expect(wrapper).toBeTruthy();
  });

  it('should test officer with title', () => {
    const wrapper = shallow(
      <ContactCard
        isOfficer
        contact={{ firstName: 'test', title: 'Officer' }}
      />
    );
    expect(wrapper).toBeTruthy();
  });
});
