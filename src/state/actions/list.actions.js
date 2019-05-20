import { date } from '@exzeo/core-ui';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import * as listTypes from '../actionTypes/list.actionTypes';
import { setAppError } from './error.actions';


function setEnums(enums) {
  return {
    type: listTypes.SET_ENUMS,
    underwritingQuestions: enums.underwritingQuestions,
    ...enums,
  };
}

function setBillingOptions(billingOptions, quote) {
  return {
    type: listTypes.SET_BILLING_OPTIONS,
    billingOptions,
    quote
  };
}

/**
 *
 * @param companyCode
 * @param state
 * @param product
 * @param property
 * @returns {Function}
 */
export function getEnumsForQuoteWorkflow({ companyCode, state, product, property }) {
  return async dispatch => {
    try {
      // this pattern sets us up to "parallelize" the network requests in this function. We want to
      // fetch all enums/data needed for the quote workflow in here.
      // 1. assign async function(s) to variable(s) - calls the func
      const uwQuestions = fetchUnderwritingQuestions(companyCode, state, product, property);
      const additionalInterestQuestions = fetchMortgagees();
      // 2. new variable awaits the previous.
      const uwResponse = await uwQuestions;
      const additionalInterestResponse = await additionalInterestQuestions;

      dispatch(setEnums({
        underwritingQuestions: uwResponse.data.result,
        additionalInterestQuestions: additionalInterestResponse.data.data,
      }));

    } catch (error) {
      dispatch(setAppError(error));
    }
  };
}

/**
 *
 * @param companyCode
 * @param state
 * @param product
 * @param property
 * @returns {Promise<void>}
 */
export async function fetchUnderwritingQuestions(companyCode, state, product, property) {
    const config = {
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

    const response = await serviceRunner.callService(config, 'UWQuestions');
    return response;
}

/**
 *
 * @returns {Promise<void>}
 */
export async function fetchMortgagees() {
  const data = {
    step: 'additionalInterestsCSR',
  };

  const response = await serviceRunner.callQuestions(data);
  return response;
}

