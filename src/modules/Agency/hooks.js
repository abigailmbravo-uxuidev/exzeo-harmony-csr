import { useState, useEffect } from 'react';
import { fetchPostalCodes } from './utilities';

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
