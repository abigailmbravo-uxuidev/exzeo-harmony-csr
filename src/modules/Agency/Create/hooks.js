import { useState, useEffect } from 'react';
import { fetchZipCodeSettings } from 'state/actions/zipCodeSettings.actions';
import { fetchTerritoryManagers } from 'state/actions/questions.actions';

export const useFetchZipCodeSettings = state => {
  const [zipCodeSettings, setZipCodeSettings] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getZipCodeSettings = async () => {
      setLoaded(false);
      try {
        const result = await fetchZipCodeSettings('', state);
        setZipCodeSettings(result);
      } catch (error) {
        setZipCodeSettings([]);
      }
      setLoaded(true);
    };
    getZipCodeSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return { zipCodeSettings, loaded };
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
    getTerritoryManagers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return { territoryManagers, loaded };
};
