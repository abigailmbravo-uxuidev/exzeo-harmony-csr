import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Payment, PolicyBilling } from '@exzeo/core-ui/src/@Harmony';
import PaymentHistorySection from './@components/PaymentHistorySection';

const Billing = ({
  initialValues,
  config,
  customHandlers: { updateBillPlan, getPolicy, setAppError }
}) => {
  const [paymentAdded, setPaymentAdded] = useState(0);

  return (
    <React.Fragment>
      <Payment
        getPolicy={getPolicy}
        errorHandler={setAppError}
        initialValues={initialValues}
        setPaymentAdded={setPaymentAdded}
      />
      <PolicyBilling
        formValues={initialValues}
        updateBillPlan={updateBillPlan}
        className={config.extendedProperties.billingClassName}
        header={config.extendedProperties.billingHeader}
      />
      <PaymentHistorySection
        initialValues={initialValues}
        getPolicy={getPolicy}
        setPaymentAdded={setPaymentAdded}
        paymentAdded={paymentAdded}
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
