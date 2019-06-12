import React from 'react';
import { reduxForm } from 'redux-form';
import { fireEvent, waitForElement } from 'react-testing-library';

import { renderWithForm, checkLabel, checkTextInput, checkSelect, checkButton } from '../../../../test-utils';
import PolicySearch from '../PolicySearch';

const fields = [
  {
    name: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'policy',
    options: ['New Quote', 'Quote Search', 'Policy Search']
  },
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'First Name Search',
    data: 'first name test'
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Last Name Search',
    data: 'last name test'
  },
  {
    name: 'address',
    type: 'text',
    label: 'Property Street Address',
    placeholder: 'Property Street Address Search',
    data: '1234 anytown usa'
  },
  {
    name: 'policyNumber',
    type: 'text',
    label: 'Policy Number',
    placeholder: 'Policy No Search',
    data: '1234'
  },
  {
    name: 'agencyCode',
    type: 'typeahead',
    label: 'Agency Name',
    placeholder: 'Select...'
  },
  {
    name: 'effectiveDate',
    type: 'text',
    label: 'Effective Date',
    placeholder: 'MM/DD/YYYY',
    data: '12/12/2018'
  },
  {
    name: 'policyStatus',
    type: 'select',
    label: 'Policy Status',
    selected: '',
    options: [
      'Please Select...', 'Policy Issued', 'In Force', 'Pending Voluntary Cancellation',
      'Pending Underwriting Cancellation', 'Pending Underwriting Non-Renewal', 'Cancelled',
      'Not In Force'
    ]
  },
  {
    name: 'sortBy',
    type: 'select',
    label: 'Sort By',
    selected: 'policyNumber',
    options: ['Policy Number', 'First Name', 'Last Name']
  }
];

describe('Policy Search Testing', () => {
  const props = {
    agencyList: [],
    submitting: false,
    advancedSearch: true,
    questions: {
      diaryAssignees: [{ answer: 'auth0|5956365ec2b5082b9e613263', label: 'test user', type: 'user' }],
      lists: {},
      policyStatus: { answers: [
        { answer: '0', label: 'Policy Issued' }, { answer: '1', label: 'In Force' },
        { answer: '2', label: 'Pending Voluntary Cancellation' }, { answer: '3', label: 'Pending Underwriting Cancellation' },
        { answer: '4', label: 'Pending Underwriting Non-Renewal' }, { answer: '8', label: 'Cancelled' }, { answer: '9', label: 'Not In Force' },
      ]}
    },
    toggleAdvancedSearch: () => {},
    handlePagination: () => {},
    search: { results: []},
    searchTypeOptions: [
      { answer: 'address', label: 'New Quote' },
      { answer: 'quote', label: 'Quote Search' },
      { answer: 'policy', label: 'Policy Search' }
    ]
  };

  const SearchForm = reduxForm({
    form: 'SEARCH_BAR',
    initialValues: { searchType: 'policy', sortBy: 'policyNumber' }
  })(PolicySearch);

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

  it('POS:Policy Search Button', () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);
    checkButton(getByTestId, { name: 'submit', type: 'submit' });
  });
});
