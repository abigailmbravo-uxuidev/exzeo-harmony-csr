import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { SubmissionError } from 'redux-form';
import { batchActions } from 'redux-batched-actions';
import endorsementUtils from '../utilities/endorsementModel';
import * as types from './actionTypes';
import * as errorActions from './errorActions';

export const handleError = (err) => {
  let error = err.response && err.response.data ? err.response.data : err;
  if (typeof error === 'string') error = { message: error };
  if (!error.message) error.message = 'There was an error.';
  return { ...error };
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

export const getNotes = (id, sysNoteId) => (dispatch) => {
  const notesRequest = runnerSetup({
    service: 'transaction-logs',
    method: 'GET',
    path: `history?number=${id}`
  });

  const docsRequest = runnerSetup({
    service: 'file-index',
    method: 'GET',
    path: `v1/fileindex/${sysNoteId}`
  });

  return Promise.all([
    axios(notesRequest),
    axios(docsRequest)
  ])
    .then(([notesResult, docsResult]) => {
      const notes = notesResult.data.result;
      docsResult.data.result.forEach((doc) => {
        const newNote = {
          _id: doc.envelopeId ? doc.envelopeId : doc.fileUrl,
          contactType: 'system',
          createdBy: { userName: 'System', userId: doc.createdBy },
          createdDate: moment.unix(doc.createdDate),
          attachments: [
            {
              fileType: 'System',
              fileName: doc.fileName,
              fileUrl: doc.fileUrl
            }
          ]
        };
        notes.push(newNote);
      });

      return dispatch(serviceRequest({ notes }));
    })
    .catch((error) => {
      const message = handleError(error);
      dispatch(errorActions.setAppError(message));
    });
};

export const addNote = (data, files) => (dispatch) => {
  const form = new FormData();
  const url = `${process.env.REACT_APP_API_URL}/upload`;

  Object.keys(data).forEach((key) => form.append(key, data[key]));
  files.map(file => {
    const fileName = !file.name.endsWith(file.meta.name.extension)
      ? `${file.meta.name}.${file.extension}`
      : file.meta.name;
    return form.append(file.name, file.data, fileName)
  });

  axios.post(url, form, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`
    }
  })
  .then(response => {
    const ids = (data.noteType === 'Policy Note')
      ? [response.data.number, data.source].toString()
      : response.data.number;
    dispatch(getNotes(ids, response.data.number))
  })
  .catch((error) => {
    const message = handleError(error);
    return dispatch(errorActions.setAppError(message));
  });
};

export const getAgents = (companyCode, state) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const searchAgents = (companyCode, state, firstName, lastName, agentCode, address, licNumber) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
    method: 'GET',
    path: `v1/agents/${companyCode}/${state}?firstName=${firstName}&lastName=${lastName}&agentCode=${agentCode}&mailingAddress=${address}&licenseNumber=${licNumber}`
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
        errorActions.setAppError(message)
      ]));
    });
};

export const clearAgent = () => (dispatch) => {
  const data = { agents: [] };
  return dispatch(serviceRequest(data));
};


export const getAgency = (companyCode, state, agencyCode) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const getAgentsByAgency = (companyCode, state, agencyCode) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
    method: 'GET',
    path: `v1/agents/${companyCode}/${state}?agencyCode=${agencyCode}`
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
        errorActions.setAppError(message)
      ]));
    });
};

export const searchAgencies = (companyCode, state, displayName, agencyCode, address, licNumber, fein, phone) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
    method: 'GET',
    path: `v1/agencies/${companyCode}/${state}?displayName=${displayName}&agencyCode=${agencyCode}&mailingAddress=${address}&licenseNumber=${licNumber}&taxIdNumber=${fein}&primaryPhoneNumber=${phone}`
  });

  return axios(axiosConfig).then((response) => {
    const result = response.data && response.data.result ? response.data.result : [];
    const data = { agencies: result };
    return dispatch(serviceRequest(data));
  })
  .catch((error) => {
    const message = handleError(error);
    return dispatch(errorActions.setAppError(message));
  });
};

export const clearAgencies = () => (dispatch) => {
  const data = { agencies: [] };
  return dispatch(batchActions([
    serviceRequest(data)
  ]));
};


export const currentAgent = (companyCode, state, agentCode) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const getPolicyFromPolicyNumber = (companyCode, state, product, policyNumber) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'GET',
    path: `transactions?companyCode=${companyCode}&state=${state}&product=${product}&policyNumber=${policyNumber}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { policy: response.data.policies ? _.maxBy(response.data.policies[0], 'policyVersion') : {} };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError(message)
      ]));
    });
};

export const getLatestPolicy = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'GET',
    path: `transactions/${policyNumber}/latest`
  });

  return axios(axiosConfig).then((response) => {
    const data = { latestPolicy: response ? response.data : {} };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError(message)
      ]));
    });
};

