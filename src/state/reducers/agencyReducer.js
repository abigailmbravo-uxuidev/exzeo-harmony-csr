import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function agencyReducer(state = initialState.agencyState, action) {
  switch (action.type) {
    case types.SET_AGENCIES:
      return setAgencies(state, action);
    case types.SET_AGENCY:
      return setAgency(state, action);
    case types.SET_AGENTS:
      return setAgents(state, action);
    case persistTypes.REHYDRATE:
      return action.payload && action.payload.agencyState ? { ...initialState.agencyState, ...action.payload.agencyState } : state;
    default:
      return state;
  }
}

function setAgencies(state, action) {
  return {
    ...state,
    agencies: action.agencies
  }
}

function setAgency(state, action) {
  return {
    ...state,
    agency: action.agency
  }
}

function setAgents(state, action) {
  return {
    ...state,
    agents: action.agents
  }
}
