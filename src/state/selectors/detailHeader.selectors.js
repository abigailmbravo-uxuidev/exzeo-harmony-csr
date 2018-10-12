import { createSelector } from 'reselect';
import { normalize } from '@exzeo/core-ui';
import moment from 'moment-timezone';

import * as detailUtils from '../../utilities/entityDetails';
import { STANDARD_DATE_FORMAT } from '../../constants/dates';

import { getPolicy, getSummaryLedger, getQuote } from './entity.selectors';

const baseMapUri = 'https://www.google.com/maps/search/?api=1&query=';
const defaultEntity = {
  details: {},
  policyHolder: {},
  mailingAddress: {},
  propertyAddress: {},
  property: {},
  premium: {},
  cancellation: {}
};

export const getPolicyDetails = createSelector(
  [getPolicy, getSummaryLedger],
  (policy, summaryLedger) => {
    if (!policy || !policy.policyNumber || !summaryLedger) return defaultEntity;

    const {
      cancelDate,
      effectiveDate,
      endDate,
      policyHolders,
      policyHolderMailingAddress: pHMA,
      policyNumber,
      product,
      property,
      sourceNumber,
      status
    } = policy;

    const {
      currentPremium,
      status: { displayText, code }
    } = summaryLedger;

    const {
      constructionType,
      physicalAddress,
      territory
    } = property;

    const mapQuery = detailUtils.getMapQuery(physicalAddress);
    const cancellationDate = detailUtils.getCancellationDate(summaryLedger, endDate, cancelDate);
    const showReinstatement = detailUtils.shouldShowReinstatement(status, code);

    const primaryPolicyHolder = policyHolders[0];

    return {
      constructionType,
      sourceNumber,
      territory,
      county: physicalAddress.county,
      currentPremium: `$ ${normalize.numbers(currentPremium)}`,
      effectiveDate: moment.utc(effectiveDate).format(STANDARD_DATE_FORMAT),
      mapURI: `${baseMapUri}${mapQuery}`,
      status: `${status} / ${displayText}`,
      details: {
        product: detailUtils.getProductName(product),
        policyNumber
      },
      policyHolder: {
        displayName: `${primaryPolicyHolder.firstName} ${primaryPolicyHolder.lastName}`,
        phone: normalize.phone(primaryPolicyHolder.primaryPhoneNumber)
      },
      mailingAddress: {
        address1: pHMA.address1,
        address2: pHMA.address2,
        csz: detailUtils.getCityStateZip(pHMA)
      },
      propertyAddress: {
        address1: physicalAddress.address1,
        address2: physicalAddress.address2,
        csz: detailUtils.getCityStateZip(physicalAddress)
      },
      cancellation: {
        cancellationDate,
        showReinstatement
      }
    };
  }
);

export const getQuoteDetails = createSelector(
  [getQuote],
  (quote) => {
    if (!quote || !quote.quoteNumber) return defaultEntity;

    const {
      product,
      quoteNumber,
      quoteState,
      policyHolders,
      policyHolderMailingAddress: pHMA,
      property,
      effectiveDate,
      rating
    } = quote;

    const primaryPolicyHolder = policyHolders[0];

    const {
      constructionType,
      physicalAddress,
      territory
    } = property;

    const currentPremium = (rating && rating.totalPremium)
      ? normalize.numbers(rating.totalPremium)
      : '--';

    const mapQuery = detailUtils.getMapQuery(physicalAddress);

    return {
      constructionType,
      currentPremium,
      territory,
      county: physicalAddress.county,
      effectiveDate: moment.utc(effectiveDate).format(STANDARD_DATE_FORMAT),
      mapURI: `${baseMapUri}${mapQuery}`,
      status: quoteState,
      details: {
        product: detailUtils.getProductName(product),
        quoteNumber
      },
      policyHolder: {
        displayName: `${primaryPolicyHolder.firstName} ${primaryPolicyHolder.lastName}`,
        phone: normalize.phone(primaryPolicyHolder.primaryPhoneNumber)
      },
      mailingAddress: {
        address1: pHMA.address1,
        address2: pHMA.address2,
        csz: detailUtils.getCityStateZip(pHMA)
      },
      propertyAddress: {
        address1: physicalAddress.address1,
        address2: physicalAddress.address2,
        csz: detailUtils.getCityStateZip(physicalAddress)
      }
    };
  }
);
