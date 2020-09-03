import React from 'react';
import {
  waitForElement,
  fireEvent,
  within,
  wait
} from '@testing-library/react';

import {
  render,
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
    const { getByText } = render(<QuoteWorkflow {...newProps} />);

    expect(
      getByText(
        'Billing cannot be accessed until policyholder information and underwriting questions are answered.'
      )
    );
  });

  it('POS:Checks Page Headers', async () => {
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

  it('POS:Tests button', () => {
    const { getByText } = render(<QuoteWorkflow {...props} />);
    expect(getByText('Reset').textContent).toMatch(/Reset/);
  });

  it('POS:Checks that the Reset Button works', async () => {
    const newProps = {
      ...props,
      quoteData: {
        ...props.quoteData
      }
    };

    newProps.quote.sameAsPropertyAddress = false;
    newProps.quote.billToId = 'ab1234';
    newProps.quote.billToType = 'Policyholder';
    newProps.quote.billPlan = 'Annual';

    const { getByTestId, getByText } = render(<QuoteWorkflow {...newProps} />);
    await waitForElement(() => [
      getByTestId('billToId'),
      getByTestId('billPlan_Annual')
    ]);

    await wait(() => {
      expect(getByText('Update')).toBeDisabled();
    });

    fireEvent.change(getByTestId('policyHolderMailingAddress.address1'), {
      target: { value: 'New Address' }
    });

    await wait(() => {
      expect(getByText('Update')).not.toBeDisabled();
    });

    fireEvent.click(getByText('Reset'));

    await wait(() => {
      expect(getByTestId('policyHolderMailingAddress.address1').value).toEqual(
        '6666 mailing address'
      );
      expect(getByText('Update')).toBeDisabled();
    });
  });

  it('POS:Checks that Same As Property Address Button works', async () => {
    const newProps = {
      ...props,
      quoteData: {
        ...props.quoteData,
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

    newProps.quote.policyHolderMailingAddress = {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    };
    newProps.quote.sameAsPropertyAddress = false;

    const { getByTestId, getByText } = render(<QuoteWorkflow {...newProps} />);
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
        newProps.quote.property.physicalAddress.address1
      );

      expect(getByTestId('policyHolderMailingAddress.city').value).toEqual(
        newProps.quote.property.physicalAddress.city
      );

      expect(getByTestId('policyHolderMailingAddress.state').value).toEqual(
        newProps.quote.property.physicalAddress.state
      );

      expect(getByTestId('policyHolderMailingAddress.zip').value).toEqual(
        newProps.quote.property.physicalAddress.zip
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

      expect(getByText('Update')).not.toBeDisabled();
      expect(getByTestId('policyHolderMailingAddress.address1').value).toEqual(
        newProps.quote.property.physicalAddress.address1
      );
    });

    fireEvent.change(getByTestId('policyHolderMailingAddress.address1'), {
      target: { value: 'This is A New Address' }
    });

    await wait(() => {
      expect(getByTestId('sameAsPropertyAddress')).toHaveAttribute(
        'data-value',
        'false'
      );

      expect(getByTestId('policyHolderMailingAddress.address1').value).toEqual(
        'This is A New Address'
      );

      expect(getByTestId('policyHolderMailingAddress.city').value).toEqual(
        newProps.quote.property.physicalAddress.city
      );

      expect(getByTestId('policyHolderMailingAddress.state').value).toEqual(
        newProps.quote.property.physicalAddress.state
      );

      expect(getByTestId('policyHolderMailingAddress.zip').value).toEqual(
        newProps.quote.property.physicalAddress.zip
      );
    });
  });
});
