import React from 'react';
import { reduxForm } from 'redux-form';

import { renderWithForm, checkLabel, checkTextInput, checkSelect, checkButton } from '../../../../test-utils';
import QuoteSearch from '../QuoteSearch';

const fields = [
  {
    name: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'quote',
    options: ['New Quote', 'Quote Search', 'Policy Search']
  },
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'First Name Search',
    data: 'Kim'
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Last Name Search',
    data: 'Gordon'
  },
  {
    name: 'address',
    type: 'text',
    label: 'Property Street Address',
    placeholder: 'Property Street Address Search',
    data: '9876 test address'
  },
  {
    name: 'quoteNumber',
    type: 'text',
    label: 'Quote Number',
    placeholder: 'Quote No Search',
    data: '123'
  },
  {
    name: 'quoteState',
    type: 'select',
    label: 'Quote Status',
    selected: '',
    placeholder: 'Please Select...',
    options: ['Please Select...', 'Quote Started', 'Application Started']
  }
];

describe('Quote Search Testing', () => {
  const props = {
    submitting: false,
    questions: {
      quoteState: { answers: [
        { answer: 'Quote Started', label: 'Quote Started' },
        { answer: 'Application Started', label: 'Application Started' }
      ]}
    },
    search: { results: []},
    searchTypeOptions: [
      { answer: 'address', label: 'New Quote' },
      { answer: 'quote', label: 'Quote Search' },
      { answer: 'policy', label: 'Policy Search' }
    ]
  };

  const SearchForm = reduxForm({
    form: 'SEARCH_BAR',
    initialValues: { searchType: 'quote' }
  })(QuoteSearch);

  const selectFields = fields.filter(({ type }) => type === 'select');
  const textFields = fields.filter(({ type }) => type === 'text');

  it('POS:Renders and has fields and labels', () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(<SearchForm {...props} />);

    fields.forEach(field => checkLabel(getByTestId, field));
    textFields.forEach(({ placeholder }) => expect(getByPlaceholderText(placeholder)));
    selectFields.forEach(({ name, selected }) => expect(getByTestId(name).getAttribute('data-selected')).toEqual(selected));
  });

  it('POS:Checks that all fields are working', () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(<SearchForm {...props} />);
    selectFields.forEach(field => checkSelect(getByTestId, field));
    textFields.forEach(field => checkTextInput(getByPlaceholderText, field));
  });

  it('POS:Quote Search Button', () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);
    checkButton(getByTestId, { name: 'submit', type: 'submit' });
  });
});
