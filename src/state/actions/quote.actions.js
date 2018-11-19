import { startWorkflow } from '../../utilities/choreographer';

import * as types from './actionTypes';
import * as errorActions from './error.actions';

export function setQuote(quote) {
  return {
    type: types.SET_QUOTE,
    quote
  };
}

/**
 * Get quote via CG model
 * @param quoteId - can be quote._id or quote.quoteNumber
 * @param currentPage
 * @returns {Function}
 */
export function getQuote(quoteId, currentPage) {
  return async (dispatch) => {
    try {
      const quoteData = await startWorkflow('csrGetQuoteWithUnderwriting', { quoteId, currentPage });
      dispatch(setQuote(quoteData));
      return quoteData;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}
