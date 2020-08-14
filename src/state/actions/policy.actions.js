// temporary full path import until we can find a better way to mock network requests
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { date } from '@exzeo/core-ui';
import {
  getBillingOptions,
  getClaims as fetchClaims
} from '@exzeo/core-ui/src/@Harmony';
import { formatEndorsementData } from '../../modules/Policy/utilities';
import { convertToRateData } from '../../utilities/endorsementModel';
import * as types from './actionTypes';
import * as errorActions from './error.actions';
import { getZipcodeSettings } from './service.actions';
import { toggleLoading } from './ui.actions';

/**
 * Reset policyState
 * @returns {{type: string}}
 */
export function resetPolicy() {
  return {
    type: types.RESET_POLICY
  };
}

/**
 *
 * @param policy
 * @param summaryLedger
 * @returns {{type: string, policy: *, summaryLedger: *}}
 */
export function setPolicy(policy, summaryLedger) {
  return {
    type: types.SET_POLICY,
    policy,
    summaryLedger
  };
}

/**
 *
 * @param claims
 * @returns {{type: string, policy: *, summaryLedger: *}}
 */
export function setClaims(claims) {
  return {
    type: types.SET_CLAIMS,
    claims
  };
}

/**
 *
 * @param summaryLedger
 * @returns {{type: string, summaryLedger: *}}
 */
export function setSummaryLedger(summaryLedger) {
  return {
    type: types.SET_SUMMARY_LEDGER,
    summaryLedger
  };
}

/**
 *
 * @param effectiveDateReasons
 * @returns {{type: string, effectiveDateChangeReasons: *}}
 */
export function setEffectiveDateChangeReasons(effectiveDateReasons) {
  return {
    type: types.SET_EFFECTIVE_DATE_CHANGE_REASONS,
    effectiveDateReasons
  };
}

/**
 *
 * @param paymentHistory
 * @returns {{type: string, paymentHistory: *}}
 */
export function setPaymentHistory(paymentHistory) {
  return {
    type: types.SET_PAYMENT_HISTORY,
    paymentHistory
  };
}

/**
 *
 * @param billingOptions
 * @returns {{type: string, billingOptions: *}}
 */
export function setBillingOptions(billingOptions) {
  return {
    type: types.SET_BILLING_OPTIONS,
    billingOptions
  };
}

/**
 *
 * @param paymentOptions
 * @returns {{type: string, paymentOptions: *}}
 */
export function setPaymentOptions(paymentOptions) {
  return {
    type: types.SET_PAYMENT_OPTIONS,
    paymentOptions
  };
}

/**
 *
 * @param endorsementHistory
 * @returns {{type: string, endorsementHistory: *}}
 */
export function setEndorsementHistory(endorsementHistory) {
  return {
    type: types.SET_ENDORSEMENT_HISTORY,
    endorsementHistory
  };
}

/**
 *
 * @param cancelOptions
 * @returns {{type: string, cancelOptions: *}}
 */
export function setCancelOptions(cancelOptions) {
  return {
    type: types.SET_CANCEL_OPTIONS,
    cancelOptions
  };
}

/**
 *
 * @param agencyPolicies
 * @returns {{type: string, agencyPolicies: *}}
 */
export function setPoliciesForAgency(agencyPolicies) {
  return {
    type: types.SET_POLICIES_FOR_AGENCY,
    agencyPolicies
  };
}

/**
 *
 * @param policyNumber
 * @returns {Function}
 */
