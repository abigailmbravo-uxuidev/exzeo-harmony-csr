import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment-timezone';
import { Prompt } from 'react-router-dom';
import { reduxForm, propTypes, change, formValueSelector } from 'redux-form';
import { batchActions } from 'redux-batched-actions';
import * as cgActions from '../../../actions/cgActions';
import * as serviceActions from '../../../actions/serviceActions';
import * as appStateActions from '../../../actions/appStateActions';
import * as questionsActions from '../../../actions/questionsActions';
import * as errorActions from '../../../actions/errorActions';
import PolicyConnect from '../../../containers/Policy';
import Footer from '../../Common/Footer';
import Loader from '../../Common/Loader';
import * as policyStateActions from '../../../actions/policyStateActions';
import * as actionTypes from '../../../actions/actionTypes';
import { premiumEndorsementList } from './constants/endorsementTypes';

// Component Sections
import Coverage from './Coverage';
import WindMitigation from './WindMitigation';
import HomeLocation from './HomeLocation';
import PreviousEndorsements from './PreviousEndorsements';
import PolicyHolder from './PolicyHolder';
import MailingAddress from './MailingAddress';
import PropertyAddress from './PropertyAddress';
import ResultsCalculator from './ResultsCalculator';
import GoToMenu from './GoToMenu';
import UnderwritingValidations from './UnderwritingValidations';

export const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

export const getQuestionName = (name, questions) => _.get(_.find(questions, { name }), 'question', '');

export const setCalculate = (props, reset) => {
  if (reset) {
    props.reset('Endorsements');
  }
  props.actions.serviceActions.clearRate();

  const workflowId = props.appState.instanceId;
  if (!props.appState.data.isCalculated) return;

  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, {
    ...props.appState.data,
    isCalculated: false
  });
};

export const getNewPolicyNumber = (state) => {
  const taskData = (state.cg && state.appState && state.cg.endorsePolicyModelSave)
    ? state.cg.endorsePolicyModelSave.data
    : null;
  if (!taskData || !taskData.model || !taskData.model.variables) { return null; }

  const policy = _.find(taskData.model.variables, { name: 'retrievePolicy' })
    ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0]
    : null;
  return policy ? policy.policyNumber : null;
};

export const calculatePercentage = (oldFigure, newFigure) => {
  if (oldFigure === 0 || newFigure === 0) return 0;
  return (oldFigure / newFigure) * 100;
};

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

