import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import localStorage from 'localStorage';
import moment from 'moment';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as questionsActions from '../../actions/questionsActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import TextField from '../Form/inputs/TextField';
import PhoneField from '../Form/inputs/PhoneField';
import HiddenField from '../Form/inputs/HiddenField';
import SelectField from '../Form/inputs/SelectField';
import RadioField from '../Form/inputs/RadioField';
import CurrencyField from '../Form/inputs/CurrencyField';
import normalizePhone from '../Form/normalizePhone';
import normalizeNumbers from '../Form/normalizeNumbers';
import DateField from '../Form/inputs/DateField';

export const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName])
    ? state.cg[state.appState.modelName].data
    : null;
  if (!taskData) { return {}; }
  const quoteEnd = _.find(taskData.model.variables, { name: 'retrieveQuote' })
    ? _.find(taskData.model.variables, { name: 'retrieveQuote' }).value.result
    : {};
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' })
    ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result
    : quoteEnd;
  return quoteData;
};

const handleGetZipCodeSettings = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return null;

  const zipCodeSettings = _.find(taskData.model.variables, { name: 'getZipCodeSettings' }) ?
  _.find(taskData.model.variables, { name: 'getZipCodeSettings' }).value.result[0] : null;

  const zipCodeSettingsQuote = _.find(taskData.model.variables, { name: 'getZipCodeSettingsForQuote' }) ?
  _.find(taskData.model.variables, { name: 'getZipCodeSettingsForQuote' }).value.result[0] : null;

  return zipCodeSettingsQuote || zipCodeSettings;
};

function calculatePercentage(oldFigure, newFigure) {
  let percentChange = 0;
  if ((oldFigure !== 0) && (newFigure !== 0)) {
    percentChange = (oldFigure / newFigure) * 100;
  }

  return percentChange;
}

const setPercentageOfValue = (value, percent) => Math.ceil(value * (percent / 100));

const handleInitialize = (state) => {
  const quoteData = handleGetQuoteData(state);

  const values = {};

  values.agencyCode = String(_.get(quoteData, 'agencyCode'));
  values.agentCode = String(_.get(quoteData, 'agentCode'));
  values.effectiveDate = moment.utc(_.get(quoteData, 'effectiveDate')).format('YYYY-MM-DD');

  values.pH1email = _.get(quoteData, 'policyHolders[0].emailAddress');
  values.pH1FirstName = _.get(quoteData, 'policyHolders[0].firstName');
  values.pH1LastName = _.get(quoteData, 'policyHolders[0].lastName');
  values.pH1phone = normalizePhone(_.get(quoteData, 'policyHolders[0].primaryPhoneNumber') || '');
  values.pH1secondaryPhone = normalizePhone(_.get(quoteData, 'policyHolders[0].secondaryPhoneNumber') || '');

  values.pH2email = _.get(quoteData, 'policyHolders[1].emailAddress');
  values.pH2FirstName = _.get(quoteData, 'policyHolders[1].firstName');
  values.pH2LastName = _.get(quoteData, 'policyHolders[1].lastName');
  values.pH2phone = normalizePhone(_.get(quoteData, 'policyHolders[1].primaryPhoneNumber') || '');
  values.pH2secondaryPhone = normalizePhone(_.get(quoteData, 'policyHolders[1].secondaryPhoneNumber') || '');

  values.address1 = _.get(quoteData, 'property.physicalAddress.address1');
  values.address2 = _.get(quoteData, 'property.physicalAddress.address2');
  values.city = _.get(quoteData, 'property.physicalAddress.city');
  values.state = _.get(quoteData, 'property.physicalAddress.state');
  values.zip = _.get(quoteData, 'property.physicalAddress.zip');
  values.protectionClass = _.get(quoteData, 'property.protectionClass');
  values.constructionType = _.get(quoteData, 'property.constructionType');
  values.yearOfRoof = _.get(quoteData, 'property.yearOfRoof');
  values.squareFeet = normalizeNumbers(_.get(quoteData, 'property.squareFeet'));
  values.yearBuilt = _.get(quoteData, 'property.yearBuilt');
  values.buildingCodeEffectivenessGrading = _.get(quoteData, 'property.buildingCodeEffectivenessGrading');
  values.familyUnits = _.get(quoteData, 'property.familyUnits');
  values.distanceToTidalWater = normalizeNumbers(_.get(quoteData, 'property.distanceToTidalWater'));
  values.distanceToFireHydrant = normalizeNumbers(_.get(quoteData, 'property.distanceToFireHydrant'));
  values.distanceToFireStation = normalizeNumbers(_.get(quoteData, 'property.distanceToFireStation'));
  values.floodZone = _.get(quoteData, 'property.floodZone');

  values.burglarAlarm = _.get(quoteData, 'property.burglarAlarm');
  values.fireAlarm = _.get(quoteData, 'property.fireAlarm');
  values.sprinkler = _.get(quoteData, 'property.sprinkler');

  values.dwellingAmount = Math.round(_.get(quoteData, 'coverageLimits.dwelling.amount') / 1000) * 1000;
  values.dwellingMin = _.get(quoteData, 'coverageLimits.dwelling.minAmount');
  values.dwellingMax = _.get(quoteData, 'coverageLimits.dwelling.maxAmount');

  values.lossOfUse = _.get(quoteData, 'coverageLimits.lossOfUse.amount');
  values.medicalPayments = _.get(quoteData, 'coverageLimits.medicalPayments.amount');
  values.moldLiability = _.get(quoteData, 'coverageLimits.moldLiability.amount');
  values.moldProperty = _.get(quoteData, 'coverageLimits.moldProperty.amount');
  values.ordinanceOrLaw = _.get(quoteData, 'coverageLimits.ordinanceOrLaw.amount');

  const otherStructures = _.get(quoteData, 'coverageLimits.otherStructures.amount');
  const dwelling = _.get(quoteData, 'coverageLimits.dwelling.amount');
  const personalProperty = _.get(quoteData, 'coverageLimits.personalProperty.amount');
  const hurricane = _.get(quoteData, 'deductibles.hurricane.amount');

  values.otherStructuresAmount = otherStructures;
  values.otherStructures = String(calculatePercentage(otherStructures, dwelling));
  values.personalLiability = _.get(quoteData, 'coverageLimits.personalLiability.amount');
  values.personalPropertyAmount = String(personalProperty);
  values.personalProperty = String(calculatePercentage(personalProperty, dwelling));
  values.personalPropertyReplacementCostCoverage = _.get(quoteData, 'coverageOptions.personalPropertyReplacementCost.answer');

  values.sinkholePerilCoverage = _.get(quoteData, 'coverageOptions.sinkholePerilCoverage.answer');

  values.allOtherPerils = _.get(quoteData, 'deductibles.allOtherPerils.amount');
  values.hurricane = hurricane;

  values.calculatedHurricane = _.get(quoteData, 'deductibles.hurricane.calculatedAmount');
  values.calculatedSinkhole = _.get(quoteData, 'deductibles.sinkhole.calculatedAmount');

  values.floridaBuildingCodeWindSpeed = _.get(quoteData, 'property.windMitigation.floridaBuildingCodeWindSpeed');
  values.floridaBuildingCodeWindSpeedDesign = _.get(quoteData, 'property.windMitigation.floridaBuildingCodeWindSpeedDesign');
  values.internalPressureDesign = _.get(quoteData, 'property.windMitigation.internalPressureDesign');
  values.openingProtection = _.get(quoteData, 'property.windMitigation.openingProtection');
  values.roofCovering = _.get(quoteData, 'property.windMitigation.roofCovering');
  values.roofDeckAttachment = _.get(quoteData, 'property.windMitigation.roofDeckAttachment');
  values.roofGeometry = _.get(quoteData, 'property.windMitigation.roofGeometry');
  values.roofToWallConnection = _.get(quoteData, 'property.windMitigation.roofToWallConnection');
  values.secondaryWaterResistance = _.get(quoteData, 'property.windMitigation.secondaryWaterResistance');
  values.terrain = _.get(quoteData, 'property.windMitigation.terrain');
  values.windBorneDebrisRegion = _.get(quoteData, 'property.windMitigation.windBorneDebrisRegion');
  values.residenceType = _.get(quoteData, 'property.residenceType');

  values.propertyIncidentalOccupanciesMainDwelling = false;
  values.propertyIncidentalOccupanciesOtherStructures = false;
  values.liabilityIncidentalOccupancies = false;

  return values;
};

