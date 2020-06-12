import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { fireEvent, wait, render } from '@testing-library/react';
import thunk from 'redux-thunk';

import {
  defaultInitialState,
  userProfile,
  renderWithReduxAndRouter,
  checkTextInput,
  checkLabel,
  mockServiceRunner,
  mockQuestions
} from '../../../test-utils';
import rootReducer from '../../../state/reducers';
import ConnectedSearch from '../index';

const newQuoteFields = [
  {
    dataTest: 'address',
    type: 'text',
    required: true,
    label: 'Property Address',
    value: '4131 TEST ADDRESS'
  }
];

mockServiceRunner([]);
mockQuestions([]);

describe('Testing Policy Search Component', () => {
  const props = {
    pathName: '/'
  };

  // Create a real store with our actual reducers so we have the formReducer
  const store = createStore(
    rootReducer,
    { ...defaultInitialState, authState: { userProfile } },
    applyMiddleware(thunk)
  );

  it('POS:Policy Search', async () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <ConnectedSearch {...props} />,
      { store }
    );
    expect(getByText('Search Context'));
    expect(getByText('Property Street Address'));
    expect(getByText('New Quote'));
    expect(getByText('Quote Search'));
    expect(getByText('Policy Search'));

    // Change search type
    fireEvent.change(getByTestId('searchType'), {
      target: { value: 'address' }
    });

    await wait(() => {
      expect(getByTestId('searchType').getAttribute('data-selected')).toEqual(
        'address'
      );
      expect(getByText('Property Address'));
      newQuoteFields
        .filter(({ type }) => type === 'text')
        .forEach(field => {
          checkTextInput(getByTestId, field);
          checkLabel(getByTestId, field);
        });
      expect(getByText('Search').getAttribute('type')).toEqual('submit');
    });
  });
});
