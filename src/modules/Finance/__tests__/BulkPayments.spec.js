import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from '@testing-library/react';
import { date } from '@exzeo/core-ui';

import BulkPayments from '../@components/BulkPayments';
import { getPolicy } from '../data';
import { mockPaymentOptions, mockPolicy } from '../../../test-utils';

jest.mock('../data', () => ({
  __esModule: true,
  getPaymentOptions: jest.fn(() => mockPaymentOptions),
  getPolicy: jest.fn(() => Promise.reject({ message: 'Resource Not Found' })),
  postPayment: jest.fn(() => Promise.resolve())
}));

const today = date.toUTC();
const initialBatchNumber = date.currentDay('YYYYMMDD');

describe('BulkPayments testing', () => {
  beforeEach(() => jest.resetModules());

  it('Test BulkPayments initial render', async () => {
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
    expect(getByLabelText('Payment Description'));
    expect(getByText(/start/i)).toBeDisabled();
    expect(getByText(/stop/i)).toBeDisabled();

    // Payment form
    expect(getByLabelText('Policy Number')).toBeDisabled();
    expect(getByLabelText('Amount')).toBeDisabled();
    expect(getByText(/apply/i)).toBeDisabled();

    //Payment results table
    expect(getAllByText('Cash Date')[1]);
    expect(getByText(today.format('MM/DD/YYYY')));
    expect(getAllByText('Batch Number')[1]);
    expect(getByText(initialBatchNumber));
    expect(getAllByText('Cash Type')[1]);
    expect(getAllByText('Payment Description')[1]);
    expect(getAllByText('Payment Received')[1]);
    expect(getAllByText('Policy Number')[1]);
    expect(getAllByText('Policyholder')[1]);
    expect(getAllByText('Amount')[1]);
    expect(getAllByText('0 entries totaling')[1]);
    expect(getAllByText('$ 0.00')[1]);
    expect(getByText('Download')).toBeDisabled();

    const cashTypeEl = await getByLabelText('Cash Type');
    expect(cashTypeEl.options[1].value).toBe('Paper Deposit');
    expect(cashTypeEl.options[2].value).toBe('Electronic Deposit');
    expect(cashTypeEl.options[3].value).toBe('Paper Deposit Charge Back');
    expect(cashTypeEl.options[4].value).toBe('Electronic Deposit Charge Back');
  });

  it('Test BulkPayments forms - fetch error', async () => {
    const props = {
      errorHandler: jest.fn()
    };

    const { getByText, getByLabelText } = render(<BulkPayments {...props} />);

    fireEvent.change(await getByLabelText('Cash Type'), {
      target: { value: 'Paper Deposit' }
    });

    await wait(() => {
      expect(getByLabelText('Cash Type')).toHaveTextContent('Paper Deposit');
    });

    fireEvent.change(await getByLabelText('Payment Description'), {
      target: { value: 'Payment Transfer' }
    });

    await wait(() => {
      expect(getByLabelText('Payment Description')).toHaveTextContent(
        'Payment Transfer'
      );
    });

    fireEvent.change(getByLabelText('Batch Number'), {
      target: { value: `${initialBatchNumber}99` }
    });

    await wait(() => {
      expect(getByText(/start/i)).toBeEnabled();
    });

    fireEvent.click(getByText(/start/i));

    await wait(() => {
      expect(getByText(/start/i)).toBeDisabled();
      expect(getByText(/stop/i)).toBeEnabled();
    });

    fireEvent.change(getByLabelText('Policy Number'), {
      target: { value: '12-0000000-01' }
    });

    await wait(() => {
      getByLabelText('Policy Number').focus();
      getByLabelText('Policy Number').blur();
    });

    expect(
      await waitForElement(() => [
        document.querySelector('.error-messageuuu'),
        getByText('Resource Not Found')
      ])
    );
  });

  it('Test BulkPayments fetch policy and add payment', async () => {
    getPolicy.mockImplementation(() => mockPolicy);

    const props = {
      errorHandler: jest.fn()
    };

    const {
      property: {
        physicalAddress: { city, state, zip }
      }
    } = mockPolicy;

    const { getByText, getByLabelText } = render(<BulkPayments {...props} />);

    await wait(() => getByLabelText('Cash Type'));
    getByLabelText('Payment Description');
    getByLabelText('Batch Number');

    fireEvent.change(getByLabelText('Cash Type'), {
      target: { value: 'Paper Deposit' }
    });

    fireEvent.change(getByLabelText('Payment Description'), {
      target: { value: 'Payment Transfer' }
    });

    fireEvent.change(getByLabelText('Batch Number'), {
      target: { value: `${initialBatchNumber}99` }
    });

    await wait(() => {
      expect(getByText(/start/i)).toBeEnabled();
    });

    expect(getByText(/start/i)).toBeEnabled();
    fireEvent.click(getByText(/start/i));

    await wait(() => {
      expect(getByText(/start/i)).toBeDisabled();
    });
    expect(getByText(/stop/i)).toBeEnabled();

    getByLabelText('Policy Number').focus();

    fireEvent.change(getByLabelText('Policy Number'), {
      target: { value: '12-0000000-01' }
    });

    getByLabelText('Policy Number').blur();

    await wait(() => document.querySelector('.policy-details'));
    getByText(mockPolicy.product);
    getByText(mockPolicy.companyCode);
    getByText(`| ${mockPolicy.policyNumber}`);
    getByText('Open Policy');
    getByText('Balance Due:');
    getByText(mockPolicy.summaryLedger.balance);
    getByText(
      `${mockPolicy.policyHolders[0].firstName} ${mockPolicy.policyHolders[0].lastName}`
    );
    getByText(`| ${mockPolicy.property.physicalAddress.address1},`);
    getByText(`${city}, ${state} ${zip}`);
    getByText('Effective Date:');
    getByText(date.formattedDate(mockPolicy.effectiveDate, 'MM/DD/YYYY'));
    getByText('Policy Status:');
    getByText(mockPolicy.status);
    getByText('Billing Status:');
    getByText(mockPolicy.summaryLedger.status.displayText);

    expect(getByText('Open Policy').href).toBeDefined();

    fireEvent.change(getByLabelText('Amount'), {
      target: { value: '200.00' }
    });

    fireEvent.click(getByText(/apply/i));

    await wait(() => expect(getByLabelText('Policy Number')).toHaveValue(''));
    expect(getByLabelText('Amount')).toHaveValue('');
    expect(getByText('1 entries totaling'));
    expect(getByText('$ 200.00'));
    expect(getByText('Download')).toBeEnabled();

    // check Stop button
    fireEvent.click(getByText(/stop/i));

    await wait(() => {
      expect(getByLabelText('Cash Date')).toHaveValue(
        today.format('YYYY-MM-DD')
      );
    });
    expect(getByLabelText('Batch Number')).toHaveValue(initialBatchNumber);
    expect(getByLabelText('Cash Type'));
    expect(getByLabelText('Cash Type').children[0].text).toBe(
      'Please Select...'
    );
    expect(getByText(/start/i)).toBeDisabled();
    expect(getByText(/stop/i)).toBeDisabled();
    expect(getByText('Download')).toBeDisabled();
  });

  it('Test BulkPayments with cancelled policy', async () => {
    const cancelledPolicy = {
      ...mockPolicy,
      summaryLedger: {
        ...mockPolicy.summaryLedger,
        status: {
          ...mockPolicy.summaryLedger.status,
          displayText: 'Voluntary Cancellation'
        }
      },
      status: 'Cancelled',
      editingDisabled: false
    };
    getPolicy.mockImplementation(() => cancelledPolicy);

    const props = {
      errorHandler: jest.fn()
    };

    const { getByText, getByLabelText } = render(<BulkPayments {...props} />);

    fireEvent.change(await getByLabelText('Cash Type'), {
      target: { value: 'Paper Deposit' }
    });

    fireEvent.change(await getByLabelText('Payment Description'), {
      target: { value: 'Payment Transfer' }
    });

    fireEvent.change(getByLabelText('Batch Number'), {
      target: { value: `${initialBatchNumber}99` }
    });

    await wait(() => {
      expect(getByText(/start/i)).toBeEnabled();
    });

    fireEvent.click(getByText(/start/i));

    fireEvent.change(getByLabelText('Policy Number'), {
      target: { value: '12-0000000-01' }
    });

    await wait(() => {
      expect(getByText(/start/i)).toBeDisabled();
    });

    getByLabelText('Policy Number').focus();

    getByLabelText('Policy Number').blur();

    await waitForElement(() => expect(document.querySelector('.Cancellation')));
  });
});
