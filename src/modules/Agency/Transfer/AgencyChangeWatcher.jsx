import { useEffect } from 'react';
import { useField } from '@exzeo/core-ui';

import {
  fetchAvailableAgencies,
  fetchAgentsByAgencyCode
} from '../../../state/actions/agency.actions';
import {
  filterAgencies,
  filterAgents
} from '../../../state/selectors/agency.selector';

import { filterCSPList } from './utilities';

const AgencyChangeWatcher = ({
  setAgents,
  setAgencies,
  searchTerm,
  selectedPolicies
}) => {
  const agencyCodeToValue = useField('agencyCodeTo').input.value;
  const cspList = filterCSPList(selectedPolicies);

  useEffect(() => {
    const getAgents = async () => {
      try {
        const result = await fetchAgentsByAgencyCode(agencyCodeToValue);
        setAgents(filterAgents(result, cspList));
      } catch (error) {
        setAgents([]);
      }
    };
    if (!agencyCodeToValue) return;
    getAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyCodeToValue]);

  useEffect(() => {
    const getAgencies = async () => {
      try {
        const result = await fetchAvailableAgencies(searchTerm);
        setAgencies(filterAgencies(result, cspList));
      } catch (error) {
        setAgencies([]);
      }
    };
    getAgencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return null;
};

export default AgencyChangeWatcher;
