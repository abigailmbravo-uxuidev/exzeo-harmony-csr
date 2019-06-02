import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { fetchAgents, fetchAgencies } from '@exzeo/core-ui/src/@Harmony';

import * as listTypes from '../actionTypes/list.actionTypes';
import { setAppError } from './error.actions';


function setEnums(enums) {
  return {
    type: listTypes.SET_ENUMS,
    underwritingQuestions: enums.underwritingQuestions,
    ...enums,
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
export function getEnumsForQuoteWorkflow({ companyCode, state, product, agencyCode, agentCode }) {
  return async dispatch => {
    try {
      // this pattern sets us up to "parallelize" the network requests in this function. We want to
      // fetch all enums/data needed for the quote workflow in here.
      // 1. assign async function(s) to variable(s) - calls the func
      const additionalInterestQuestions = fetchMortgagees();
      const agencyOption = fetchAgencies({ companyCode, state, agencyCode });
      const agentOption = fetchAgents({ companyCode, state, agencyCode });
      // 2. new variable awaits the previous.
      const additionalInterestResponse = await additionalInterestQuestions;
      const agencyResponse = await agencyOption;
      const agentResponse = await agentOption;

      const selectedAgent = agentResponse.filter(a => a.answer === agentCode);

      dispatch(setEnums({
        additionalInterestQuestions: additionalInterestResponse.data.data,
        agency: agencyResponse,
        agent: selectedAgent,
      }));

    } catch (error) {
      dispatch(setAppError(error));
    }
  };
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

