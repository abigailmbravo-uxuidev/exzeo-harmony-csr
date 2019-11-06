import { quoteData } from '@exzeo/core-ui/src/@Harmony';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

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
      const config = {
        exchangeName: 'harmony',
        routingKey: 'harmony.quote.createQuote',
        data: {
          companyCode,
          state: stateCode,
          product,
          propertyId: igdID,
          runUnderwriting: true
        }
      };

      dispatch(toggleLoading(true));
      const response = await serviceRunner.callService(
        config,
        'quoteManager.createQuote'
      );
      const quote = response.data.result;
      // Ensure that all 'source' fields are set for underwriting questions
      Object.keys(quote.underwritingAnswers || {}).map(
        q => (quote.underwritingAnswers[q].source = 'Customer')
      );

      return quote;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Error creating quote: ', error);
      }
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
      const config = {
        exchangeName: 'harmony',
        routingKey: 'harmony.quote.retrieveQuote',
        data: {
          quoteId,
          quoteNumber
        }
      };

      dispatch(toggleLoading(true));
      const response = await serviceRunner.callService(
        config,
        'quoteManager.retrieveQuote'
      );
      const result = response.data.result;
      dispatch(setQuote(result));
      return result;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Error retrieving quote: ', error);
      }
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
export function reviewQuote({ quoteNumber, quoteId }) {
  return async dispatch => {
    try {
      const config = {
        exchangeName: 'harmony',
        routingKey: 'harmony.quote.reviewQuote',
        data: {
          quoteId,
          quoteNumber,
          alwaysRunUnderwriting: true
        }
      };

      dispatch(toggleLoading(true));
      const response = await serviceRunner.callService(
        config,
        'quoteManager.reviewQuote'
      );
      const quote = response.data.result;
      dispatch(setQuote(quote));
      return quote;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Error reviewing quote: ', error);
      }
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
  if (removeSecondary || data.policyHolders.length === 1) {
    // Backend doesn't like when partial policyholder is filled out, so for now we have to check whether or not
    // actual user input was entered. There are hidden fields that we add initial values to because the backend wants
    // them but we are not supposed to show them.
    quote.policyHolders = data.policyHolders[0].firstName
      ? [data.policyHolders[0]]
      : [];
  }

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
        const config = {
          exchangeName: 'harmony',
          routingKey: 'harmony.quote.sendApplication',
          data: {
            quoteNumber: data.quoteNumber,
            sendType: 'docusign'
          }
        };

        await serviceRunner.callService(config, 'quoteManager.sendApplication');
      } else {
        const formattedQuote = formatQuoteForSubmit(data, options);
        const result = await quoteData.updateQuote(formattedQuote, options);

        if (!result || !result.quoteNumber) {
          dispatch(errorActions.setAppError(result));
          return null;
        }
        dispatch(setQuote(result));
        return result;
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Error updating quote: ', error);
      }
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
export function getQuote({ quoteNumber, quoteId }) {
  return async dispatch => {
    try {
      const config = {
        service: 'quote-data',
        method: 'GET',
        path: quoteId || quoteNumber
      };

      dispatch(toggleLoading(true));
      const response = await serviceRunner.callService(config, 'getQuote');
      const quote = response.data.result;
      dispatch(setQuote(quote));
      return quote;
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
      const config = {
        exchangeName: 'harmony',
        routingKey: 'harmony.quote.verifyQuote',
        data: {
          quoteId,
          quoteNumber
        }
      };

      dispatch(toggleLoading(true));
      const response = await serviceRunner.callService(
        config,
        'quoteManager.verifyQuote'
      );
      const result = response.data.result;
      dispatch(setQuote(result));
      return result.quote;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Error with verify quote: ', error);
      }
      dispatch(errorActions.setAppError(error));
      return null;
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}
