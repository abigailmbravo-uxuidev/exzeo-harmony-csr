import React from 'react';

import { renderWithReduxAndRouter, defaultInitialState, newQuoteResults as results } from '../../../../test-utils';

import ConnectedSearchResults from '../SearchResults';

describe('POS:Results Search', () => {
  const props = {
    hasSearched: true,
    searchType: 'address'
  };

  const state = {
    ...defaultInitialState,
    search: {
      ...defaultInitialState.search,
      results
    }
  };

  it('POS:Results Search and Property Search Card', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedSearchResults
      {...props}
    />, { state });

    expect(getByTestId('4131 TEST ADDRESS'));
    expect(getByText('4131 TEST ADDRESS'));
    expect(getByText(/SARASOTA/));
    const icons = document.querySelectorAll('ul#property-search-results i');
    expect(icons[0].className).toEqual('card-icon fa fa-map-marker');
    expect(icons[1].className).toEqual('fa fa-chevron-circle-right');
  });
});
