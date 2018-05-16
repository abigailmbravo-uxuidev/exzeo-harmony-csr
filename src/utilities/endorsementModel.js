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
  console.log(props);
  const endorseDate = moment.tz(moment.utc(data.endorsementDateNew).format('YYYY-MM-DD'), props.zipcodeSettings.timezone).utc().format();
  data.deductibles.sinkhole.amount = data.coverageOptions.sinkholePerilCoverage.answer === 'true' ? _.get(data, 'deductibles.sinkhole.amount') || 10 : 0;

  return {
    ...data,
    endorsementAmount: data.newEndorsementAmount || 0,
    endorsementDate: endorseDate
  };
};

export const convertToRateData = (formData, props) => {
  const { policy, summaryLedger: { currentPremium }, zipcodeSettings } = props;
  const endorsementDate = moment.tz(moment.utc(formData.endorsementDate).format('YYYY-MM-DD'), zipcodeSettings.timezone).utc().format();

  return {
    ...formData,
    oldTotalPremium: policy.rating.totalPremium,
    oldCurrentPremium: currentPremium,
    endorsementDate
  };
};

export default {
  calculatePercentage,
  convertToRateData,
  premiumAmountFormatter,
  generateModel,
  setEndorsementDate,
  setPercentageOfValue
};
