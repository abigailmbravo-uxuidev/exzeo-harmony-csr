import { date } from '@exzeo/core-ui';
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

/**
 * Create a quote
 * @param {string} address
 * @param {string} igdID
 * @param {string} stateCode
 * @param {string} companyCode
 * @param {string} product
 * @returns {Function}
 */
export function createQuote(address, igdID, stateCode, companyCode, product) {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));

      const config = {
        exchangeName: 'harmony',
        routingKey: 'harmony.quote.createQuote',
        data: {
          companyCode,
          state: stateCode,
          product,
          propertyId: igdID,
        }
      };

      const response = await serviceRunner.callService(config, 'quoteManager.createQuote');
      const quote = response.data.result;
      // Ensure that all 'source' fields are set for underwriting questions
      Object.keys(quote.underwritingAnswers || {}).map(q => quote.underwritingAnswers[q].source = 'Customer');

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
export function getQuote({ quoteNumber, quoteId }) {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
      const config = {
        service: 'quote-data',
        method: 'GET',
        path: quoteId || quoteNumber
      };

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
export function retrieveQuote({ quoteNumber, quoteId }) {
  return async (dispatch) => {
    const config = {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.retrieveQuote',
      data: {
        quoteId,
        quoteNumber
      }
    };

    try {
      dispatch(toggleLoading(true));
      const response = await serviceRunner.callService(config, 'quoteManager.retrieveQuote');
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
export function reviewQuote({ quoteNumber, quoteId }) {
  return async (dispatch) => {
    const config = {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.reviewQuote',
      data: {
        quoteId,
        quoteNumber
      }
    };

    try {
      dispatch(toggleLoading(true));
      const response = await serviceRunner.callService(config, 'quoteManager.reviewQuote');
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

function formatQuoteForSubmit(data, options) {
  const quote = { ...data };
  quote.effectiveDate = date.formatToUTC(date.formatDate(data.effectiveDate, date.FORMATS.SECONDARY), data.property.timezone);

  if (options.step === 0) {
    if (options.removeSecondary) {
      quote.policyHolders = [quote.policyHolders[0]]
    }
    else if (data.policyHolders.length > 1) {
      quote.policyHolders[1].order = data.policyHolders[1].order || 1;
      quote.policyHolders[1].entityType = data.policyHolders[1].entityType || "Person";
    }
  }

  if (!data.coverageLimits.personalProperty.value) {
    quote.coverageOptions.personalPropertyReplacementCost.answer = false;
  }

  if (data.product === PRODUCT_TYPES.home) {
    // TODO created HAR-6754 to talk about this with the backend...
    quote.coverageOptions.sinkholePerilCoverage.answer = String(data.coverageOptions.sinkholePerilCoverage.answer) === 'true';
    if (quote.coverageOptions.sinkholePerilCoverage) {
      quote.deductibles.sinkhole = { value: 10 }
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
    dispatch(toggleLoading(true));
    try {
      if (options.shouldSendApplication) {
        const config = {
          exchangeName: 'harmony',
          routingKey: 'harmony.quote.sendApplication',
          data: {
            quoteNumber: data.quoteNumber,
            sendType: 'docusign',
          }
        };

        await serviceRunner.callService(config, 'quoteManager.sendApplication');
      } else {
        const updatedQuote = formatQuoteForSubmit(data, options);
        const config = {
          exchangeName: 'harmony',
          routingKey: 'harmony.quote.updateQuote',
          data: updatedQuote,
        };

        const response = await serviceRunner.callService(config, 'quoteManager.updateQuote');
        const quote = response.data.result;
        if (!quote) {
          dispatch(errorActions.setAppError(response.data));
          return null;
        }

        dispatch(setQuote(quote));
        return quote;
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
