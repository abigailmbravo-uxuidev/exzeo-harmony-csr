import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function serviceReducer(state = initialState.serviceData, action) {
  let newState = state;
  switch (action.type) {
    case types.RUN_SERVICE:
      newState = (action.serviceData) ? { ...state, ...action.serviceData } : newState;
      return newState;
    default:
      return state;
  }
}
