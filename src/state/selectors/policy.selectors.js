import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';
import { date } from '@exzeo/core-ui';

import { applyAdditionalInterestRanking } from '../../utilities/additionalInterests';

import {
  getPaymentHistory,
  getPaymentOptions,
  getPolicy,
  getSummaryLedger,
  getAgencyPolicies,
  getEffectiveDateChangeReasons,
  getEndorsementHistory
} from './entity.selectors';
import { formattedDate } from '@exzeo/core-ui/src/Utilities';
import { getZipcodeSettings } from '../actions/service.actions';
import { PREMIUM_ENDORSEMENTS } from '../../modules/Policy/constants/policy';
import endorsementUtils from '../../utilities/endorsementModel';

export const getCashDescriptionOptions = createSelector(
  [getPaymentOptions],
  paymentOptions => {
    if (!paymentOptions) {
      return {};
    }

    return paymentOptions.reduce((optionMap, option) => {
      optionMap[option.paymentType] = option.paymentDescription.map(option => ({
        answer: option,
        label: option
      }));

      return optionMap;
    }, {});
  }
);

export const getCashTypeAnswers = createSelector(
  [getPaymentOptions],
  paymentOptions => {
    if (!paymentOptions) {
      return [];
    }

    return paymentOptions.map(option => ({
      answer: option.paymentType,
      label: option.paymentType
    }));
  }
);

const defaultArr = [];
export const getSortedAdditionalInterests = createSelector(
  [getPolicy],
  policy => {
    if (!policy.additionalInterests) return defaultArr;

    const additionalInterests = cloneDeep(policy.additionalInterests);

    applyAdditionalInterestRanking(additionalInterests, true);

    return sortBy(additionalInterests, ['sortInactive', 'rank', 'order']);
  }
);

export const getFormattedPaymentHistory = createSelector(
  [getPaymentHistory],
  paymentHistory => {
    if (!Array.isArray(paymentHistory) || !paymentHistory.length)
      return defaultArr;

    const orderedPaymentHistory = orderBy(
      paymentHistory,
      ['date', 'createdAt'],
      ['desc', 'desc']
    );
    return orderedPaymentHistory.map(payment => ({
      ...payment,
      amountDisplay: payment.amount
    }));
  }
);

export const getPoliciesByAgencyCode = createSelector(
  [getAgencyPolicies],
  policies => {
    if (!Array.isArray(policies) || !policies.length) return defaultArr;

    return policies.map(p => {
      const {
        policyHolders,
        property: {
          physicalAddress: { address1, address2, state, city, zip }
        }
      } = p;
      return {
        policyNumber: p.policyNumber,
        companyCode: p.companyCode,
        state: p.state,
        product: p.product,
        propertyAddress: `${address1}, ${
          address2 ? `${address2},` : ''
        } ${city}, ${state} ${zip}`,
        policyHolder1: `${policyHolders[0].firstName} ${policyHolders[0].lastName}`,
        effectiveDate: formattedDate(p.effectiveDate),
        policyVersion: p.policyVersion,
        agencyCode: p.agencyCode,
        agentCode: p.agentCode
      };
    });
  }
);

export const getPolicyNumberList = createSelector(
  [getAgencyPolicies],
  policies => {
    if (!Array.isArray(policies) || !policies.length) return defaultArr;
    return policies.map(p => {
      return { answer: p.policyNumber, label: p.policyNumber };
    });
  }
);

export const getPolicyEffectiveDateReasons = createSelector(
  [getEffectiveDateChangeReasons],
  reasons => {
    if (!Array.isArray(reasons) || !reasons.length) return defaultArr;
    return reasons.map(reason => ({ answer: reason, label: reason }));
  }
);

export const getPolicyFormData = createSelector(
  [getPolicy, getSummaryLedger, getZipcodeSettings],
  (policy, summaryLedger, zipCodeSettings) => {
    const currentDate = date.convertDateToTimeZone(undefined, zipCodeSettings);
    const summaryLedgerEffectiveDate = date.convertDateToTimeZone(
      summaryLedger.effectiveDate,
      zipCodeSettings
    );

    const effectiveDatePlus90 = summaryLedgerEffectiveDate.clone().add(90, 'd');
    const effectiveDatePlus20 = summaryLedgerEffectiveDate.clone().add(20, 'd');
    const currentDatePlus20 = currentDate.clone().add(20, 'd');
    const currentDatePlus45 = currentDate.clone().add(45, 'd');

    const defaultEffectiveDate =
      policy.policyTerm > 1 || currentDate > effectiveDatePlus90
        ? currentDate.clone().add(120, 'd')
        : policy.product === 'AF3'
        ? currentDatePlus45
        : currentDatePlus20 > effectiveDatePlus20
        ? currentDatePlus20
        : effectiveDatePlus20;

    const cancel = {
      equityDate: date.formatDate(summaryLedger.equityDate, 'MM/DD/YYYY'),
      effectiveDate: defaultEffectiveDate.format('YYYY-MM-DD')
    };

    policy.removeSecondary = false;
    policy._TEMP_INITIAL_VALUES = cloneDeep(policy);
    policy.summaryLedger = summaryLedger;
    policy.cancel = cancel;
    return policy;
  }
);

export const getPolicyEndorsementHistory = createSelector(
  [getEndorsementHistory],
  endorsementHistory => {
    if (!Array.isArray(endorsementHistory) || !endorsementHistory.length)
      return defaultArr;
    return (
      endorsementHistory &&
      endorsementHistory.map(endorsement => {
        endorsement.netChargeFormat = PREMIUM_ENDORSEMENTS.some(
          pe => pe === endorsement.transactionType
        )
          ? endorsementUtils.premiumAmountFormatter(endorsement.netCharge)
          : '';
        return endorsement;
      })
    );
  }
);
