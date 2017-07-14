import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import _ from 'lodash';
import * as types from './actionTypes';
import * as errorActions from './errorActions';

export const handleError = (error) => {
  const message = error.response && error.response.data && error.response.data.error
   ? error.response.data.error.message
   : 'An error happened';
  return (error.message) ? error.message : message;
};

export const serviceRequest = data => ({
  type: types.SERVICE_REQUEST,
  data
});

export const runnerSetup = data => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  url: `${process.env.REACT_APP_API_URL}/svc`,
  data
});

export const addNote = values => (dispatch) => {
  const body = {
    service: 'notes.services',
    method: 'POST',
    path: 'v1/note/',
    data: {
      number: values.number,
      noteType: values.noteType,
      noteContent: values.noteContent,
      contactType: values.contactType,
      createdAt: new Date().getTime(),
      noteAttachments: [],
      createdBy: values.createdBy,
      updatedBy: {}
    }
  };

  if (values.noteType === 'Quote Note') body.data.quoteNumber = values.number;
  if (values.noteType === 'Policy Note') body.data.policyNumber = values.number;

  const axiosConfig = runnerSetup(body);

  return axios(axiosConfig).then((response) => {
    const data = { notes: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

export const getNotes = id => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'transaction-logs.services',
    method: 'GET',
    path: `history?number=${id}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { notes: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
  .catch((error) => {
    const message = handleError(error);
    return dispatch(batchActions([
      errorActions.setAppError({ message })
    ]));
  });
};

export const getAgents = (companyCode, state) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency.services',
    method: 'GET',
    path: `v1/agents/${companyCode}/${state}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { agents: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

export const getAgency = (companyCode, state, agencyCode) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency.services',
    method: 'GET',
    path: `v1/agency/${companyCode}/${state}/${agencyCode}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { agency: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

export const getAgentsByAgency = (companyCode, state, agencyCode) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency.services',
    method: 'GET',
    path: `v1/agents/${companyCode}/${state}?agencyCode=${agencyCode}`
  });

  return Promise.resolve(axios(axiosConfig)).then((response) => {
    const data = { agents: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

export const getAgencies = (companyCode, state) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency.services',
    method: 'GET',
    path: `v1/agencies/${companyCode}/${state}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { agencies: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

export const currentAgent = (companyCode, state, agentCode) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency.services',
    method: 'GET',
    path: `v1/agent/${companyCode}/${state}/${agentCode}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { currentAgent: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

export const getPolicyFromPolicyNumber = (companyCode, state, product, policyNumber) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data.services',
    method: 'GET',
    path: `transactions?companyCode=${companyCode}&state=${state}&product=${product}&policyNumber=${policyNumber}`
  });

  return Promise.resolve(axios(axiosConfig)).then((response) => {
    const data = { policy: response.data.policies ? response.data.policies[0] : {} };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

export const getTransactionHistory = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'billing.services',
    method: 'GET',
    path: `transaction-history/${policyNumber}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { getTransactionHistory: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
      // appStateActions.setAppState('modelName', 'workflowId', { submitting: false })
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
        // appStateActions.setAppState('modelName', 'workflowId', { submitting: false })
      ]));
    });
};

export const addTransaction = (props, batchNumber, cashType, cashDescription, cashAmount) => (dispatch) => {
  const body = {
    service: 'billing.services',
    method: 'POST',
    path: `transaction-history/${props.policy.policyNumber}`,
    data: {
      createdBy: props.auth.userProfile.name,
      updatedBy: props.auth.userProfile.name,
      companyCode: props.auth.userProfile.groups.companyCode,
      state: props.policy.state,
      product: props.policy.product,
      policyNumber: props.policy.policyNumber,
      policyTerm: props.policy.policyTerm,
      policyAccountCode: props.policy.policyAccountCode,
      effectiveDate: new Date().getTime(),
      date: new Date().getTime(),
      type: cashType,
      description: cashDescription,
      batch: batchNumber,
      amount: cashAmount
    }
  };
  const axiosConfig = runnerSetup(body);

  return axios(axiosConfig).then((response) => {
    const data = { notes: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

export const getUnderwritingQuestions = (companyCode, state, product, property) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'questions.services',
    method: 'POST',
    path: 'questions/uw',
    data: {
      model: 'quote',
      step: 'askUWAnswers',
      quote: {
        companyCode,
        state,
        product,
        property
      }
    }
  });

  return axios(axiosConfig).then((response) => {
    const data = { underwritingQuestions: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};

export const getSummaryLedger = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'billing.services',
    method: 'GET',
    path: `summary-ledgers/${policyNumber}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { getSummaryLedger: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
      ]));
    });
};
