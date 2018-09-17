import * as types from '../actions/actionTypes';
import initialState from './initialState';

// we want this store to rehydrate so we add the rehydrate type to the reducer

export default function quoteStateReducer(state = initialState.quoteState, action) {
  switch (action.type) {
    case types.GET_QUOTE:
      return (action.quoteState) ? action.quoteState : {};
    default:
      return state;
  }
}
