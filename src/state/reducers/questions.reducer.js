import * as types from '../actions/actionTypes';

import initialState from './initialState';

export default function questionsReducer(
  state = initialState.questions,
  action
) {
  switch (action.type) {
    case types.SET_QUESTIONS:
      return setQuestions(state, action);
    case types.SET_ASSIGNEE_OPTIONS:
      return setAssigneeOptions(state, action);
    case types.SET_TERRITORY_MANAGERS:
      return setTerritoryManagers(state, action);
    case types.SET_LISTS:
      return setLists(state, action);
    default:
      return state;
  }
}

function setQuestions(state, action) {
  // TODO: 'questions' state will become something like 'enums' or 'list' state. When that happens, we need to namespace the question map so things like 'diaryAssignees' and other lists can more easily be left alone.
  const currentState = {
    diaryAssignees:
      state.diaryAssignees || initialState.questions.diaryAssignees,
    territoryManagers:
      state.territoryManagers || initialState.questions.territoryManagers,
    lists: state.lists || initialState.questions.lists
  };

  if (!Array.isArray(action.questions)) {
    return {
      ...currentState
    };
  }

  return action.questions.reduce(
    (questionMap, question) => {
      questionMap[question.name] = question;
      return questionMap;
    },
    { ...currentState }
  );
}

function setAssigneeOptions(state, action) {
  return {
    ...state,
    diaryAssignees: action.diaryAssignees
  };
}

function setTerritoryManagers(state, action) {
  return {
    ...state,
    territoryManagers: action.territoryManagers
  };
}

function setLists(state, action) {
  if (!Array.isArray(action.lists)) return state;

  return {
    ...state,
    lists: action.lists.reduce((listMap, item) => {
      const list = item.extendedProperties || {};
      listMap[item.code] = Object.keys(list)
        .sort()
        .reduce((finalList, key) => {
          const listItem = list[key];
          if (listItem.isActive) {
            listItem.key = key;
            finalList.push(listItem);
          }
          return finalList;
        }, []);

      return listMap;
    }, {})
  };
}
