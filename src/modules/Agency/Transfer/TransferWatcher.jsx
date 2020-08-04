import { useEffect } from 'react';
import { useFormState } from '@exzeo/core-ui';

const TransferWatcher = ({ watchHandler, agencyCode, refresh }) => {
  const {
    policyNumber,
    state,
    product,
    agentCode,
    companyCode
  } = useFormState().values;

  useEffect(() => {
    watchHandler({
      policyNumber,
      state,
      product,
      agentCode,
      agencyCode,
      companyCode
    });
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
