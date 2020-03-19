import { useEffect } from 'react';
import { useField } from '@exzeo/core-ui';

const TransferWatcher = ({ getPoliciesForAgency, agencyCode, refresh }) => {
  const policyNumber = useField('policyNumber').input.value;
  const state = useField('state').input.value;
  const product = useField('product').input.value;
  const agentCode = useField('agentCode').input.value;
  const companyCode = useField('companyCode').input.value;

  useEffect(() => {
    const getPolicies = async () => {
      try {
        await getPoliciesForAgency({
          policyNumber,
          state,
          product,
          agentCode,
          agencyCode,
          companyCode
        });
      } catch (error) {}
    };
    getPolicies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    policyNumber,
    state,
    product,
    agentCode,
    agencyCode,
    companyCode,
    refresh
  ]);

  return null;
};

export default TransferWatcher;
