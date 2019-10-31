import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Loader } from '@exzeo/core-ui';

import { setAppError } from '../../state/actions/error.actions';
import { createQuote } from '../../state/actions/quote.actions';

export const QuoteLanding = ({ match: { params }, createQuote }) => {
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
        setAppError(error);
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

export default connect(
  null,
  {
    createQuote,
    setAppError
  }
)(QuoteLanding);
