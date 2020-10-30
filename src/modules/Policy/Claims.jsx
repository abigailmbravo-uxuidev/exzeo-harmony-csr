import React from 'react';
import { BootstrapTable } from '@exzeo/core-ui';
import { useFetchClaims } from '@exzeo/core-ui/src/@Harmony';

import {
  formatPaymentAmount,
  formatPrimaryDate,
  formatClaimType
} from './utilities';

const columns = [
  {
    dataField: 'claimNumber',
    text: 'Claim No',
    sort: true,
    headerClasses: 'claimNumber'
  },
  {
    dataField: 'status',
    text: 'Status',
    sort: true,
    headerClasses: 'status'
  },
  {
    dataField: 'reason',
    text: 'Reason',
    sort: true,
    headerClasses: 'reason'
  },
  {
    dataField: 'dateOfLoss',
    text: 'Loss Date',
    sort: true,
    formatter: formatPrimaryDate,
    headerClasses: 'dateOfLoss'
  },
  {
    dataField: 'dateReported',
    text: 'Reported',
    sort: true,
    formatter: formatPrimaryDate,
    headerClasses: 'dateReported'
  },
  {
    dataField: 'dateClosed',
    text: 'Closed',
    sort: true,
    formatter: formatPrimaryDate,
    headerClasses: 'dateClosed',
    style: { whiteSpace: 'normal' }
  },
  {
    dataField: 'lossType',
    text: 'Loss Type',
    sort: true,
    headerClasses: 'lossType'
  },
  {
    dataField: 'catEventId',
    text: 'Claim Type',
    sort: true,
    formatter: formatClaimType,
    headerClasses: 'claimType'
  },
  {
    dataField: 'totalClaimPaid',
    text: 'Amount Paid',
    sort: true,
    formatter: formatPaymentAmount,
    headerClasses: 'totalClaimPaid'
  }
];

function Claims({ initialValues }) {
  const { claims = [] } = useFetchClaims(initialValues.policyNumber);

  return (
    <div className="table-view">
      <BootstrapTable
        noDataIndication="There is no data to display"
        keyField="claimNumber"
        classes="react-bs-table"
        columns={columns}
        data={claims}
        striped
        hover
      />
    </div>
  );
}

export default Claims;
