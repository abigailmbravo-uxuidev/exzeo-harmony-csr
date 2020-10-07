import React from 'react';
import PropTypes from 'prop-types';

import ManualPayment from './ManualPayment';
import BillingSection from './BillingSection';
import PaymentHistorySection from './PaymentHistorySection';
import { usePolicyWorkflow } from './context';

const Billing = ({ initialValues, billingClassName, billingHeader }) => {
  const { getPolicy, setAppError, updateBillPlan } = usePolicyWorkflow();

  return (
    <React.Fragment>
      <ManualPayment
        getPolicy={getPolicy}
        errorHandler={setAppError}
        initialValues={initialValues}
      />
      <BillingSection
        initialValues={initialValues}
        updateBillPlan={updateBillPlan}
        className={billingClassName}
        header={billingHeader}
      />
      <PaymentHistorySection
        initialValues={initialValues}
        getPolicy={getPolicy}
      />
    </React.Fragment>
  );
};

Billing.propTypes = {
  initialValues: PropTypes.object.isRequired
};

export default Billing;
