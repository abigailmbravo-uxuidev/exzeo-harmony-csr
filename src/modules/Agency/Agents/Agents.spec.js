import React from 'react';
import { shallow } from 'enzyme';
import { Agents } from './Agents';
import mockAgency from '../mockAgency';

describe('Testing Agents component', () => {
  it('should render', () => {
    const props = { getAgency: x => x };
    const wrapper = shallow(<Agents {...props} agency={mockAgency} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
