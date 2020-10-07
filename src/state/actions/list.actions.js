import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import * as listTypes from '../actionTypes/list.actionTypes';
import { setAppError } from './error.actions';
import { fetchNotes } from './notes.actions';

function setEnums(enums) {
  return {
    type: listTypes.SET_ENUMS,
    underwritingQuestions: enums.underwritingQuestions,
    ...enums
  };
}

/**
 *
 * @returns {Function}
 */
export function getEnumsForQuoteWorkflow({ quoteNumber }) {
  return async dispatch => {
    try {
      dispatch(fetchNotes([quoteNumber], 'quoteNumber'));
      // this pattern sets us up to "parallelize" the network requests in this function. We want to
      // fetch all enums/data needed for the quote workflow in here.
      // 1. assign async function(s) to variable(s) - calls the func
      const propertyAppraisals = fetchPropertyAppriasals();

      // 2. new variable awaits the previous.
      const propertyAppraisalsResponse = await propertyAppraisals;

      dispatch(
        setEnums({
          propertyAppraisalQuestions:
            propertyAppraisalsResponse.data.data[0].answers
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
export async function fetchPropertyAppriasals() {
  const data = {
    step: 'propertyAppraisalCSR'
  };

  const response = await serviceRunner.callQuestions(data);
  return response;
}

/**
 *
 * @returns {Function}
 */
export function getEnumsForPolicyWorkflow() {
  return async dispatch => {
    try {
      const propertyAppraisals = fetchPropertyAppriasals();

      const propertyAppraisalsResponse = await propertyAppraisals;

      dispatch(
        setEnums({
          propertyAppraisalQuestions:
            propertyAppraisalsResponse.data.data[0].answers
        })
      );
    } catch (error) {
      dispatch(setAppError(error));
    }
  };
}
