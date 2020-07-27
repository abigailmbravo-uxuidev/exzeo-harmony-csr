import React from 'react';
import { wait } from '@testing-library/react';
import SearchForm from '../../index';
import {
  renderWithForm,
  checkLabel,
  checkSelect,
  checkButton,
  mockServiceRunner,
  mockQuestions
} from '../../../../test-utils';

mockServiceRunner([]);
mockQuestions([]);

const fields = [
  {
    dataTest: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'policy',
    options: ['New Quote', 'Quote Search', 'Policy Search']
  },
  {
    dataTest: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholderText: 'First Name Search',
    value: 'first name test'
  },
  {
    dataTest: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholderText: 'Last Name Search',
    value: 'last name test'
  },
  {
    dataTest: 'address',
    type: 'text',
    label: 'Property Street Address',
    placeholderText: 'Property Street Address Search',
    value: '1234 anytown usa'
  },
  {
    dataTest: 'policyNumber',
    type: 'text',
    label: 'Policy Number',
    placeholderText: 'Policy No Search',
    value: '1234'
  },
  {
    dataTest: 'agencyCode',
    type: 'typeahead',
    label: 'Agency Name',
    placeholderText: 'Select...'
  },
  {
    dataTest: 'effectiveDate',
    type: 'text',
    label: 'Effective Date',
    placeholderText: 'MM/DD/YYYY',
    value: '12/12/2018'
  },
  {
    dataTest: 'policyStatus',
    type: 'select',
    label: 'Policy Status',
    selected: '',
    options: [
      'Please Select...',
      'Policy Issued',
      'In Force',
      'Pending Voluntary Cancellation',
      'Pending Underwriting Cancellation',
      'Pending Underwriting Non-Renewal',
      'Cancelled',
      'Not In Force'
    ]
  },
  {
    dataTest: 'sortBy',
    type: 'select',
    label: 'Sort By',
    selected: 'policyNumber',
    options: ['Policy Number', 'First Name', 'Last Name']
  }
];

describe('Policy Search Testing', () => {
  const props = {
    pathName: '/'
  };

  const selectFields = fields.filter(({ type }) => type === 'select');
  const textFields = fields.filter(({ type }) => type === 'text');

  it('POS:Renders and has fields and labels', async () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(
      <SearchForm {...props} />
    );

    await wait(() => {
      expect(getByTestId('searchType').value).toBe('policy');
    });

    fields.forEach(field => checkLabel(getByTestId, field));
    textFields.forEach(({ placeholderText }) =>
      expect(getByPlaceholderText(placeholderText))
    );

    selectFields.forEach(({ dataTest, selected }) =>
      expect(getByTestId(dataTest).getAttribute('data-selected')).toEqual(
        selected
      )
    );
  });

  it('POS:Checks that all fields are working', () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(
      <SearchForm {...props} />
    );
    selectFields.forEach(field => checkSelect(getByTestId, field));
    textFields.forEach(field =>
      expect(getByPlaceholderText(field.placeholderText))
    );
  });

  it('POS:Policy Search Button', () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);
    checkButton(getByTestId, {
      dataTest: 'submit',
      text: 'Search',
      type: 'submit'
    });
  });
});
