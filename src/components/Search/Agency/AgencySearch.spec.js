import React from 'react';
import { shallow } from 'enzyme';
import AgencySearch from './AgencySearch';

describe('Test AgencySearch component', () => {
  it('renders without props being passed', () => {
    const wrapper = shallow(<AgencySearch />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('has a disabled submit button when passed \'submitting\' prop', () => {
    const wrapper = shallow(<AgencySearch submitting={true} />);
    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  })
});
