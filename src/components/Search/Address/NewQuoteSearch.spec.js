import React from 'react';
import { shallow } from 'enzyme';
import NewQuoteSearch from './NewQuoteSearch';

describe('Test NewQuoteSearch component', () => {
  it('renders without props being passed', () => {
    const wrapper = shallow(<NewQuoteSearch />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('has a disabled submit button when passed \'submitting\' prop', () => {
    const wrapper = shallow(<NewQuoteSearch submitting={true} />);
    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  })
});

