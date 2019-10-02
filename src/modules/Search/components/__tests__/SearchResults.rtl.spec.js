import React from 'react';

import {
  renderWithReduxAndRouter,
  defaultInitialState,
  newQuoteResults as results
} from '../../../../test-utils';

import ConnectedSearchResults from '../SearchResults';

describe('POS:Results Search', () => {
  const props = {
    hasSearched: true,
    searchType: 'address',
    search: {
      // for now will use this copy since we are syncing redux state with local state anyway.
      ...defaultInitialState.search,
      results
    }
  };

  const state = {
    ...defaultInitialState,
    search: {
      ...defaultInitialState.search,
      results
    }
  };

  it('POS:Results Search and Property Search Card', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <ConnectedSearchResults {...props} />,
      { state }
    );

    expect(getByTestId('4131 TEST ADDRESS'));
    expect(getByText('4131 TEST ADDRESS |'));
    expect(getByText(/SARASOTA/));
    const icons = document.querySelectorAll('ul#property-search-results i');
  });
});
