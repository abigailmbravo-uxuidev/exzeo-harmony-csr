import React, { useState, useEffect } from 'react';

import { getPaymentOptions } from './data';

export const useFetchPaymentOptions = () => {
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
        console.error('Error fetching Payment Options: ', error);
      } finally {
        setLoaded(true);
      }
    };

    fetchPaymentOptions();
  }, []);

  return { cashTypes, loaded };
};
