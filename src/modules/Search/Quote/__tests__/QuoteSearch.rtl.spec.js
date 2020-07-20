import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import {
  render,
  checkLabel,
  checkSelect,
  checkButton,
  jestResolve,
  mockServiceRunner
} from '../../../../test-utils';

import * as searchData from '../../data';
import { Search } from '../../index';

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

  searchData.getUIQuestions = jestResolve([
    {
      name: 'quoteState',
      answers: [
        { answer: 'Quote Started', label: 'Quote Started' },
        { answer: 'Application Started', label: 'Application Started' }
      ]
    }
  ]);

  it('POS:Renders and has fields and labels', async () => {
    mockServiceRunner([]);
    const { getByPlaceholderText, getByTestId, getByLabelText } = render(
      <Search {...props} />
    );

    fireEvent.change(getByLabelText('Search Context'), {
      target: { value: 'quote' }
    });

    await wait(() => {
      expect(getByLabelText('Search Context')).toHaveValue('quote');
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
    mockServiceRunner([]);
    const { getByPlaceholderText, getByTestId, getByLabelText } = render(
      <Search {...props} />
    );
    fireEvent.change(getByLabelText('Search Context'), {
      target: { value: 'quote' }
    });

    await wait(() => {
      expect(getByLabelText('Search Context')).toHaveValue('quote');
    });
    selectFields.forEach(field => checkSelect(getByTestId, field));
    textFields.forEach(field =>
      expect(getByPlaceholderText(field.placeholderText))
    );
  });

  it('POS:Quote Search Button', async () => {
    const { getByTestId, getByLabelText } = render(<Search {...props} />);

    fireEvent.change(getByTestId('searchType'), {
      target: { value: 'quote' }
    });

    await wait(() => {
      expect(getByLabelText('Search Context')).toHaveValue('quote');
    });

    checkButton(getByTestId, {
      dataTest: 'submit',
      text: 'Search',
      type: 'submit'
    });
  });
});
