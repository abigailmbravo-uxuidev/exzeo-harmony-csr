
import * as types from './actionTypes';

export const getLatestQuote = (update, quoteId) => ({
  type: types.GET_QUOTE,
  quoteState: {
    quoteId,
    update
  }
});
