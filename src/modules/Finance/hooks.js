import { useState, useEffect } from 'react';

import { getPaymentOptions } from './data';

export const useFetchPaymentOptions = errorHandler => {
  const [cashTypes, setCashTypes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchPaymentOptions = async () => {
      setLoaded(false);

      try {
        const response = await getPaymentOptions();

        const answers = response.map(res => {
          return {
            answer: res.paymentType,
            label: res.paymentType
          };
        });

        setCashTypes(answers);
      } catch (error) {
        return errorHandler(error);
      } finally {
        setLoaded(true);
      }
    };

    fetchPaymentOptions();
  }, [errorHandler]);

  return { cashTypes, loaded };
};
