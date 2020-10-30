import React from 'react';

import {
  render,
  waitForElement,
  fireEvent,
  within,
  wait,
  defaultQuoteWorkflowProps,
  rating,
  mockServiceRunner,
  mailingBillingResult as result,
  propertyFields
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
  const baseProps = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/billing' },
    match: { params: { step: 'billing' } },
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      quoteInputState: 'Qualified',
      rating
    }
  };

  it("Shows a warning message when page can't be accessed due to quote input state ", () => {
    const props = {
      ...baseProps,
      quote: {
        ...baseProps.quote,
        quoteInputState: 'Initial Data'
      }
    };
    const { getByText } = render(<QuoteWorkflow {...props} />);

    expect(
      getByText(
        'Billing cannot be accessed until policyholder information and underwriting questions are answered.'
      )
    );
  });

  it('POS:Checks Page Headers', async () => {
    const props = { ...baseProps };
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    await waitForElement(() => [
      getByTestId('billToId'),
      getByTestId('annual-plan')
    ]);

    const { getByText: getByTextInsideForm } = within(
      document.getElementById('QuoteWorkflowCSR')
    );

    pageHeaders.forEach(header => expect(getByTextInsideForm(header.text)));
  });

  it('POS:Checks fields', async () => {
    const props = { ...baseProps };
    const { getByTestId, getByText } = render(<QuoteWorkflow {...props} />);
    await waitForElement(() => [
      getByTestId('billToId'),
      getByTestId('billPlan_Annual')
    ]);

    const { getByText: getByTextWithinAddress } = within(
      getByTestId('section-mailing-address')
    );

    propertyFields.forEach(field => {
      expect(getByTextWithinAddress(field.label));
    });

    billingFields.forEach(field => {
      expect(getByText(field.label));
    });
  });

  it('POS:Checks that the Reset Button works', async () => {
    const props = {
      ...baseProps,
      quote: {
        ...baseProps.quote,
        sameAsPropertyAddress: false,
        billToId: 'ab1234',
        billToType: 'Policyholder',
        billPlan: 'Annual'
      }
    };

    const { getByTestId, getByText, queryByRole, getByRole } = render(
      <QuoteWorkflow {...props} />
    );

    await wait(() => {
      expect(queryByRole('status')).not.toBeInTheDocument();
    });

    expect(getByTestId('billToId')).toBeInTheDocument();
    expect(getByTestId('billPlan_Annual')).toBeInTheDocument();
    expect(getByText('Update')).toBeDisabled();
    const updateButton = getByRole('button', { name: 'Update' });

    fireEvent.change(getByTestId('policyHolderMailingAddress.address1'), {
      target: { value: 'New Address' }
    });

    await wait(() => {
      expect(updateButton).not.toBeDisabled();
    });

    fireEvent.click(getByRole('button', { name: 'Reset' }));

    await wait(() => {
      expect(getByTestId('policyHolderMailingAddress.address1').value).toEqual(
        '6666 mailing address'
      );
      expect(updateButton).toBeDisabled();
    });
  });

  it('POS:Checks that Same As Property Address Button works', async () => {
    const props = {
      ...baseProps,
      quote: {
        ...baseProps.quote,
        policyHolderMailingAddress: {
          address1: '',
          address2: '',
          city: '',
          state: '',
          zip: ''
        },
        sameAsPropertyAddress: false
      }
    };

    const { getByTestId, getByText } = render(<QuoteWorkflow {...props} />);
    await waitForElement(() => [
      getByTestId('billToId'),
      getByTestId('billPlan_Annual')
    ]);

    await wait(() => {
      expect(getByTestId('sameAsPropertyAddress')).toHaveAttribute(
        'data-value',
        'false'
      );

      expect(getByText('Update')).toBeDisabled();
      expect(getByTestId('policyHolderMailingAddress.address1').value).toEqual(
        ''
      );

      expect(getByTestId('policyHolderMailingAddress.city').value).toEqual('');
      expect(getByTestId('policyHolderMailingAddress.state').value).toEqual('');
      expect(getByTestId('policyHolderMailingAddress.zip').value).toEqual('');
    });

    fireEvent.click(getByTestId('sameAsPropertyAddress'));

    await wait(() => {
      expect(getByTestId('sameAsPropertyAddress')).toHaveAttribute(
        'data-value',
        'true'
      );

      expect(getByText('Update')).not.toBeDisabled();
      expect(getByTestId('policyHolderMailingAddress.address1').value).toEqual(
        props.quote.property.physicalAddress.address1
      );

      expect(getByTestId('policyHolderMailingAddress.city').value).toEqual(
        props.quote.property.physicalAddress.city
      );

      expect(getByTestId('policyHolderMailingAddress.state').value).toEqual(
        props.quote.property.physicalAddress.state
      );

      expect(getByTestId('policyHolderMailingAddress.zip').value).toEqual(
        props.quote.property.physicalAddress.zip
      );
    });

    fireEvent.click(getByTestId('sameAsPropertyAddress'));

    await wait(() => {
      expect(getByText('Update')).toBeDisabled();
      expect(getByTestId('sameAsPropertyAddress')).toHaveAttribute(
        'data-value',
        'false'
      );

      expect(getByTestId('policyHolderMailingAddress.address1').value).toEqual(
        ''
      );

      expect(getByTestId('policyHolderMailingAddress.city').value).toEqual('');
      expect(getByTestId('policyHolderMailingAddress.state').value).toEqual('');
      expect(getByTestId('policyHolderMailingAddress.zip').value).toEqual('');
    });

    fireEvent.click(getByTestId('sameAsPropertyAddress'));

    await wait(() => {
      expect(getByTestId('sameAsPropertyAddress')).toHaveAttribute(
        'data-value',
        'true'
      );
    });

    expect(getByText('Update')).not.toBeDisabled();
    expect(getByTestId('policyHolderMailingAddress.address1').value).toEqual(
      props.quote.property.physicalAddress.address1
    );

    fireEvent.change(getByTestId('policyHolderMailingAddress.address1'), {
      target: { value: 'This is A New Address' }
    });

    await wait(() => {
      expect(getByTestId('sameAsPropertyAddress')).toHaveAttribute(
        'data-value',
        'false'
      );
    });

    expect(getByTestId('policyHolderMailingAddress.address1').value).toEqual(
      'This is A New Address'
    );

    expect(getByTestId('policyHolderMailingAddress.city').value).toEqual(
      props.quote.property.physicalAddress.city
    );

    expect(getByTestId('policyHolderMailingAddress.state').value).toEqual(
      props.quote.property.physicalAddress.state
    );

    expect(getByTestId('policyHolderMailingAddress.zip').value).toEqual(
      props.quote.property.physicalAddress.zip
    );
  });
});
