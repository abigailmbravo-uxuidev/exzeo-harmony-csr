import moment from 'moment-timezone';

const BUSINESS = {
  "question": "Is a business conducted on the property?",
  "source": "Customer",
  "answer": ""
};

const SINKHOLE = {
  format: "Percentage",
  amount: 0,
  displayText: "Sinkhole",
  ofCoverageLimit: "dwelling",
  calculatedAmount: 0
};

export function calculateEndorsementDate(date, timezone) {
  return moment.tz(moment.utc(date).format('YYYY-MM-DD'), timezone).utc().format();
}

export function setEndorsementDate(effectiveDate, endPolicyDate) {
  const effDate = moment.utc(effectiveDate).format('YYYY-MM-DD');
  const endDate = moment.utc(endPolicyDate).format('YYYY-MM-DD');
  const today = moment.utc().format('YYYY-MM-DD');

  if (today <= effDate) {
    return effDate;
  } else if (today >= effDate && today < endDate) {
    return today;
  }
  return endDate;
}

export function premiumAmountFormatter(cell) {
  Number(cell).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}


export const calculatePercentage = (oldFigure, newFigure) => {
  if (oldFigure === 0 || newFigure === 0) return 0;
  return (oldFigure / newFigure) * 100;
};

export const setPercentageOfValue = (value, percent) => Math.ceil(value * (percent / 100));


export function initializeEndorsementForm(policy = {}) {
  const defaultValues = {};
  // Bail if we don't have all our info
  if (!policy.policyID) return defaultValues;

  const dwelling = policy.coverageLimits.dwelling.amount;
  const otherStructures = policy.coverageLimits.otherStructures.amount;
  const personalProperty = policy.coverageLimits.personalProperty.amount;

  // Use the policy object as initial values for Endorsement Form
  const values = {...policy};
  // Initialize values for form
  values.clearFields = false;
  values.transactionType = 'Endorsement';
  values.endorsementDate = setEndorsementDate(policy.effectiveDate, policy.endDate);

  // These objects are not always populated on Policy Object
  values.underwritingAnswers.business = values.underwritingAnswers.business || BUSINESS;
  values.deductibles.sinkhole = values.deductibles.sinkhole || SINKHOLE;

  values.windMitFactor = policy.rating.worksheet.elements.windMitigationFactors.windMitigationDiscount;
  // Coverage Top Left
  values.coverageLimits.otherStructures.percentage = calculatePercentage(otherStructures, dwelling);
  values.coverageLimits.personalProperty.percentage = calculatePercentage(personalProperty, dwelling);
  values.coverageOptions.personalPropertyReplacementCost.answer = policy.coverageOptions.personalPropertyReplacementCost.answer || false;
  values.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer = policy.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer || false;
  values.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer = policy.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer || false;
  values.coverageOptions.liabilityIncidentalOccupancies.answer = policy.coverageOptions.liabilityIncidentalOccupancies.answer || false;
  // Wind Mitigation
  values.property.yearOfRoof = policy.property.yearOfRoof || null;
  values.property.protectionClass = policy.property.protectionClass || '';
  values.property.buildingCodeEffectivenessGrading = policy.property.buildingCodeEffectivenessGrading || null;
  values.buildingCodeEffectivenessGradingNew = values.property.buildingCodeEffectivenessGrading;
  values.property.familyUnits = policy.property.familyUnits || '';
  // Home/Location Bottom Right
  values.property.distanceToTidalWater = policy.property.distanceToTidalWater || '';
  values.property.distanceToFireHydrant = policy.property.distanceToFireHydrant || '';
  values.property.distanceToFireStation = policy.property.distanceToFireStation || '';
  values.property.residenceType = policy.property.residenceType || '';
  values.property.squareFeet = policy.property.squareFeet || '';
  values.property.floodZone = policy.property.floodZone || '';

  return values;
}

export function generateModel(data, props) {

  const endorsementDate = calculateEndorsementDate(data.endorsementDate, props.zipcodeSettings.timezone);

  data.transactionType = 'Endorsement';
  data.rating = props.getRate.rating;
  data.billingStatus = props.summaryLedger.status.code;

  data.property.distanceToFireHydrant = Number(data.property.distanceToFireHydrant);
  data.property.yearOfRoof = String(data.property.yearOfRoof).length > 0 ? data.property.yearOfRoof : null;

  data.deductibles.hurricane.calculatedAmount = String(data.deductibles.hurricane.calculatedAmount);

  return {
    ...data,
    endorsementAmount: data.newEndorsementAmount || 0,
    endorsementDate
  };
}

export default {
  calculateEndorsementDate,
  calculatePercentage,
  initializeEndorsementForm,
  generateModel,
  premiumAmountFormatter,
  setEndorsementDate,
  setPercentageOfValue
};
