import React from 'react';
import {
  render,
  waitForElementToBeRemoved,
  jestResolve,
  screen,
  within
} from '../../../test-utils';

import * as policyData from '../data';

import PreviousEndorsements from '../PreviousEndorsements';

describe('PreviousEndorsements', () => {
  const props = {
    initialValues: {
      policyNumber: '123',
      endDate: '2022-01-01T00:00:00.000Z'
    }
  };

  const pastEndorsements = [
    {
      _id: '1',
      createdAt: '2000-01-01T00:00:00.000Z',
      effectiveDate: '2000-01-01T00:00:00.000Z',
      netCharge: '1',
      transactionType: 'Multiple Endorsements Endorsement'
    },
    {
      _id: '2',
      createdAt: '1800-01-01T00:00:00.000Z',
      effectiveDate: '1800-01-01T00:00:00.000Z',
      netCharge: '5',
      transactionType: 'Something crazy that is not a premium endorsement'
    }
  ];
  const pendingEndorsements = [
    {
      _id: '3',
      createdAt: '2020-06-01T00:00:00.000Z',
      netCharge: '1',
      transactionType: 'Coverage Endorsement'
    },
    {
      _id: '4',
      createdAt: '2020-01-01T00:00:00.000Z',
      netCharge: '5',
      transactionType: 'Something crazy that is not a premium endorsement'
    }
  ];

  it('Displays table title and column headers', async () => {
    policyData.fetchPastEndorsements = jestResolve([]);
    policyData.fetchPendingEndorsements = jestResolve([]);

    render(<PreviousEndorsements {...props} />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('status', { name: /section\-loader/i })
    );
    expect(
      screen.getByRole('heading', { name: /endorsements/i })
    ).toBeInTheDocument();

    const effectiveDate = screen.getByRole('columnheader', {
      name: /effective date/i
    });
    const amount = screen.getByRole('columnheader', { name: /amount/i });
    const type = screen.getByRole('columnheader', { name: /type/i });
    const processedDate = screen.getByRole('columnheader', {
      name: /processed date/i
    });

    const tableHeader = screen.getAllByRole('row')[0];

    expect(tableHeader.children.length).toBe(4);
    expect(tableHeader.children[0]).toBe(effectiveDate);
    expect(tableHeader.children[1]).toBe(amount);
    expect(tableHeader.children[2]).toBe(type);
    expect(tableHeader.children[3]).toBe(processedDate);
  });

  it('Only displays Amounts for premium endorsements', async () => {
    policyData.fetchPastEndorsements = jestResolve(pastEndorsements);
    policyData.fetchPendingEndorsements = jestResolve(pendingEndorsements);

    render(<PreviousEndorsements {...props} />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('status', { name: /section\-loader/i })
    );

    expect(screen.getByText('$1.00')).toBeInTheDocument();
    expect(screen.queryByText('$5.00')).not.toBeInTheDocument();
    expect(screen.getAllByText('N/A').length).toBe(3);
  });

  it('Is sorted in descending order by ProcessedDate', async () => {
    policyData.fetchPastEndorsements = jestResolve(pastEndorsements);
    policyData.fetchPendingEndorsements = jestResolve(pendingEndorsements);

    render(<PreviousEndorsements {...props} />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('status', { name: /section\-loader/i })
    );

    const tableBody = document.querySelector('tbody');
    const row1 = within(tableBody).getAllByRole('row')[0];
    const row2 = within(tableBody).getAllByRole('row')[1];
    const row3 = within(tableBody).getAllByRole('row')[2];
    const row4 = within(tableBody).getAllByRole('row')[3];

    expect(row1.textContent).toBe(
      `01/01/2022N/ACoverage Endorsement06/01/2020`
    );
    expect(row2.textContent).toBe(
      `01/01/2022N/ASomething crazy that is not a premium endorsement01/01/2020`
    );
    expect(row3.textContent).toBe(
      `01/01/2000$1.00Multiple Endorsements Endorsement01/01/2000`
    );
    expect(row4.textContent).toBe(
      `01/01/1800N/ASomething crazy that is not a premium endorsement01/01/1800`
    );
  });

  it('Highlights pending endorsements', async () => {
    policyData.fetchPastEndorsements = jestResolve(pastEndorsements);
    policyData.fetchPendingEndorsements = jestResolve(pendingEndorsements);

    render(<PreviousEndorsements {...props} />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('status', { name: /section\-loader/i })
    );

    const tableBody = document.querySelector('tbody');
    const row1 = within(tableBody).getAllByRole('row')[0];
    const row2 = within(tableBody).getAllByRole('row')[1];
    const row3 = within(tableBody).getAllByRole('row')[2];
    const row4 = within(tableBody).getAllByRole('row')[3];

    expect(row1).toHaveClass('future-endorsement');
    expect(row2).toHaveClass('future-endorsement');
    expect(row3).not.toHaveClass('future-endorsement');
    expect(row4).not.toHaveClass('future-endorsement');
  });
});
