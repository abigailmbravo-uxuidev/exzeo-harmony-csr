import * as types from '../actions/actionTypes';

import initialState from './initialState';

export default function quoteStateReducer(state = initialState.quoteState, action) {
  switch (action.type) {
    case types.GET_QUOTE:
      return (action.quoteState) ? action.quoteState : {};
    case types.SET_QUOTE:
      return setQuote(state, action);
    case types.SET_RETRIEVED_QUOTE:
      return setRetrievedQuote(state, action);
    default:
      return state;
  }
}

function setQuote(state, action) {
  return {
    ...state,
    quote: action.quote
  };
}

function setRetrievedQuote(state, action) {
  return {
    ...state,
    quote: action.quote,
    // there is in this payload, for now, just set the quote until we use the other values
  }
}
