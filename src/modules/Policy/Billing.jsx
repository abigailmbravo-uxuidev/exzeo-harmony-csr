import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import {
  Payment,
  PolicyBilling,
  PaymentHistoryTable
} from '@exzeo/core-ui/src/@Harmony';

const Billing = ({
  initialValues,
  formValues,
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
        formValues={formValues}
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

Billing.propTypes = {
  initialValues: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  formInstance: PropTypes.object.isRequired,
  customHandlers: PropTypes.shape({
    updateBillPlan: PropTypes.func.isRequired
  })
};

export default Billing;
