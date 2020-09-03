import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Loader } from '@exzeo/core-ui';

export const QuoteLanding = ({
  match: { params },
  createQuote,
  errorHandler
}) => {
  const [quote, setQuote] = useState({});
  useEffect(() => {
    async function initializeQuote() {
      try {
        const { companyCode, stateCode, propertyId, product } = params;
        const newQuote = await createQuote(
          propertyId,
          stateCode,
          companyCode,
          product
        );
        setQuote(newQuote);
      } catch (error) {
        errorHandler(error);
      }
    }
    initializeQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {quote ? (
        quote.quoteNumber ? (
          <Redirect replace to={`/quote/${quote.quoteNumber}/coverage`} />
        ) : (
          <Loader />
        )
      ) : (
        <div>There was a problem creating this quote.</div>
      )}
    </React.Fragment>
  );
};

export default QuoteLanding;
