import axios from 'axios';
import momentTZ from 'moment-timezone';
import _ from 'lodash';

import handleError from './handleError';

export const startWorkflow = async (modelName, data) => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      modelName,
      data
    },
    url: `${process.env.REACT_APP_API_URL}/cg/start?${modelName}`
  };

  try {
    const result = await axios(axiosConfig);
    return result.data.data.previousTask.value.result;
  } catch (error) {
    throw handleError(error);
  }
};


const handleCoverageSubmit = (values, props) => {

  const submitData = {};

  submitData.effectiveDate = momentTZ.tz(momentTZ.utc(values.effectiveDate).format('YYYY-MM-DD'), props.zipCodeSettings.timezone).utc().format();

  submitData.agencyCode = String(values.agencyCode);
  submitData.agentCode = String(values.agentCode);
  submitData.dwellingAmount = Math.round(Number(String(values.coverageLimits.dwelling.amount).replace(/[^\d]/g, '')) / 1000) * 1000;
  submitData.personalPropertyAmount = Math.ceil(((values.coverageLimits.personalProperty.value / 100) * submitData.dwellingAmount));
  submitData.lossOfUse = Math.ceil(((values.coverageLimits.lossOfUse.value / 100) * submitData.dwellingAmount));
  submitData.otherStructuresAmount = Math.ceil(((values.coverageLimits.otherStructures.value / 100) * submitData.dwellingAmount));
  submitData.calculatedHurricane = Math.ceil(((values.deductibles.hurricane.value / 100) * submitData.dwellingAmount));

  submitData.hurricane = Number(values.deductibles.hurricane.value);
  submitData.medicalPayments = Number(values.coverageLimits.medicalPayments.amount);
  submitData.floridaBuildingCodeWindSpeedDesign = Number(values.property.windMitigation.floridaBuildingCodeWindSpeedDesign);
  submitData.floridaBuildingCodeWindSpeed = Number(values.property.windMitigation.floridaBuildingCodeWindSpeed);
  submitData.allOtherPerils = Number(values.deductibles.allOtherPerils.amount);
  submitData.ordinanceOrLaw = Number(values.coverageLimits.ordinanceOrLaw.amount);
  submitData.moldLiability = Number(values.coverageLimits.moldLiability.amount);
  submitData.moldProperty = Number(values.coverageLimits.moldProperty.amount);
  submitData.personalLiability = Number(values.coverageLimits.personalLiability.amount);

  submitData.sinkholePerilCoverage = (String(values.coverageOptions.sinkholePerilCoverage.answer) === 'true');


  submitData.address1 = values.property.physicalAddress.address1;
  submitData.address2 = values.property.physicalAddress.address2;
  submitData.city = values.property.physicalAddress.city;
  submitData.state = values.property.physicalAddress.state;
  submitData.zip = values.property.physicalAddress.zip;

  submitData.buildingCodeEffectivenessGrading = values.property.windMitigation.buildingCodeEffectivenessGrading;
  submitData.internalPressureDesign = values.property.windMitigation.internalPressureDesign;
  submitData.openingProtection = values.property.windMitigation.openingProtection;
  submitData.roofCovering = values.property.windMitigation.roofCovering;
  submitData.roofDeckAttachment = values.property.windMitigation.roofDeckAttachment;
  submitData.roofGeometry = values.property.windMitigation.roofGeometry;
  submitData.roofToWallConnection = values.property.windMitigation.roofToWallConnection;
  submitData.secondaryWaterResistance = values.property.windMitigation.secondaryWaterResistance;
  submitData.terrain = values.property.windMitigation.terrain;
  submitData.windBorneDebrisRegion = values.property.windMitigation.windBorneDebrisRegion;

  submitData.liabilityIncidentalOccupancies = values.coverageOptions.liabilityIncidentalOccupancies.answer;
  submitData.propertyIncidentalOccupanciesMainDwelling = values.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer;
  submitData.propertyIncidentalOccupanciesOtherStructures = values.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer;


  submitData.otherStructures = Number(values.coverageLimits.otherStructures.value);
  submitData.personalProperty = Number(values.coverageLimits.personalProperty.value);
  submitData.personalPropertyReplacementCostCoverage = values.coverageOptions.personalPropertyReplacementCost.answer

  submitData.burglarAlarm = values.property.burglarAlarm;
  submitData.constructionType = values.property.constructionType;
  submitData.distanceToFireHydrant = values.property.distanceToFireHydrant;
  submitData.distanceToFireStation = values.property.distanceToFireStation;
  submitData.distanceToTidalWater = values.property.distanceToTidalWater;
  submitData.familyUnits = values.property.familyUnits;
  submitData.fireAlarm = values.property.fireAlarm;
  submitData.familyUnits = values.property.familyUnits;
  submitData.igdId = values.property.id;
  submitData.protectionClass = values.property.protectionClass;
  submitData.residenceType = values.property.residenceType;
  submitData.sprinkler = values.property.sprinkler;
  submitData.squareFeet = values.property.squareFeet;
  submitData.yearBuilt = values.property.yearBuilt;
  submitData.yearOfRoof = values.property.yearOfRoof;
  submitData.floodZone = values.property.floodZone;
  submitData.buildingCodeEffectivenessGrading = values.property.buildingCodeEffectivenessGrading;
  
  submitData.quoteId = values._id;

  submitData.calculatedSinkhole = (values.deductibles.sinkhole.amount * submitData.dwellingAmount) / 100;

  if (submitData.sinkholePerilCoverage) {
    submitData.sinkhole = 10;
  } else {
    submitData.sinkhole = 0;
  }

  submitData.electronicDelivery =  _.get(values, 'policyHolders[0].electronicDelivery', false)

  submitData.pH1phone = _.get(values, 'policyHolders[0].primaryPhoneNumber', '').replace(/[^\d]/g, '');
  submitData.pH1phone2 = _.get(values, 'policyHolders[0].secondaryPhoneNumber', '').replace(/[^\d]/g, '');    
  submitData.pH1email = _.get(values, 'policyHolders[0].emailAddress', '')
  submitData.pH1FirstName = _.get(values, 'policyHolders[0].firstName', '')
  submitData.pH1LastName = _.get(values, 'policyHolders[0].lastName', '')


  submitData.pH2phone = _.get(values, 'policyHolders[1].primaryPhoneNumber', '').replace(/[^\d]/g, '');
  submitData.pH2phone2 = _.get(values, 'policyHolders[1].secondaryPhoneNumber', '').replace(/[^\d]/g, '');
  submitData.pH2email = _.get(values, 'policyHolders[1].emailAddress', '')
  submitData.pH2FirstName = _.get(values, 'policyHolders[1].firstName', '')
  submitData.pH2LastName = _.get(values, 'policyHolders[1].lastName', '')
  return {
    submitData,
    modelName: 'csrCoverage',
    pageName: 'coverage'
  }
}

export const handleCGSubmit = (values, page, props) => {
  if(page === 'coverage') return handleCoverageSubmit(values, props);

  return null;

}

export default { startWorkflow , handleCGSubmit};
