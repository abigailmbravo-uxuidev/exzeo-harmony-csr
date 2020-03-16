import { useState, useEffect } from 'react';
import {
  fetchTerritoryManagers,
  fetchTerritoryManager,
  fetchPostalCodes
} from '../../state/actions/questions.actions';

export const useFetchPostalCodes = (searchTerm, state) => {
  const [postalCodes, setPostalCodes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getPostalCodes = async () => {
      setLoaded(false);
      try {
        const result = await fetchPostalCodes(searchTerm, state);
        setPostalCodes(result);
      } catch (error) {
        setPostalCodes([]);
      }
      setLoaded(true);
    };
    getPostalCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return { postalCodes, loaded };
};

export const useFetchTerritoryManagers = state => {
  const [territoryManagers, setTerritoryManagers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getTerritoryManagers = async () => {
      setLoaded(false);
      try {
        const result = await fetchTerritoryManagers(state);
        setTerritoryManagers(result);
      } catch (error) {
        setTerritoryManagers([]);
      }
      setLoaded(true);
    };
    if (!state) return;
    getTerritoryManagers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return { territoryManagers, loaded };
};

export const useFetchTerritoryManager = territoryManagerId => {
  const [territoryManager, setTerritoryManager] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getTerritoryManager = async () => {
      setLoaded(false);
      try {
        const result = await fetchTerritoryManager(territoryManagerId);
        setTerritoryManager(result);
      } catch (error) {
        setTerritoryManager(null);
      }
      setLoaded(true);
    };
    if (!territoryManagerId) return;
    getTerritoryManager();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [territoryManagerId]);

  return { territoryManager, loaded };
};