export const handleInitialize = ({ service = {}, questions = [] }) => {
  const { latestPolicy, getRate } = service;
  const policy = latestPolicy || {};
  const rating = getRate || {};
  const values = {};

  // Bail if we don't have all our info
  if (!latestPolicy && !getRate) { return values; }


  // values.agencyCode = '20000'; // _.get(policy, 'agencyCode');
  // values.agentCode = '60000'; // _.get(policy, 'agentCode');
  // values.effectiveDate = moment.utc(_.get(policy, 'effectiveDate')).format('YYYY-MM-DD');
  values.dwellingMin = _.get(policy, 'coverageLimits.dwelling.minAmount');
  values.dwellingMax = _.get(policy, 'coverageLimits.dwelling.maxAmount');
  // values.liabilityIncidentalOccupancies = false;

  const dwelling = _.get(policy, 'coverageLimits.dwelling.amount');
  const otherStructures = _.get(policy, 'coverageLimits.otherStructures.amount');
  const personalProperty = _.get(policy, 'coverageLimits.personalProperty.amount');
  const hurricane = _.get(policy, 'deductibles.hurricane.amount');

  // Coverage Top Left
  values.clearFields = false;
  values.endorsementDateNew = setEndorsementDate(_.get(policy, 'effectiveDate'), _.get(policy, 'endDate'));
  values.dwellingAmount = dwelling;
  values.dwellingAmountNew = values.dwellingAmount;
  values.otherStructuresAmount = otherStructures;
  values.otherStructuresAmountNew = values.otherStructuresAmount;
  values.otherStructures = calculatePercentage(otherStructures, dwelling);
  values.otherStructuresNew = values.otherStructures;
  values.personalPropertyAmount = personalProperty;
  values.personalPropertyAmountNew = values.personalPropertyAmount;
  values.personalProperty = calculatePercentage(personalProperty, dwelling);
  values.personalPropertyNew = values.personalProperty;
  values.lossOfUse = _.get(policy, 'coverageLimits.lossOfUse.amount');
  values.lossOfUseNew = values.lossOfUse;
  values.personalLiability = _.get(policy, 'coverageLimits.personalLiability.amount');
  values.personalLiabilityNew = values.personalLiability;
  values.medicalPayments = _.get(policy, 'coverageLimits.medicalPayments.amount');
  values.medicalPaymentsNew = values.medicalPayments;
  values.moldProperty = _.get(policy, 'coverageLimits.moldProperty.amount');
  values.moldPropertyNew = values.moldProperty;
  values.moldLiability = _.get(policy, 'coverageLimits.moldLiability.amount');
  values.moldLiabilityNew = values.moldLiability;
  values.allOtherPerils = _.get(policy, 'deductibles.allOtherPerils.amount');
  values.allOtherPerilsNew = values.allOtherPerils;
  values.hurricane = hurricane;
  values.hurricaneNew = hurricane;
  values.calculatedHurricane = _.get(policy, 'deductibles.hurricane.calculatedAmount');
  values.calculatedHurricaneNew = values.calculatedHurricane;
  values.sinkholePerilCoverage = _.get(policy, 'coverageOptions.sinkholePerilCoverage.answer') ? `10% of ${getQuestionName('dwellingAmount', questions)}` : 'Coverage Excluded';
  values.sinkholePerilCoverageNew = _.get(policy, 'coverageOptions.sinkholePerilCoverage.answer');
  // Coverage Top Right
  values.personalPropertyReplacementCostCoverage = _.get(policy, 'coverageOptions.personalPropertyReplacementCost.answer', false);
  values.personalPropertyReplacementCostCoverageNew = values.personalPropertyReplacementCostCoverage;
  values.ordinanceOrLaw = _.get(policy, 'coverageLimits.ordinanceOrLaw.amount');
  values.ordinanceOrLawNew = values.ordinanceOrLaw;
  values.propertyIncidentalOccupanciesMainDwelling = _.get(policy, 'coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer', false);
  values.propertyIncidentalOccupanciesMainDwellingNew = values.propertyIncidentalOccupanciesMainDwelling;
  values.propertyIncidentalOccupanciesOtherStructures = _.get(policy, 'coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer', false);
  values.propertyIncidentalOccupanciesOtherStructuresNew = values.propertyIncidentalOccupanciesOtherStructures;
  values.liabilityIncidentalOccupancies = _.get(policy, 'coverageOptions.liabilityIncidentalOccupancies.answer', false);
  values.liabilityIncidentalOccupanciesNew = values.liabilityIncidentalOccupancies;
  values.townhouseRowhouse = _.get(policy, 'property.townhouseRowhouse');
  values.townhouseRowhouseNew = values.townhouseRowhouse;
  values.windExcluded = _.get(policy, 'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount') === 0 ? 'No' : 'Yes';
  values.windExcludedNew = values.windExcluded;
  values.rented = _.get(policy, 'underwritingAnswers.rented.answer');
  values.rentedNew = values.rented;
  values.monthsOccupied = _.get(policy, 'underwritingAnswers.monthsOccupied.answer');
  values.monthsOccupiedNew = values.monthsOccupied;
  values.noPriorInsurance = _.get(policy, 'underwritingAnswers.noPriorInsuranceSurcharge.answer');
  values.noPriorInsuranceNew = values.noPriorInsurance;
  values.burglarAlarm = _.get(policy, 'property.burglarAlarm');
  values.burglarAlarmNew = values.burglarAlarm;
  values.fireAlarm = _.get(policy, 'property.fireAlarm');
  values.fireAlarmNew = values.fireAlarm;
  values.sprinkler = _.get(policy, 'property.sprinkler');
  values.sprinklerNew = values.sprinkler;
  values.billToType = _.get(policy, 'billToType');
  values.billToTypeNew = values.billToType;
  values.billPlan = _.get(policy, 'billPlan');
  values.billPlanNew = values.billPlan;

  // Coverage Mid Left
  values.roofCovering = _.get(policy, 'property.windMitigation.roofCovering');
  values.roofCoveringNew = values.roofCovering;
  values.roofDeckAttachment = _.get(policy, 'property.windMitigation.roofDeckAttachment');
  values.roofDeckAttachmentNew = values.roofDeckAttachment;
  values.roofToWallConnection = _.get(policy, 'property.windMitigation.roofToWallConnection');
  values.roofToWallConnectionNew = values.roofToWallConnection;
  values.roofGeometry = _.get(policy, 'property.windMitigation.roofGeometry');
  values.roofGeometryNew = values.roofGeometry;
  values.secondaryWaterResistance = _.get(policy, 'property.windMitigation.secondaryWaterResistance');
  values.secondaryWaterResistanceNew = _.get(policy, 'property.windMitigation.secondaryWaterResistance');
  values.openingProtection = _.get(policy, 'property.windMitigation.openingProtection');
  values.openingProtectionNew = values.openingProtection;
  values.electronicDelivery = _.get(policy, 'policyHolders[0].electronicDelivery') ? 'Yes' : 'No';
  values.electronicDeliveryNew = !!_.get(policy, 'policyHolders[0].electronicDelivery');

  // Coverage Mid Right
  values.floridaBuildingCodeWindSpeed = _.get(policy, 'property.windMitigation.floridaBuildingCodeWindSpeed', '');
  values.floridaBuildingCodeWindSpeedNew = values.floridaBuildingCodeWindSpeed;
  values.floridaBuildingCodeWindSpeedDesign = _.get(policy, 'property.windMitigation.floridaBuildingCodeWindSpeedDesign', '');
  values.floridaBuildingCodeWindSpeedDesignNew = values.floridaBuildingCodeWindSpeedDesign;
  values.terrain = _.get(policy, 'property.windMitigation.terrain');
  values.terrainNew = values.terrain;
  values.internalPressureDesign = _.get(policy, 'property.windMitigation.internalPressureDesign');
  values.internalPressureDesignNew = values.internalPressureDesign;
  values.windBorneDebrisRegion = _.get(policy, 'property.windMitigation.windBorneDebrisRegion');
  values.windBorneDebrisRegionNew = values.windBorneDebrisRegion;
  const windMitigationDiscount = _.get(policy, 'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount');
  const updatedRatingWindMitDiscount = _.get(rating, 'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount');
  values.windMitFactor = windMitigationDiscount;
  values.windMitFactorNew = (updatedRatingWindMitDiscount === undefined || updatedRatingWindMitDiscount === null) ? windMitigationDiscount : updatedRatingWindMitDiscount;

  // Home/Location Bottom Left
  values.yearBuilt = _.get(policy, 'property.yearBuilt');
  values.yearBuiltNew = values.yearBuilt;
  values.constructionType = _.get(policy, 'property.constructionType');
  values.constructionTypeNew = values.constructionType;
  values.yearOfRoof = _.get(policy, 'property.yearOfRoof', '');
  values.yearOfRoofNew = values.yearOfRoof;
  values.protectionClass = _.get(policy, 'property.protectionClass', '');
  values.protectionClassNew = values.protectionClass;
  values.buildingCodeEffectivenessGrading = _.get(policy, 'property.buildingCodeEffectivenessGrading', '');
  values.buildingCodeEffectivenessGradingNew = values.buildingCodeEffectivenessGrading;
  values.familyUnits = _.get(policy, 'property.familyUnits');
  values.familyUnitsNew = values.familyUnits;

  // Home/Location Bottom Right
  values.distanceToTidalWater = _.get(policy, 'property.distanceToTidalWater');
  values.distanceToTidalWaterNew = values.distanceToTidalWater;
  values.distanceToFireHydrant = _.get(policy, 'property.distanceToFireHydrant');
  values.distanceToFireHydrantNew = values.distanceToFireHydrant;
  values.distanceToFireStation = _.get(policy, 'property.distanceToFireStation');
  values.distanceToFireStationNew = values.distanceToFireStation;
  values.residenceType = _.get(policy, 'property.residenceType');
  values.residenceTypeNew = values.residenceType;
  values.squareFeet = _.get(policy, 'property.squareFeet', '');
  values.squareFeetNew = values.squareFeet;
  values.floodZone = _.get(policy, 'property.floodZone');
  values.floodZoneNew = values.floodZone;

  // Policyholder 1
  values.pH1email = _.get(policy, 'policyHolders[0].emailAddress');
  values.pH1FirstName = _.get(policy, 'policyHolders[0].firstName');
  values.pH1LastName = _.get(policy, 'policyHolders[0].lastName');
  values.pH1phone = _.get(policy, 'policyHolders[0].primaryPhoneNumber', '');
  values.pH1secondaryPhone = _.get(policy, 'policyHolders[0].secondaryPhoneNumber', '');

  // Policyholder 2
  values.pH2email = _.get(policy, 'policyHolders[1].emailAddress', '');
  values.pH2FirstName = _.get(policy, 'policyHolders[1].firstName', '');
  values.pH2LastName = _.get(policy, 'policyHolders[1].lastName', '');
  values.pH2phone = _.get(policy, 'policyHolders[1].primaryPhoneNumber', '');
  values.pH2secondaryPhone = _.get(policy, 'policyHolders[1].secondaryPhoneNumber', '');

  // Mailing/Billing
  values.address1 = _.get(policy, 'policyHolderMailingAddress.address1');
  values.address1New = values.address1;
  values.address2 = _.get(policy, 'policyHolderMailingAddress.address2');
  values.address2New = values.address2;
  values.city = _.get(policy, 'policyHolderMailingAddress.city');
  values.cityNew = values.city;
  values.state = _.get(policy, 'policyHolderMailingAddress.state');
  values.stateNew = values.state;
  values.zip = _.get(policy, 'policyHolderMailingAddress.zip');
  values.zipNew = values.zip;

  // Property
  values.propertyAddress1 = _.get(policy, 'property.physicalAddress.address1');
  values.propertyAddress1New = values.propertyAddress1;
  values.propertyAddress2 = _.get(policy, 'property.physicalAddress.address2');
  values.propertyAddress2New = values.propertyAddress2;
  values.propertyCity = _.get(policy, 'property.physicalAddress.city');
  values.propertyCityNew = values.propertyCity;
  values.propertyState = _.get(policy, 'property.physicalAddress.state');
  values.propertyStateNew = values.propertyState;
  values.propertyZip = _.get(policy, 'property.physicalAddress.zip');
  values.propertyZipNew = values.propertyZip;

  values.uwExceptions = _.get(policy, 'underwritingExceptions');

  return values;
};

