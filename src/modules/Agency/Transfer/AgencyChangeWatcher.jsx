import React, { useEffect } from 'react';
import { useField, useForm } from '@exzeo/core-ui';

const AgencyChangeWatcher = ({ getAgentsForTransfer }) => {
  const agencyCodeTo = useField('agencyCodeTo').input.value;
  const formApi = useForm();

  useEffect(() => {
    if (!agencyCodeTo) return;
    const getAgents = async () => {
      try {
        formApi.change('agentCodeTo', null);
        await getAgentsForTransfer(agencyCodeTo);
      } catch (error) {}
    };
    getAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyCodeTo]);

  return <React.Fragment />;
};

export default AgencyChangeWatcher;
