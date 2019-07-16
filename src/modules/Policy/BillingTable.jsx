import React from 'react';
import { defaultMemoize } from 'reselect';
import { date } from '@exzeo/core-ui/src';

const BillingTable = ({ initialValues }) => {
  const formatBillingInformation = defaultMemoize(initialValues => {
    const { summaryLedger, additionalInterests, policyHolders } = initialValues;
    let billToName = '';

    if (summaryLedger.billToType === 'Additional Interest') {
      const ai = additionalInterests.find(
        p => initialValues.billToId === p._id
      );
      billToName = `${ai.type}: ${ai.name1} ${ai.name2}`;
    } else {
      const ph = policyHolders.find(p => initialValues.billToId === p._id);
      billToName = `Policyholder: ${ph.firstName} ${ph.lastName}`;
    }

    return {
      billToName,
      paymentDue: summaryLedger.invoiceDueDate
        ? date.formatDate(summaryLedger.invoiceDueDate, 'MM/DD/YYYY')
        : '-',
      nextPayment: parseFloat(
        summaryLedger.noticeAmountDue.$numberDecimal
      ).toLocaleString('en', { minimumFractionDigits: 2 })
    };
  });

  const { billToName, paymentDue, nextPayment } = formatBillingInformation(
    initialValues
  );

  return (
    <React.Fragment>
      <dl>
        <div data-test="billing-header">
          <dt>Billing</dt>
          <dd>Value</dd>
        </div>
      </dl>
      <dl>
        <div data-test="nextPayment">
          <dt>Next Payment</dt>
          <dd>{nextPayment !== 'NaN' ? `$ ${nextPayment}` : '-'}</dd>
        </div>
      </dl>
      <dl>
        <div data-test="paymentDue">
          <dt>Payment Due</dt>
          <dd>{paymentDue}</dd>
        </div>
      </dl>
      <dl>
        <div data-test="billTo">
          <dt>Bill To</dt>
          <dd>{billToName}</dd>
        </div>
      </dl>
      <dl>
        <div data-test="billPlan">
          <dt>Bill Plan</dt>
          <dd>{initialValues.billPlan}</dd>
        </div>
      </dl>
    </React.Fragment>
  );
};

export default BillingTable;
