import moment from 'moment';
import { batchActions } from 'redux-batched-actions';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import * as types from './actionTypes';
import * as errorActions from './error.actions';

export const serviceRequest = data => ({
  type: types.SERVICE_REQUEST,
  data
});

export function getNotes(noteId, sourceId) {
  const reduceId = id =>
    id.replace(/(\d{2}-\d{7})-\d{2}/g, (_, group) => group);
  const query = sourceId ? reduceId(`${noteId},${sourceId}`) : reduceId(noteId);

  return async dispatch => {
    try {
      const [notes, docsResult] = await Promise.all([
        fetchNotes(query),
        fetchDocuments(query)
      ]);

      const fileList = notes
        .reduce((list, note) => [...list, ...note.attachments], [])
        .map(n => n.fileUrl);

      docsResult.forEach(doc => {
        if (!fileList.includes(doc.fileUrl)) {
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
        }
      });

      return dispatch(serviceRequest({ notes }));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

async function fetchNotes(noteId) {
  const notesRequest = {
    service: 'transaction-logs',
    method: 'GET',
    path: `history?number=${noteId}`
  };

  try {
    const response = await serviceRunner.callService(
      notesRequest,
      'fetchNotes'
    );
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
    const response = await serviceRunner.callService(
      docsRequest,
      'fetchDocuments'
    );
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

export const getAgents = (companyCode, state) => async dispatch => {
  const axiosConfig = {
    service: 'agency',
    method: 'GET',
    path: `v1/agents/${companyCode}/${state}`
  };

  try {
    const response = await serviceRunner.callService(axiosConfig, 'getAgents');
    const data = { agents: response.data.result };
    return dispatch(serviceRequest(data));
  } catch (error) {
    return dispatch(errorActions.setAppError(error));
  }
};

export const clearAgent = () => dispatch => {
  const data = { agents: [] };
  return dispatch(serviceRequest(data));
};

export const getAgency = (companyCode, state, agencyCode) => async dispatch => {
  const axiosConfig = {
    service: 'agency',
    method: 'GET',
    path: `v1/agency/${companyCode}/${state}/${agencyCode}`
  };

  try {
    const response = await serviceRunner.callService(axiosConfig, 'getAgency');
    const data = { agency: response.data.result };
    return dispatch(serviceRequest(data));
  } catch (error) {
    return dispatch(errorActions.setAppError(error));
  }
};

export const getAgentsByAgency = (
  companyCode,
  state,
  agencyCode
) => async dispatch => {
  const axiosConfig = {
    service: 'agency',
    method: 'GET',
    path: `v1/agents/${companyCode}/${state}?agencyCode=${agencyCode}`
  };

  try {
    const response = await serviceRunner.callService(
      axiosConfig,
      'getAgentsByAgency'
    );
    const data = { agents: response.data.result };
    return dispatch(serviceRequest(data));
  } catch (error) {
    return dispatch(errorActions.setAppError(error));
  }
};

export const addTransaction = submitData => async dispatch => {
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

  try {
    const response = await serviceRunner.callService(body, 'addTransaction');
    const data = { transactions: response.data.result };
    return dispatch(serviceRequest(data));
  } catch (error) {
    return dispatch(errorActions.setAppError(error));
  }
};

export const getUnderwritingQuestions = (
  companyCode,
  state,
  product,
  property
) => async dispatch => {
  const axiosConfig = {
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
  };

  try {
    const response = await serviceRunner.callService(
      axiosConfig,
      'getUnderwritingQuestions'
    );
    const data = { underwritingQuestions: response.data.result };
    return dispatch(serviceRequest(data));
  } catch (error) {
    return dispatch(errorActions.setAppError(error));
  }
};

export const clearRate = () => dispatch =>
  dispatch(batchActions([serviceRequest({ getRate: {} })]));

export const getQuote = quoteId => async dispatch => {
  const axiosConfig = {
    service: 'quote-data',
    method: 'GET',
    path: quoteId
  };

  try {
    const response = await serviceRunner.callService(axiosConfig, 'getQuote');
    const data = { quote: response.data ? response.data.result : {} };
    dispatch(serviceRequest(data));
    return data.quote;
  } catch (error) {
    return dispatch(errorActions.setAppError(error));
  }
};

export const getZipcodeSettings = (
  companyCode,
  state,
  product,
  zip,
  propertyId
) => async dispatch => {
  const config = {
    exchangeName: 'harmony.crud',
    routingKey: 'harmony.crud.zipcode-data.getZipCode',
    data: {
      companyCode,
      state,
      product,
      zip,
      propertyId
    }
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'getZipcodeSettings'
    );

    const data = {
      getZipcodeSettings:
        response.data && response.data.result
          ? response.data.result[0]
          : { timezone: '' }
    };
    return dispatch(serviceRequest(data));
  } catch (error) {
    return dispatch(errorActions.setAppError(error));
  }
};

export const saveBillingInfo = (
  id,
  billToType,
  billToId,
  billPlan
) => async dispatch => {
  const axiosConfig = {
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

  try {
    const response = await serviceRunner.callService(
      axiosConfig,
      'saveBillingInfo'
    );
    const data = { transactions: response.data.result };
    dispatch(serviceRequest(data));
    return data.quote;
  } catch (error) {
    return dispatch(errorActions.setAppError(error));
  }
};

export const getAgencies = (companyCode, state) => async dispatch => {
  const axiosConfig = {
    service: 'agency',
    method: 'GET',
    path: `v1/agencies/${companyCode}/${state}?pageSize=1000&sort=displayName&SortDirection=asc`
  };

  try {
    const response = await serviceRunner.callService(
      axiosConfig,
      'getAgencies'
    );
    const result =
      response.data && response.data.result ? response.data.result : [];
    const data = { agencies: result };
    return dispatch(serviceRequest(data));
  } catch (error) {
    return dispatch(errorActions.setAppError(error));
  }
};
