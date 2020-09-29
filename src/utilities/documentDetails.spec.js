import * as documentDetails from './documentDetails';
import { date } from '@exzeo/core-ui';

const getExpectedValue = dateString =>
  date.formatDate(dateString, date.FORMATS.PRIMARY);

describe('getProductName', () => {
  it('should return product name HO3', () => {
    const result = documentDetails.getProductName('HO3');
    expect(result).toEqual('HO3 Homeowners');
  });

  it('should return product name AF3', () => {
    const result = documentDetails.getProductName('AF3');
    expect(result).toEqual('AF3 Flood');
  });

  it('should return product name FAKE_PRODUCT', () => {
    const result = documentDetails.getProductName('FAKE_PRODUCT');
    expect(result).toEqual('FAKE_PRODUCT');
  });
});

describe('getMapQuery', () => {
  it('should return address URI', () => {
    const result = documentDetails.getMapQuery({
      _id: '5bb77c3fa0a55800133fb7e4',
      city: 'Wayne',
      zip: '07470',
      state: 'NJ',
      country: {
        _id: '5bb77c3fa0a55800133fb7e5',
        code: 'USA',
        displayText: 'United States of America'
      },
      address2: '1 Littleton Rd',
      address1: 'Suite 223'
    });
    expect(result).toEqual(
      'Suite%20223%201%20Littleton%20Rd%20Wayne%2C%20NJ%2007470'
    );
  });
});

describe('getCityStateZip', () => {
  it('should return address URI', () => {
    const result = documentDetails.getCityStateZip({
      city: 'Tampa',
      state: 'FL',
      zip: '33607'
    });
    expect(result).toEqual('Tampa, FL 33607');
  });
});

describe('Test getCancellationDate', () => {
  const summaryLedger = {
    equityDate: '2018-10-23T04:00:00.000Z'
  };
  const endDate = '2019-10-23T04:00:00.000Z';
  const cancelDate = '2019-11-23T04:00:00.000Z';

  describe.each([
    // Not In Force
    [
      { ...summaryLedger, status: { displayText: 'Policy Expired' } },
      'Not In Force',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    // Policy Issued
    [
      { ...summaryLedger, status: { displayText: 'No Payment Received' } },
      'Policy Issued',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Full Payment Received' } },
      'Policy Issued',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Over Payment Received' } },
      'Policy Issued',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Partial Payment Received' } },
      'Policy Issued',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Payment Invoice Issued' } },
      'Policy Issued',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    // In Force
    [
      { ...summaryLedger, status: { displayText: 'No Payment Received' } },
      'In Force',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Full Payment Received' } },
      'In Force',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Over Payment Received' } },
      'In Force',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Partial Payment Received' } },
      'In Force',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Payment Invoice Issued' } },
      'In Force',
      cancelDate,
      endDate,
      getExpectedValue(endDate),
      'Expiration Date'
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'In Force',
      cancelDate,
      endDate,
      undefined,
      undefined
    ],
    // Pending Voluntary Cancellation
    [
      { ...summaryLedger, status: { displayText: 'No Payment Received' } },
      'Pending Voluntary Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'Voluntary Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Full Payment Received' } },
      'Pending Voluntary Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'Voluntary Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Over Payment Received' } },
      'Pending Voluntary Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'Voluntary Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Partial Payment Received' } },
      'Pending Voluntary Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'Voluntary Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Payment Invoice Issued' } },
      'Pending Voluntary Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'Voluntary Cancellation Date'
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'Pending Voluntary Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'Voluntary Cancellation Date'
    ],
    // Pending Underwriting Cancellation
    [
      { ...summaryLedger, status: { displayText: 'No Payment Received' } },
      'Pending Underwriting Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Full Payment Received' } },
      'Pending Underwriting Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Over Payment Received' } },
      'Pending Underwriting Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Partial Payment Received' } },
      'Pending Underwriting Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Payment Invoice Issued' } },
      'Pending Underwriting Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'Pending Underwriting Cancellation',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    // Pending Underwriting Non-Renewal
    [
      { ...summaryLedger, status: { displayText: 'No Payment Received' } },
      'Pending Underwriting Non-Renewal',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Full Payment Received' } },
      'Pending Underwriting Non-Renewal',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Over Payment Received' } },
      'Pending Underwriting Non-Renewal',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Partial Payment Received' } },
      'Pending Underwriting Non-Renewal',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Payment Invoice Issued' } },
      'Pending Underwriting Non-Renewal',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'Pending Underwriting Non-Renewal',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'UW Cancellation Date'
    ],
    // Cancelled
    [
      { ...summaryLedger, status: { displayText: 'Voluntary Cancellation' } },
      'Cancelled',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Non-Payment Cancellation' } },
      'Cancelled',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'Cancellation Date'
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Underwriting Cancellation' }
      },
      'Cancelled',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'Cancellation Date'
    ],
    [
      { ...summaryLedger, status: { displayText: 'Underwriting Non-Renewal' } },
      'Cancelled',
      cancelDate,
      endDate,
      getExpectedValue(cancelDate),
      'Cancellation Date'
    ]
  ])(
    'getCancellationDate',
    (
      summaryLedger,
      policyStatus,
      cancelDate,
      endDate,
      expectedValue,
      expectedLabel
    ) => {
      test(`PolicyStatus: ${policyStatus} Billing Status: ${summaryLedger.status.displayText}`, () => {
        const result = documentDetails.getCancellationDate(
          summaryLedger,
          policyStatus,
          cancelDate,
          endDate
        );
        expect(result.value).toBe(expectedValue);
        expect(result.label).toBe(expectedLabel);
      });
    }
  );
});

