import React from 'react';
import PropTypes from 'prop-types';
import { SectionLoader, BootstrapTable } from '@exzeo/core-ui';
import { useFetchPaymentHistory } from './hooks';
import { formatPaymentDate, formatPaymentAmount } from './utilities';
//
function PaymentHistoryTable({ initialValues, header }) {
  const { policyNumber, property } = initialValues;
  const timezone = property?.timezone ?? 'America/New_York';

  const { paymentHistory, loaded } = useFetchPaymentHistory(
    policyNumber,
    initialValues.summaryLedger?.updatedAt
  );

  const columns = [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      formatter: formatPaymentDate,
      formatExtraData: timezone,
      headerClasses: 'date'
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: true,
      headerClasses: 'type'
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: true,
      headerClasses: 'description'
    },
    {
      dataField: 'batch',
      text: 'Note',
      sort: true,
      headerClasses: 'note'
    },
    {
      dataField: 'amount',
      text: 'Amount',
      sort: true,
      formatter: formatPaymentAmount,
      headerClasses: 'amount'
    },
    {
      dataField: '_id',
      text: 'id',
      hidden: true
    }
  ];

  return (
    <section className="table-view">
      {header}
      {!loaded ? (
        <SectionLoader />
      ) : (
        <React.Fragment>
          <BootstrapTable
            noDataIndication="There is no data to display"
            classes="react-bs-table"
            keyField="_id"
            data={paymentHistory}
            columns={columns}
            striped
            hover
          />
          <dl className="total">
            <div data-test="total-payments">{`Payments Received ${formatPaymentAmount(
              initialValues.summaryLedger.cashReceived || '0'
            )}`}</div>
          </dl>
        </React.Fragment>
      )}
    </section>
  );
}

PaymentHistoryTable.propTypes = {
  initialValues: PropTypes.object.isRequired,
  paymentAdded: PropTypes.number,
  header: PropTypes.node
};

export default PaymentHistoryTable;
