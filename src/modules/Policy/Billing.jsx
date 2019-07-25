import React from 'react';
import {
  Payment,
  PolicyBilling,
  PaymentHistoryTable
} from '@exzeo/core-ui/src/@Harmony';

const Billing = ({ initialValues, config }) => {
  return (
    <React.Fragment>
      <Payment initialValues={initialValues} config={config} />
      <PolicyBilling initialValues={initialValues} config={config} />
      <PaymentHistoryTable initialValues={initialValues} config={config} />
    </React.Fragment>
  );
};

export default Billing;
