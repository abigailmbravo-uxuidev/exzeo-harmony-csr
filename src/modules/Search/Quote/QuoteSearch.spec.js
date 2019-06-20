import React from 'react';
import { shallow } from 'enzyme';
import QuoteSearch from './QuoteSearch';

describe('Quote Search', () => {
  it('renders Quote Search', () => {
    const wrapper = shallow(
      <QuoteSearch
        handlePagination={x => x}
        search={{ totalPages: 0, results: [], currentPage: 1 }}
      />
    );
    expect(wrapper);
  });

  it('renders pagination when there are results', () => {
    const wrapper = shallow(
      <QuoteSearch
        handlePagination={x => x}
        search={{ totalPages: 5, results: [{}], currentPage: 1 }}
      />
    );
    expect(wrapper);
  });
});
