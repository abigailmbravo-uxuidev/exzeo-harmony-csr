import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { date } from '@exzeo/core-ui';

import BulkPayments from '../@components/BulkPayments';
import { getPolicy } from '../data';
import {
  mockPaymentOptions,
  mockPolicy,
  mockCancelledPolicy
} from '../../../test-utils';

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
    expect(getByLabelText('Amount')).toBeDisabled();
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

    expect(getByText(/start/i)).toBeEnabled();
    fireEvent.click(getByText(/start/i));

    fireEvent.change(getByLabelText('Policy Number'), {
      target: { value: '12-0000000-01' }
    });

    fireEvent.click(getByText(/apply/i));

    expect(
      await waitForElement(() => [
        container.querySelector('.error-message'),
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
        physicalAddress: { address1, address2, city, state, zip }
      }
    } = mockPolicy;

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

    expect(getByText(/start/i)).toBeEnabled();
    fireEvent.click(getByText(/start/i));

    fireEvent.change(getByLabelText('Policy Number'), {
      target: { value: '12-0000000-01' }
    });

    fireEvent.click(getByText(/apply/i));

    expect(
      await waitForElement(() => [
        container.querySelector('.policy-details'),
        getByText(mockPolicy.product),
        getByText(mockPolicy.companyCode),
        getByText(`| ${mockPolicy.policyNumber}`),
        getByText('Open Policy'),
        getByText('Balance Due:'),
        getByText(mockPolicy.summaryLedger.balance.$numberDecimal),
        getByText(
          `${mockPolicy.policyHolders[0].firstName} ${mockPolicy.policyHolders[0].lastName}`
        ),
        getByText(`| ${mockPolicy.property.physicalAddress.address1},`),
        getByText(`${city}, ${state} ${zip}`),
        getByText('Effective Date:'),
        getByText(date.formattedDate(mockPolicy.effectiveDate, 'MM/DD/YYYY')),
        getByText('Policy Status:'),
        getByText(mockPolicy.status),
        getByText('Billing Status:'),
        getByText(mockPolicy.summaryLedger.status.displayText)
      ])
    );

    fireEvent.click(await getByText(/apply/i));

    fireEvent.change(await getByLabelText('Amount'), {
      target: { value: '200.00' }
    });
    await fireEvent.click(getByText(/apply/i));

    expect(getByText('1 entries totaling'));
    expect(getByText('$ 200.00'));
    expect(getByText('Download')).toBeEnabled();

    //debug()
  });

  it('Test BulkPayments with cancelled policy', async () => {
    getPolicy.mockImplementation(() => mockCancelledPolicy);

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

    expect(getByText(/start/i)).toBeEnabled();
    fireEvent.click(getByText(/start/i));

    fireEvent.change(getByLabelText('Policy Number'), {
      target: { value: '12-0000000-01' }
    });

    fireEvent.click(getByText(/apply/i));

    expect(await waitForElement(() => getByText('Cancelled'))).toHaveStyle(
      'color: rgb(216, 70, 73);'
    );
    //debug()
  });
});
