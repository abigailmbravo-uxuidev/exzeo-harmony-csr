import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import {
  render,
  defaultQuoteWorkflowProps,
  rating,
  verifyForm,
  mockServiceRunner,
  mockQuestions
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

mockServiceRunner([]);
mockQuestions([]);

const baseAiFields = [
  {
    dataTest: 'name1',
    type: 'text',
    required: true,
    label: 'First Name',
    value: 'test last names'
  },
  {
    dataTest: 'name2',
    type: 'text',
    label: 'Last Name',
    value: 'test first name'
  },
  {
    dataTest: 'address1',
    type: 'text',
    required: true,
    label: 'Address 1',
    value: 'test adress 1'
  },
  {
    dataTest: 'address2',
    type: 'text',
    label: 'Address 2',
    value: 'test address 2'
  },
  {
    dataTest: 'city',
    type: 'text',
    required: true,
    label: 'City',
    value: 'test city'
  },
  {
    dataTest: 'state',
    type: 'text',
    required: true,
    label: 'State',
    value: 'FL'
  },
  {
    dataTest: 'zip',
    type: 'text',
    required: true,
    label: 'Zip Code',
    value: 'test name 1'
  },
  {
    dataTest: 'phoneNumber',
    type: 'text',
    label: 'Phone Number',
    value: '(123) 123-1231'
  },
  {
    dataTest: 'referenceNumber',
    type: 'text',
    label: 'Reference Number',
    value: '123'
  }
];

describe('Additional Interest Testing', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/additionalInterests' },
    match: { params: { step: 'additionalInterests' } },
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      rating
    },
    options: {
      ...defaultQuoteWorkflowProps.options,
      order: [{ answer: '0', label: 'First Mortgagee' }]
    }
  };

  const stateField = baseAiFields.find(({ dataTest }) => dataTest === 'state');
  const zipField = baseAiFields.find(({ dataTest }) => dataTest === 'zip');

  it('POS:Error Message exists with no quote data', async () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        rating: {}
      }
    };
    const { getByText } = render(<QuoteWorkflow {...newProps} />);

    await wait(() =>
      expect(
        getByText(
          'Additional Interests cannot be accessed until Premium calculated.'
        )
      )
    );
  });

  it('NEG:Mortgagee Invalid Input Testing', async () => {
    const { getByText, getByTestId } = render(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Mortgagee'));

    await wait(() => {
      verifyForm(
        getByTestId,
        [
          {
            ...stateField,
            value: 'abc',
            error: 'Only 2 letters allowed'
          }
        ],
        [],
        'ai-modal-submit'
      );
      verifyForm(
        getByTestId,
        [
          {
            ...zipField,
            value: '1234567890',
            error: 'Only 5 numbers allowed'
          }
        ],
        [],
        'ai-modal-submit'
      );
    });
  });
});
