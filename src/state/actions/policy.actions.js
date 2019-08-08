// temporary full path import until we can find a better way to mock network requests
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { date } from '@exzeo/core-ui/src';

import { convertToRateData } from '../../utilities/endorsementModel';

import * as types from './actionTypes';
import * as errorActions from './error.actions';
import * as cgActions from './cg.actions';
import endorsementUtils from '../../utilities/endorsementModel';
import { getZipcodeSettings } from './service.actions';
import { toggleLoading } from './ui.actions';
import cg from '../../utilities/cg';
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
 * @param agencyPolices
 * @returns {{type: string, agencyPolices: *}}
 */
export function setPoliciesForAgency(agencyPolices) {
  return {
    type: types.SET_POLICIES_FOR_AGENCY,
    agencyPolices
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
 * @param paymentOptions
 * @returns {function(*): Promise<any>}
 */
export function getBillingOptionsForPolicy(paymentOptions) {
  return async dispatch => {
    try {
      const billingOptions = await fetchBillingOptions(paymentOptions);
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
      const response = await postCreatTransaction(submitData);
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
      const policy = await postUpdatedBillPlan(paymentPlan);
      // TODO: Implement some type of pub/sub for message queue
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (policy && policy.policyNumber) {
        dispatch(getPolicy(policy.policyNumber));
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
 * @returns {Function}
 */
export function getCancelOptions() {
  return async dispatch => {
    try {
      const cancelOptions = await fetchCancelOptions();
      dispatch(setCancelOptions(cancelOptions));
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
export function submitEndorsementForm(formData, formProps) {
  return async dispatch => {
    const submitData = endorsementUtils.generateModel(formData, formProps);
    const forms = await fetchListOfForms(
      formProps.policy,
      submitData.rating,
      'New Business'
    );
    submitData.forms = forms;

    // TODO: Make cg actions a utility rather than stored in state
    const result = await dispatch(
      cgActions.startWorkflow('endorsePolicyModelSave')
    );

    const steps = [
      {
        name: 'saveEndorsement',
        data: submitData
      }
    ];
    const startResult = result.payload
      ? result.payload[0].workflowData.endorsePolicyModelSave.data
      : {};
    await dispatch(
      cgActions.batchCompleteTask(
        startResult.modelName,
        startResult.modelInstanceId,
        steps
      )
    );
    // TODO: Implement some type of pub/sub for message queue
    await new Promise(resolve => setTimeout(resolve, 2000));
    dispatch(getEndorsementHistory(submitData.policyNumber));
    await dispatch(getPolicy(submitData.policyNumber));
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
    service: 'billing',
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
    service: 'billing',
    method: 'GET',
    path: `payment-history/${policyNumber}`
  };
  try {
    const response = await serviceRunner.callService(
      config,
      'fetchPaymentHistory'
    );
    return response.data && response.data.result ? response.data.result : {};
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
 * @param paymentOptions
 * @returns {Promise<{}>}
 */
export async function fetchBillingOptions(paymentOptions) {
  const config = {
    service: 'billing',
    method: 'POST',
    path: 'payment-options-for-policy',
    data: paymentOptions
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchBillingOptions'
    );
    return response.data && response.data.result ? response.data.result : {};
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
export async function postCreatTransaction(submitData) {
  const config = {
    service: 'policy-data',
    method: 'POST',
    path: 'transaction',
    data: submitData
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'postCreatTransaction'
    );
    return response.data && response.data.result ? response.data.result : {};
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
  const config = {
    service: 'policy-data',
    method: 'POST',
    path: 'transaction',
    data: paymentPlan
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'postUpdatedBillPlan'
    );
    return response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @returns {Promise<Array>}
 */
export async function fetchCancelOptions() {
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: 'cancelOptions'
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'fetchCancelOptions'
    );
    return response && response.data && response.data.cancelOptions
      ? response.data.cancelOptions
      : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param agencyCode
 * @param state
 * @param product
 * @param agentCode
 * @param policyNumber
 * @returns {Promise<{}>}
 */
export async function fetchPoliciesForAgency({
  agencyCode = '',
  state = 'FL',
  product = 'HO3',
  agentCode = '',
  policyNumber = ''
}) {
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `/transactions?&companyCode=TTIC&state=${state}&product=${product}&agencyCode=${agencyCode}&agentCode=${agentCode}&policyNumber=${policyNumber}`
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
 * @returns {Function}
 */
export function getPoliciesForAgency({
  policyNumber,
  agencyCode,
  state,
  product,
  agentCode
}) {
  return async dispatch => {
    try {
      const results = await fetchPoliciesForAgency({
        policyNumber,
        state,
        product,
        agentCode,
        agencyCode
      });
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
      await serviceRunner.callService(transferData);
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
    try {
      const { summaryLedger, policy } = await dispatch(getPolicy(policyNumber));
      dispatch(getEffectiveDateChangeReasons());
      dispatch(getPaymentOptionsApplyPayments());
      dispatch(getCancelOptions());
      dispatch(getEndorsementHistory(policyNumber));
      dispatch(
        getZipcodeSettings(
          policy.companyCode,
          policy.state,
          policy.product,
          policy.property.physicalAddress.zip
        )
      );

      if (summaryLedger) {
        const paymentOptions = {
          effectiveDate: policy.effectiveDate,
          policyHolders: policy.policyHolders,
          additionalInterests: policy.additionalInterests,
          fullyEarnedFees:
            policy.rating.worksheet.fees.empTrustFee +
            policy.rating.worksheet.fees.mgaPolicyFee,
          currentPremium: summaryLedger.currentPremium
        };
        dispatch(getBillingOptionsForPolicy(paymentOptions));
      }
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

async function updateAdditionalInterest({
  additionalInterest,
  policyID,
  policyNumber,
  transactionType,
  dispatch
}) {
  const submitData = {
    ...additionalInterest,
    policyID,
    policyNumber,
    additionalInterestId: additionalInterest._id,
    transactionType
  };
  await dispatch(createTransaction(submitData));
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

      if (options.cancelPolicy) {
        const submitData = {
          policyID: data.policyID,
          policyNumber: data.policyNumber,
          cancelDate: date.formatToUTC(
            date.formatDate(data.cancel.effectiveDate, date.FORMATS.SECONDARY),
            options.zipCodeSettings.timezone
          ),
          cancelReason: data.cancelReason,
          transactionType: `Pending ${data.cancel.cancelType}`,
          equityDate: date.formatToUTC(
            date.formatDate(data.cancel.equityDate, date.FORMATS.SECONDARY),
            options.zipCodeSettings.timezone
          ),
          billingStatus: data.summaryLedger.status.code
        };
        const startResult = await cg.startWorkflow({
          modelName: 'cancelPolicyModelUI',
          data: {
            policyNumber: data.policyNumber,
            policyID: data.policyID
          }
        });

        await cg.completeTask({
          workflowId: startResult.modelInstanceId,
          stepName: 'cancelPolicySubmit',
          data: submitData
        });

        await dispatch(getPolicy(data.policyNumber));
      }

      if (data.selectedAI) {
        await updateAdditionalInterest({
          additionalInterest: data.selectedAI,
          policyID: data.policyID,
          policyNumber: data.policyNumber,
          transactionType: data.transactionType,
          dispatch
        });
        await dispatch(getPolicy(data.policyNumber));
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Error updating policy: ', error);
      }
      dispatch(errorActions.setAppError(error));
      return null;
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}
