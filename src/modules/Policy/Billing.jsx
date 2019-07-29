import React, { useState } from 'react';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import {
  Payment,
  PolicyBilling,
  PaymentHistoryTable
} from '@exzeo/core-ui/src/@Harmony';

const Billing = ({
  initialValues,
  config,
  formInstance,
  customHandlers: { updateBillPlan }
}) => {
  const [paymentAdded, setPaymentAdded] = useState(0);

  return (
    <React.Fragment>
      <Payment
        initialValues={initialValues}
        setPaymentAdded={setPaymentAdded}
      />
      <PolicyBilling
        initialValues={initialValues}
        updateBillPlan={updateBillPlan}
        config={config}
      />
      <PaymentHistoryTable
        initialValues={initialValues}
        paymentAdded={paymentAdded}
        config={config}
      />
    </React.Fragment>
  );
};

export default Billing;
