import React, { useState, useEffect } from 'react';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

export const useVerifyQuote = ({ quoteNumber, quoteId }) => {
  const [quote, setQuote] = useState({});
  const [quoteLoaded, setQuoteLoaded] = useState(false);

  useEffect(() => {
    const verifyQuote = async () => {
      setQuoteLoaded(false);
      try {
        const config = {
          exchangeName: 'harmony',
          routingKey: 'harmony.quote.verifyQuote',
          data: {
            quoteId,
            quoteNumber
          }
        };

        const response = await serviceRunner.callService(
          config,
          'quoteManager.verifyQuote'
        );
        const result = response.data.result;
        setQuote(result);
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Error retrieving quote: ', error);
        }
      } finally {
        setQuoteLoaded(true);
      }
    };

    verifyQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    quote,
    quoteLoaded
  };
};
