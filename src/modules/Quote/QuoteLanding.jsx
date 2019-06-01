import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Loader } from '@exzeo/core-ui';

import { setAppError } from '../../state/actions/error.actions';
import { createQuote } from '../../state/actions/quote.actions';
import { getQuoteSelector } from '../../state/selectors/quote.selectors';

export const QuoteLanding = ({ match: { params }, createQuote, quoteData }) => {
  useEffect(() => {
    try {
      const { stateCode, propertyId } = params;
      // TODO: fix user profile to match harmony-web userProfile.entity.companyCode
      createQuote('0', propertyId, stateCode, 'TTIC', 'HO3');
    } catch (error) {
      setAppError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <React.Fragment>
      {quoteData && quoteData.quoteNumber
        ? <Redirect replace to={`/quote/${quoteData.quoteNumber}/coverage`}/>
        : <Loader/>
      }
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  quoteData: getQuoteSelector(state)
});

export default connect(mapStateToProps, {
  createQuote,
  setAppError
})(QuoteLanding);
