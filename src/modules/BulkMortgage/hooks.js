import { useState, useEffect } from 'react';

import { getTopMortgagees } from './data';
import { formatTopAnswers } from './utilities';

export const useFetchTopMortgagees = errorHandler => {
  const [topMortgagees, setTopMortgagees] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchTopMortgagees = async () => {
      setLoaded(false);

      try {
        const response = await getTopMortgagees();
        const mortgageeAnswers = response.find(q => q.name === 'mortgagee');
        setTopMortgagees(formatTopAnswers(mortgageeAnswers.answers));
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoaded(true);
      }
    };
    fetchTopMortgagees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { topMortgagees, loaded };
};