const checkQuoteState = quoteData => _.some(['Policy Issued', 'Documents Received'], state => state === quoteData.quoteState);
const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

const getQuestionName = (name, questions) => _.get(_.find(questions, { name }), 'question') || '';

export const handleAgencyChange = (props, agencyCode, isInit) => {
  if (!isInit) {
    props.dispatch(change('Coverage', 'agencyCode', agencyCode));
    props.dispatch(change('Coverage', 'agentCode', ''));
  }

  if (agencyCode) {
    const agency = _.find(props.agencies, a => String(a.agencyCode) === String(agencyCode));
    if (agency) {
      props.actions.serviceActions.getAgentsByAgency(agency.companyCode, agency.state, agencyCode).then((response) => {
        if (response.payload && response.payload[0].data.agents && response.payload[0].data.agents.length === 1) {
          props.dispatch(change('Coverage', 'agentCode', response.payload[0].data.agents[0].agentCode));
        }
      });
    }
  }
};

export const clearForm = (props) => {
  const { dispatch, quoteData } = props;

  dispatch(change('Coverage', 'agencyCode', _.get(quoteData, 'agencyCode')));
  dispatch(change('Coverage', 'agentCode', _.get(quoteData, 'agentCode')));


  dispatch(change('Coverage', 'effectiveDate', moment.utc(_.get(quoteData, 'effectiveDate')).format('YYYY-MM-DD')));

  dispatch(change('Coverage', 'pH1email', _.get(quoteData, 'policyHolders[0].emailAddress')));
  dispatch(change('Coverage', 'pH1FirstName', _.get(quoteData, 'policyHolders[0].firstName')));
  dispatch(change('Coverage', 'pH1LastName', _.get(quoteData, 'policyHolders[0].lastName')));
  dispatch(change('Coverage', 'pH1phone', normalizePhone(_.get(quoteData, 'policyHolders[0].primaryPhoneNumber'))));
  dispatch(change('Coverage', 'pH1secondaryPhone', normalizePhone(_.get(quoteData, 'policyHolders[0].secondaryPhoneNumber'))));

  dispatch(change('Coverage', 'pH2email', _.get(quoteData, 'policyHolders[1].emailAddress')));
  dispatch(change('Coverage', 'pH2FirstName', _.get(quoteData, 'policyHolders[1].firstName')));
  dispatch(change('Coverage', 'pH2LastName', _.get(quoteData, 'policyHolders[1].lastName')));
  dispatch(change('Coverage', 'pH2phone', normalizePhone(_.get(quoteData, 'policyHolders[1].primaryPhoneNumber'))));
  dispatch(change('Coverage', 'pH2secondaryPhone', normalizePhone(_.get(quoteData, 'policyHolders[1].secondaryPhoneNumber'))));

  dispatch(change('Coverage', 'address1', _.get(quoteData, 'property.physicalAddress.address1')));
  dispatch(change('Coverage', 'address2', _.get(quoteData, 'property.physicalAddress.address2')));
  dispatch(change('Coverage', 'city', _.get(quoteData, 'property.physicalAddress.city')));
  dispatch(change('Coverage', 'state', _.get(quoteData, 'property.physicalAddress.state')));
  dispatch(change('Coverage', 'zip', _.get(quoteData, 'property.physicalAddress.zip')));
  dispatch(change('Coverage', 'protectionClass', _.get(quoteData, 'property.protectionClass')));
  dispatch(change('Coverage', 'constructionType', _.get(quoteData, 'property.constructionType')));
  dispatch(change('Coverage', 'yearOfRoof', _.get(quoteData, 'property.yearOfRoof')));
  dispatch(change('Coverage', 'squareFeet', _.get(quoteData, 'property.squareFeet')));
  dispatch(change('Coverage', 'yearBuilt', _.get(quoteData, 'property.yearBuilt')));
  dispatch(change('Coverage', 'buildingCodeEffectivenessGrading', _.get(quoteData, 'property.buildingCodeEffectivenessGrading')));
  dispatch(change('Coverage', 'familyUnits', _.get(quoteData, 'property.familyUnits')));
  dispatch(change('Coverage', 'distanceToTidalWater', _.get(quoteData, 'property.distanceToTidalWater')));
  dispatch(change('Coverage', 'distanceToFireHydrant', _.get(quoteData, 'property.distanceToFireHydrant')));
  dispatch(change('Coverage', 'distanceToFireStation', _.get(quoteData, 'property.distanceToFireStation')));
  dispatch(change('Coverage', 'floodZone', _.get(quoteData, 'property.floodZone')));

  dispatch(change('Coverage', 'burglarAlarm', _.get(quoteData, 'property.burglarAlarm')));
  dispatch(change('Coverage', 'fireAlarm', _.get(quoteData, 'property.fireAlarm')));
  dispatch(change('Coverage', 'sprinkler', _.get(quoteData, 'property.sprinkler')));

  dispatch(change('Coverage', 'dwellingAmount', Math.round(_.get(quoteData, 'coverageLimits.dwelling.amount') / 1000) * 1000));
  dispatch(change('Coverage', 'dwellingMin', _.get(quoteData, 'coverageLimits.dwelling.minAmount')));
  dispatch(change('Coverage', 'dwellingMax', _.get(quoteData, 'coverageLimits.dwelling.maxAmount')));

  dispatch(change('Coverage', 'lossOfUse', _.get(quoteData, 'coverageLimits.lossOfUse.amount')));
  dispatch(change('Coverage', 'medicalPayments', _.get(quoteData, 'coverageLimits.medicalPayments.amount')));
  dispatch(change('Coverage', 'moldLiability', _.get(quoteData, 'coverageLimits.moldLiability.amount')));
  dispatch(change('Coverage', 'moldProperty', _.get(quoteData, 'coverageLimits.moldProperty.amount')));
  dispatch(change('Coverage', 'ordinanceOrLaw', _.get(quoteData, 'coverageLimits.ordinanceOrLaw.amount')));

  const otherStructures = _.get(quoteData, 'coverageLimits.otherStructures.amount');
  const dwelling = Math.round(_.get(quoteData, 'coverageLimits.dwelling.amount') / 1000) * 1000;
  const personalProperty = _.get(quoteData, 'coverageLimits.personalProperty.amount');
  const hurricane = _.get(quoteData, 'deductibles.hurricane.amount');
  const calculatedHurricane = _.get(quoteData, 'deductibles.hurricane.calculatedAmount');
  const calculatedSinkhole = _.get(quoteData, 'deductibles.sinkhole.calculatedAmount');


  dispatch(change('Coverage', 'dwellingAmount', dwelling));

  dispatch(change('Coverage', 'otherStructuresAmount', otherStructures));
  dispatch(change('Coverage', 'otherStructures', String(calculatePercentage(otherStructures, dwelling))));
  dispatch(change('Coverage', 'personalLiability', _.get(quoteData, 'coverageLimits.personalLiability.amount')));
  dispatch(change('Coverage', 'personalProperty', String(calculatePercentage(personalProperty, dwelling))));
  dispatch(change('Coverage', 'personalPropertyAmount', personalProperty));
  dispatch(change('Coverage', 'personalPropertyReplacementCostCoverage', false));

  dispatch(change('Coverage', 'sinkholePerilCoverage', _.get(quoteData, 'coverageOptions.sinkholePerilCoverage.answer')));
  dispatch(change('Coverage', 'calculatedSinkhole', calculatedSinkhole));

  dispatch(change('Coverage', 'allOtherPerils', _.get(quoteData, 'deductibles.allOtherPerils.amount')));
  dispatch(change('Coverage', 'hurricane', hurricane));
  dispatch(change('Coverage', 'calculatedHurricane', calculatedHurricane));
  dispatch(change('Coverage', 'floridaBuildingCodeWindSpeed', _.get(quoteData, 'property.windMitigation.floridaBuildingCodeWindSpeed')));
  dispatch(change('Coverage', 'floridaBuildingCodeWindSpeedDesign', _.get(quoteData, 'property.windMitigation.floridaBuildingCodeWindSpeedDesign')));
  dispatch(change('Coverage', 'internalPressureDesign', _.get(quoteData, 'property.windMitigation.internalPressureDesign')));
  dispatch(change('Coverage', 'openingProtection', _.get(quoteData, 'property.windMitigation.openingProtection')));
  dispatch(change('Coverage', 'roofCovering', _.get(quoteData, 'property.windMitigation.roofCovering')));
  dispatch(change('Coverage', 'roofDeckAttachment', _.get(quoteData, 'property.windMitigation.roofDeckAttachment')));
  dispatch(change('Coverage', 'roofGeometry', _.get(quoteData, 'property.windMitigation.roofGeometry')));
  dispatch(change('Coverage', 'roofToWallConnection', _.get(quoteData, 'property.windMitigation.roofToWallConnection')));
  dispatch(change('Coverage', 'secondaryWaterResistance', _.get(quoteData, 'property.windMitigation.secondaryWaterResistance')));
  dispatch(change('Coverage', 'terrain', _.get(quoteData, 'property.windMitigation.terrain')));
  dispatch(change('Coverage', 'windBorneDebrisRegion', _.get(quoteData, 'property.windMitigation.windBorneDebrisRegion')));
  dispatch(change('Coverage', 'residenceType', _.get(quoteData, 'property.residenceType')));
};