export function getPolicy(policyNumber) {
  return async dispatch => {
    try {
      const policy = await fetchPolicy(policyNumber);
      const summaryLedger = await fetchSummaryLedger(policyNumber);

      dispatch(setPolicy(policy, summaryLedger));
      return { policy, summaryLedger };
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param policyNumber
 * @returns {Function}
 */
export function getClaims(policyNumber) {
  return async dispatch => {
    try {
      const group = policyNumber.split('-');
      const policyNumberWithoutTerm = group.slice(0, 2).join('-');
      const response = await fetchClaims(policyNumberWithoutTerm);

      dispatch(setClaims(response.result));
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error fetching claims: ', error);
      }
    }
  };
}

/**
 *
 * @param policyNumber
 * @returns {Function}
 */
export function getSummaryLedger(policyNumber) {
  return async dispatch => {
    try {
      const summaryLedger = await fetchSummaryLedger(policyNumber);
      dispatch(setSummaryLedger(summaryLedger));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param formData
 * @param formProps
 * @returns {Function}
 */
export function getNewRate(formData, formProps) {
  return async dispatch => {
    try {
      const rateData = convertToRateData(formData, formProps);
      const config = {
        service: 'rating-engine',
        method: 'POST',
        path: 'endorsement',
        data: rateData
      };
      const response = await serviceRunner.callService(config, 'getNewRate');
      const rate =
        response && response.data && response.data.result
          ? response.data.result
          : {};
      return { ...rate };
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @returns {Function}
 */
export function getEffectiveDateChangeReasons() {
  return async dispatch => {
    try {
      const reasons = await fetchEffectiveDateChangeReasons();
      dispatch(setEffectiveDateChangeReasons(reasons));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param policyNumber
 * @returns {Function}
 */
export function getPaymentHistory(policyNumber) {
  return async dispatch => {
    try {
      const paymentHistory = await fetchPaymentHistory(policyNumber);
      dispatch(setPaymentHistory(paymentHistory));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param submitData
 * @returns {Function}
 */
export function addTransaction(submitData) {
  return async dispatch => {
    const config = {
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
      await serviceRunner.callService(config, 'addTransaction');
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
    dispatch(getPolicy(submitData.policy.policyNumber));
    dispatch(getPaymentHistory(submitData.policy.policyNumber));
  };
}

/**
 *
 * @param doc
 * @returns {function(*): Promise<any>}
 */
export function getBillingOptionsForPolicy(doc) {
  return async dispatch => {
    try {
      const billingOptions = await getBillingOptions(doc);
      dispatch(setBillingOptions(billingOptions));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @returns {Function}
 */
export function getPaymentOptionsApplyPayments() {
  return async dispatch => {
    try {
      const paymentOptions = await fetchPaymentOptionsApplyPayments();
      dispatch(setPaymentOptions(paymentOptions));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param policyNumber
 * @returns {function(*): Promise<any>}
 */
export function getEndorsementHistory(policyNumber) {
  return async dispatch => {
    try {
      const endorsementHistory = await fetchEndorsementHistory(policyNumber);
      dispatch(setEndorsementHistory(endorsementHistory));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param submitData
 * @returns {Function}
 */
export function createTransaction(submitData) {
  return async dispatch => {
    try {
      // performance issues can arise from returning an 'await'ed function - https://eslint.org/docs/rules/no-return-await
      // noinspection UnnecessaryLocalVariableJS
      const response = await postCreateTransaction(submitData);
      return response;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param paymentPlan
 * @returns {Function}
 */
export function updateBillPlan(paymentPlan) {
  return async dispatch => {
    try {
      const { newTransaction } = await postUpdatedBillPlan(paymentPlan);

      if (newTransaction) {
        dispatch(getPolicy(newTransaction.policyNumber));
      } else {
        dispatch(
          errorActions.setAppError({ message: 'Could not GET updated Policy' })
        );
      }
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param { object } options
 * @param {number} options.companyCode
 * @param {string} options.state
 * @param {string} options.product
 * @param {string} options.effectiveDate
 * @returns {Function}
 */
export function getCancelOptions(options) {
  return async dispatch => {
    try {
      const cancelOptions = await fetchCancelOptions(options);
      dispatch(setCancelOptions(cancelOptions));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/*
  TODO: We need to agree on a solution to this repetition. There are two problems to solve:
  todo    1) Dynamically pass in the config (easy, and actually already solved with service runner
  todo    2) Dynamically pass in the property to return off the network request (i.e. result.data or result.data.data or result.policy)
 */

/**
 *
 * @param policyNumber
 * @returns {Promise<{}>}
 */
export async function fetchPolicy(policyNumber) {
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `transactions/${policyNumber}/latest`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchPolicy');
    return response ? response.data : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param policyNumber
 * @returns {Promise<{}>}
 */
export async function fetchSummaryLedger(policyNumber) {
  const config = {
    service: 'harmony-data',
    method: 'GET',
    path: `summary-ledgers/${policyNumber}/latest`
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchSummaryLedger'
    );
    return response && response.data && response.data.result
      ? response.data.result
      : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @returns {Promise<*>}
 */
export async function fetchEffectiveDateChangeReasons() {
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: 'effectiveDateChangeReasons'
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchEffectiveDateChangeReasons'
    );
    return response && response.data ? response.data.effectiveDateReasons : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param policyNumber
 * @returns {Promise<*|{}>}
 */
export async function fetchPaymentHistory(policyNumber) {
  const config = {
    service: 'payment',
    method: 'GET',
    path: `payments/${policyNumber}`
  };
  try {
    const response = await serviceRunner.callService(
      config,
      'fetchPaymentHistory'
    );
    return response.data ? response.data : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @returns {Promise<*>}
 */
export async function fetchPaymentOptionsApplyPayments() {
  const config = {
    service: 'billing',
    method: 'GET',
    path: 'payment-options-apply-payment'
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchPaymentOptionsApplyPayments'
    );
    return response.data && response.data.paymentOptions
      ? response.data.paymentOptions
      : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param policy
 * @param rating
 * @param transactionType
 * @returns {Promise<*>}
 */
export async function fetchListOfForms(policy, rating, transactionType) {
  const config = {
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

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchListOfForms'
    );
    return response.data && response.data.result && response.data.result.forms
      ? response.data.result.forms
      : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param policyNumber
 * @returns {Promise<*>}
 */
export async function fetchEndorsementHistory(policyNumber) {
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `transactionDetails/${policyNumber}?endorsement=endorsement`
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchEndorsementHistory'
    );
    return response.data || [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param submitData
 * @returns {Promise<{}>}
 */
export async function postCreateTransaction(submitData) {
  const config = {
    service: 'policy-data',
    method: 'POST',
    path: 'transaction',
    data: submitData
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'postCreateTransaction'
    );
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {Object} aiData
 * @returns {Promise<{}>}
 */
export async function removeAdditionalInterest(aiData) {
  const { policyNumber, additionalInterest } = aiData;
  const config = {
    service: 'policy-manager',
    method: 'PATCH',
    path: `policies/${policyNumber}/additionalInterests/${additionalInterest._id}/remove`
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'removeAdditionalInterest'
    );
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {Object} aiData
 * @returns {Promise<{}>}
 */
export async function reinstateAdditionalInterest(aiData) {
  const { policyNumber, additionalInterest } = aiData;
  const config = {
    service: 'policy-manager',
    method: 'PATCH',
    path: `policies/${policyNumber}/additionalInterests/${additionalInterest._id}/reinstate`
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'reinstateAdditionalInterest'
    );
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param paymentPlan
 * @returns {Promise<{}>}
 */
export async function postUpdatedBillPlan(paymentPlan) {
  const { policyNumber, billToType, billToId, billPlan } = paymentPlan;
  const config = {
    service: 'policy-manager',
    method: 'POST',
    path: 'policies/updateBillPlan',
    data: { policyNumber, billToType, billToId, billPlan }
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'postUpdatedBillPlan'
    );
    return response?.data?.result || {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {Object} data
 * @param {string} data.transactionType
 * @param {string} data.cancelDate
 * @param {string} data.cancelReason
 * @returns {Promise<{}>}
 */
export async function cancelPolicy(data) {
  const config = {
    exchangeName: 'harmony',
    routingKey: 'harmony.policy.initiateCancellation',
    data
  };

  try {
    const response = await serviceRunner.callService(config, 'cancelPolicy');
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {Object} options
 * @param {number} options.companyCode
 * @param {string} options.state
 * @param {string} options.product
 * @param {string} options.effectiveDate
 * @returns {Promise<Array>}
 */
export async function fetchCancelOptions({
  companyCode,
  state,
  product,
  effectiveDate
}) {
  const config = {
    exchangeName: 'harmony',
    routingKey: 'harmony.configuration.retrieveSettings',
    data: {
      companyCode,
      state,
      product,
      effectiveDate,
      keys: ['cancelReasons']
    }
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchCancelOptions'
    );

    return response && response.data && response.data.result
      ? response.data.result[0].value
      : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param fields
 * @param fields.agencyCode
 * @param fields.state
 * @param fields.product
 * @param fields.agentCode
 * @param fields.policyNumber
 * @returns {Promise<{}>}
 */
export async function fetchPoliciesForAgency(fields) {
  const query = encodeURI(
    Object.keys(fields)
      .map(key => `${key}=${fields[key]}`)
      .join('&')
  );

  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `/transactions?${query}`
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchPoliciesForAgency'
    );
    return response ? response.data : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param policyNumber
 * @param agencyCode
 * @param state
 * @param product
 * @param agentCode
 * @param companyCode
 * @returns {Function}
 */
export function getPoliciesForAgency({
  policyNumber,
  agencyCode,
  state,
  product,
  agentCode,
  companyCode
}) {
  const queryFields = {
    ...(policyNumber && { policyNumber }),
    ...(agencyCode && { agencyCode }),
    ...(product && { product }),
    ...(agentCode && { agentCode }),
    ...(state && { state }),
    ...(companyCode && { companyCode })
  };
  return async dispatch => {
    try {
      const results = await fetchPoliciesForAgency(queryFields);
      dispatch(setPoliciesForAgency(results.policies));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param policyNumber
 * @param agencyCode
 * @param agentCode
 * @returns {Function}
 */
export function transferAOR({ policyNumber, agencyCode, agentCode }) {
  return async dispatch => {
    try {
      const transferData = {
        service: 'policy-manager',
        method: 'POST',
        path: 'update-agent-of-record',
        data: {
          agencyCode,
          agentCode,
          policyNumber
        }
      };
      await serviceRunner.callService(transferData, 'aorTransfer');
      dispatch(getPolicy(policyNumber));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param policyNumber
 * @returns {Function}
 */
export function initializePolicyWorkflow(policyNumber) {
  return async dispatch => {
    // TODO: Refactor into one action to dispatch
    try {
      const { summaryLedger, policy } = await dispatch(getPolicy(policyNumber));

      dispatch(getEffectiveDateChangeReasons());
      dispatch(getPaymentOptionsApplyPayments());
      dispatch(getEndorsementHistory(policyNumber));
      dispatch(
        getZipcodeSettings(
          policy.companyCode,
          policy.state,
          policy.product,
          policy.property.physicalAddress.zip,
          policy.property.id
        )
      );

      dispatch(
        getCancelOptions({
          companyCode: policy.companyCode,
          state: policy.state,
          product: policy.product,
          effectiveDate: policy.effectiveDate
        })
      );

      if (summaryLedger) {
        dispatch(getBillingOptionsForPolicy({ ...policy, summaryLedger }));
      }

      return policy;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param {Object} data
 * @param {Object} data.additionalInterest
 * @param {Integer} data.policyNumber
 * @returns {Function}
 */
async function addAdditionalInterest({ additionalInterest, policyNumber }) {
  const data = {
    policyNumber,
    name1: additionalInterest.name1,
    name2: additionalInterest.name2,
    order: Number(additionalInterest.order),
    phoneNumber: additionalInterest.phoneNumber,
    mailingAddress: additionalInterest.mailingAddress,
    referenceNumber: additionalInterest.referenceNumber,
    type: additionalInterest.type
  };
  data.mailingAddress.zipExtension = '';

  const config = {
    service: 'policy-manager',
    method: 'POST',
    path: `policies/additionalInterests`,
    data
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'addAdditionalInterest'
    );
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {Object} data
 * @param {Object} data.additionalInterest
 * @param {Integer} data.policyNumber
 * @returns {Function}
 */
async function updateAdditionalInterest({ additionalInterest, policyNumber }) {
  const data = {
    name1: additionalInterest.name1,
    name2: additionalInterest.name2,
    order: Number(additionalInterest.order),
    phoneNumber: additionalInterest.phoneNumber,
    active: additionalInterest.active,
    mailingAddress: additionalInterest.mailingAddress,
    referenceNumber: additionalInterest.referenceNumber,
    type: additionalInterest.type
  };

  const config = {
    service: 'policy-manager',
    method: 'PUT',
    path: `policies/${policyNumber}/additionalInterests/${additionalInterest._id}`,
    data
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'updateAdditionalInterest'
    );
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param data
 * @param options
 * @returns {Function}
 */
export function updatePolicy({ data = {}, options = {} }) {
  return async function(dispatch) {
    try {
      dispatch(toggleLoading(true));

      if (options.endorsePolicy) {
        const formattedData = formatEndorsementData(
          data,
          options.zipCodeSettings.timezone
        );

        const transferConfig = {
          exchangeName: 'harmony',
          routingKey: 'harmony.policy.saveEndorsement',
          data: formattedData
        };

        await serviceRunner.callService(transferConfig, 'saveEndorsement');
      }

      if (options.cancelPolicy) {
        const submitData = {
          policyNumber: data.policyNumber,
          transactionType: `Pending ${data.cancel.cancelType}`,
          cancelDate: date.formatToUTC(
            date.formatDate(data.cancel.effectiveDate, date.FORMATS.SECONDARY),
            options.zipCodeSettings.timezone
          ),
          cancelReason: data.cancel.cancelReason,
          additionalReason: data.cancel.additionalReason
        };
        await cancelPolicy(submitData);
      }

      if (data.selectedAI) {
        const { selectedAI, policyNumber, transactionType } = data;
        const aiData = {
          additionalInterest: selectedAI,
          policyNumber: policyNumber
        };

        if (transactionType === 'AI Update') {
          await updateAdditionalInterest(aiData);
        } else if (transactionType === 'AI Addition') {
          await addAdditionalInterest(aiData);
        } else if (transactionType === 'AI Removal') {
          await removeAdditionalInterest(aiData);
        } else if (transactionType === 'AI Reinstatement') {
          await reinstateAdditionalInterest(aiData);
        }
      }
      dispatch(initializePolicyWorkflow(data.policyNumber));
      return null;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Error updating policy: ', error);
      }
      dispatch(errorActions.setAppError(error));
      return { error };
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}
