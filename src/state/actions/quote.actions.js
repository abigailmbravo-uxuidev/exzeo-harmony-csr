import { quoteData } from '@exzeo/core-ui/src/@Harmony';

import * as types from './actionTypes';
import * as errorActions from './error.actions';
import { toggleLoading } from './ui.actions';
import { PRODUCT_TYPES } from '../../modules/Quote/constants/quote';

export function setQuote(quote) {
  return {
    type: types.SET_QUOTE,
    quote
  };
}

export function setRetrievedQuote(response) {
  return {
    type: types.SET_RETRIEVED_QUOTE,
    response
  };
}

/**
 * Create a quote
 * @param {string} igdID
 * @param {string} stateCode
 * @param {string} companyCode
 * @param {string} product
 * @returns {Function}
 */
export function createQuote(igdID, stateCode, companyCode, product) {
  return async dispatch => {
    try {
      dispatch(toggleLoading(true));
      const quote = await quoteData.createQuote({
        igdID,
        stateCode,
        companyCode,
        product
      });
      return quote;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}

// TODO nothing is using this yet.
/**
 *
 * @param quoteNumber
 * @param quoteId
 * @returns {Function}
 */
export function retrieveQuote({ quoteNumber, quoteId }) {
  return async dispatch => {
    try {
      dispatch(toggleLoading(true));
      const result = await quoteData.retrieveQuote({ quoteNumber, quoteId });
      dispatch(setQuote(result));
      return result;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}

/**
 *
 * @param data
 * @param options
 * @returns {*}
 */
function formatQuoteForSubmit(data, options) {
  const {
    remainOnStep,
    shouldNav,
    removeSecondary,
    blockSendApplication,
    blockQuoteSummary,
    editingDisabled,
    ...quote
  } = data;

  if (!data.coverageLimits.personalProperty.value) {
    quote.coverageOptions.personalPropertyReplacementCost.answer = false;
  }

  if (data.product === PRODUCT_TYPES.home) {
    // TODO created HAR-6754 to talk about this with the backend...
    quote.coverageOptions.sinkholePerilCoverage.answer =
      String(data.coverageOptions.sinkholePerilCoverage.answer) === 'true';
    if (quote.coverageOptions.sinkholePerilCoverage) {
      quote.deductibles.sinkhole = { value: 10 };
    }
  }
  // AF3 specific rules
  if (data.product === PRODUCT_TYPES.flood) {
    // currently no defaults specific to flood that we know of.
  }

  return quote;
}

/**
 *
 * @param data
 * @param options
 * @returns {Function}
 */
export function updateQuote({ data = {}, options = {} }) {
  return async function(dispatch) {
    try {
      dispatch(toggleLoading(true));

      if (options.shouldSendApplication) {
        await quoteData.sendApplication(data.quoteNumber, 'docusign');
      } else {
        const quote = formatQuoteForSubmit(data, options);
        const result = await quoteData.updateQuote(quote, {
          alwaysRunUnderwriting: true
        });

        if (!result || !result.quoteNumber) {
          dispatch(errorActions.setAppError(result));
          return null;
        }
        dispatch(setQuote(result));
        return result;
      }
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}

/**
 *
 * @param quoteNumber
 * @param quoteId
 * @returns {Function}
 */
export function verifyQuote({ quoteNumber, quoteId }) {
  return async dispatch => {
    try {
      dispatch(toggleLoading(true));
      const result = await quoteData.verifyQuote({ quoteNumber, quoteId });
      dispatch(setQuote(result));
      return result;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return null;
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}
