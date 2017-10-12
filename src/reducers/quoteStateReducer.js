import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

// we want this store to rehydrate so we add the rehydrate type to the reducer

export default function quoteStateReducer(state = initialState.quoteState, action) {
  let newState = {};
  switch (action.type) {
    case types.APP_ERROR:
      newState = { ...state, ...action.quoteState };
      return newState;
    case persistTypes.REHYDRATE:
      newState = (action.payload && action.payload.quote) ? action.payload.quote : newState;
      return newState;
    default:
      return state;
  }
}
