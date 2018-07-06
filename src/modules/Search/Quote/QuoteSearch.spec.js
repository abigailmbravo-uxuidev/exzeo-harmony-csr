import React from 'react';
import { shallow } from 'enzyme';
import QuoteSearch from './QuoteSearch';

describe('Quote Search', () => {
  it('renders Quote Search', () => {
    const wrapper = shallow(<QuoteSearch handlePagination={x => x} search={{ totalPages: 5, results: [{}], currentPage: 1 }} />);
    expect(wrapper);
  });

  it('has a disabled submit button when passed \'submitting\' prop', () => {
    const wrapper = shallow(<QuoteSearch handlePagination={x => x} submitting={true} search={{ results: [], currentPage: 1, totalPages: 0 }} />);
    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });
});

