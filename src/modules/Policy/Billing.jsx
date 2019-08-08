import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Payment,
  PolicyBilling,
  PaymentHistoryTable
} from '@exzeo/core-ui/src/@Harmony';

const Billing = ({
  initialValues,
  config,
  customHandlers: { updateBillPlan, getPolicy }
}) => {
  const [paymentAdded, setPaymentAdded] = useState(0);

  return (
    <React.Fragment>
      <Payment
        getPolicy={getPolicy}
        initialValues={initialValues}
        setPaymentAdded={setPaymentAdded}
      />
      <PolicyBilling
        formValues={initialValues}
        updateBillPlan={updateBillPlan}
        className={config.extendedProperties.billingClassName}
        header={config.extendedProperties.billingHeader}
      />
      <PaymentHistoryTable
        initialValues={initialValues}
        paymentAdded={paymentAdded}
        header={config.extendedProperties.paymentHistoryHeader}
      />
    </React.Fragment>
  );
};

Billing.propTypes = {
  initialValues: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  formInstance: PropTypes.object.isRequired,
  customHandlers: PropTypes.shape({
    updateBillPlan: PropTypes.func.isRequired
  })
};

export default Billing;
