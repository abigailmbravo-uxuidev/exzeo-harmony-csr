import { useEffect, useState } from 'react';
import {
  fetchTerritoryManager,
  fetchTerritoryManagers
} from '../state/actions/questions.actions';

export const useFetchTerritoryManagers = state => {
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

export const useFetchTerritoryManager = territoryManagerId => {
  const [manager, setManager] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getTerritoryManager = async () => {
      setLoaded(false);
      try {
        const result = await fetchTerritoryManager(territoryManagerId);
        setManager(result);
      } catch (error) {
        setManager(null);
      }
      setLoaded(true);
    };
    if (!territoryManagerId) return;
    getTerritoryManager();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [territoryManagerId]);

  return { territoryManager: manager, loaded };
};