export const getPolicyFromPolicyID = policyId => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'GET',
    path: `transactions/${policyId}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { policy: response.data.policies ? response.data.policies[0] : {} };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError(message)
      ]));
    });
};


export const getEffectiveDateChangeReasons = () => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'GET',
    path: 'effectiveDateChangeReasons'
  });

  return axios(axiosConfig).then((response) => {
    const data = { effectiveDateReasons: response.data.effectiveDateReasons ? response.data.effectiveDateReasons : [] };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError(message)
      ]));
    });
};

export const getTransactionHistory = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'billing',
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
        errorActions.setAppError(message)
        // appStateActions.setAppState('modelName', 'workflowId', { submitting: false })
      ]));
    });
};

export const addTransaction = submitData => (dispatch) => {
  const body = {
    service: 'billing',
    method: 'POST',
    path: 'post-payment-transaction',
    data: {
      companyCode: submitData.companyCode,
      state: submitData.policy.state,
      product: submitData.policy.product,
      policyNumber: submitData.policy.policyNumber,
      policyTerm: submitData.policy.policyTerm,
      policyAccountCode: submitData.policy.policyAccountCode,
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
        errorActions.setAppError(message)
      ]));
    });
};

export const getUnderwritingQuestions = (companyCode, state, product, property) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'questions',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const getSummaryLedger = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'billing',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const getPaymentOptionsApplyPayments = () => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'billing',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const getPaymentHistory = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'billing',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const saveUnderwritingExceptions = (id, underwritingExceptions) => (dispatch) => {
  const body = {
    service: 'quote-data',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const getBillingOptions = paymentOptions => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'billing',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const updateBillPlan = paymentPlan => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'POST',
    path: 'transaction',
    data: paymentPlan
  });

  return axios(axiosConfig).then((response) => {
    const data = response.data.result;
    dispatch(getLatestPolicy(data.policyNumber));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(errorActions.setAppError(message));
    });
};

export const getBillingOptionsForPolicy = paymentOptions => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'billing',
    method: 'POST',
    path: 'payment-options-for-policy',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const getEndorsementHistory = policyNumber => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data',
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
        errorActions.setAppError(message)
      ]));
    });
};

export const getRate = (formData, formProps) => {
 return async (dispatch) => {
   const { policy, summaryLedger: { currentPremium } } = formProps;
   const submitData = endorsementUtils.generateModel(formData, policy, formProps);
   const rateData = endorsementUtils.convertToRateData(submitData, currentPremium);

    const axiosConfig = runnerSetup({
      service: 'rating-engine',
      method: 'POST',
      path: 'endorsement',
      data: rateData
    });

    try {
      const response = await axios(axiosConfig);
      const data = {getRate: response.data ? response.data.result : {}};
      return dispatch(serviceRequest(data));
    } catch (error) {
      dispatch(errorActions.setAppError(handleError(error)));
      throw new SubmissionError(error);
    }
  };
};


export const clearRate = () => dispatch => dispatch(batchActions([
  serviceRequest({ getRate: {} })
]));

export const getQuote = quoteId => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'quote-data',
    method: 'GET',
    path: quoteId
  });

  return axios(axiosConfig).then((response) => {
    const data = { quote: response.data ? response.data.result : {} };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError(message)
      ]));
    });
};

export const getCancelOptions = () => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'GET',
    path: 'cancelOptions'
  });

  return axios(axiosConfig).then((response) => {
    const data = { cancelOptions: response.data.cancelOptions };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError(message)
      ]));
    });
};

export const createTransaction = submitData => (dispatch) => {
  const body = {
    service: 'policy-data',
    method: 'POST',
    path: 'transaction',
    data: submitData
  };
  const axiosConfig = runnerSetup(body);

  return axios(axiosConfig).then((response) => {
    const data = { addTransaction: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError(message)
      ]));
    });
};

export const getZipcodeSettings = (companyCode, state, product, zip) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'underwriting',
    method: 'GET',
    path: `zip-code?companyCode=${companyCode}&state=${state}&product=${product}&zip=${zip}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { getZipcodeSettings: response.data && response.data.result ? response.data.result[0] : {} };
    return dispatch(batchActions([
      serviceRequest(data)
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError(message)
      ]));
    });
};

export const saveBillingInfo = (id, billToType, billToId, billPlan) => (dispatch) => {
  const body = {
    service: 'quote-data',
    method: 'put',
    path: String(' '),
    data: {
      _id: id,
      billToType,
      billToId,
      billPlan
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
        errorActions.setAppError(message)
      ]));
    });
};

export const getAgencies = (companyCode, state) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'agency',
    method: 'GET',
    path: `v1/agencies/${companyCode}/${state}?pageSize=100&sort=displayName&SortDirection=asc`
  });

  return axios(axiosConfig).then((response) => {
    const result = response.data && response.data.result ? response.data.result : [];
    const data = { agencies: result };
    return dispatch(serviceRequest(data));
  })
  .catch((error) => {
    const message = handleError(error);
    return dispatch(errorActions.setAppError(message));
  });
};

export const searchPolicy = (taskData, sort) => (dispatch) => {
  const formattedAddress = taskData.address ? taskData.address.replace(' ', '&#32;') : '';
  const sortDirection = sort === 'policyNumber' ? 'desc' : 'asc';
  const axiosConfig = runnerSetup({
    service: 'policy-data',
    method: 'GET',
    path: `/transactions?companyCode=TTIC&state=FL&product=HO3&policyNumber=${taskData.policyNumber}&firstName=${taskData.firstName}&lastName=${taskData.lastName}&propertyAddress=${formattedAddress.replace(' ', '&#32;')}&page=${taskData.pageNumber}&pageSize=${taskData.pageSize}&resultStart=${taskData.resultStart}&sort=${sort}&sortDirection=${sortDirection}&effectiveDate=${taskData.effectiveDate}&agencyCode=${taskData.agencyCode}&status=${taskData.policyStatus}`
  });

  return Promise.resolve(axios(axiosConfig)).then((response) => {
    const data = { policyResults: response.data };
    return dispatch(serviceRequest(data));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(errorActions.setAppError({ message }));
    });
};

export const clearPolicyResults = () => (dispatch) => {
  const data = {
    policyResults: {
      totalNumberOfRecords: 1,
      pageSize: 1,
      currentPage: 1
    }
  };
  return dispatch(batchActions([
    serviceRequest(data)
  ]));
};
