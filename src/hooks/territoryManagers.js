import { useEffect, useState } from 'react';
import {
  fetchTerritoryManager,
  fetchTerritoryManagers
} from '../modules/Agency/utilities';

export function useFetchTerritoryManagers() {
  const [managers, setManagers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const getAgents = async () => {
      setLoaded(false);
      try {
        const result = await fetchTerritoryManagers();
        setManagers(result);
      } catch {
        setManagers([]);
      }
      setLoaded(true);
    };
    getAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { territoryManagers: managers, loaded };
}

export function useFetchTerritoryManager(territoryManagerId) {
  const [manager, setManager] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getTerritoryManager = async () => {
      setLoaded(false);
      try {
        const result = await fetchTerritoryManager(territoryManagerId);
        setManager(result);
      } catch {
        setManager(null);
      }
      setLoaded(true);
    };
    if (!territoryManagerId) return;
    getTerritoryManager();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [territoryManagerId]);

  return { territoryManager: manager, loaded };
}
