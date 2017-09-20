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

export const addNote = (data, files) => (dispatch) => {
  const form = new FormData();
  const url = `${process.env.REACT_APP_API_URL}/upload`;

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const fieldValue = key === 'createdBy' ? JSON.stringify(value) : value;
    form.append(key, fieldValue);
  });


  if (files && files.length > 0) {
    files.forEach(file => form.append(file.name, file));
  }

  axios.post(url, form, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`
    }
  })
  .then(response => dispatch(getNotes(response.data.number)))
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
    const result = response.data && response.data.result ? response.data.result.sort() : [];
    const data = { agencies: result };
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

export const addTransaction = (props, submitData) => (dispatch) => {
  const body = {
    service: 'billing.services',
    method: 'POST',
    path: 'post-payment-transaction',
    data: {
      companyCode: props.auth.userProfile.groups[0].companyCode,
      state: props.policy.state,
      product: props.policy.product,
      policyNumber: props.policy.policyNumber,
      policyTerm: props.policy.policyTerm,
      policyAccountCode: props.policy.policyAccountCode,
      date: submitData.cashDate,
      type: submitData.cashType,
      description: submitData.cashDescription,
      batch: submitData.batchNumber,
      amount: submitData.amount
    }
  };
  const axiosConfig = runnerSetup(body);

  return axios(axiosConfig).then((response) => {
    const data = { transactions: response.data.result };
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
    path: `summary-ledgers/${policyNumber}/latest`
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

export const getPaymentOptionsApplyPayments = () => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'billing.services',
    method: 'GET',
    path: 'payment-options-apply-payment'
  });

  return axios(axiosConfig).then((response) => {
    const data = { paymentOptions: response.data.paymentOptions };
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

export const getPaymentHistory = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'billing.services',
    method: 'GET',
    path: `payment-history/${policyNumber}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { paymentHistory: response.data.result };
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

export const saveUnderwritingExceptions = (id, underwritingExceptions) => (dispatch) => {
  const body = {
    service: 'quote-data.services',
    method: 'put',
    path: String(' '),
    data: {
      _id: id,
      underwritingExceptions
    }
  };
  const axiosConfig = runnerSetup(body);

  return axios(axiosConfig).then((response) => {
    const data = { transactions: response.data.result };
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

export const getBillingOptions = paymentOptions => (dispatch) => {
        // const paymentOptions = {
        //   effectiveDate: nextProps.policy.effectiveDate,
        //   policyHolders: nextProps.policy.policyHolders,
        //   additionalInterests: nextProps.policy.additionalInterests,
        //   netPremium: nextProps.policy.rating.netPremium,
        //   fees: {
        //     empTrustFee: nextProps.policy.rating.worksheet.fees.empTrustFee,
        //     mgaPolicyFee: nextProps.policy.rating.worksheet.fees.mgaPolicyFee
        //   },
        //   totalPremium: nextProps.policy.rating.totalPremium
        // };

  const axiosConfig = runnerSetup({
    service: 'billing.services',
    method: 'POST',
    path: 'payment-options-for-quoting',
    data: paymentOptions
  });

  return axios(axiosConfig).then((response) => {
    const data = { billingOptions: response.data.result };
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


export const getEndorsementHistory = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data.services',
    method: 'GET',
    path: `transactionDetails/${policyNumber}?endorsement=endorsement`
  });

  return axios(axiosConfig).then((response) => {
    const data = { endorsementHistory: response.data };
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
