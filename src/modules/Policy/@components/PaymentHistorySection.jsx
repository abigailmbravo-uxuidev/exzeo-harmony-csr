import React from 'react';

import { PaymentHistoryTable } from '@exzeo/core-ui/src/@Harmony';

import OnlinePaymentModule from './OnlinePayment';

const PaymentHistorySection = ({
  initialValues,
  getPolicy,
  paymentAdded,
  setPaymentAdded
}) => {
  return (
    <PaymentHistoryTable
      initialValues={initialValues}
      paymentAdded={paymentAdded}
      header={
        <h3>
          Payments&nbsp;
          <OnlinePaymentModule
            document={initialValues}
            getPolicy={getPolicy}
            setPaymentAdded={setPaymentAdded}
          />
        </h3>
      }
    />
  );
};

export default PaymentHistorySection;
