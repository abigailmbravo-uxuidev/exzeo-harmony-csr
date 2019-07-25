import React, { useState } from 'react';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import {
  Payment,
  PolicyBilling,
  PaymentHistoryTable
} from '@exzeo/core-ui/src/@Harmony';

const Billing = ({ initialValues, config, formInstance }) => {
  return (
    <React.Fragment>
      <Payment initialValues={initialValues} formInstance={formInstance} />
      <PolicyBilling initialValues={initialValues} config={config} />
      <PaymentHistoryTable initialValues={initialValues} />
    </React.Fragment>
  );
};

export default Billing;
