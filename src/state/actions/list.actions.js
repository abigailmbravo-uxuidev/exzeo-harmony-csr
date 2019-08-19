import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import {
  searchAgencies,
  fetchAgentsByAgencyCode
} from '@exzeo/core-ui/src/@Harmony';

import * as listTypes from '../actionTypes/list.actionTypes';
import { setAppError } from './error.actions';
import { fetchNotes, fetchNoteOptions } from './notes.actions';
import { fetchDiaries } from './diary.actions';

function setEnums(enums) {
  return {
    type: listTypes.SET_ENUMS,
    underwritingQuestions: enums.underwritingQuestions,
    ...enums
  };
}

/**
 *
 * @param companyCode
 * @param state
 * @param product
 * @param agencyCode
 * @param agentCode
 * @param quoteNumber
 * @returns {Function}
 */
export function getEnumsForQuoteWorkflow({
  companyCode,
  state,
  product,
  agencyCode,
  agentCode,
  quoteNumber
}) {
  return async dispatch => {
    try {
      dispatch(fetchDiaries({ resourceId: quoteNumber }));
      dispatch(fetchNotes([quoteNumber], 'quoteNumber'));
      // this pattern sets us up to "parallelize" the network requests in this function. We want to
      // fetch all enums/data needed for the quote workflow in here.
      // 1. assign async function(s) to variable(s) - calls the func
      const additionalInterestQuestions = fetchMortgagees();
      const agencyOption = searchAgencies({ companyCode, state, agencyCode });
      const agentOption = fetchAgentsByAgencyCode({
        companyCode,
        state,
        agencyCode
      });
      const noteOption = fetchNoteOptions('quoteNumber');

      // 2. new variable awaits the previous.
      const additionalInterestResponse = await additionalInterestQuestions;
      const agencyResponse = await agencyOption;
      const agentResponse = await agentOption;
      const noteOptionResponse = await noteOption;

      const selectedAgent = agentResponse.filter(a => a.answer === agentCode);

      dispatch(
        setEnums({
          additionalInterestQuestions: additionalInterestResponse.data.data,
          agency: agencyResponse,
          agent: selectedAgent,
          noteOptions: noteOptionResponse
        })
      );
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
    step: 'additionalInterestsCSR'
  };

  const response = await serviceRunner.callQuestions(data);
  return response;
}

/**
 *
 * @returns {Promise<void>}
 */
export async function fetchPropertyAppriasals() {
  const data = {
    step: 'propertyAppraisalCSR'
  };

  const response = await serviceRunner.callQuestions(data);
  return response;
}

/**
 *
 * @param policyNumber
 * @returns {Function}
 */
export function getEnumsForPolicyWorkflow({ policyNumber }) {
  return async dispatch => {
    try {
      dispatch(fetchDiaries({ resourceId: policyNumber }));
      const additionalInterestQuestions = await fetchMortgagees();
      const propertyAppraisals = await fetchPropertyAppriasals();

      const additionalInterestResponse = await additionalInterestQuestions;
      const propertyAppraisalsResponse = await propertyAppraisals;

      const noteOptions = await fetchNoteOptions('policyNumber');

      dispatch(
        setEnums({
          additionalInterestQuestions: additionalInterestResponse.data.data,
          propertyAppraisalQuestions:
            propertyAppraisalsResponse.data.data[0].answers,
          noteOptions
        })
      );
    } catch (error) {
      dispatch(setAppError(error));
    }
  };
}