export const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.appState.instanceId;
  const submitData = data;

  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, {
    ...props.appState.data,
    submitting: true
  });

  submitData.agencyCode = String(data.agencyCode);
  submitData.agentCode = String(data.agentCode);
  submitData.dwellingAmount = Math.round(Number(String(data.dwellingAmount).replace(/[^\d]/g, '')) / 1000) * 1000;
  submitData.otherStructuresAmount = Number(data.otherStructuresAmount);

  submitData.personalPropertyAmount = Number(data.personalPropertyAmount);
  submitData.hurricane = Number(data.hurricane);
  submitData.calculatedHurricane = Number(data.calculatedHurricane);
  submitData.lossOfUse = Number(data.lossOfUse);
  submitData.medicalPayments = Number(data.medicalPayments);
  submitData.floridaBuildingCodeWindSpeedDesign = Number(data.floridaBuildingCodeWindSpeedDesign);
  submitData.floridaBuildingCodeWindSpeed = Number(data.floridaBuildingCodeWindSpeed);
  submitData.allOtherPerils = Number(data.allOtherPerils);
  submitData.ordinanceOrLaw = Number(data.ordinanceOrLaw);
  submitData.moldLiability = Number(data.moldLiability);
  submitData.moldProperty = Number(data.moldProperty);
  submitData.personalLiability = Number(data.personalLiability);

  submitData.sinkholePerilCoverage = (String(data.sinkholePerilCoverage) === 'true');

  if (submitData.sinkholePerilCoverage) {
    submitData.sinkhole = 10;
  }

  submitData.pH1phone = submitData.pH1phone.replace(/[^\d]/g, '');
  submitData.pH1secondaryPhone = submitData.pH1secondaryPhone
      ? submitData.pH1secondaryPhone.replace(/[^\d]/g, '')
      : submitData.pH1secondaryPhone;

  submitData.pH2phone = submitData.pH2phone
      ? submitData.pH2phone.replace(/[^\d]/g, '')
      : submitData.pH2phone;
  submitData.pH2secondaryPhone = submitData.pH2secondaryPhone
      ? submitData.pH2secondaryPhone.replace(/[^\d]/g, '')
      : submitData.pH2secondaryPhone;

  const steps = [
    {
      name: 'hasUserEnteredData',
      data: {
        answer: 'Yes'
      }
    }, {
      name: 'askCustomerData',
      data: submitData
    }, {
      name: 'askToCustomizeDefaultQuote',
      data: {
        shouldCustomizeQuote: 'Yes'
      }
    }, {
      name: 'customizeDefaultQuote',
      data: submitData
    }

  ];

  props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        props.actions.appStateActions.setAppState(props.appState.modelName,
          workflowId, { ...props.appState.data, submitting: false, selectedLink: 'coverage' });
      });
};

