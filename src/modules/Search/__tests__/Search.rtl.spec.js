import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { fireEvent, waitForElement, wait } from 'react-testing-library';
import thunk from 'redux-thunk';

import {
  defaultInitialState,
  userProfile,
  renderWithReduxAndRouter,
  checkTextInput,
  checkLabel,
  checkButton
} from '../../../test-utils';
import rootReducer from '../../../state/reducers';
import ConnectedSearch from '../index';

const newQuoteFields = [
  {
    name: 'address',
    type: 'text',
    required: true,
    label: 'Property Address',
    data: '4131 TEST ADDRESS'
  }
];

describe('Testing Policy Search Component', () => {
  const props = {
    pathName: '/'
  };

  // Create a real store with our actual reducers so we have the formReducer
  const store = createStore(rootReducer, { ...defaultInitialState, authState: { userProfile }}, applyMiddleware(thunk));

  it('POS:Policy Search', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedSearch
      {...props}
    />, { store });
    expect(getByText('Search Context'));
    expect(getByText('Property Street Address'));
    expect(getByText('New Quote'));
    expect(getByText('Quote Search'));
    expect(getByText('Policy Search'));

    // Change search type
    fireEvent.change(getByTestId('searchType'), { target: { value: 'address' }});
    expect(getByTestId('searchType').getAttribute('data-selected')).toEqual('address');
    expect(getByText('Property Address'));
    newQuoteFields.filter(({ type }) => type === 'text').forEach(field => {
      checkTextInput(getByTestId, field);
      checkLabel(getByTestId, field);
    });
    checkButton(getByText, { text: 'Search', type: 'submit' });
    expect(getByText('Search').getAttribute('type')).toEqual('submit');
  });


  it('POS:Policy Advanced Search Open Arrow', async () => {
    const { getByTestId, queryByTestId } = renderWithReduxAndRouter(<ConnectedSearch
      {...props}
    />, { store });
    fireEvent.click(getByTestId('policy-advanced-search'));
    await waitForElement(() => getByTestId('sortBy'));
    expect(getByTestId('policy-advanced-search').querySelector('i').className).toEqual('fa fa-chevron-up');
    fireEvent.click(getByTestId('policy-advanced-search'));
    await wait(() => expect(queryByTestId('[data-test="sortBy"]')).toBeNull());
    expect(getByTestId('policy-advanced-search').querySelector('i').className).toEqual('fa fa-chevron-down');
  });
});
