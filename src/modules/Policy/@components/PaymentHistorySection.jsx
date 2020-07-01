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