export const setPercentageOfValue = (value, percent) => Math.ceil(value * (percent / 100));

export const generateModel = (data, policyObject, props) => {
  const policy = policyObject;
  const endorseDate = moment.tz(moment.utc(data.endorsementDateNew).format('YYYY-MM-DD'), props.zipcodeSettings.timezone).utc().format();
  const sinkholeAmount = _.get(policy, 'deductibles.sinkhole.amount') || 10;

  policy.transactionType = 'Endorsement';
  return {
    ...policy,
    policyID: policy._id,
    formListTransactionType: 'Endorsement',
    endorsementAmountNew: data.newEndorsementAmount || 0,
    endorsementDate: endorseDate,
    country: policy.policyHolderMailingAddress.country,
    pH1Id: _.get(policy, 'policyHolders[0]._id', ''),
    pH2Id: _.get(policy, 'policyHolders[1]._id', ''),
    pH1FirstName: data.pH1FirstName,
    pH1LastName: data.pH1LastName,
    pH1email: data.pH1email,
    pH1phone: data.pH1phone,
    pH1secondaryPhone: data.pH1secondaryPhone,
    pH2FirstName: data.pH2FirstName,
    pH2LastName: data.pH2LastName,
    pH2email: data.pH2email,
    pH2phone: data.pH2phone,
    pH2secondaryPhone: data.pH2secondaryPhone,
    floodZoneNew: data.floodZoneNew,
    squareFeetNew: data.squareFeetNew,
    residenceTypeNew: data.residenceTypeNew,
    distanceToTidalWaterNew: data.distanceToTidalWaterNew,
    propertyCityNew: data.propertyCityNew,
    propertyZipNew: data.propertyZipNew,
    propertyStateNew: data.propertyStateNew,
    propertyAddress1New: data.propertyAddress1New,
    propertyAddress2New: data.propertyAddress2New,
    protectionClassNew: data.protectionClassNew,
    stateNew: data.stateNew,
    cityNew: data.cityNew,
    zipNew: data.zipNew,
    address2New: data.address2New,
    address1New: data.address1New,
    roofGeometryNew: data.roofGeometryNew,
    floridaBuildingCodeWindSpeedNew: data.floridaBuildingCodeWindSpeedNew,
    secondaryWaterResistanceNew: data.secondaryWaterResistanceNew,
    internalPressureDesignNew: data.internalPressureDesignNew,
    roofCoveringNew: data.roofCoveringNew,
    openingProtectionNew: data.openingProtectionNew,
    terrainNew: data.terrainNew,
    floridaBuildingCodeWindSpeedDesignNew: data.floridaBuildingCodeWindSpeedDesignNew,
    roofDeckAttachmentNew: data.roofDeckAttachmentNew,
    windBorneDebrisRegionNew: data.windBorneDebrisRegionNew,
    roofToWallConnectionNew: data.roofToWallConnectionNew,
    electronicDeliveryNew: data.electronicDeliveryNew,
    distanceToFireStationNew: data.distanceToFireStationNew || 0,
    distanceToFireHydrantNew: data.distanceToFireHydrantNew || 0,
    yearOfRoofNew: data.yearOfRoofNew || null,
    fireAlarmNew: data.fireAlarmNew,
    burglarAlarmNew: data.burglarAlarmNew,
    buildingCodeEffectivenessGradingNew: data.buildingCodeEffectivenessGradingNew || null,
    yearBuiltNew: data.yearBuiltNew || null,
    townhouseRowhouseNew: data.townhouseRowhouseNew,
    familyUnitsNew: data.familyUnitsNew,
    constructionTypeNew: data.constructionTypeNew,
    sprinklerNew: data.sprinklerNew,
    // Premium Coverage Limits
    dwellingAmountNew: Math.round(data.dwellingAmountNew / 1000) * 1000,
    otherStructuresAmountNew: data.otherStructuresAmountNew,
    personalPropertyAmountNew: data.personalPropertyAmountNew,
    personalLiabilityNew: data.personalLiabilityNew,
    medicalPaymentsNew: data.medicalPaymentsNew,
    lossOfUseNew: data.lossOfUseNew,
    moldPropertyNew: data.moldPropertyNew,
    moldLiabilityNew: data.moldLiabilityNew,
    ordinanceOrLawNew: data.ordinanceOrLawNew,
    // Premium Coverage Options
    sinkholePerilCoverageNew: data.sinkholePerilCoverageNew,
    propertyIncidentalOccupanciesMainDwellingNew: data.propertyIncidentalOccupanciesMainDwellingNew,
    propertyIncidentalOccupanciesOtherStructuresNew: data.propertyIncidentalOccupanciesOtherStructuresNew,
    liabilityIncidentalOccupanciesNew: data.liabilityIncidentalOccupanciesNew,
    personalPropertyReplacementCostCoverageNew: data.personalPropertyReplacementCostCoverageNew,
    // Premium Deductibles
    allOtherPerilsNew: data.allOtherPerilsNew,
    hurricaneNew: data.hurricaneNew,
    calculatedHurricaneNew: data.calculatedHurricaneNew,
    sinkholeNew: data.sinkholePerilCoverageNew === 'true' ? sinkholeAmount : 0,
    // underwriting answers
    noPriorInsuranceNew: data.noPriorInsuranceNew,
    monthsOccupiedNew: data.monthsOccupiedNew,
    rentedNew: data.rentedNew
  };
};

