import * as types from './actionTypes';

export function getLatestQuote(update, quoteId) {
  return {
    type: types.GET_QUOTE,
    quoteState: {
      quoteId,
      update
    }
  };
}
