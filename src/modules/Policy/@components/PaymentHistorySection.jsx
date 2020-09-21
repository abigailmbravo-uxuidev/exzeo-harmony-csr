import React, { useMemo } from 'react';
import { date as dateUtils } from '@exzeo/core-ui';
import { OnlinePayment } from '@exzeo/core-ui/src/@Harmony';
import PaymentHistoryTable from './PaymentHistoryTable';
import { doesUserHaveAccess } from '../../../utilities/userResources';
import { useUser } from '../../../context/user-context';

const PaymentHistorySection = ({
  initialValues,
  paymentAdded,
  setPaymentAdded,
  customHandlers
}) => {
  const userProfile = useUser();
  const { companyCode, state, product, property } = initialValues;

  const enableOnlinePayments = useMemo(() => {
    const onlinePaymentURI = `${companyCode}:${state}:${product}:OnlinePayments:*`;
    return doesUserHaveAccess(
      userProfile.resources,
      onlinePaymentURI,
      'INSERT'
    );
  }, [userProfile.resources, companyCode, state, product]);

  const timezone = property?.timezone ?? 'America/New_York';
  const date = dateUtils.formattedDate(
    dateUtils.moment(),
    'YYYYMMDD',
    timezone
  );

  return (
    <PaymentHistoryTable
      initialValues={initialValues}
      paymentAdded={paymentAdded}
      header={
        <h3>
          Payments&nbsp;
          {enableOnlinePayments && (
            <OnlinePayment
              batchID={`${date}-CSR`}
              document={initialValues}
              onPaymentComplete={() => {
                customHandlers.getPolicy(initialValues.policyNumber);
                setPaymentAdded(dateUtils.timestamp());
              }}
              label={
                <>
                  <i className="fa fa-credit-card" />
                  Make Electronic Payment
                </>
              }
            />
          )}
        </h3>
      }
    />
  );
};

export default PaymentHistorySection;
