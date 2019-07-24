import React from 'react';
import { waitForElement, fireEvent } from 'react-testing-library';

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
  checkRadio,
  checkButton
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
    text: 'Bill To',
    label: 'Bill To',
    type: 'select',
    values: [{ value: 'ab1234', label: 'Policyholder: Fake Nameington' }]
  },
  {
    dataTest: 'billPlan',
    defaultValue: 'Annual',
    text: 'Bill Plan',
    label: 'Bill Plan',
    type: 'radio',
    values: ['Annual', 'Semi-Annual', 'Quarterly']
  }
];

describe('Mailing/Billing Page Testing', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/billing' },
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      quoteInputState: 'Qualified',
      rating
    }
  };

  it("Shows a warning message when page can't be accessed due to quote input state ", () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Initial Data'
      }
    };
    const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

    expect(
      getByText(
        'Billing cannot be accessed until policyholder information and underwriting questions are answered.'
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

  it('POS:Tests button', async () => {
    const { getByText, getByTestId } = renderWithForm(
      <QuoteWorkflow {...props} />
    );
    await waitForElement(() => [
      getByTestId('billToId'),
      getByTestId('billPlan_Annual')
    ]);

    checkButton(getByText, { dataTest: 'reset', text: 'Reset' });
    checkButton(getByText);
  });

  it('POS:Checks that the Reset Button works', async () => {
    const newProps = {
      ...props,
      quoteData: {
        ...props.quoteData,
        policyHolderMailingAddress: {}
      }
    };
    const { getByTestId, getByText, getByLabelText } = renderWithForm(
      <QuoteWorkflow {...newProps} />
    );
    await waitForElement(() => [
      getByTestId('billToId'),
      getByTestId('billPlan_Annual')
    ]);

    expect(getByText('Update')).toBeDisabled();
    propertyFields.forEach(({ label, value }) =>
      fireEvent.change(getByLabelText(label), {
        target: { value }
      })
    );
    expect(getByText('Update')).not.toBeDisabled();

    fireEvent.click(getByText('Reset'));
    propertyFields.forEach(({ label }) =>
      expect(getByLabelText(label).value).toEqual('')
    );
    expect(getByText('Update')).toBeDisabled();
  });
});
