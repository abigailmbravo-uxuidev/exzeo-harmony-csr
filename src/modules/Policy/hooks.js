import { useState, useEffect } from 'react';
import {
  fetchAgency,
  fetchAgentsByAgencyCode
} from '../../state/actions/agency.actions';
import { fetchTerritoryManagers } from '../../state/actions/questions.actions';

export const useFetchAgency = agencyCode => {
  const [agency, setAgency] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getAgency = async () => {
      setLoaded(false);
      try {
        const result = await fetchAgency(agencyCode);
        setAgency(result);
      } catch (error) {
        setAgency({});
      }
      setLoaded(true);
    };
    getAgency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyCode]);

  return { agency, loaded };
};

export const useFetchAgents = agencyCode => {
  const [agents, setAgents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const getAgents = async () => {
      setLoaded(false);
      try {
        const result = await fetchAgentsByAgencyCode(agencyCode);
        setAgents(result);
      } catch (error) {
        setAgents([]);
      }
      setLoaded(true);
    };
    getAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyCode]);

  return { agents, loaded };
};

export const useTerritoryManagers = state => {
  const [managers, setManagers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const getAgents = async () => {
      setLoaded(false);
      try {
        const result = await fetchTerritoryManagers(state);
        setManagers(result);
      } catch (error) {
        setManagers([]);
      }
      setLoaded(true);
    };
    getAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return { territoryManagers: managers, loaded };
};
