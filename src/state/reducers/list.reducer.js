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
    case types.SET_DIARY_OPTIONS:
      return setDiaryOptions(state, action);
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

function setDiaryOptions(state, action) {
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
    ...state,
    diaryOptions: {
      reasons: removeDuplicates(diaryReasons, 'answer'),
      tags: removeDuplicates(diaryTags, 'answer')
    }
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

function formatTopAnswers(answers) {
  if (!answers) return [];

  return answers.map(answer => ({
    ...answer,
    // api gives us the zip as a number, backend requires zip to be a string.
    AIZip: String(answer.AIZip),
    // api gives us the ID as a number, backend requires ID to be a string.
    id: String(answer.ID),
    // format label for typeahead
    label: `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`
  }));
}

function formatAnswers(questions, name) {
  if (!Array.isArray(questions) || questions.length === 0) return undefined;
  const selectedQuestion = questions.find(q => q.name === name);

  if (!selectedQuestion) return undefined;

  return formatTopAnswers(selectedQuestion.answers);
}

function setEnums(state, action) {
  const mortgagee = formatAnswers(
    action.additionalInterestQuestions,
    'mortgagee'
  );

  const premiumFinance = formatAnswers(
    action.additionalInterestQuestions,
    'premiumFinance'
  );

  const orderAnswers = (action.additionalInterestQuestions || []).find(
    q => q.name === 'order'
  );

  const appraisers = action.propertyAppraisalQuestions;

  return {
    ...state,
    premiumFinance,
    mortgagee,
    order: orderAnswers ? orderAnswers.answers : [],
    agent: action.agent,
    agency: action.agency,
    appraisers
  };
}

function setZipCodeSettings(state, action) {
  return {
    ...state,
    zipCodeSettings: action.zipCodeSettings
  };
}
