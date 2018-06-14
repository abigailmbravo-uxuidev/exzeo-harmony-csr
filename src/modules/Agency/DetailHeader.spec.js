import React from 'react';
import { shallow } from 'enzyme';
import { DetailHeader } from './DetailHeader';

describe('Testing Detail Header component', () => {
  it('should render without agency code', () => {
    const wrapper = shallow(<DetailHeader />);
    expect(wrapper).toBeTruthy;
  });

  it('should render with agency Code', () => {
    const wrapper = shallow(<DetailHeader agency={{ agencyCode: 123 }} />);
    expect(wrapper).toBeTruthy;
  });
});
