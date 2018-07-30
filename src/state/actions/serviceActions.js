import axios from 'axios';
import moment from 'moment';
import { batchActions } from 'redux-batched-actions';
import * as serviceRunner from '../../utilities/serviceRunner';
import * as types from './actionTypes';
import * as errorActions from './errorActions';

export const handleError = (err) => {
  let error = err.response && err.response.data ? err.response.data : err;
  if (typeof error === 'string') error = { message: error };
  if (!error.message) error.message = 'There was an error.';
  return { ...error };
};

export const runnerSetup = data => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  url: `${process.env.REACT_APP_API_URL}/svc`,
  data
});

export const serviceRequest = data => ({
  type: types.SERVICE_REQUEST,
  data
});

export function getNotes(noteId, sysNoteId) {
  return async (dispatch) => {
    try {
      const [notes, docsResult] = await Promise.all([
        fetchNotes(noteId),
        fetchDocuments(sysNoteId)
      ]);

      docsResult.forEach((doc) => {
        const newNote = {
          _id: doc.envelopeId ? doc.envelopeId : doc.fileUrl,
          contactType: 'system',
          createdBy: {userName: 'System', userId: doc.createdBy},
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

      return dispatch(serviceRequest({notes}));

    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}

async function fetchNotes(noteId) {
  const notesRequest = {
    service: 'transaction-logs',
    method: 'GET',
    path: `history?number=${noteId}`
  };

  try {
    const response = await serviceRunner.callService(notesRequest);
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

async function fetchDocuments(sysNoteId) {
  const docsRequest = {
    service: 'file-index',
    method: 'GET',
    path: `v1/fileindex/${sysNoteId}`
  };

  try {
    const response = await serviceRunner.callService(docsRequest);
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error
  }
}

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

    dispatch(serviceRequest(data));

    return data.quote;
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
    const data = { getZipcodeSettings: response.data && response.data.result ? response.data.result[0] : { timezone: '' } };
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
    path: `v1/agencies/${companyCode}/${state}?pageSize=1000&sort=displayName&SortDirection=asc`
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
      return dispatch(errorActions.setAppError(message));
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
