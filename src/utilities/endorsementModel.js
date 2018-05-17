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

export const generateModel = (data, props) => {

  const endorsementDate = moment.tz(moment.utc(data.endorsementDateNew).format('YYYY-MM-DD'), props.zipcodeSettings.timezone).utc().format();
  data.deductibles.sinkhole.amount = data.coverageOptions.sinkholePerilCoverage.answer === 'true' ? _.get(data, 'deductibles.sinkhole.amount') || 10 : 0;

  data.rating = props.getRate.rating;
  data.billingStatus = props.summaryLedger.status.code;
  data.transactionType = 'Endorsement';

  data.property.distanceToFireHydrant = Number(data.property.distanceToFireHydrant);
  data.property.yearOfRoof = String(data.property.yearOfRoof).length > 0 ? data.property.yearOfRoof : null;

  delete data.additionalInterests;
  data.deductibles.hurricane.calculatedAmount = String(data.deductibles.hurricane.calculatedAmount);

  console.log(data)

  return {
    ...data,
    endorsementAmount: data.newEndorsementAmount || 0,
    endorsementDate
  };
};

export default {
  calculatePercentage,
  premiumAmountFormatter,
  generateModel,
  setEndorsementDate,
  setPercentageOfValue
};
