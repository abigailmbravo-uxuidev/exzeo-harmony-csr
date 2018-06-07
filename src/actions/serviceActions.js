import axios from 'axios';
import moment from 'moment';
import { batchActions } from 'redux-batched-actions';
import endorsementUtils from '../utilities/endorsementModel';
import { getPolicy } from './policyActions';
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

  Object.keys(data).forEach(key => form.append(key, data[key]));
  files.map((file) => {
    const fileName = !file.name.endsWith(file.meta.name.extension)
      ? `${file.meta.name}.${file.extension}`
      : file.meta.name;
    return form.append(file.name, file.data, fileName);
  });

  axios.post(url, form, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`
    }
  })
    .then((response) => {
      const ids = (data.noteType === 'Policy Note')
        ? [response.data.number, data.source].toString()
        : response.data.number;
      dispatch(getNotes(ids, response.data.number));
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
    dispatch(getPolicy(data.policyNumber));
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

export const createTransaction = submitData => (dispatch) => {
  const body = {
    service: 'policy-data',
    method: 'POST',
    path: 'transaction',
    data: submitData
  };
  const axiosConfig = runnerSetup(body);

  return axios(axiosConfig)
    .then((response) => {
      const data = { addTransaction: response.data.result };
      dispatch(serviceRequest(data));

      return response.data.result;
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

export const getListOfForms = (policy, rating, transactionType) => {
  const body = {
    service: 'form-list',
    method: 'POST',
    path: '/v1',
    data: {
      quote: {
        ...policy,
        rating
      },
      transactionType: transactionType || 'New Business'
    }
  };
  const axiosConfig = runnerSetup(body);

  return axios(axiosConfig)
    .then(response => ((response.data && response.data.result && response.data.result.forms)
      ? response.data.result.forms
      : []))
    .catch((error) => {
      throw new Error(error);
    });
};

/**
 * TODO: move out of service actions (most likely to policy, or some other state)
 * START - Save Endorsement form to get new rate and update policy coverage
 */
export function submitEndorsementForm(formData, formProps) {
  return async (dispatch) => {
    const submitData = endorsementUtils.generateModel(formData, formProps);
    const forms = await getListOfForms(formProps.policy, formProps.getRate.rating, 'New Business');
    submitData.forms = forms;
    const newPolicy = await dispatch(createTransaction(submitData));

    dispatch(getPolicy(newPolicy.policyNumber));
  };
}
/**
 * END
 */
