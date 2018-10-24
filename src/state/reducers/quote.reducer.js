import * as types from '../actions/actionTypes';

import initialState from './initialState';

export default function quoteStateReducer(state = initialState.quoteState, action) {
  switch (action.type) {
    case types.GET_QUOTE:
      return (action.quoteState) ? action.quoteState : {};
    case types.SET_QUOTE:
      return setQuote(state, action);
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