export const covertToRateData = (changePolicyData, props) => {
  const data = {
    effectiveDate: changePolicyData.effectiveDate,
    policyNumber: changePolicyData.policyNumber,
    companyCode: changePolicyData.companyCode,
    state: changePolicyData.state,
    product: changePolicyData.product,
    property: {
      windMitigation: {
        roofGeometry: changePolicyData.roofGeometryNew,
        floridaBuildingCodeWindSpeed: changePolicyData.floridaBuildingCodeWindSpeedNew,
        secondaryWaterResistance: changePolicyData.secondaryWaterResistanceNew,
        internalPressureDesign: changePolicyData.internalPressureDesignNew,
        roofCovering: changePolicyData.roofCoveringNew,
        openingProtection: changePolicyData.openingProtectionNew,
        terrain: changePolicyData.terrainNew,
        floridaBuildingCodeWindSpeedDesign: changePolicyData.floridaBuildingCodeWindSpeedDesignNew,
        roofDeckAttachment: changePolicyData.roofDeckAttachmentNew,
        windBorneDebrisRegion: changePolicyData.windBorneDebrisRegionNew,
        roofToWallConnection: changePolicyData.roofToWallConnectionNew
      },
      territory: changePolicyData.property.territory,
      buildingCodeEffectivenessGrading: changePolicyData.buildingCodeEffectivenessGradingNew,
      familyUnits: changePolicyData.familyUnitsNew,
      fireAlarm: changePolicyData.fireAlarmNew,
      burglarAlarm: changePolicyData.burglarAlarmNew,
      constructionType: changePolicyData.constructionTypeNew,
      yearBuilt: changePolicyData.yearBuiltNew || null,
      sprinkler: changePolicyData.sprinklerNew,
      protectionClass: changePolicyData.protectionClassNew,
      townhouseRowhouse: changePolicyData.townhouseRowhouseNew
    },
    coverageLimits: {
      dwelling: {
        amount: changePolicyData.dwellingAmountNew
      },
      otherStructures: {
        amount: changePolicyData.otherStructuresAmountNew
      },
      personalProperty: {
        amount: changePolicyData.personalPropertyAmountNew
      },
      personalLiability: {
        amount: changePolicyData.personalLiabilityNew
      },
      medicalPayments: {
        amount: changePolicyData.medicalPaymentsNew
      },
      lossOfUse: {
        amount: changePolicyData.lossOfUseNew
      },
      moldProperty: {
        amount: changePolicyData.moldPropertyNew
      },
      moldLiability: {
        amount: changePolicyData.moldLiabilityNew
      },
      ordinanceOrLaw: {
        amount: changePolicyData.ordinanceOrLawNew
      }
    },
    coverageOptions: {
      sinkholePerilCoverage: {
        answer: changePolicyData.sinkholePerilCoverageNew
      },
      propertyIncidentalOccupanciesMainDwelling: {
        answer: changePolicyData.propertyIncidentalOccupanciesMainDwellingNew
      },
      propertyIncidentalOccupanciesOtherStructures: {
        answer: changePolicyData.propertyIncidentalOccupanciesOtherStructuresNew
      },
      liabilityIncidentalOccupancies: {
        answer: changePolicyData.liabilityIncidentalOccupanciesNew
      },
      personalPropertyReplacementCost: {
        answer: changePolicyData.personalPropertyReplacementCostCoverageNew
      }
    },
    deductibles: {
      allOtherPerils: {
        amount: changePolicyData.allOtherPerilsNew
      },
      hurricane: {
        amount: changePolicyData.hurricaneNew,
        calculatedAmount: setPercentageOfValue(changePolicyData.dwellingAmountNew, changePolicyData.hurricaneNew)
      },
      sinkhole: {
        amount: changePolicyData.sinkholeNew,
        calculatedAmount: setPercentageOfValue(changePolicyData.dwellingAmountNew, changePolicyData.sinkholeNew)
      }
    },
    underwritingAnswers: {
      rented: {
        answer: changePolicyData.rentedNew
      },
      monthsOccupied: {
        answer: changePolicyData.monthsOccupiedNew
      },
      noPriorInsuranceSurcharge: {
        answer: changePolicyData.noPriorInsuranceNew
      }
    },
    oldTotalPremium: changePolicyData.rating.totalPremium,
    oldCurrentPremium: props.summaryLedger.currentPremium,
    endorsementDate: changePolicyData.endorsementDate
  };

  return data;
};

