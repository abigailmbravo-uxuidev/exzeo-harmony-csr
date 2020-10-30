import * as types from '../actions/actionTypes';
import * as listTypes from '../actionTypes/list.actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.list, action) {
  switch (action.type) {
    case types.SET_AGENTS:
      return setAgents(state, action);
    case listTypes.SET_ENUMS:
      return setEnums(state, action);
    default:
      return state;
  }
}

function setAgents(state, action) {
  const agents = Array.isArray(action.agents)
    ? action.agents.map(o => ({
        label: `${o.firstName} ${o.lastName}`,
        answer: o.agentCode,
        emailAddress: o.emailAddress
      }))
    : [];
  return {
    ...state,
    agents
  };
}

function setEnums(state, action) {
  const appraisers = action.propertyAppraisalQuestions;

  return {
    ...state,
    appraisers
  };
}
