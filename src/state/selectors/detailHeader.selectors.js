import { createSelector } from 'reselect';
import { date } from '@exzeo/core-ui';

import * as detailUtils from '../../utilities/entityDetails';
import { STANDARD_DATE_FORMAT } from '../../constants/dates';

import { getPolicy, getSummaryLedger, getQuote } from './entity.selectors';

export const getAppraisalList = state => state.list.appraisers;

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
  [getPolicy, getSummaryLedger, getAppraisalList],
  (policy, summaryLedger, appraisalList) => {
    if (!policy || !policy.policyNumber || !summaryLedger) return defaultEntity;

    const {
      cancelDate,
      effectiveDate,
      endDate,
      policyHolders,
      policyHolderMailingAddress: pHMA = {},
      policyID,
      policyNumber,
      product,
      property,
      sourceNumber,
      status
    } = policy;

    const {
      currentPremium,
      status: { displayText }
    } = summaryLedger;

    const {
      constructionType,
      physicalAddress,
      floodZone,
      territory
    } = property;

    const mapQuery = detailUtils.getMapQuery(physicalAddress);

    const appraisal =
      (appraisalList || []).find(
        x => x.label === property.physicalAddress.county
      ) || {};

    return {
      constructionType,
      policyID,
      policyNumber,
      sourceNumber,
      territory,
      floodZone,
      county: physicalAddress.county,
      currentPremium: detailUtils.getCurrentPremium(currentPremium),
      effectiveDate: date.formattedDate(effectiveDate, STANDARD_DATE_FORMAT),
      appraisalURI: {
        label: 'PAS',
        value: appraisal.answer
      },
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
      nonPaymentNoticeDate: detailUtils.getNonPaymentNoticeDate(
        summaryLedger,
        status
      ),
      nonPaymentNoticeDueDate: detailUtils.getNonPaymentNoticeDueDate(
        summaryLedger,
        status
      ),
      cancellation: detailUtils.getCancellationDate(
        summaryLedger,
        status,
        cancelDate,
        endDate
      ),
      sourcePath: sourceNumber ? `/quote/${sourceNumber}/coverage` : null
    };
  }
);

export const getQuoteDetails = createSelector(
  [getQuote, getAppraisalList],
  (quote, appraisalList) => {
    if (!quote || !quote.quoteNumber) return defaultEntity;

    const {
      product,
      quoteNumber,
      quoteState,
      policyHolders,
      policyHolderMailingAddress: pHMA = {},
      property,
      effectiveDate,
      rating = {},
      policyNumber,
      endDate
    } = quote;

    const {
      constructionType,
      floodZone,
      physicalAddress,
      territory
    } = property;

    const mapQuery = detailUtils.getMapQuery(physicalAddress);

    const appraisal =
      (appraisalList || []).find(
        x => x.label === property.physicalAddress.county
      ) || {};

    return {
      constructionType,
      floodZone,
      currentPremium: detailUtils.getCurrentPremium(rating.totalPremium),
      territory,
      county: physicalAddress.county,
      effectiveDate: date.formattedDate(effectiveDate, STANDARD_DATE_FORMAT),
      endDate: date.formattedDate(endDate, STANDARD_DATE_FORMAT),
      appraisalURI: {
        label: 'PAS',
        value: appraisal.answer
      },
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
      },
      policyNumber,
      sourcePath: policyNumber ? `/policy/${policyNumber}/coverage` : null,
      showPolicyLink: quoteState === 'Policy Issued'
    };
  }
);
