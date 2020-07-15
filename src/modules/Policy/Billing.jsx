import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Payment, PolicyBilling } from '@exzeo/core-ui/src/@Harmony';
import PaymentHistorySection from './@components/PaymentHistorySection';

const Billing = ({ initialValues, config, customHandlers }) => {
  const [paymentAdded, setPaymentAdded] = useState(0);

  return (
    <React.Fragment>
      <Payment
        getPolicy={customHandlers.getPolicy}
        errorHandler={customHandlers.setAppError}
        initialValues={initialValues}
        setPaymentAdded={setPaymentAdded}
      />
      <PolicyBilling
        formValues={initialValues}
        updateBillPlan={customHandlers.updateBillPlan}
        className={config.extendedProperties.billingClassName}
        header={config.extendedProperties.billingHeader}
      />
      <PaymentHistorySection
        initialValues={initialValues}
        customHandlers={customHandlers}
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
