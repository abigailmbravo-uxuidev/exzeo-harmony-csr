import { createSelector } from 'reselect';
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
      policyHolderMailingAddress: pHMA = {},
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
    const cancellationDate = detailUtils.getCancellationDate(summaryLedger, status, endDate, cancelDate);
    const showReinstatement = detailUtils.shouldShowReinstatement(status, code);
    const dateLabel = detailUtils.getEntityDetailsDateLabel(displayText, status);
    const finalPayment = detailUtils.getFinalPaymentDate(summaryLedger, status);

    return {
      constructionType,
      sourceNumber,
      territory,
      county: physicalAddress.county,
      currentPremium: detailUtils.getCurrentPremium(currentPremium),
      effectiveDate: moment.utc(effectiveDate).format(STANDARD_DATE_FORMAT),
      mapURI: `${baseMapUri}${mapQuery}`,
      status: `${status} / ${displayText}`,
      details: {
        product: detailUtils.getProductName(product)
      },
      policyHolder: detailUtils.getPrimaryPolicyHolder(policyHolders),
      mailingAddress: detailUtils.getMailingAddress(pHMA),
      propertyAddress: {
        address1: physicalAddress.address1,
        address2: physicalAddress.address2,
        csz: detailUtils.getCityStateZip(physicalAddress)
      },
      cancellation: {
        dateLabel,
        cancellationDate,
        showReinstatement
      },
      finalPayment
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
      policyHolderMailingAddress: pHMA = {},
      property,
      effectiveDate,
      rating = {}
    } = quote;

    const {
      constructionType,
      physicalAddress,
      territory
    } = property;

    const mapQuery = detailUtils.getMapQuery(physicalAddress);

    return {
      constructionType,
      currentPremium: detailUtils.getCurrentPremium(rating.totalPremium),
      territory,
      county: physicalAddress.county,
      effectiveDate: moment.utc(effectiveDate).format(STANDARD_DATE_FORMAT),
      mapURI: `${baseMapUri}${mapQuery}`,
      status: quoteState,
      details: {
        product: detailUtils.getProductName(product),
        quoteNumber
      },
      policyHolder: detailUtils.getPrimaryPolicyHolder(policyHolders),
      mailingAddress: detailUtils.getMailingAddress(pHMA),
      propertyAddress: {
        address1: physicalAddress.address1,
        address2: physicalAddress.address2,
        csz: detailUtils.getCityStateZip(physicalAddress)
      }
    };
  }
);