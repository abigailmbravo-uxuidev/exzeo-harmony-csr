import React from 'react';
import { date, format } from '@exzeo/core-ui';
import { BASE_MAP_URI, DEFAULT_DETAILS } from '../../constants/detailHeader';
import { STANDARD_DATE_FORMAT } from '../../constants/dates';
import * as detailUtils from '../../utilities/documentDetails';

export const getHeaderDetails = (quote, appraisalList) => {
  if (!quote || !quote.quoteNumber) return DEFAULT_DETAILS;

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

  const { constructionType, floodZone, physicalAddress, territory } = property;

  const mapQuery = detailUtils.getMapQuery(physicalAddress);

  const appraisal =
    (appraisalList || []).find(
      x => x.label === property.physicalAddress.county
    ) || {};

  return {
    constructionType,
    floodZone,
    currentPremium: rating.totalPremium
      ? `${format.toCurrency(rating.totalPremium)}`
      : '--',
    territory,
    county: physicalAddress.county,
    effectiveDate: date.formattedDate(effectiveDate, STANDARD_DATE_FORMAT),
    endDate: date.formattedDate(endDate, STANDARD_DATE_FORMAT),
    appraisalURI: {
      label: 'PAS',
      value: appraisal.answer
    },
    mapURI: `${BASE_MAP_URI}${mapQuery}`,
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
};

export const getNavLinks = quoteNumber => {
  return [
    {
      key: 'coverage',
      to: `/quote/${quoteNumber}/coverage`,
      label: <span>Coverage / Rating</span>,
      className: 'coverage',
      exact: true
    },
    {
      key: 'underwriting',
      to: `/quote/${quoteNumber}/underwriting`,
      label: <span>Underwriting</span>,
      className: 'underwriting',
      exact: true
    },
    {
      key: 'additionalInterests',
      to: `/quote/${quoteNumber}/additionalInterests`,
      label: <span>Additional Interests</span>,
      className: 'additionalInterests',
      exact: true
    },
    {
      key: 'billing',
      to: `/quote/${quoteNumber}/billing`,
      label: <span>Mailing / Billing</span>,
      className: 'billing',
      exact: true
    },
    {
      key: 'notes',
      to: `/quote/${quoteNumber}/notes`,
      label: <span>Notes / Files / Diaries</span>,
      className: 'notes',
      exact: true
    },
    {
      key: 'summary',
      to: `/quote/${quoteNumber}/summary`,
      label: <span>Quote Summary</span>,
      className: 'quote-summary'
    },
    {
      key: 'application',
      to: `/quote/${quoteNumber}/application`,
      label: <span>Application</span>,
      className: 'application',
      exact: true
    }
  ];
};
