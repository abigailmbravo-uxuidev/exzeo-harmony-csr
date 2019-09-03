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
  it('Test BulkPayments forms - fetch error', async () => {
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

    expect(
      await waitForElement(() => container.querySelector('.error-message'))
    );

    //debug()
  });

  it('Test BulkPayments forms - fetch error', async () => {
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
    fireEvent.click(getByText(/start/i));
    fireEvent.change(getByLabelText('Policy Number'), {
      target: { value: '12-0000000-01' }
    });
    fireEvent.blur(await getByLabelText('Policy Number'));
    fireEvent.click(await getByText(/apply/i));

    //debug()
  });
});
