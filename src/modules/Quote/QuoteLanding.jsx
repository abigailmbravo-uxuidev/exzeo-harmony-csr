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
        const { stateCode, propertyId, product } = params;
        // TODO: fix user profile to match harmony-web userProfile.entity.companyCode
        const newQuote = await createQuote(
          propertyId,
          stateCode,
          'TTIC',
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
      {quote.quoteNumber ? (
        <Redirect replace to={`/quote/${quote.quoteNumber}/coverage`} />
      ) : (
        <Loader />
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
