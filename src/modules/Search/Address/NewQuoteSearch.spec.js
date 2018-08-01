import React from 'react';
import { shallow } from 'enzyme';
import NewQuoteSearch from './NewQuoteSearch';

describe('Test NewQuoteSearch component', () => {
  it('renders without props being passed', () => {
    const wrapper = shallow(<NewQuoteSearch />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
