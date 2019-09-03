import React from 'react';
import { render, fireEvent, waitForElement, wait } from 'react-testing-library';
import { date } from '@exzeo/core-ui';

import BulkPayments from '../@components/BulkPayments';

jest.mock('../data', () => ({
  __esModule: true,
  getPaymentOptions: jest.fn(() => [
    {
      paymentType: 'Paper Deposit',
      paymentDescription: [
        'Duplicate Payment Applied in Error',
        'Misapplied Payment',
        'Misapplied Transfer',
        'Payment Received',
        'Payment Removed from Deposit',
        'Payment Transfer'
      ]
    },
    {
      paymentType: 'Electronic Deposit',
      paymentDescription: [
        'Duplicate Payment Applied in Error',
        'Misapplied Payment',
        'Misapplied Transfer',
        'Payment Received',
        'Payment Removed from Deposit',
        'Payment Transfer'
      ]
    },
    {
      paymentType: 'Paper Deposit Charge Back',
      paymentDescription: [
        'Account Closed',
        'Bank Adjustment',
        'Currency Conversion',
        'No Account',
        'NSF Payment',
        'Payment Stopped',
        'Refer to Maker',
        'Unable to Locate Account'
      ]
    },
    {
      paymentType: 'Electronic Deposit Charge Back',
      paymentDescription: [
        'Account Closed',
        'Bank Adjustment',
        'Currency Conversion',
        'No Account',
        'NSF Payment',
        'Payment Stopped',
        'Refer to Maker',
        'Unable to Locate Account'
      ]
    }
  ])
}));

const today = date.toUTC();
const initialBatchNumber = date.currentDay('YYYYMMDD');

describe('BulkPayments testing', () => {
  it('Test BulkPayments initial render', () => {
    const props = {
      errorHandler: jest.fn()
    };

    const { getByText, getByLabelText, getAllByText } = render(
      <BulkPayments {...props} />
    );

    // Batch form
    expect(getByText('Bulk Payments'));
    expect(getByLabelText('Cash Date').value).toBe(today.format('YYYY-MM-DD'));
    expect(getByLabelText('Batch Number').value).toBe(initialBatchNumber);
    expect(getByLabelText('Cash Type'));
    expect(getByText(/start/i)).toBeDisabled();
    expect(getByText(/stop/i)).toBeDisabled();

    // Payment form
    expect(getByLabelText('Policy Number')).toBeDisabled();
    // The The CurrencyFormat component in core-ui needs to an id attribute for this to work
    //expect(getByLabelText('Amount')).toBeDisabled();
    expect(getByText(/apply/i)).toBeDisabled();

    //Payment results table
    expect(getAllByText('Cash Date')[1]);
    expect(getByText(today.format('MM/DD/YYYY')));
    expect(getAllByText('Batch Number')[1]);
    expect(getByText(initialBatchNumber));
    expect(getAllByText('Cash Type')[1]);
    expect(getByText('Policy Number'));
    expect(getByText('Policyholder'));
    expect(getByText('Amount'));
    expect(getByText('0 entries totaling'));
    expect(getByText('$ 0.00'));
    expect(getByText('Download')).toBeDisabled();
  });

  it('Test BulkPayments forms', async () => {
    const props = {
      errorHandler: jest.fn()
    };

    const {
      debug,
      getByText,
      getByLabelText,
      getAllByText,
      container
    } = render(<BulkPayments {...props} />);

    fireEvent.change(await getByLabelText('Cash Type'), {
      target: { value: 'Paper Deposit' }
    });
    fireEvent.change(getByLabelText('Batch Number'), {
      target: { value: `${initialBatchNumber}99` }
    });
    fireEvent.blur(await getByLabelText('Batch Number'));

    expect(await getByText(/start/i)).toBeEnabled();
    fireEvent.click(getByText(/start/i));

    fireEvent.change(getByLabelText('Policy Number'), {
      target: { value: '12-0000000-01' }
    });
    fireEvent.blur(await getByLabelText('Policy Number'));
    fireEvent.click(await getByText(/apply/i));

    //const errorMessage = await container.querySelector('.error-message');
    expect(
      await waitForElement(() => container.querySelector('.error-message'))
    );
    //console.log(errorElement)
    //expect(errorMessage[0]).toBeDefined();
    //debug()
  });
});
