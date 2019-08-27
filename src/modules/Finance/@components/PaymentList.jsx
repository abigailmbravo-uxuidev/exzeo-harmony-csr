import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { date } from '@exzeo/core-ui';

const handleDownload = (batch, data) => {
  if (!data || data.length === 0) return;
  const headers = ['Policy Number', 'Policyholder', 'Amount'];
  const arr = data.map(line => [
    line.policyNumber,
    line.policyHolder,
    line.amount
  ]);
  arr.unshift(headers);
  const csv = arr.join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', batch.batchNumber);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
          <span className="policy-number">Polcy Number</span>
          <span className="policyholder">Policyholder</span>
          <span className="amount">Amount</span>
        </div>
        {batchResults.map(result => {
          count += 1;
          total += parseFloat(result.amount, 10);
          return (
            <div className="table-row" key={result.policyNumber}>
              <span className="policy-number">{result.policyNumber}</span>
              <span className="policyholder">{result.policyHolder}</span>
              <span className="amount">${result.amount}</span>
            </div>
          );
        })}
        <div className="table-footer">
          <span className="footer-label">{count} entires totaling</span>
          <span className="amount">$ {total.toFixed(2)}</span>
        </div>
      </div>
      <div className="btn-wrapper download">
        <button
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

export default PaymentList;
