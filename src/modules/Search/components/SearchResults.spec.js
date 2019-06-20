import React from 'react';
import { shallow } from 'enzyme';

import { SEARCH_TYPES } from '../../../constants/search';

import { SearchResults } from './SearchResults';

describe('Test SearchResults component', () => {
  const baseSearch = { results: [], noResults: false };
  const baseError = {};

  it('should render', () => {
    const wrapper = shallow(
      <SearchResults
        search={baseSearch}
        error={baseError}
        searchType={SEARCH_TYPES.policy}
        hasSearched
      />
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render Policy Cards when searchType is Policy', () => {
    const wrapper = shallow(
      <SearchResults
        search={{ ...baseSearch, results: [{ policyID: '1234' }] }}
        error={baseError}
        searchType={SEARCH_TYPES.policy}
        hasSearched
      />
    );
    expect(wrapper.find('div.policy-list')).toHaveLength(1);
  });

  it('should render NewQuote Cards when searchType is NewQuote', () => {
    const wrapper = shallow(
      <SearchResults
        search={{ ...baseSearch, results: [{ id: '1234' }] }}
        error={baseError}
        searchType={SEARCH_TYPES.newQuote}
        hasSearched
      />
    );
    expect(wrapper.find('ul.property-search-results')).toHaveLength(1);
  });

  it('should render Quote Cards when searchType is Quote', () => {
    const wrapper = shallow(
      <SearchResults
        search={{ ...baseSearch, results: [{ _id: '1234' }] }}
        error={baseError}
        searchType={SEARCH_TYPES.quote}
        hasSearched
      />
    );
    expect(wrapper.find('div.quote-list')).toHaveLength(1);
  });

  it('should render Agent Cards when searchType is Agent', () => {
    const wrapper = shallow(
      <SearchResults
        search={{ ...baseSearch, results: [{ licenseNumber: '1234', _id: 1 }] }}
        error={baseError}
        searchType={SEARCH_TYPES.agent}
        hasSearched
      />
    );
    expect(wrapper.find('div.agent-list')).toHaveLength(1);
  });

  it('should render Agency Cards when searchType is Agency', () => {
    const wrapper = shallow(
      <SearchResults
        search={{ ...baseSearch, results: [{ agencyCode: '1234' }] }}
        error={baseError}
        searchType={SEARCH_TYPES.agency}
        hasSearched
      />
    );
    expect(wrapper.find('div.agency-list')).toHaveLength(1);
  });
});
