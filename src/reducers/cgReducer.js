import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function cgReducer(state = initialState.workflowData, action) {
  let newState = state;
  switch (action.type) {
    case types.CG_START:
      newState = (action.workflowData) ? { ...state, ...action.workflowData } : newState;
      return newState;
    case types.CG_ACTIVE_TASK:
      newState = (action.workflowData) ? { ...state, ...action.workflowData } : newState;
      return newState;
    case types.CG_COMPLETE:
      newState = (action.workflowData) ? { ...state, ...action.workflowData } : newState;
      return newState;
    case types.CG_ERROR:
      newState = (action.error) ? { ...state, ...action.error } : newState;
      return newState;
    case persistTypes.REHYDRATE:
      newState = (action.payload && action.payload.cg) ? action.payload.cg : newState;
      return newState;
    default:
      return state;
  }
}
