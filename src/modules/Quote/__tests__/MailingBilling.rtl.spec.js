import React from 'react';
import { waitForElement } from 'react-testing-library';

import {
  renderWithForm,
  defaultQuoteWorkflowProps,
  rating,
  mockServiceRunner,
  mailingBillingResult as result,
  propertyFields,
  checkHeader,
  checkLabel,
  checkTextInput,
  checkSelect,
  checkRadio
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

mockServiceRunner(result);

const pageHeaders = [
  { text: 'Mailing Address' },
  { text: 'Billing Information' },
  { text: 'Installment Plan' }
];

const billingFields = [
  {
    dataTest: 'billToId',
    label: 'Bill To',
    type: 'select',
    values: ['ab1234']
  },
  {
    dataTest: 'billPlan',
    label: 'Bill Plan',
    type: 'radio',
    values: ['Annual', 'Semi-Annual', 'Quarterly']
  }
];

describe('Mailing Address Testing', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/billing' },
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      rating
    }
  };

  it('POS:Checks message with no rating options', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        rating: {}
      }
    };
    const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

    expect(
      getByText(
        'Billing cannot be accessed until there is a rating on the quote.'
      )
    );
  });

  it('POS:Checks Page Headers', async () => {
    const { getByTestId, getByText } = renderWithForm(
      <QuoteWorkflow {...props} />
    );
    await waitForElement(() => [
      getByTestId('billToId'),
      getByTestId('annual-plan')
    ]);

    pageHeaders.forEach(header => checkHeader(getByText, header));
  });

  it('POS:Checks fields', async () => {
    const { getByText, getByTestId, getByLabelText } = renderWithForm(
      <QuoteWorkflow {...props} />
    );
    await waitForElement(() => [
      getByTestId('billToId'),
      getByTestId('billPlan_Annual')
    ]);

    [...propertyFields, ...billingFields].forEach(field => {
      checkLabel(getByText, field);
      if (field.type === 'text') return checkTextInput(getByLabelText, field);
      if (field.type === 'select') return checkSelect(getByLabelText, field);
      if (field.type === 'radio') return checkRadio(getByTestId, field);
    });
  });
});
