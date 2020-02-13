import React, { useEffect } from 'react';
import { useField } from '@exzeo/core-ui';

const TransferWatcher = ({ getPoliciesForAgency, agencyCode }) => {
  const policyNumber = useField('policyNumber').input.value;
  const state = useField('state').input.value;
  const product = useField('product').input.value;
  const agentCode = useField('agentCode').input.value;

  useEffect(() => {
    const getPolicies = async () => {
      try {
        await getPoliciesForAgency({
          policyNumber,
          state,
          product,
          agentCode,
          agencyCode
        });
      } catch (error) {}
    };
    getPolicies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policyNumber, state, product, agentCode, agencyCode]);

  return <React.Fragment />;
};

export default TransferWatcher;
