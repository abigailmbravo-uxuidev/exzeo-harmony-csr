import React from 'react';
import { shallow } from 'enzyme';
import { Contracts } from './Contracts';
import mockAgency from '../mockAgency';

describe('Testing Contracts component', () => {
  it('should render', () => {
    const props = { getAgency: x => x };
    const wrapper = shallow(<Contracts {...props} agency={mockAgency} />);
    expect(wrapper).toBeTruthy;
  });
});
