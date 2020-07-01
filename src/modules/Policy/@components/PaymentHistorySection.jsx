import React, { useMemo } from 'react';
import { date } from '@exzeo/core-ui';
import {
  PaymentHistoryTable,
  OnlinePayment
} from '@exzeo/core-ui/src/@Harmony';

import { doesUserHaveAccess } from '../../../utilities/userResources';

const PaymentHistorySection = ({
  initialValues,
  paymentAdded,
  setPaymentAdded,
  customHandlers
}) => {
  const { companyCode, state, product } = initialValues;
  // TODO: Before we make wide use of this logic, we need to refactor Auth, use Providers, and then create a custom hook to be used in this component. Doing it this way now to get the feature out.
  //  then we won't need to pass an "enabled" prop - the OnlinePayment component can be fully responsible for determining if it should be enabled or not.
  const enableOnlinePayments = useMemo(() => {
    const onlinePaymentURI = `${companyCode}:${state}:${product}:OnlinePayments:*`;
    return doesUserHaveAccess(
      customHandlers.userProfile.resources,
      onlinePaymentURI,
      'INSERT'
    );
  }, [customHandlers.userProfile, companyCode, state, product]);

  return (
    <PaymentHistoryTable
      initialValues={initialValues}
      paymentAdded={paymentAdded}
      header={
        <h3>
          Payments&nbsp;
          <OnlinePayment
            batchID={`${date.moment().format('YYYYMMDD')}-CSR`}
            enabled={enableOnlinePayments}
            document={initialValues}
            onPaymentComplete={() => {
              customHandlers.getPolicy(initialValues.policyNumber);
              setPaymentAdded(date.timestamp());
            }}
            label={
              <>
                <i className="fa fa-credit-card" />
                Make Electronic Payment
              </>
            }
          />
        </h3>
      }
    />
  );
};

export default PaymentHistorySection;
