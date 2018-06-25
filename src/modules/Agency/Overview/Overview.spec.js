import React from 'react';
import { shallow } from 'enzyme';
import { Overview } from './Overview';
import mockAgency from '../mockAgency';

describe('Testing Overview component', () => {
  it('should render', () => {
    const props = {
      getAgency: x => x, match: { params: { agencyCode: '123' } }, getAgentsByAgencyCode: x => x, agency: mockAgency
    };
    const wrapper = shallow(<Overview {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