describe('Test getNonPaymentNoticeDate', () => {
  const summaryLedger = {
    equityDate: '2018-10-23T04:00:00.000Z'
  };

  describe.each([
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'In Force',
      getExpectedValue(summaryLedger.equityDate)
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'Pending Voluntary Cancellation',
      getExpectedValue(summaryLedger.equityDate)
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'Pending Underwriting Cancellation',
      getExpectedValue(summaryLedger.equityDate)
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'Pending Underwriting Non-Renewal',
      getExpectedValue(summaryLedger.equityDate)
    ]
  ])(
    'getNonPaymentNoticeDate',
    (summaryLedger, policyStatus, expectedValue) => {
      test(`PolicyStatus: ${policyStatus} Billing Status: ${summaryLedger.status.displayText}`, () => {
        const result = documentDetails.getNonPaymentNoticeDate(
          summaryLedger,
          policyStatus
        );
        expect(result).toBe(expectedValue);
      });
    }
  );
});

describe('Test getNonPaymentNoticeDate', () => {
  const summaryLedger = {
    nonPaymentNoticeDueDate: '2018-10-23T04:00:00.000Z'
  };

  describe.each([
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'In Force',
      getExpectedValue(summaryLedger.nonPaymentNoticeDueDate)
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'Pending Voluntary Cancellation',
      getExpectedValue(summaryLedger.nonPaymentNoticeDueDate)
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'Pending Underwriting Cancellation',
      getExpectedValue(summaryLedger.nonPaymentNoticeDueDate)
    ],
    [
      {
        ...summaryLedger,
        status: { displayText: 'Non-Payment Notice Issued' }
      },
      'Pending Underwriting Non-Renewal',
      getExpectedValue(summaryLedger.nonPaymentNoticeDueDate)
    ]
  ])(
    'Test getNonPaymentNoticeDueDate',
    (summaryLedger, policyStatus, expectedValue) => {
      test(`PolicyStatus: ${policyStatus} Billing Status: ${summaryLedger.status.displayText}`, () => {
        const result = documentDetails.getNonPaymentNoticeDueDate(
          summaryLedger,
          policyStatus
        );
        expect(result).toBe(expectedValue);
      });
    }
  );
});
