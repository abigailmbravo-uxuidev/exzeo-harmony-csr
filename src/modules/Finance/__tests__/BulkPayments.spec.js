import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { date } from '@exzeo/core-ui';

import BulkPayments from '../@components/BulkPayments';

jest.mock('../hooks', () => ({
  __esModule: true,
  useFetchPaymentOptions: jest.fn(() => [
    { answer: 'Paper Deposit', label: 'Paper Deposit' },
    { answer: 'Electronic Deposit', label: 'Electronic Deposit' },
    { answer: 'Paper Deposit Charge Back', label: 'Paper Deposit Charge Back' },
    {
      answer: 'Electronic Deposit Charge Back',
      label: 'Electronic Deposit Charge Back'
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

    const { getByText, getByLabelText, getAllByText, container } = render(
      <BulkPayments {...props} />
    );

    fireEvent.click(getByLabelText('Cash Type'));
    fireEvent.mouseDown(getByLabelText('Cash Type'), {
      target: { value: 'Paper Deposit' }
    });
  });
});
