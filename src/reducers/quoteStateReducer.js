import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

// we want this store to rehydrate so we add the rehydrate type to the reducer

export default function quoteStateReducer(state = initialState.quoteState, action) {
  let newState = {};
  switch (action.type) {
    case types.GET_QUOTE:
      newState = (action.quoteState) ? action.quoteState : newState;
      return newState;
    case persistTypes.REHYDRATE:
      console.log('REHYDRATE', action);
      const quote = (action.quoteState) ? action.quoteState : null;
      newState = quote || ((action.payload && action.payload.quoteState) ? action.payload.quoteState : newState);
      return newState;
    default:
      return state;
  }
}
