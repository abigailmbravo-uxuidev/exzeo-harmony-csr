import React from 'react';
import { shallow } from 'enzyme';
import { ContactFields } from './ContactFields';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<ContactFields />);
    expect(wrapper).toBeTruthy;
  });
});
