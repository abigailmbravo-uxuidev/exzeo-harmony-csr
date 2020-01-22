import { useState, useEffect } from 'react';
import { fetchZipCodeSettings } from 'state/actions/zipCodeSettings.actions';

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
