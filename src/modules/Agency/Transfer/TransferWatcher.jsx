import { useEffect } from 'react';
import { useFormState } from '@exzeo/core-ui';

const TransferWatcher = ({ getPoliciesForAgency, agencyCode, refresh }) => {
  const {
    policyNumber,
    state,
    product,
    agentCode,
    companyCode
  } = useFormState().values;

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
