import React from 'react';
import { shallow } from 'enzyme';
import { Contracts } from './Contracts';
import mockAgency from '../mockAgency';

describe('Testing Contracts component', () => {
  it('should render', () => {
    const props = { getAgency: x => x, updateAgency() {} };
    const wrapper = shallow(<Contracts {...props} agency={mockAgency} state={{ contractIndex: 0 }} />);
    expect(wrapper.exists()).toBeTruthy();
    const wi = wrapper.instance();
    wi.saveContract({});
  });
});
