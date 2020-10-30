import { date } from '@exzeo/core-ui';
import _cloneDeep from 'lodash/cloneDeep';

const BUSINESS = {
  question: 'Is a business conducted on the property?',
  source: 'Customer',
  answer: ''
};

const SINKHOLE = {
  format: 'Percentage',
  amount: 0,
  displayText: 'Sinkhole',
  ofCoverageLimit: 'dwelling',
  calculatedAmount: 0
};

export function calculateEndorsementDate(dateValue, timezone) {
  const endorsementDate = date.formatDate(dateValue, date.FORMATS.SECONDARY);
  return date.formatToUTC(endorsementDate, timezone);
}

export function setEndorsementDate(effectiveDate, endPolicyDate) {
  const effDate = date.formatDate(effectiveDate, date.FORMATS.SECONDARY);
  const endDate = date.formatDate(endPolicyDate, date.FORMATS.SECONDARY);
  const today = date.currentDay(date.FORMATS.SECONDARY);

  if (today <= effDate) {
    return effDate;
  } else if (today >= effDate && today < endDate) {
    return today;
  }
  return endDate;
}

export const calculatePercentage = (oldFigure, newFigure) => {
  if (oldFigure === 0 || newFigure === 0) return 0;
  return (oldFigure / newFigure) * 100;
};

export const setPercentageOfValue = (value, percent) =>
  Math.ceil(value * (percent / 100));

export function initializeEndorsementForm(policy = {}) {
  const defaultValues = {};
  // Bail if we don't have all our info
  if (!policy.policyID) return defaultValues;

  const dwelling = policy.coverageLimits.dwelling.amount;
  const otherStructures = policy.coverageLimits.otherStructures.amount;
  const personalProperty = policy.coverageLimits.personalProperty.amount;

  // Use the policy object as initial values for Endorsement Form
  // spread operator was still mutating the redux state of the object passed in
  const values = _cloneDeep(policy);
  // Initialize values for form
  values.clearFields = false;
  values.transactionType = 'Endorsement';
  values.endorsementDate = setEndorsementDate(
    policy.effectiveDate,
    policy.endDate
  );

  // These objects are not always populated on Policy Object
  values.underwritingAnswers.business =
    values.underwritingAnswers.business || BUSINESS;
  values.deductibles.sinkhole = values.deductibles.sinkhole || SINKHOLE;

  values.windMitFactor =
    policy.rating.worksheet.elements.windMitigationFactors.windMitigationDiscount;
  // Coverage Top Left
  values.coverageLimits.otherStructures.percentage = calculatePercentage(
    otherStructures,
    dwelling
  );
  values.coverageLimits.personalProperty.percentage = calculatePercentage(
    personalProperty,
    dwelling
  );
  values.coverageOptions.personalPropertyReplacementCost.answer =
    policy.coverageOptions.personalPropertyReplacementCost.answer || false;
  values.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer =
    policy.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer ||
    false;
  values.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer =
    policy.coverageOptions.propertyIncidentalOccupanciesOtherStructures
      .answer || false;
  values.coverageOptions.liabilityIncidentalOccupancies.answer =
    policy.coverageOptions.liabilityIncidentalOccupancies.answer || false;
  // Wind Mitigation
  values.property.protectionClass = policy.property.protectionClass || '';
  values.property.buildingCodeEffectivenessGrading =
    policy.property.buildingCodeEffectivenessGrading || null;
  values.property.familyUnits = policy.property.familyUnits || '';
  values.property.floodZone = policy.property.floodZone || '';
  // Home/Location Bottom Right
  values.property.residenceType = policy.property.residenceType || '';
  values.property.yearOfRoof = policy.property.yearOfRoof || null;

  return values;
}

export function generateModel(data, props) {
  const endorsementDate = calculateEndorsementDate(
    data.endorsementDate,
    props.zipcodeSettings.timezone
  );

  data.transactionType = 'Endorsement';
  data.billingStatus = props.summaryLedger.status.code;

  data.property.yearOfRoof =
    String(data.property.yearOfRoof).length > 0
      ? data.property.yearOfRoof
      : null;

  data.deductibles.hurricane.calculatedAmount = String(
    data.deductibles.hurricane.calculatedAmount
  );

  // ensure that the second policyholder is removed if there is no data entered
  if (
    data.policyHolders.length > 1 &&
    (!data.policyHolders[1].firstName ||
      !data.policyHolders[1].lastName ||
      !data.policyHolders[1].emailAddress ||
      !data.policyHolders[1].primaryPhoneNumber)
  ) {
    data.policyHolders.pop();
  }
  // ensure that we have order and entityType properties set for secondary policyHolder if there is one.
  if (data.policyHolders.length > 1) {
    const order = data.policyHolders[1].order;
    const entityType = data.policyHolders[1].entityType;
    data.policyHolders[1].order = order || 1;
    data.policyHolders[1].entityType = entityType || 'Person';
  }

  return {
    ...data,
    endorsementAmount: data.newEndorsementAmount || 0,
    endorsementDate
  };
}

export const convertToRateData = (formData, formProps) => {
  const {
    summaryLedger: { currentPremium },
    zipcodeSettings
  } = formProps;
  const endorsementDate = calculateEndorsementDate(
    formData.endorsementDate,
    zipcodeSettings.timezone
  );
  formData.coverageLimits.dwelling.amount =
    Math.round(formData.coverageLimits.dwelling.amount / 1000) * 1000;

  return {
    ...formData,
    oldTotalPremium: formData.rating.totalPremium,
    oldCurrentPremium: currentPremium,
    endorsementDate
  };
};

export default {
  calculateEndorsementDate,
  calculatePercentage,
  convertToRateData,
  initializeEndorsementForm,
  generateModel,
  setEndorsementDate,
  setPercentageOfValue
};
