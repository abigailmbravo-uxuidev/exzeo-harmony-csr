import _ from 'lodash';
import moment from 'moment-timezone';

export const premiumAmountFormatter = cell => Number(cell).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const setEndorsementDate = (effectiveDate, endPolicyDate) => {
  const effDate = moment.utc(effectiveDate).format('YYYY-MM-DD');
  const endDate = moment.utc(endPolicyDate).format('YYYY-MM-DD');
  const today = moment.utc().format('YYYY-MM-DD');

  if (today <= effDate) {
    return effDate;
  } else if (today >= effDate && today < endDate) {
    return today;
  }
  return endDate;
};

export const calculatePercentage = (oldFigure, newFigure) => {
  if (oldFigure === 0 || newFigure === 0) return 0;
  return (oldFigure / newFigure) * 100;
};

export const setPercentageOfValue = (value, percent) => Math.ceil(value * (percent / 100));

export const calculateEndorsementDate = (date, timezone) => {
  return moment.tz(moment.utc(date).format('YYYY-MM-DD'), timezone).utc().format();
};

export const generateModel = (data, props) => {

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
};

export default {
  calculatePercentage,
  calculateEndorsementDate,
  premiumAmountFormatter,
  generateModel,
  setEndorsementDate,
  setPercentageOfValue
};