let setAgents = false;

export class Coverage extends Component {

  componentWillMount() {
    this.props.actions.questionsActions.getUIQuestions('askToCustomizeDefaultQuote');

    const isNewTab = localStorage.getItem('isNewTab') === 'true';

    if (isNewTab) {
      localStorage.setItem('isNewTab', false);

      this.props.actions.cgActions.startWorkflow('csrQuote', {}).then((result) => {
        const steps = [];
        const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData'));

        steps.push({ name: 'search', data: lastSearchData });

        if (lastSearchData.searchType === 'quote') {
          const quoteId = localStorage.getItem('quoteId');
          steps.push({
            name: 'chooseQuote',
            data: {
              quoteId
            }
          });
        } else if (lastSearchData.searchType === 'address') {
          const igdID = localStorage.getItem('igdID');
          const stateCode = localStorage.getItem('stateCode');
          steps.push({
            name: 'chooseAddress',
            data: {
              igdId: igdID,
              stateCode
            }
          });
        }

        const startResult = result.payload[0].workflowData.csrQuote.data;

        this.props.actions.appStateActions.setAppState('csrQuote', startResult.modelInstanceId, { ...this.props.appState.data, submitting: true });
        this.props.actions.cgActions.batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps).then(() => {
          this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
          startResult.modelInstanceId, { ...this.props.appState.data });
          handleAgencyChange(this.props, this.props.quoteData.agencyCode, true);
        });
      });
    } else handleAgencyChange(this.props, this.props.quoteData.agencyCode, true);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      const quoteData = nextProps.quoteData;
      if (quoteData.companyCode && quoteData.state && quoteData.agencyCode && !setAgents) {
        this.props.actions.serviceActions.getAgencies(quoteData.companyCode, quoteData.state);
        this.props.actions.serviceActions.getAgentsByAgency(quoteData.companyCode, quoteData.state, quoteData.agencyCode);
        setAgents = true;
      }
    }
  }

  updateDwellingAndDependencies = (e, value) => {
    const { dispatch, fieldValues } = this.props;

    let dwellingNumber = String(value).replace(/\D+/g, '');

    if (Number.isNaN(dwellingNumber)) { return; }

    dwellingNumber = Math.round(dwellingNumber / 1000) * 1000;

    if (fieldValues.otherStructures !== 'other') {
      dispatch(change('Coverage', 'otherStructuresAmount', String(setPercentageOfValue(Number(dwellingNumber), Number(fieldValues.otherStructures)))));
    }
    if (fieldValues.personalProperty !== 'other') {
      dispatch(change('Coverage', 'personalPropertyAmount', String(setPercentageOfValue(Number(dwellingNumber), Number(fieldValues.personalProperty)))));
    }
    dispatch(change('Coverage', 'calculatedHurricane', String(setPercentageOfValue(Number(dwellingNumber), Number(fieldValues.hurricane)))));

    dispatch(change('Coverage', 'lossOfUse', String(setPercentageOfValue(Number(dwellingNumber), 10))));

    dispatch(change('Coverage', 'calculatedSinkhole', String(setPercentageOfValue(Number(dwellingNumber), 10))));
  }

  updateDependencies = (event, field, dependency) => {
    const { dispatch, fieldValues } = this.props;
    if (Number.isNaN(event.target.value)) { return; }

    let dependencyValue = null;

    if (dependency === 'dwellingAmount') {
      dependencyValue = Math.round(Number(String(fieldValues[dependency]).replace(/\D+/g, '')) / 1000) * 1000;
    } else dependencyValue = String(fieldValues[dependency]).replace(/\D+/g, '');


    const fieldValue = setPercentageOfValue(Number(dependencyValue), Number(event.target.value));

    dispatch(change('Coverage', field, Number.isNaN(fieldValue)
      ? ''
      : String(fieldValue)));
  }

  updateCalculatedSinkhole = () => {
    const { dispatch, fieldValues } = this.props;
    if (Number.isNaN(event.target.value)) { return; }

    const dependencyValue = Math.round(Number(String(fieldValues.dwellingAmount).replace(/\D+/g, '')) / 1000) * 1000;

    dispatch(change('Coverage', 'calculatedSinkhole', String(setPercentageOfValue(Number(dependencyValue), 10))));
  }

  render() {
    const { quoteData, fieldValues, handleSubmit, initialValues, pristine, agents, agencies, questions, zipCodeSettings } = this.props;
    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <Form id="Coverage" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <HiddenField name={'propertyIncidentalOccupanciesMainDwelling'} />
            <HiddenField name={'propertyIncidentalOccupanciesOtherStructures'} />
            <HiddenField name={'liabilityIncidentalOccupancies'} />
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <section id="produced-by" className="producer produced-by">
                  <h3>Produced By</h3>
                  <div className="flex-parent produced-by-wrapper">
                    <div className="flex-child effectiveDate">
                      <DateField validations={['date']} label={'Effective Date'} name={'effectiveDate'} min={zipCodeSettings ? zipCodeSettings.minEffectiveDate : null} max={zipCodeSettings ? zipCodeSettings.maxEffectiveDate : null} />
                    </div>
                    <div className="flex-child agencyCode">
                      {/* TODO: still waiting on endpoint to get all agencies. This will not be hardcoded */}
                      <SelectField
                        name="agencyCode" component="select" styleName={''} label="Agency" validations={['required']} input={{
                          name: 'agencyCode',
                          onChange: event => handleAgencyChange(this.props, event.target.value),
                          value: fieldValues.agencyCode
                        }} answers={agencies && agencies.map(agency => ({
                          answer: String(agency.agencyCode),
                          label: `${agency.displayName}`
                        }))}
                      />
                    </div>
                    <div className="flex-child agentCode">
                      <SelectField
                        name="agentCode" component="select" styleName={''} label="Agent" validations={['required']} answers={agents && agents.map(agent => ({
                          answer: String(agent.agentCode),
                          label: `${agent.firstName} ${agent.lastName}`
                        }))}
                      />
                    </div>
                  </div>
                </section>
                <section id="policyHolders" className="demographics flex-parent policyHolders">
                  <div id="policy-holder-a" className="policy-holder-a flex-child">
                    <h3>Primary Policyholder</h3>
                    <div className="flex-parent policy-holder-a-name">
                      <div className="flex-child policy-holder-a-first-name">
                        <TextField validations={['required']} label={'First Name'} styleName={''} name={'pH1FirstName'} />
                      </div>
                      <div className="flex-child policy-holder-a-last-name">
                        <TextField validations={['required']} label={'Last Name'} styleName={''} name={'pH1LastName'} />
                      </div>
                    </div>
                    <div className="flex-parent policy-holder-a-phone">
                      <div className="flex-child policy-holder-a-primary-phone">
                        <PhoneField validations={['required', 'phone']} label={'Primary Phone'} styleName={''} name={'pH1phone'} />
                      </div>
                      <div className="flex-child policy-holder-a-secondary-phone">
                        <PhoneField label={'Secondary Phone'} styleName={''} name={'pH1secondaryPhone'} validations={['phone']} />
                      </div>
                    </div>
                    <div className="flex-parent policy-holder-a-email">
                      <div className="flex-child email-address">
                        <TextField validations={['required']} label={'Email Address'} styleName={''} name={'pH1email'} />
                      </div>
                    </div>
                  </div>
                  <div id="policy-holder-b" className="policy-holder-b flex-child">
                    <h3>Secondary Policyholder</h3>
                    <div className="flex-parent policy-holder-b-name">
                      <div className="flex-child policy-holder-b-first-name">
                        <TextField label={'First Name'} styleName={''} name={'pH2FirstName'} />
                      </div>
                      <div className="flex-child policy-holder-b-last-name">
                        <TextField label={'Last Name'} styleName={''} name={'pH2LastName'} />
                      </div>
                    </div>
                    <div className="flex-parent policy-holder-b-phone">
                      <div className="flex-child policy-holder-b-primary-phone">
                        <PhoneField label={'Primary Phone'} styleName={''} name={'pH2phone'} validations={['phone']} />
                      </div>
                      <div className="flex-child policy-holder-b-secondary-phone">
                        <PhoneField label={'Secondary Phone'} styleName={''} name={'pH2secondaryPhone'} validations={['phone']} />
                      </div>
                    </div>
                    <div className="flex-parent policy-holder-b-email">
                      <div className="flex-child email-address">
                        <TextField validations={['email']} label={'Email Address'} styleName={''} name={'pH2email'} />
                      </div>
                    </div>
                  </div>
                </section>
                <section id="property-location" className="property flex-parent property-location">
                  <div id="property-risk" className="property-address flex-child property-risk">
                    <h3>Property (Risk)</h3>
                    <div className="flex-parent property-risk-address-1-row">
                      <div className="flex-child property-risk-address-1">
                        <TextField label={'Address 1'} styleName={''} name={'address1'} disabled />
                      </div>
                    </div>
                    <div className="flex-parent property-risk-address-2-row">
                      <div className="flex-child property-risk-address-2">
                        <TextField label={'Address 2'} styleName={''} name={'address2'} disabled />
                      </div>
                    </div>
                    <div className="flex-parent property-risk-city-row">
                      <div className="flex-child city property-risk-city">
                        <TextField label={'City'} styleName={''} name={'city'} disabled />
                      </div>
                    </div>
                    <div className="flex-parent property-risk-state-zip-row">
                      <div className="flex-child state property-risk-state">
                        <TextField label={'State'} styleName={''} name={'state'} disabled />
                      </div>
                      <div className="flex-child zip property-risk-zip">
                        <TextField label={'Zip'} styleName={''} name={'zip'} disabled />
                      </div>
                    </div>
                    <div className="flex-parent property-risk-spacer" />
                  </div>
                  <div className="property-details flex-child home-location">
                    <h3>Home and Location</h3>
                    <div className="flex-parent home-location-row-1">
                      <div className="flex-child home-location-year-built">
                        <TextField label={'Year Home Built'} styleName={''} name={'yearBuilt'} disabled />
                      </div>
                      <div className="flex-child home-location-protection-class">
                        <SelectField
                          name="protectionClass" component="select" styleName={''} label="Protection Class" input={{
                            name: 'protectionClass',
                            disabled: true,
                            value: fieldValues.protectionClass
                          }} answers={[
                            {
                              answer: '1',
                              label: '01'
                            }, {
                              answer: '2',
                              label: '02'
                            }, {
                              answer: '3',
                              label: '03'
                            }, {
                              answer: '4',
                              label: '04'
                            }, {
                              answer: '5',
                              label: '05'
                            }, {
                              answer: '6',
                              label: '06'
                            }, {
                              answer: '7',
                              label: '07'
                            }, {
                              answer: '8',
                              label: '08'
                            }, {
                              answer: '9',
                              label: '09'
                            }, {
                              answer: '10',
                              label: '10'
                            }
                          ]}
                        />
                      </div>
                      <div className="flex-child home-location-tidal-waters">
                        <TextField label={'Tidal Waters Dist.'} styleName={''} name={'distanceToTidalWater'} disabled />
                      </div>
                      <div className="flex-child home-location-residence-type">
                        <SelectField
                          name="residenceType" component="select" styleName={''} label="Residence Type" input={{
                            name: 'residenceType',
                            disabled: true,
                            value: fieldValues.residenceType
                          }} answers={[
                            {
                              answer: 'SINGLE FAMILY',
                              label: 'Single Family'
                            }, {
                              answer: 'COMMERCIAL',
                              label: 'Commercial'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent home-location-row-2">
                      <div className="flex-child home-location-construction">
                        <SelectField
                          component="select" styleName={''} label="Construction" name={'constructionType'} input={{
                            name: 'constructionType',
                            disabled: true,
                            value: fieldValues.constructionType
                          }} answers={[
                            {
                              answer: 'FRAME',
                              label: 'Frame'
                            }, {
                              answer: 'PLASTIC SIDING',
                              label: 'Plastic Siding'
                            }, {
                              answer: 'ALUMINUM SIDING',
                              label: 'Aluminum Siding'
                            }, {
                              answer: 'MASONRY',
                              label: 'Masonry'
                            }, {
                              answer: 'MASONRY VENEER',
                              label: 'Masonry Veneer'
                            }, {
                              answer: 'SUPERIOR',
                              label: 'Superior'
                            }
                          ]}
                        />
                      </div>
                      <div className="flex-child home-location-bceg">
                        <SelectField
                          component="select" styleName={''} label="BCEG" name={'buildingCodeEffectivenessGrading'} input={{
                            name: 'buildingCodeEffectivenessGrading',
                            disabled: true,
                            value: fieldValues.buildingCodeEffectivenessGrading
                          }} answers={[
                            {
                              answer: '1',
                              label: '01'
                            }, {
                              answer: '2',
                              label: '02'
                            }, {
                              answer: '3',
                              label: '03'
                            }, {
                              answer: '4',
                              label: '04'
                            }, {
                              answer: '5',
                              label: '05'
                            }, {
                              answer: '6',
                              label: '06'
                            }, {
                              answer: '7',
                              label: '07'
                            }, {
                              answer: '8',
                              label: '08'
                            }, {
                              answer: '9',
                              label: '09'
                            }, {
                              answer: '98',
                              label: '98'
                            }, {
                              answer: '99',
                              label: '99'
                            }
                          ]}
                        />
                      </div>
                      <div className="flex-child home-location-fire-hydrant">
                        <TextField name={'distanceToFireHydrant'} disabled label={'Fire Hydrant Dist.'} styleName={''} />
                      </div>
                      <div className="flex-child home-location-square-ft">
                        <TextField name={'squareFeet'} disabled label={'Sq. Ft. of Home'} styleName={''} />
                      </div>
                    </div>
                    <div className="flex-parent home-location-row-3">
                      <div className="flex-child home-location-year-roof-built">
                        <TextField label={'Year Roof Built'} styleName={''} name="yearOfRoof" disabled />
                      </div>
                      <div className="flex-child home-location-family-units">
                        <SelectField
                          name="familyUnits" component="select" styleName={''} label="Family Units" input={{
                            name: 'familyUnits',
                            disabled: true,
                            value: fieldValues.familyUnits
                          }} onChange={function () {}} answers={[
                            {
                              answer: '1-2',
                              label: '1-2'
                            }, {
                              answer: '3-4',
                              label: '3-4'
                            }, {
                              answer: '5-8',
                              label: '5-8'
                            }, {
                              answer: '9+',
                              label: '9+'
                            }
                          ]}
                        />
                      </div>
                      <div className="flex-child home-location-fire-station">
                        <TextField label={'Fire Station Dist.'} styleName={''} name={'distanceToFireStation'} disabled />
                      </div>
                      <div className="flex-child home-location-flood-zone">
                        <TextField name={'floodZone'} disabled label={'Flood Zone'} styleName={''} />
                      </div>
                    </div>
                  </div>
                </section>
                <section id="coverage-deductibles-discounts" className="coverage-options flex-parent coverage-deductibles-discounts">
                  <div className="coverages flex-child">
                    <h3>Coverages</h3>
                    <div className="flex-parent coverages-row-1">
                      <div className="flex-child coverages-dwelling-limit">
                        <CurrencyField validations={['required', 'range']} label={`${getQuestionName('dwellingAmount', questions)} ($${String(fieldValues.dwellingMin).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} - $${String(fieldValues.dwellingMax).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')})`} styleName={''} name={'dwellingAmount'} min={initialValues.dwellingMin} max={initialValues.dwellingMax} onChange={this.updateDwellingAndDependencies} />
                      </div>
                    </div>
                    <div className="flex-parent coverages-row-2">
                      <div className="flex-child coverages-other-structures-limit">
                        <CurrencyField validations={['required']} name="otherStructuresAmount" label={getQuestionName('otherStructuresAmount', questions)} styleName={'coverage-b'} disabled={fieldValues.otherStructures !== 'other'} />
                      </div>
                      <div className="flex-child coverages-other-structures-limit-percent">
                        <SelectField
                          name="otherStructures" component="select" styleName={'coverage-b-percentage'} label="Percentage" onChange={event => this.updateDependencies(event, 'otherStructuresAmount', 'dwellingAmount')} validations={['required']}
                          answers={getAnswers('otherStructuresAmount', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent coverages-row-3">
                      <div className="flex-child coverages-personal-property-limit">
                        <CurrencyField validations={['required']} label={getQuestionName('personalPropertyAmount', questions)} styleName={'coverage-c'} name="personalPropertyAmount" disabled={fieldValues.personalProperty !== 'other'} />
                      </div>
                      <div className="flex-child coverages-personal-property-limit-percent">
                        <SelectField
                          name="personalProperty" component="select" styleName={'coverage-c-percentage'} label="Percentage" onChange={event => this.updateDependencies(event, 'personalPropertyAmount', 'dwellingAmount')} validations={['required']}
                          answers={getAnswers('personalPropertyAmount', questions)}
                        />
                      </div>
                      {/* <div className="flex-child">
                        <SelectField
                          name="personalPropertyCSelect" component="select" styleName={''} label="" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '35% of Coverage A',
                              label: '35% of Coverage A'
                            }, {
                              answer: '45% of Coverage A',
                              label: '45% of Coverage A'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div> */}
                    </div>
                    <div className="flex-parent coverages-row-4">
                      <div className="flex-child coverages-loss-of-use-limit">
                        <CurrencyField label={'Loss of Use Limit'} styleName={''} name="lossOfUse" disabled />
                      </div>
                    </div>
                    <div className="flex-parent coverages-row-5">
                      <div className="flex-child coverages-personal-liability">
                        <SelectField
                          name="personalLiability" component="select" styleName={''} label={getQuestionName('personalLiability', questions)} onChange={function () {}} validations={['required']}
                          answers={getAnswers('personalLiability', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent coverages-row-6">
                      <div className="flex-child coverages-medical-payments">
                        <TextField
                          name="medicalPayments" disabled label={'Medical Payments to Others Limit'} styleName={''} input={{
                            name: 'medicalPayments',
                            disabled: true,
                            value: '$2,000'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="other-coverages flex-child">
                    <h3>Other Coverages</h3>
                    <div className="flex-parent other-coverages-row-1">
                      <div className="flex-child other-coverages-mold-property-limit">
                        <SelectField
                          name="moldProperty" component="select" styleName={''} label="Mold Property Limit" onChange={function () {}} validations={['required']} answers={getAnswers('moldProperty', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent other-coverages-row-2">
                      <div className="flex-child other-coverages-mold-liability-limit">
                        <SelectField
                          name="moldLiability" component="select" styleName={''} label="Mold Liability Limit" onChange={function () {}} validations={['required']} answers={getAnswers('moldLiability', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent other-coverages-row-3">
                      <div className="flex-child other-coverages-property-replacement-cost">
                        <RadioField
                          name={'personalPropertyReplacementCostCoverage'} styleName={'billPlan'} label={'Personal Property Repl Cost'} onChange={function () {}} segmented answers={[
                            {
                              answer: false,
                              label: 'No'
                            }, {
                              answer: true,
                              label: 'Yes'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent other-coverages-row-4">
                      <div className="flex-child other-coverages-ordinance-or-law-coverage">
                        <SelectField
                          name="ordinanceOrLaw" component="select" styleName={''} label="Ordinance or Law Coverage Limit" onChange={function () {}} validations={['required']}
                          answers={getAnswers('ordinanceOrLaw', questions)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="deductibles flex-child">
                    <h3>Deductibles</h3>
                    <div className="flex-parent deductibles-row-1">
                      <div className="flex-child deductibles-hurricane">
                        <SelectField
                          name="hurricane" component="select" styleName={''} label="Hurricane" onChange={event => this.updateDependencies(event, 'calculatedHurricane', 'dwellingAmount')}
                          validations={['required']}
                          answers={getAnswers('hurricane', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent deductibles-row-2">
                      <div className="flex-child deductibles-calculated-hurricane">
                        <CurrencyField validations={['required']} label={'Calculated Hurricane'} styleName={'coverage-c'} name="calculatedHurricane" disabled />
                      </div>
                    </div>
                    <div className="flex-parent deductibles-row-3">
                      <div className="flex-child deductibles-all-other-perils">
                        <SelectField
                          name="allOtherPerils" component="select" styleName={''} label="All Other Perils" onChange={function () {}} validations={['required']}
                          answers={getAnswers('allOtherPerils', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent deductibles-row-4">
                      <div className="flex-child">
                        <SelectField
                          name="sinkholePerilCoverage" component="select" styleName={''} label="Sinkhole" onChange={() => this.updateCalculatedSinkhole()} answers={[
                            {
                              answer: false,
                              label: 'Coverage Excluded'
                            }, {
                              answer: true,
                              label: `10% of ${getQuestionName('dwellingAmount', questions)}`
                            }
                          ]}
                        />
                      </div>
                    </div>
                    { String(fieldValues.sinkholePerilCoverage) === 'true' && <div className="flex-parent">
                      <div className="flex-child deductibles-sinkhole">
                        <CurrencyField validations={['required']} label={'Calculated Sinkhole'} styleName={'coverage-c'} name="calculatedSinkhole" disabled />
                      </div>
                    </div>
                    }
                  </div>
                  <div className="discounts flex-child">
                    <h3>Discounts</h3>
                    <div className="flex-parent discounts-row-1">
                      <div className="flex-child discounts-burglar-alarm">
                        <RadioField
                          name={'burglarAlarm'} styleName={''} label={'Burglar Alarm'} onChange={function () {}} segmented answers={[
                            {
                              answer: false,
                              label: 'No'
                            }, {
                              answer: true,
                              label: 'Yes'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent discounts-row-2">
                      <div className="flex-child discounts-fire-alarm">
                        <RadioField
                          name={'fireAlarm'} styleName={''} label={'Fire Alarm'} onChange={function () {}} segmented answers={[
                            {
                              answer: false,
                              label: 'No'
                            }, {
                              answer: true,
                              label: 'Yes'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent discounts-row-3">
                      <div className="flex-child discounts-sprinkler">
                        <RadioField
                          name={'sprinkler'} styleName={''} label={'Sprinkler'} onChange={function () {}} segmented
                          answers={getAnswers('sprinkler', questions)}
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="wind flex-parent">
                  <div className="wind-col1 flex-child">
                    <h3>Wind Mitigation</h3>
                    <div className="flex-parent wind-col1-row-1">
                      <div className="flex-child wind-roof-covering">
                        <SelectField
                          name="roofCovering" component="select" styleName={''} label="Roof Covering" onChange={function () {}} validations={['required']}
                          answers={getAnswers('roofCovering', questions)}

                        />
                      </div>
                    </div>
                    <div className="flex-parent wind-col1-row-2">
                      <div className="flex-child wind-roof-deck-attachment">
                        <SelectField
                          name="roofDeckAttachment" component="select" styleName={''} label="Roof Deck Attachment" onChange={function () {}} validations={['required']}
                          answers={getAnswers('roofDeckAttachment', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent wind-col1-row-3">
                      <div className="flex-child wind-roof-to-wall-attachment">
                        <SelectField
                          name="roofToWallConnection" component="select" styleName={'weakestRoofWallConnect'} label="Roof to Wall Attachment" onChange={function () {}} validations={['required']}
                          answers={getAnswers('roofToWallConnection', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent wind-col1-row-4">
                      <div className="flex-child wind-roof-geometry">
                        <SelectField
                          name="roofGeometry" component="select" styleName={''} label="Roof Geometry" onChange={function () {}} validations={['required']}
                          answers={getAnswers('roofGeometry', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent wind-col1-row-5">
                      <div className="flex-child wind-swr">
                        <RadioField
                          validations={['required']} name={'secondaryWaterResistance'} styleName={''} label={'Secondary Water Resistance (SWR)'} onChange={function () {}} segmented
                          answers={getAnswers('secondaryWaterResistance', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent wind-col1-row-6">
                      <div className="flex-child wind-opening-protection">
                        <SelectField
                          name="openingProtection" component="select" styleName={''} label="Opening Protection" onChange={function () {}} validations={['required']}
                          answers={getAnswers('openingProtection', questions)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="wind-col2 flex-child">
                    <h3>&nbsp;</h3>
                    <div className="flex-parent wind-col1-row-1">
                      <div className="flex-child wind-fbc-wind-speed">
                        <TextField validations={['required']} label={'FBC Wind Speed'} styleName={''} name={'floridaBuildingCodeWindSpeed'} />
                      </div>
                    </div>
                    <div className="flex-parent wind-col1-row-2">
                      <div className="flex-child wind-fbc-wind-speed-design">
                        <TextField validations={['required']} label={'FBC Wind Speed Design'} styleName={''} name={'floridaBuildingCodeWindSpeedDesign'} />
                      </div>
                    </div>
                    <div className="flex-parent wind-col1-row-3">
                      <div className="flex-child wind-terrain">
                        <SelectField
                          name="terrain" component="select" styleName={'propertyTerrain'} label="Terrain" onChange={function () {}} validations={['required']}
                          answers={getAnswers('terrain', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent wind-col1-row-4">
                      <div className="flex-child wind-internal-pressure-design">
                        <SelectField
                          name="internalPressureDesign" component="select" styleName={''} label="Internal Pressure Design" onChange={function () {}} validations={['required']}
                          answers={getAnswers('internalPressureDesign', questions)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent wind-col1-row-5">
                      <div className="flex-child wind-wbdr">
                        <RadioField
                          validations={['required']} name={'windBorneDebrisRegion'} styleName={''} label={'Wind Borne Debris Region (WBDR)'} onChange={function () {}} segmented
                          answers={getAnswers('windBorneDebrisRegion', questions)}
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <div className="btn-footer">
                  <button className="btn btn-secondary" type="button" form="Coverage" onClick={() => clearForm(this.props)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit" form="Coverage" disabled={this.props.appState.data.submitting || pristine || checkQuoteState(quoteData)}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </QuoteBaseConnect>
    );
  }
}
Coverage.contextTypes = {
  router: PropTypes.object
};
// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
Coverage.propTypes = {
  ...propTypes,
  zipCodeSettings: PropTypes.shape(),
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  agents: state.service.agents,
  agencies: state.service.agencies,
  fieldValues: _.get(state.form, 'Coverage.values', {}),
  initialValues: handleInitialize(state),
  quoteData: handleGetQuoteData(state),
  zipCodeSettings: handleGetZipCodeSettings(state),
  questions: state.questions
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    questionsActions: bindActionCreators(questionsActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Coverage', enableReinitialize: true })(Coverage));
