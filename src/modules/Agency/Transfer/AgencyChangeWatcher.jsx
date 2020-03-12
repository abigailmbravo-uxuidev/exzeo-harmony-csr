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
  agencySearchTerm,
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
    getAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyCodeToValue]);

  useEffect(() => {
    const getAgencies = async () => {
      try {
        const result = await fetchAvailableAgencies(agencySearchTerm);
        setAgencies(filterAgencies(result, cspList));
      } catch (error) {
        setAgencies([]);
      }
    };
    getAgencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencySearchTerm]);

  return null;
};

export default AgencyChangeWatcher;
