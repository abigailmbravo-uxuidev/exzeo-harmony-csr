import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function cgReducer(state = initialState.cg, action) {
  let newState = state;
  switch (action.type) {
    case types.CG_START:
      newState = action.workflowData
        ? { ...state, ...action.workflowData }
        : newState;
      return newState;
    case types.CG_ACTIVE_TASK:
      newState = action.workflowData
        ? { ...state, ...action.workflowData }
        : newState;
      return newState;
    case types.CG_COMPLETE:
      newState = action.workflowData
        ? { ...state, ...action.workflowData }
        : newState;
      return newState;
    case types.CG_ERROR:
      newState = action.error ? { ...state, ...action.error } : newState;
      return newState;
    case types.CLEAR_SEARCH_RESULTS:
      newState = action.workflowData
        ? { ...state, ...action.workflowData }
        : newState;
      return newState;
    default:
      return state;
  }
}
