import * as types from '../actions/actionTypes';
import * as listTypes from '../actionTypes/list.actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.list, action) {
  switch (action.type) {
    case types.SET_AGENTS:
      return setAgents(state, action);
    case listTypes.SET_BILLING_OPTIONS:
      return setBillingOptions(state, action);
    case listTypes.SET_ZIP_SETTINGS:
      return setZipCodeSettings(state, action);
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
    agents,
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

function setEnums(state, action) {
  const underwritingQuestions = (action.underwritingQuestions || [])
    .sort((a, b) => a.order - b.order)
    .map(question => {
      const defaultValue = (question.answers || []).find(answer => answer.default);
      return ({
        name: question.name,
        hidden: question.hidden,
        label: question.question,
        defaultValue: defaultValue ? defaultValue.answer : '',
        validation: ['isRequired'],
        options: (question.answers || []).map(answer => ({
          answer: answer.answer,
          label: answer.answer,
        }))
      });
    });

  const mortgageeAnswers = action.additionalInterestQuestions.find(q => q.name === 'mortgagee');
  const mortgagee = formatTopAnswers(mortgageeAnswers.answers);

  const premiumFinanaceAnswers = action.additionalInterestQuestions.find(q => q.name === 'premiumFinance');
  const premiumFinance = formatTopAnswers(premiumFinanaceAnswers.answers);

  const orderAnswers = action.additionalInterestQuestions.find(q => q.name === 'order');
  const order = orderAnswers.answers;

  return {
    ...state,
    underwritingQuestions,
    premiumFinance,
    mortgagee,
    order,
  };
}

function setZipCodeSettings(state, action) {
  return {
    ...state,
    zipCodeSettings: action.zipCodeSettings,
  };
}

function getBillingInfo(billingData = {}) {
  const { options = [], paymentPlans = {} } = billingData;


  const billingOptions = [];
  const billToConfig = {};

  options.forEach(option => {
    billingOptions.push(({ label: option.displayText, answer: option.billToId }));
    billToConfig[`${option.billToId}`] = {
      billToType:option.billToType,
      availablePlans: option.payPlans,
      payPlanOptions: option.payPlans.map(p => ({ label: p, answer: p })),
    };
  });

  return {
    billingOptions,
    billToConfig,
    paymentPlans,
  };
}

function setBillingOptions(state, action) {
  // may move this out into a selector... (maybe)
  const billingData = getBillingInfo(action.billingOptions, action.quote);

  return {
    ...state,
    billingConfig: billingData || initialState.list.billingConfig,
  };
}
