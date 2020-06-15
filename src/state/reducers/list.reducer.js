import * as types from '../actions/actionTypes';
import * as listTypes from '../actionTypes/list.actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.list, action) {
  switch (action.type) {
    case types.SET_AGENTS:
      return setAgents(state, action);
    case listTypes.SET_ZIP_SETTINGS:
      return setZipCodeSettings(state, action);
    case listTypes.SET_ENUMS:
      return setEnums(state, action);
    default:
      return state;
  }
}

function removeDuplicates(array, property) {
  return array.filter((obj, position, filteredArray) => {
    return (
      filteredArray.map(mapObj => mapObj[property]).indexOf(obj[property]) ===
      position
    );
  });
}

function setDiaryOptions(action) {
  const options = action.diaryOptions;
  const diaryReasons = options.reduce((acc, d) => {
    const reasons = d.reasons;
    acc.push(...reasons);
    return acc;
  }, []);

  const diaryTags = options.reduce((acc, d) => {
    const tags = d.tags;
    acc.push(...tags);
    return acc;
  }, []);

  return {
    reasons: removeDuplicates(diaryReasons, 'answer'),
    tags: removeDuplicates(diaryTags, 'answer')
  };
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

  const diaryOptions = setDiaryOptions(action);

  return {
    ...state,
    appraisers,
    diaryOptions
  };
}

function setZipCodeSettings(state, action) {
  return {
    ...state,
    zipCodeSettings: action.zipCodeSettings
  };
}
