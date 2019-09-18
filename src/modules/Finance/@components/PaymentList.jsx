import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { date } from '@exzeo/core-ui';

const handleDownload = (batch, data) => {
  if (!data || data.length === 0) return;
  const { cashDate, batchNumber, cashType } = batch;
  const headers = [
    'Batch Number',
    'Cash Date',
    'Cash Type',
    'Payment Description',
    'Policy Number',
    'Policyholder',
    'Amount'
  ];

  const arr = data.map(line => [
    batchNumber,
    cashDate,
    cashType,
    'Payment Received',
    line.policyNumber,
    line.policyHolder,
    line.amount
  ]);

  arr.unshift(headers);
  const csv = arr.join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const blobUrl = window.URL.createObjectURL(blob);
  const link = window.document.createElement('a');
  link.href = blobUrl;
  link.download = `${batchNumber}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};

const PaymentList = ({ batch, batchResults }) => {
  let count = 0;
  let total = 0;

  return (
    <section className="section-payment-list">
      <div className="form-group">
        <label>Cash Date</label>
        <span>{date.formattedDate(batch.values.cashDate, 'MM/DD/YYYY')}</span>
      </div>
      <div className="form-group">
        <label>Batch Number</label>
        <span>{batch.values.batchNumber}</span>
      </div>
      <div className="form-group">
        <label>Cash Type</label>
        <span>{batch.values.cashType}</span>
      </div>
      <div className="form-group">
        <label>Payment Description</label>
        <span>Payment Received</span>
      </div>
      <div className="payment-table">
        <div className="table-header">
          <span className="policy-number">Policy Number</span>
          <span className="policyholder">Policyholder</span>
          <span className="amount">Amount</span>
        </div>
        {batchResults.map(result => {
          count += 1;
          total += parseFloat(result.amount, 10);
          return (
            <div className="table-row" key={result.id}>
              <span className="policy-number">
                <a
                  href={`/policy/${result.policyNumber}/coverage`}
                  target="_blank"
                >
                  {result.policyNumber}
                </a>
              </span>
              <span className="policyholder">{result.policyHolder}</span>
              <span className="amount">${result.amount.toFixed(2)}</span>
            </div>
          );
        })}
        <div className="table-footer">
          <span className="footer-label">{count} entries totaling</span>
          <span className="amount">$ {total.toFixed(2)}</span>
        </div>
      </div>
      <div className="btn-wrapper download">
        <button
          data-test="download-payments"
          className="btn btn-secondary"
          type="button"
          onClick={() => handleDownload(batch.values, batchResults)}
          disabled={!batchResults || batchResults.length === 0}
        >
          Download
        </button>
      </div>
    </section>
  );
};

PaymentList.propTypes = {
  batch: PropTypes.object.isRequired,
  batchResults: PropTypes.array.isRequired
};

export default PaymentList;
