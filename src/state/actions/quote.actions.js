import * as types from './actionTypes';
import { startWorkflow } from '../../utilities/choreographer';
import * as errorActions from './error.actions';

export function setQuote(quote) {
  return {
    type: types.SET_QUOTE,
    quote
  };
}

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