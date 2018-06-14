import React from 'react';
import { shallow } from 'enzyme';
import { Overview } from './Overview';
import mockAgency from '../mockAgency';

describe('Testing Overview component', () => {
  it('should render', () => {
    const props = { getAgency: x => x };
    const wrapper = shallow(<Overview {...props} agency={mockAgency} />);
    expect(wrapper).toBeTruthy;
  });
});
