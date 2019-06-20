import * as types from '../actions/actionTypes';

import initialState from './initialState';

export default function agencyReducer(
  state = initialState.agencyState,
  action
) {
  switch (action.type) {
    case types.SET_AGENCIES:
      return setAgencies(state, action);
    case types.SET_AGENCY:
      return setAgency(state, action);
    case types.SET_AGENTS:
      return setAgents(state, action);
    case types.SET_AGENTS_LIST:
      return setAgentList(state, action);
    case types.SET_ORPHANED_AGENTS:
      return setOrphanedAgents(state, action);
    default:
      return state;
  }
}

function setAgencies(state, action) {
  return {
    ...state,
    agencies: action.agencies
  };
}

function setAgency(state, action) {
  return {
    ...state,
    agency: action.agency
  };
}

function setAgents(state, action) {
  return {
    ...state,
    agents: action.agents
  };
}

function setAgentList(state, action) {
  return {
    ...state,
    agentList: action.agentList
  };
}

function setOrphanedAgents(state, action) {
  return {
    ...state,
    orphans: action.orphans
  };
}
