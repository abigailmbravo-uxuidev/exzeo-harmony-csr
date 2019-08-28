import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import PaymentList from '../PaymentList';

describe('PaymentList testing', () => {
  it('Test empty list', async () => {
    const props = {
      batch: {
        valid: false,
        values: {}
      },
      batchResults: []
    };

    const { getByText } = render(<PaymentList {...props} />);

    expect(getByText('0 entires totaling'));
    expect(getByText('$ 0.00'));
    expect(getByText('Download')).toBeDisabled();
  });

  it('Test list', async () => {
    const props = {
      batch: {
        valid: true,
        values: {
          batchNumber: '2019082799',
          cashDate: '2019-08-27',
          cashType: 'Paper Deposit'
        }
      },
      batchResults: [
        {
          amount: '200',
          policyNumber: '12-1019377-01-0',
          policyHolder: 'Batman Robin CSR001',
          id: '12-1019377-01'
        },
        {
          amount: '100',
          policyNumber: '12-1019399-01-0',
          policyHolder: 'Robin Robin CSR001',
          id: '12-1019399-01'
        },
        {
          amount: '2500',
          policyNumber: '12-1019300-01-0',
          policyHolder: "Tom O'Donnel",
          id: '12-1019300-01'
        },
        {
          amount: '220',
          policyNumber: '12-1010000-01-0',
          policyHolder: 'Spider Man',
          id: '12-1010000-01'
        },
        {
          amount: '1000',
          policyNumber: '12-1019371-01-0',
          policyHolder: 'Wonder Woman',
          id: '12-1019371-01'
        }
      ]
    };

    const { getByText } = render(<PaymentList {...props} />);

    expect(getByText('5 entires totaling'));
    expect(getByText('$ 4020.00'));
    expect(getByText('Download')).toBeEnabled();
  });
});
