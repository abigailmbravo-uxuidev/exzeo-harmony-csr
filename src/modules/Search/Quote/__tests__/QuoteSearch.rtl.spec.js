import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import SearchForm from '../../index';
import {
  renderWithForm,
  checkLabel,
  checkSelect,
  checkButton,
  jestResolve
} from '../../../../test-utils';
import * as hooks from '../../hooks';

const fields = [
  {
    dataTest: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'quote',
    options: ['New Quote', 'Quote Search', 'Policy Search']
  },
  {
    dataTest: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholderText: 'First Name Search',
    value: 'Kim'
  },
  {
    dataTest: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholderText: 'Last Name Search',
    value: 'Gordon'
  },
  {
    dataTest: 'address',
    type: 'text',
    label: 'Property Street Address',
    placeholderText: 'Property Street Address Search',
    value: '9876 test address'
  },
  {
    dataTest: 'quoteNumber',
    type: 'text',
    label: 'Quote Number',
    placeholderText: 'Quote No Search',
    value: '123'
  },
  {
    dataTest: 'quoteState',
    type: 'select',
    label: 'Quote Status',
    selected: '',
    placeholderText: 'Please Select...',
    options: [
      'Please Select...',
      'Quote Started',
      'Application Started',
      'Quote Stopped',
      'Quote Declined',
      'Application Sent DocuSign',
      'Application Sent Manual',
      'Application Obstructed',
      'Quote Expired',
      'Documents Received',
      'Policy Issued',
      'DocuSign Voided',
      'Quote Qualified',
      'Application Ready'
    ]
  }
];

describe('Quote Search Testing', () => {
  const props = {
    pathName: '/'
  };

  const selectFields = fields.filter(({ type }) => type === 'select');
  const textFields = fields.filter(({ type }) => type === 'text');

  hooks.useFetchQuoteState = jestResolve({
    quoteStateList: [
      { answer: 'Quote Started', label: 'Quote Started' },
      { answer: 'Application Started', label: 'Application Started' },
      { answer: 'Quote Stopped', label: 'Quote Stopped' },
      { answer: 'Quote Declined', label: 'Quote Declined' },
      {
        answer: 'Application Sent DocuSign',
        label: 'Application Sent DocuSign'
      },
      {
        answer: 'Application Sent Manual',
        label: 'Application Sent Manual'
      },
      { answer: 'Application Obstructed', label: 'Applicaiton Obstructed' },
      { answer: 'Quote Expired', label: 'Quote Expired' },
      { answer: 'Documents Received', label: 'Documents Received' },
      { answer: 'Policy Issued', label: 'Policy Issued' },
      { answer: 'DocuSign Voided', label: 'DocuSign Voided' },
      { answer: 'Quote Qualified', label: 'Quote Qualified' },
      { answer: 'Application Ready', label: 'Application Ready' }
    ]
  });

  it('POS:Renders and has fields and labels', async () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(
      <SearchForm {...props} />
    );

    fireEvent.change(getByTestId('searchType'), {
      target: { value: 'quote' }
    });

    await wait(() => {
      expect(getByTestId('searchType').value).toBe('quote');
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

  it('POS:Checks that all fields are working', async () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(
      <SearchForm {...props} />
    );
    fireEvent.change(getByTestId('searchType'), {
      target: { value: 'quote' }
    });

    await wait(() => {
      expect(getByTestId('searchType').value).toBe('quote');
    });
    selectFields.forEach(field => checkSelect(getByTestId, field));
    textFields.forEach(field =>
      expect(getByPlaceholderText(field.placeholderText))
    );
  });

  it('POS:Quote Search Button', async () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);

    fireEvent.change(getByTestId('searchType'), {
      target: { value: 'quote' }
    });

    await wait(() => {
      expect(getByTestId('searchType').value).toBe('quote');
    });

    checkButton(getByTestId, {
      dataTest: 'submit',
      text: 'Search',
      type: 'submit'
    });
  });
});