export const calculate = (data, dispatch, props) => {
  const submitData = generateModel(data, props.policy, props);
  const workflowId = props.appState.instanceId;

  const delta = Object.keys(data).reduce((changed, key) => {
    if (data[key] !== props.initialValues[key]) changed.push(key);
    return changed;
  }, []);
  if (delta.length === 1 && delta.includes('endorsementDateNew')) {
    setCalculate(props, true);
    props.dispatch(errorActions.setAppError({ message: 'No changes were made.' }));
    return;
  }

  const setLiabilityIncidentalOccupanciesNew = submitData.propertyIncidentalOccupanciesMainDwellingNew || submitData.propertyIncidentalOccupanciesOtherStructuresNew;
  submitData.liabilityIncidentalOccupanciesNew = setLiabilityIncidentalOccupanciesNew;
  props.dispatch(change('Endorsements', 'liabilityIncidentalOccupanciesNew', setLiabilityIncidentalOccupanciesNew));

  const rateData = covertToRateData(submitData, props);

  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, isSubmitting: true, isCalculated: false });

  props.actions.serviceActions.getRate(rateData).then((result) => {
    if (result.payload && result.payload[0] && result.payload[0].type === actionTypes.APP_ERROR) {
      props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, isSubmitting: false, isCalculated: false });
    } else props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, isSubmitting: false, isCalculated: true });
  });
};

