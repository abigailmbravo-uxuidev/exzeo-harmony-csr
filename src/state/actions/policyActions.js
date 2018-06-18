import { convertToRateData } from "../../utilities/endorsementModel";
import * as serviceRunner from '../../utilities/serviceRunner';
import * as types from './actionTypes';
import * as errorActions from "./errorActions";
import { serviceRequest } from "./serviceActions";

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
  }
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
  }
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
  }
}

/**
 *
 * @param policyNumber
 * @returns {Function}
 */
export function getPolicy(policyNumber) {
  return async (dispatch) => {
    try {
      const [policy, summaryLedger ] = await Promise.all([
        fetchPolicy(policyNumber),
        fetchSummaryLedger(policyNumber)
      ]);

      dispatch(setPolicy(policy, summaryLedger));
      // TODO remove when we can get rid of all 'latestPolicy' references
      dispatch(serviceRequest({ latestPolicy: policy }))
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}

/**
 *
 * @param policyNumber
 * @returns {Function}
 */
export function getSummaryLedger(policyNumber) {
  return async (dispatch) => {
    try {
      const summaryLedger = await fetchSummaryLedger(policyNumber);
      dispatch(setSummaryLedger(summaryLedger));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}

/**
 *
 * @param formData
 * @param formProps
 * @returns {Function}
 */
export function getNewRate(formData, formProps) {
  return async (dispatch) => {
    try {
      const rateData = convertToRateData(formData, formProps);
      const config = {
        service: 'rating-engine',
        method: 'POST',
        path: 'endorsement',
        data: rateData
      };
      const response = await serviceRunner.callService(config);
      const rate = response && response.data && response.data.result ? response.data.result : {};
      return { ...rate };
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

export function getEffectiveDateChangeReasons() {
  return async (dispatch) => {
    try {
      const reasons = await fetchEffectiveDateChangeReasons();
      dispatch(setEffectiveDateChangeReasons(reasons))
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}

/* TODO: move out network calls into a separate utility or service */

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
    const response = await serviceRunner.callService(config);
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
    const response = await serviceRunner.callService(config);
    return response && response.data && response.data.result ? response.data.result : {};
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
    const response = await serviceRunner.callService(config);
    return response && response.data ? response.data.effectiveDateReasons : [];
  } catch (error) {
    throw error;
  }
}
