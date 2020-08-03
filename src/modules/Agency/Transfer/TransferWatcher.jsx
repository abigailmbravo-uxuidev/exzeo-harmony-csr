import { useEffect } from 'react';
import { useFormState } from '@exzeo/core-ui';
import debounce from 'lodash/debounce';

const getPolicies = async (
  getPoliciesForAgency,
  { policyNumber, state, product, agentCode, agencyCode, companyCode }
) => {
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

const debounceFilter = debounce(getPolicies, 500);

const TransferWatcher = ({ getPoliciesForAgency, agencyCode, refresh }) => {
  const {
    policyNumber,
    state,
    product,
    agentCode,
    companyCode
  } = useFormState().values;

  useEffect(() => {
    debounceFilter(getPoliciesForAgency, {
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
