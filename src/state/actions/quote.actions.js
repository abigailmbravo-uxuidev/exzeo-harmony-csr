import { date } from '@exzeo/core-ui';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import choreographer from '../../utilities/choreographer';

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

    try {
      dispatch(toggleLoading(true));
      const response = await serviceRunner.callService(config, 'quoteManager.createQuote');
      const quote = response.data.result;
      // Ensure that all 'source' fields are set for underwriting questions
      Object.keys(quote.underwritingAnswers || {}).map(q => quote.underwritingAnswers[q].source = 'Customer');

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

function formatQuoteForSubmit(data, options) {
  const quote = { ...data };
  quote.effectiveDate = date.formatToUTC(date.formatDate(data.effectiveDate, date.FORMATS.SECONDARY), data.property.timezone);

  if (options.step === 0) {
    if (data.policyHolders.length > 0) {
      quote.policyHolders[0].electronicDelivery = data.policyHolders[0].electronicDelivery || false;
      quote.policyHolders[0].order = data.policyHolders[0].order || 0;
      quote.policyHolders[0].entityType = data.policyHolders[0].entityType || "Person";
    }

    if (data.policyHolders.length > 1) {
      quote.policyHolders[1].order = data.policyHolders[1].order || 1;
      quote.policyHolders[1].entityType = data.policyHolders[1].entityType || "Person";
      delete quote.policyHolders[1].electronicDelivery;
    }
  }

  if (!data.coverageLimits.personalProperty.value) {
    quote.coverageOptions.personalPropertyReplacementCost.answer = false;
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

         await serviceRunner.callService(config, 'quoteManage.sendApplication');
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
