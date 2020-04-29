import { useState, useEffect } from 'react';

import { getMortgageeJobs, getTopMortgagees } from './data';
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

export const useFetchMortgageeJobs = errorHandler => {
  const [mortgageeJobs, setMortgageeJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchMortgageeJobs = async () => {
      setLoaded(false);

      try {
        const response = await getMortgageeJobs();
        setMortgageeJobs(response.data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoaded(true);
      }
    };
    fetchMortgageeJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { mortgageeJobs, loaded };
};