export const save = (data, dispatch, props) => {
  const workflowId = props.appState.instanceId;
  const submitData = generateModel(data, props.policy, props);
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, isSubmitting: true });

  submitData.rating = props.getRate.rating;
  submitData.summaryLedger = props.summaryLedger;

  props.actions.cgActions.startWorkflow('endorsePolicyModelSave', { policyNumber: props.policy.policyNumber, policyID: props.policy.policyID }).then((result) => {
    const steps = [{
      name: 'saveEndorsement',
      data: submitData
    }];
    const startResult = result.payload ? result.payload[0].workflowData.endorsePolicyModelSave.data : {};

    props.actions.appStateActions.setAppState(startResult.modelName, startResult.modelInstanceId, { ...props.appState.data, isSubmitting: true });

    props.actions.cgActions.batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps).then(() => {
      props.actions.appStateActions.setAppState(startResult.modelName, startResult.modelInstanceId, { ...props.appState.data, isSubmitting: false, isCalculated: false });
    });
  });
};

const premiumAmountFormatter = cell => Number(cell).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export class Endorsements extends React.Component {
  componentDidMount() {
    this.props.actions.questionsActions.getUIQuestions('askToCustomizeDefaultQuoteCSR');
    if (this.props.appState && this.props.appState.instanceId) {
      const workflowId = this.props.appState.instanceId;
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, workflowId, { ...this.props.appState.data, isCalculated: false, isSubmitting: false });
    }
    if (this.props && this.props.policy && this.props.policy.policyNumber && this.props.policy.property && this.props.policy.property.physicalAddress) {
      this.props.actions.serviceActions.getUnderwritingQuestions(this.props.policy.companyCode, this.props.policy.state, this.props.policy.product, this.props.policy.property);
      this.props.actions.serviceActions.getEndorsementHistory(this.props.policy.policyNumber);
      this.props.actions.serviceActions.getZipcodeSettings(this.props.policy.companyCode, this.props.policy.state, this.props.policy.product, this.props.policy.property.physicalAddress.zip);
    }
  }

  componentWillReceiveProps(nextProps) {
    // TODO: figure out setCalculate

    if (!_.isEqual(this.props.getRate, nextProps.getRate) && nextProps.getRate && nextProps.getRate.newAnnualPremium) {
      const { getRate } = nextProps;

      nextProps.dispatch(batchActions([
        change('Endorsements', 'newEndorsementAmount', getRate.endorsementAmount || 0),
        change('Endorsements', 'newEndorsementPremium', getRate.newCurrentPremium || ''),
        change('Endorsements', 'newAnnualPremium', getRate.newAnnualPremium || ''),
        change('Endorsements', 'windMitFactorNew', _.get(getRate, 'worksheet.elements.windMitigationFactors.windMitigationDiscount'))
      ]));
    }
    if (nextProps && nextProps.policy && nextProps.policy.policyNumber && !_.isEqual(this.props.policy, nextProps.policy)) {
      this.props.actions.serviceActions.getEndorsementHistory(nextProps.policy.policyNumber);
      setCalculate(nextProps, true);
    }
    if (!_.isEqual(this.props.newPolicyNumber, nextProps.newPolicyNumber)) {
      this.props.actions.policyStateActions.updatePolicy(true, nextProps.newPolicyNumber);
      const endorsementDateNew = setEndorsementDate(_.get(nextProps.policy, 'effectiveDate'), _.get(nextProps.policy, 'endDate'));

      nextProps.dispatch(batchActions([
        change('Endorsements', 'endorsementDateNew', endorsementDateNew),
        change('Endorsements', 'newEndorsementAmount', ''),
        change('Endorsements', 'newEndorsementPremium', ''),
        change('Endorsements', 'newAnnualPremium', '')
      ]));
    }
    if (this.props.tasks && this.props.tasks.endorsePolicyModelSave && this.props.tasks.endorsePolicyModelSave.data &&
      nextProps.tasks && nextProps.tasks.endorsePolicyModelSave && nextProps.tasks.endorsePolicyModelSave.data &&
      !_.isEqual(this.props.tasks.endorsePolicyModelSave.data, nextProps.tasks.endorsePolicyModelSave.data)) {
      if (nextProps.tasks.endorsePolicyModelSave.data.result && nextProps.tasks.endorsePolicyModelSave.data.result.status !== 200) {
        nextProps.dispatch(errorActions.setAppError({ message: nextProps.tasks.endorsePolicyModelSave.data.result.result }));
        setCalculate(nextProps);
      }
    }
    if (_.isEqual(this.props.fieldValues.propertyIncidentalOccupanciesMainDwellingNew, nextProps.fieldValues.propertyIncidentalOccupanciesMainDwellingNew) ||
    _.isEqual(this.props.fieldValues.propertyIncidentalOccupanciesOtherStructuresNew, nextProps.fieldValues.propertyIncidentalOccupanciesOtherStructuresNew)) {
      const setLiabilityIncidentalOccupanciesNew = nextProps.fieldValues.propertyIncidentalOccupanciesMainDwellingNew || nextProps.fieldValues.propertyIncidentalOccupanciesOtherStructuresNew;
      nextProps.dispatch(change('Endorsements', 'liabilityIncidentalOccupanciesNew', setLiabilityIncidentalOccupanciesNew));
    }
  }

  setPercentageOfValue = (value, percent) => Math.ceil(value * (percent / 100));

  setPHToggle = () => {
    const { change: changeF, selectedValues } = this.props;
    if (selectedValues.clearFields) {
      changeF('clearFields', false);
    }
  };

  clearSecondaryPolicyholder = (value) => {
    const { change: changeF, initialValues } = this.props;
    if (!value) {
        changeF('pH2email', initialValues.pH2email);
        changeF('pH2FirstName', initialValues.pH2FirstName);
        changeF('pH2LastName', initialValues.pH2LastName);
        changeF('pH2phone', initialValues.pH2phone);
        changeF('pH2secondaryPhone', initialValues.pH2secondaryPhone);
    } else {
        changeF('pH2email', '');
        changeF('pH2FirstName', '');
        changeF('pH2LastName', '');
        changeF('pH2phone', '');
        changeF('pH2secondaryPhone', '');
    }
    return value;
  };

  setCalculate = (reset = false) => {
    const { actions: { serviceActions, appStateActions }, appState } = this.props;
    if (reset) {
      this.props.reset();
    }
    serviceActions.clearRate();

    if (!appState.data.isCalculated) return;

    const workflowId = appState.instanceId;
    appStateActions.setAppState(appState.modelName, workflowId, {
      ...appState.data,
      isCalculated: false
    });
  };

  updateDwellingAndDependencies = (value, prevValue, fieldValues) => {
    const { change: changeF } = this.props;
    this.setCalculate();

    const roundedDwellingAmount = Math.round(value / 1000) * 1000;

    if (fieldValues.otherStructuresNew !== 'other') {
      changeF('otherStructuresAmountNew', this.setPercentageOfValue(roundedDwellingAmount, fieldValues.otherStructuresNew));
    }
    if (fieldValues.personalPropertyNew !== 'other') {
      changeF('personalPropertyAmountNew', this.setPercentageOfValue(roundedDwellingAmount, fieldValues.personalPropertyNew));
    }
    changeF('calculatedHurricaneNew', this.setPercentageOfValue(roundedDwellingAmount, fieldValues.hurricaneNew));
    changeF('lossOfUseNew', this.setPercentageOfValue(roundedDwellingAmount, 10));

    return value;
  };

  normalizePersonalPropertyDependencies = (value, allValues, field, dependency) => {
    if (Number.isNaN(value)) return;
    this.setCalculate();
    const { change: changeF, policy } = this.props;

    if (value === 0) {
      changeF('personalPropertyReplacementCostCoverageNew', false);
    } else {
      changeF('personalPropertyReplacementCostCoverageNew', _.get(policy, 'coverageOptions.personalPropertyReplacementCost.answer') || false);
    }

    const fieldValue = setPercentageOfValue(allValues[dependency], value);
    changeF(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  normalizeDependencies = (value, allValues, field, dependency) => {
    if (Number.isNaN(value)) return;
    this.setCalculate();
    const { change: changeF } = this.props;
    const fieldValue = setPercentageOfValue((allValues[dependency]), value);

    changeF(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  render() {
    const {
      appState,
      dirty,
      endorsementHistory,
      handleSubmit,
      initialValues,
      selectedFields = {},
      pristine,
      policy,
      questions,
      underwritingQuestions,
      userProfile
    } = this.props;

    const mappedEndorsementHistory = _.map(endorsementHistory, (endorsement) => {
      endorsement.netChargeFormat = _.includes(premiumEndorsementList, endorsement.transactionType) ? premiumAmountFormatter(endorsement.netCharge) : '';
      return endorsement;
    });

    const canPremiumEndorse = userProfile && userProfile.resources
      ? userProfile.resources.some(resource => resource.uri === 'TTIC:FL:HO3:PolicyData:PremiumEndorse' && resource.right === 'UPDATE')
      : false;

    if (!canPremiumEndorse) {
      return (
        <PolicyConnect>
          <div className="messages" >
            <div className="message error">
              <i className="fa fa-exclamation-circle" aria-hidden="true" />&nbsp;Endorsement page cannot be accessed due to User Permissions.
            </div>
          </div>
        </PolicyConnect>);
    }

    return (
      <PolicyConnect>
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />
        {this.props.appState.data.isSubmitting && <Loader />}

        {initialValues.endorsementDateNew ?
          <form
            id="Endorsements"
            className="content-wrapper"
            onSubmit={appState.data.isCalculated ? handleSubmit(save) : handleSubmit(calculate)}
            onKeyPress={(e) => (e.key === 'Enter' && e.target.type !== 'submit') && e.preventDefault()}
          >

            <div className="route-content">
              <div className="endorsements">
                <GoToMenu/>
                <div className="scroll">
                  <div className="form-group survey-wrapper" role="group">
                    <Coverage
                      initialValues={initialValues}
                      personalPropertyNewVal={selectedFields.personalPropertyNew}
                      questions={questions}
                      underwritingQuestions={underwritingQuestions}
                      normalizeDwellingAmount={this.updateDwellingAndDependencies}
                      normalizeDependencies={this.normalizeDependencies}
                      normalizePersonalPropertyDependencies={this.normalizePersonalPropertyDependencies}
                    />
                    <WindMitigation questions={questions}/>
                    <HomeLocation questions={questions}/>
                    <PreviousEndorsements mappedEndorsementHistory={mappedEndorsementHistory}/>
                    <PolicyHolder
                      clearSecondaryPolicyholder={this.clearSecondaryPolicyholder}
                      setPHToggle={this.setPHToggle}
                      policyHolders={policy.policyHolders}
                    />
                    <MailingAddress/>
                    <PropertyAddress/>
                  </div>
                </div>
                <ResultsCalculator
                  min={policy.effectiveDate}
                  max={policy.endDate}
                  setCalculate={this.setCalculate}>
                  {/* <Link className="btn btn-secondary" to={'/policy/coverage'} >Cancel</Link> */}
                  <button id="cancel-button" tabIndex="0" type="button" className="btn btn-secondary"
                          onKeyPress={(event) => {
                            if (event.charCode === 13) {
                              this.setCalculate();
                            }
                          }} onClick={() => this.setCalculate()}>Cancel
                  </button>
                  <button type="submit" tabIndex="0" className="btn btn-primary"
                          disabled={(!appState.data.isCalculated && pristine) || appState.data.isSubmitting}>{appState.data.isCalculated ? 'Save' : 'Review'}</button>
                </ResultsCalculator>

              </div>

              <UnderwritingValidations/>

            </div>
          </form>
          :
          <Loader />
        }

        <div className="basic-footer">
          <Footer />
        </div>
      </PolicyConnect>
    );
  }
}


/**
------------------------------------------------
Property type definitions
------------------------------------------------
*/
Endorsements.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape().isRequired,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ isSubmitting: PropTypes.bool })
  }).isRequired
};

/**
------------------------------------------------
redux mapping
------------------------------------------------
*/
const selector = formValueSelector('Endorsements');
const mapStateToProps = state => ({
  tasks: state.cg,
  endorsementHistory: state.service.endorsementHistory || [],
  appState: state.appState,
  fieldValues: _.get(state.form, 'Endorsements.values', {}),
  initialValues: handleInitialize(state),
  policy: state.service.latestPolicy || {},
  questions: state.questions,
  underwritingQuestions: state.service.underwritingQuestions,
  getRate: state.service.getRate,
  newPolicyNumber: getNewPolicyNumber(state),
  summaryLedger: state.service.getSummaryLedger || {},
  zipcodeSettings: state.service.getZipcodeSettings,
  userProfile: state.authState.userProfile || {},
  selectedValues: selector(state, 'personalPropertyNew', 'clearFields')
});

const mapDispatchToProps = dispatch => ({
  actions: {
    errorActions: bindActionCreators(errorActions, dispatch),
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    questionsActions: bindActionCreators(questionsActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Endorsements', enableReinitialize: true, keepDirtyOnReinitialize: true })(Endorsements));
