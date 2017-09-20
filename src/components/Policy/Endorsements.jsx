import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { reduxForm, propTypes, change, Form } from 'redux-form';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as cgActions from '../../actions/cgActions';
import * as serviceActions from '../../actions/serviceActions';
import * as appStateActions from '../../actions/appStateActions';
import * as questionsActions from '../../actions/questionsActions';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import normalizePhone from '../Form/normalizePhone';
import TextField from '../Form/inputs/TextField';
import RadioField from '../Form/inputs/RadioField';
import PhoneField from '../Form/inputs/PhoneField';
import SelectField from '../Form/inputs/SelectField';
import CurrencyField from '../Form/inputs/CurrencyField';
import Footer from '../Common/Footer';
import DateField from '../Form/inputs/DateField';

export const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

export const getQuestionName = (name, questions) => _.get(_.find(questions, { name }), 'question') || '';

let isLoaded = false;
export const handleGetPolicy = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const policyData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return policyData;
};

export const calculatePercentage = (oldFigure, newFigure) => {
  let percentChange = 0;
  if ((oldFigure !== 0) && (newFigure !== 0)) {
    percentChange = (oldFigure / newFigure) * 100;
  }
  return percentChange;
};

export const handleInitialize = (state) => {
  const policy = handleGetPolicy(state);
  const values = {};
  // values.agencyCode = '20000'; // _.get(policy, 'agencyCode');
  // values.agentCode = '60000'; // _.get(policy, 'agentCode');
  // values.effectiveDate = moment.utc(_.get(policy, 'effectiveDate')).format('YYYY-MM-DD');
  // values.dwellingMin = _.get(policy, 'coverageLimits.dwelling.minAmount');
  // values.dwellingMax = _.get(policy, 'coverageLimits.dwelling.maxAmount');
  // values.liabilityIncidentalOccupancies = false;

  const dwelling = _.get(policy, 'coverageLimits.dwelling.amount');
  const otherStructures = _.get(policy, 'coverageLimits.otherStructures.amount');
  const personalProperty = _.get(policy, 'coverageLimits.personalProperty.amount');
  const hurricane = _.get(policy, 'deductibles.hurricane.amount');

// Coverage Top Left
  values.effectiveDate = moment.utc(_.get(policy, 'effectiveDate')).format('YYYY-MM-DD');
  values.dwellingAmount = _.get(policy, 'coverageLimits.dwelling.amount');
  values.dwellingAmountNew = values.dwellingAmount;
  values.otherStructuresAmount = otherStructures;
  values.otherStructuresAmountNew = values.otherStructuresAmount;
  values.otherStructures = String(calculatePercentage(otherStructures, dwelling));
  values.otherStructuresNew = values.otherStructures;
  values.personalPropertyAmount = String(personalProperty);
  values.personalPropertyAmountNew = values.personalPropertyAmount;
  values.personalProperty = String(calculatePercentage(personalProperty, dwelling));
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
  values.hurricaneNew = values.hurricane;
  values.calculatedHurricane = _.get(policy, 'deductibles.hurricane.calculatedAmount');
  values.calculatedHurricaneNew = values.calculatedHurricane;
  values.sinkholePerilCoverage = _.get(policy, 'coverageOptions.sinkholePerilCoverage.answer');
  values.sinkholePerilCoverageNew = values.sinkholePerilCoverage;

// Coverage Top Right
  values.personalPropertyReplacementCostCoverage = _.get(policy, 'coverageOptions.personalPropertyReplacementCost.answer');
  values.personalPropertyReplacementCostCoverageNew = values.personalPropertyReplacementCostCoverage;
  values.ordinanceOrLaw = _.get(policy, 'coverageLimits.ordinanceOrLaw.amount');
  values.ordinanceOrLawNew = values.ordinanceOrLaw;
  values.propertyIncidentalOccupanciesMainDwelling = false;
  values.propertyIncidentalOccupanciesMainDwellingNew = values.propertyIncidentalOccupanciesMainDwelling;
  values.propertyIncidentalOccupanciesOtherStructures = false;
  values.propertyIncidentalOccupanciesOtherStructuresNew = values.propertyIncidentalOccupanciesOtherStructures;

  values.liabilityIncidentalOccupancies = _.get(policy, 'coverageOptions.liabilityIncidentalOccupancies.answer');
  values.liabilityIncidentalOccupanciesNew = values.liabilityIncidentalOccupancies;

  values.townhouseRowhouse = _.get(policy, 'property.townhouseRowhouse') ? 'Yes' : 'No';
  values.townhouseRowhouseNew = _.get(policy, 'property.townhouseRowhouse') || false;
  values.windExcluded = _.get(policy, 'rating.windMitigationDiscount') === 0 ? 'No' : 'Yes';
  values.windExcludedNew = values.windExcluded;
  values.propertyRented = _.get(policy, 'underwritingAnswers.rented.answer');
  values.propertyRentedNew = values.propertyRented;
  values.seasonallyOccupied = _.get(policy, 'underwritingAnswers.monthsOccupied.answer');
  values.seasonallyOccupiedNew = values.seasonallyOccupied;
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
  values.electronicDeliveryNew = _.get(policy, 'policyHolders[0].electronicDelivery');

// Coverage Mid Right
  values.floridaBuildingCodeWindSpeed = _.get(policy, 'property.windMitigation.floridaBuildingCodeWindSpeed');
  values.floridaBuildingCodeWindSpeedNew = values.floridaBuildingCodeWindSpeed;
  values.floridaBuildingCodeWindSpeedDesign = _.get(policy, 'property.windMitigation.floridaBuildingCodeWindSpeedDesign');
  values.floridaBuildingCodeWindSpeedDesignNew = values.floridaBuildingCodeWindSpeedDesign;
  values.terrain = _.get(policy, 'property.windMitigation.terrain');
  values.terrainNew = values.terrain;
  values.internalPressureDesign = _.get(policy, 'property.windMitigation.internalPressureDesign');
  values.internalPressureDesignNew = values.internalPressureDesign;
  values.windBorneDebrisRegion = _.get(policy, 'property.windMitigation.windBorneDebrisRegion') === true ? 'Yes' : 'No';
  values.windBorneDebrisRegionNew = values.windBorneDebrisRegion;
  values.windMitFactor = _.get(policy, 'rating.windMitigationDiscount');
  values.windMitFactorNew = values.windMitFactor;
// Home/Location Bottom Left
  values.yearBuilt = _.get(policy, 'property.yearBuilt');
  values.yearBuiltNew = values.yearBuilt;
  values.constructionType = _.get(policy, 'property.constructionType');
  values.constructionTypeNew = values.constructionType;
  values.yearOfRoof = _.get(policy, 'property.yearOfRoof');
  values.yearOfRoofNew = values.yearOfRoof;
  values.protectionClass = _.get(policy, 'property.protectionClass');
  values.protectionClassNew = values.protectionClass;
  values.buildingCodeEffectivenessGrading = _.get(policy, 'property.buildingCodeEffectivenessGrading');
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
  values.squareFeet = _.get(policy, 'property.squareFeet');
  values.squareFeetNew = values.squareFeet;
  values.floodZone = _.get(policy, 'property.floodZone');
  values.floodZoneNew = values.floodZone;

// Policyholder 1
  values.pH1email = _.get(policy, 'policyHolders[0].emailAddress');
  values.pH1emailNew = values.pH1email;
  values.pH1FirstName = _.get(policy, 'policyHolders[0].firstName');
  values.pH1FirstNameNew = values.pH1FirstName;
  values.pH1LastName = _.get(policy, 'policyHolders[0].lastName');
  values.pH1LastNameNew = values.pH1LastName;
  values.pH1phone = normalizePhone(_.get(policy, 'policyHolders[0].primaryPhoneNumber') || '');
  values.pH1phoneNew = values.pH1phone;
  values.pH1secondaryPhone = normalizePhone(_.get(policy, 'policyHolders[0].secondaryPhoneNumber') || '');
  values.pH1secondaryPhoneNew = values.pH1secondaryPhone;

// Policyholder 2
  values.pH2email = _.get(policy, 'policyHolders[1].emailAddress');
  values.pH2emailNew = values.pH2email;
  values.pH2FirstName = _.get(policy, 'policyHolders[1].firstName');
  values.pH2FirstNameNew = values.pH2FirstName;
  values.pH2LastName = _.get(policy, 'policyHolders[1].lastName');
  values.pH2LastNameNew = values.pH2LastName;
  values.pH2phone = normalizePhone(_.get(policy, 'policyHolders[1].primaryPhoneNumber') || '');
  values.pH2phoneNew = values.pH2phone;
  values.pH2secondaryPhone = normalizePhone(_.get(policy, 'policyHolders[1].secondaryPhoneNumber') || '');
  values.pH2secondaryPhoneNew = values.pH2secondaryPhone;

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

export const updateCalculatedSinkhole = (props) => {
  const { dispatch, fieldValues } = props;

  const dependencyValue = Math.round(Number(String(fieldValues.dwellingAmount).replace(/\D+/g, '')) / 1000) * 1000;

  dispatch(change('Endorsements', 'calculatedSinkholeNew', String(setPercentageOfValue(Number(dependencyValue), 10))));
};

export const updateDependencies = (event, field, dependency, props) => {
  const { dispatch, fieldValues } = props;
  if (Number.isNaN(event.target.value)) return;

  const dependencyValue = String(fieldValues[dependency]).replace(/\D+/g, '');
  const fieldValue = setPercentageOfValue(Number(dependencyValue), Number(event.target.value));

  dispatch(change('Endorsements', field, Number.isNaN(fieldValue) ? '' : String(fieldValue)));
};

// const claims = [
//   {
//     claimNumber: '17-1234567-01',
//     lossDate: '01/01/2000',
//     closedDate: '03/01/2000',
//     examiner: 'William Churchhill',
//     lossDescription: 'Desc: Noticed discoloration on floor.'
//   }, {
//     claimNumber: '17-6789012-01',
//     lossDate: '01/01/2002',
//     closedDate: '02/01/2002',
//     examiner: 'Bob McCann',
//     lossDescription: 'Desc: Noticed discoloration on wall.'
//   }
// ];

export const cancel = (props) => {
  const workflowId = props.appState.instanceId;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, {
    ...props.appState.data,
    isCalculated: false
  });
};

export const calculate = (props) => {
  const workflowId = props.appState.instanceId;

  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, {
    ...props.appState.data,
    isCalculated: !props.appState.data.isCalculated
  });
};

export const save = (data, dispatch, props) => {
  const policy = props.policy;
  policy.transactionType = 'Endorsement';
  const submitData = {
    ...policy,
    endorsementDate: moment.utc(),
    country: policy.policyHolderMailingAddress.country,
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
    distanceToFireStationNew: data.distanceToFireStationNew,
    yearOfRoofNew: data.yearOfRoofNew
  };

  props.actions.cgActions.startWorkflow('endorsePolicyModelSave', { policyNumber: props.policy.policyNumber }).then((result) => {
    const steps = [{
      name: 'saveEndorsement',
      data: submitData
    }];
    const startResult = result.payload ? result.payload[0].workflowData.endorsePolicyModelSave.data : {};

    props.actions.appStateActions.setAppState('endorsePolicyModelSave', startResult.modelInstanceId, { ...props.appState.data, submitting: true });
    props.actions.cgActions.batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps).then(() => {
      props.actions.appStateActions.setAppState('endorsePolicyModelSave', startResult.modelInstanceId, { ...props.appState.data, submitting: false, isCalculated: false });
    });
  });
};

const amountFormatter = cell => cell ? Number(cell).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '';
const dateFormatter = cell => `${cell.substring(0, 10)}`;

export class Endorsements extends React.Component {

  componentDidMount() {
    this.props.actions.questionsActions.getUIQuestions('askToCustomizeDefaultQuoteCSR');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.policy && nextProps.policy.policyNumber && !isLoaded) {
      isLoaded = true;
      this.props.actions.serviceActions.getEndorsementHistory(nextProps.policy.policyNumber);
    }
  }

  render() {
    const { initialValues, handleSubmit, appState, questions, pristine, endorsementHistory } = this.props;
    return (
      <PolicyConnect>
        <ClearErrorConnect />
        <Form id="Endorsements" className={'content-wrapper'} onSubmit={handleSubmit(save)} >

          <div className="route-content">
            <div className="endorsements">

              <div className="endo-jump-menu">

                <a href="#coverage" className="btn btn-secondary btn-xs">Coverage</a>
                <a href="#home" className="btn btn-secondary btn-xs">Home / Location</a>
                <a href="#policy" className="btn btn-secondary btn-xs">Policyholders</a>
                <a href="#addresses" className="btn btn-secondary btn-xs">Addresses</a>
              </div>
              <div className="scroll">
                <div className="form-group survey-wrapper" role="group">
                  <section>
                    <a name="coverage" />
                    <h3>Coverage</h3>
                    <div className="flex-parent">
                      {/* Col1 */}
                      <div className="flex-child col3">
                        <div className="form-group labels">
                          <label /><label>Current</label><label>New</label>
                        </div>
                        <div className="form-group-double-element">
                          <CurrencyField
                            label={'Dwelling (A)'} styleName={''} name={'dwellingAmount'}
                            min={initialValues.dwellingMin} max={initialValues.dwellingMax} disabled
                          />
                          <CurrencyField
                            validations={['required']} styleName={''} name={'dwellingAmountNew'}
                            min={initialValues.dwellingMin} label={''} max={initialValues.dwellingMax} disabled={appState.data.isCalculated}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <CurrencyField name="otherStructuresAmount" label={'Other Structures (B)'} styleName={'coverage-b'} disabled />
                          <CurrencyField validations={['required']} label={''} name="otherStructuresAmountNew" styleName={'coverage-b'} disabled />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Other Structures %'} styleName={''} name={'otherStructures'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'otherStructuresNew'}
                            answers={getAnswers('otherStructuresAmount', questions)}
                            component="select" label={''} styleName={'coverage-b-percentage'} onChange={event => updateDependencies(event, 'otherStructuresAmountNew', 'dwellingAmount', this.props)} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <CurrencyField label={'Personal Property (C)'} styleName={'coverage-c'} name="personalPropertyAmount" disabled />
                          <CurrencyField validations={['required']} label={''} styleName={'coverage-c'} name="personalPropertyAmountNew" disabled />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Personal Property %'} styleName={''} name={'personalProperty'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'personalPropertyNew'}
                            answers={getAnswers('personalPropertyAmount', questions)}
                            component="select" label={''} styleName={'coverage-c-percentage'} onChange={event => updateDependencies(event, 'personalPropertyAmountNew', 'dwellingAmount', this.props)} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <CurrencyField label={'Loss of Use (D)'} styleName={''} name={'lossOfUse'} disabled />
                          <CurrencyField validations={['required']} styleName={''} label={''} name={'lossOfUseNew'} disabled />
                        </div>
                        <div className="form-group-double-element">
                          <CurrencyField label={'Personal Liability (E)'} styleName={''} name={'personalLiability'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'personalLiabilityNew'}
                            answers={getAnswers('personalLiability', questions)}
                            component="select" label={''} styleName={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <CurrencyField label={'Medical Payments (F)'} styleName={''} name={'medicalPayments'} disabled />
                          <CurrencyField validations={['required']} name={'medicalPaymentsNew'} label={''} styleName={''} disabled />
                        </div>
                        <div className="form-group-double-element">
                          <CurrencyField label={'Mold Property'} styleName={''} name={'moldProperty'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'moldPropertyNew'}
                            answers={getAnswers('moldProperty', questions)}
                            component="select" label={''} styleName={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <CurrencyField label={'Mold Liability'} styleName={''} name={'moldLiability'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'moldLiabilityNew'}
                            answers={getAnswers('moldLiability', questions)}
                            component="select" styleName={''} label={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <CurrencyField label={'AOP Deductible'} styleName={''} name={'allOtherPerils'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'allOtherPerilsNew'}
                            answers={getAnswers('allOtherPerils', questions)}
                            component="select" styleName={''} label={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Hurricane Deductible'} styleName={''} name={'hurricane'} disabled />
                          <SelectField
                            label={''}
                            isDisabled={appState.data.isCalculated}
                            name={'hurricaneNew'}
                            answers={getAnswers('hurricane', questions)}
                            component="select" styleName={''} onChange={event => updateDependencies(event, 'calculatedHurricane', 'dwellingAmount', this.props)} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Sinkhole Deductible'} styleName={''} name={'sinkhole'} disabled />
                          <SelectField
                            label={''}
                            isDisabled={appState.data.isCalculated}
                            name="sinkholePerilCoverageNew" component="select" styleName={''} onChange={() => updateCalculatedSinkhole(this.props)} answers={[
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
                      {/* Col2 */}
                      <div className="flex-child col3">
                        <div className="form-group labels">
                          <label /><label>Current</label><label>New</label>
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Personal Property Repl Cost'} styleName={''} name={'personalPropertyReplacementCostCoverage'} disabled />
                          <div className="flex-child other-coverages-property-replacement-cost">
                            <RadioField
                              disabled={appState.data.isCalculated}
                              name={'personalPropertyReplacementCostCoverageNew'} styleName={'billPlan'} label={''} onChange={function () {}} segmented answers={[
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
                        <div className="form-group-double-element">
                          <TextField label={'Ordinance or Law'} styleName={''} name={'ordinanceOrLaw'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'ordinanceOrLawNew'}
                            answers={getAnswers('ordinanceOrLaw', questions)}
                            label={''} component="select" styleName={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Incidental Occ Main'} styleName={''} name={'propertyIncidentalOccupanciesMainDwelling'} disabled />
                          <TextField label={''} styleName={''} name={'propertyIncidentalOccupanciesMainDwellingNew'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Incidental Occ Other'} styleName={''} name={'propertyIncidentalOccupanciesOtherStructures'} disabled />
                          <TextField label={''} styleName={''} name={'propertyIncidentalOccupanciesOtherStructuresNew'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Incidental Occ Liability'} styleName={''} name={'liabilityIncidentalOccupancies'} disabled />
                          <CurrencyField name={'liabilityIncidentalOccupanciesNew'} label={''} styleName={''} disabled />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Townhouse / Rowhouse'} styleName={''} name={'townhouseRowhouse'} disabled />
                          <div className="flex-child">
                            <RadioField
                              disabled={appState.data.isCalculated}
                              name={'townhouseRowhouseNew'} styleName={''} label={''} onChange={function () {}} segmented answers={[
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
                        <div className="form-group-double-element">
                          <TextField label={'Property Ever Rented'} styleName={''} name={'propertyRented'} disabled />
                          <SelectField
                            label={''}
                            isDisabled={appState.data.isCalculated}
                            name={'propertyRentedNew'}
                            answers={getAnswers('propertyRented', questions)}
                            styleName={''} onChange={function () {}}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Seasonally Occupied'} styleName={''} name={'seasonallyOccupied'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'seasonallyOccupiedNew'}
                            answers={getAnswers('seasonallyOccupied', questions)}
                            label={''} styleName={''} onChange={function () {}}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField validations={['required']} label={'No Prior Insurance'} styleName={''} name={'noPriorInsurance'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'noPriorInsuranceNew'}
                            answers={getAnswers('noPriorInsurance', questions)}
                            label={''} styleName={''} onChange={function () {}}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Burglar Alarm'} styleName={''} name={'burglarAlarm'} disabled />
                          <div className="flex-child discounts-burglar-alarm">
                            <RadioField
                              disabled={appState.data.isCalculated}
                              name={'burglarAlarmNew'} styleName={''} label={''} onChange={function () {}} segmented answers={[
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
                        <div className="form-group-double-element">
                          <TextField label={'Fire Alarm'} styleName={''} name={'fireAlarm'} disabled />
                          <div className="flex-child discounts-fire-alarm">
                            <RadioField
                              disabled={appState.data.isCalculated}
                              name={'fireAlarmNew'} styleName={''} label={''} onChange={function () {}} segmented answers={[
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
                        <div className="form-group-double-element">
                          <TextField label={'Sprinkler'} styleName={''} name={'sprinkler'} disabled />
                          <div className="flex-child discounts-sprinkler">
                            <RadioField
                              disabled={appState.data.isCalculated}
                              name={'sprinklerNew'} label={''} styleName={''} onChange={function () {}} segmented answers={[
                                {
                                  answer: 'N',
                                  label: 'No'
                                }, {
                                  answer: 'A',
                                  label: 'A'
                                }, {
                                  answer: 'B',
                                  label: 'B'
                                }
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="flex-parent">
                      {/* Col1 */}
                      <div className="flex-child col3">
                        <div className="form-group labels">
                          <label /><label>Current</label><label>New</label>
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Roof Covering'} styleName={''} name={'roofCovering'} disabled />
                          <SelectField
                            label={''}
                            isDisabled={appState.data.isCalculated}
                            name={'roofCoveringNew'}
                            answers={getAnswers('roofCovering', questions)}
                            component="select" styleName={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Roof Deck Attachment'} styleName={''} name={'roofDeckAttachment'} disabled />
                          <SelectField
                            label={''}
                            isDisabled={appState.data.isCalculated}
                            name={'roofDeckAttachmentNew'}
                            answers={getAnswers('roofDeckAttachment', questions)}
                            component="select" styleName={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Roof to Wall Attachment'} styleName={''} name={'roofToWallConnection'} disabled />
                          <SelectField
                            label={''}
                            isDisabled={appState.data.isCalculated}
                            name={'roofToWallConnectionNew'}
                            answers={getAnswers('roofToWallConnection', questions)}
                            component="select" styleName={'weakestRoofWallConnect'} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Roof Geometry'} styleName={''} name={'roofGeometry'} disabled />
                          <SelectField
                            label={''}
                            isDisabled={appState.data.isCalculated}
                            name={'roofGeometryNew'}
                            answers={getAnswers('roofGeometry', questions)}
                            component="select" styleName={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Secondary Water Resistance (SWR)'} styleName={''} name={'secondaryWaterResistance'} disabled />
                          <SelectField
                            label={''}
                            isDisabled={appState.data.isCalculated}
                            name={'secondaryWaterResistanceNew'}
                            answers={getAnswers('secondaryWaterResistance', questions)}
                            component="select" styleName={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Opening Protection'} styleName={''} name={'openingProtection'} disabled />
                          <SelectField
                            label={''}
                            isDisabled={appState.data.isCalculated}
                            name={'openingProtectionNew'}
                            answers={getAnswers('openingProtection', questions)}
                            component="select" styleName={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Electronic Delivery'} styleName={''} name={'electronicDelivery'} disabled />
                          <div className="flex-child discounts-electronic-delivery">
                            <RadioField
                              disabled={appState.data.isCalculated}
                              name={'electronicDeliveryNew'} styleName={''} label={''} onChange={function () {}} segmented answers={[
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
                      </div>

                      {/* Col2 */}
                      <div className="flex-child col3">

                        <div className="form-group labels">
                          <label /><label>Current</label><label>New</label>
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'FBC Wind Speed'} styleName={''} name={'floridaBuildingCodeWindSpeed'} disabled />
                          <TextField validations={['required']} label={''} styleName={''} name={'floridaBuildingCodeWindSpeedNew'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'FBC Wind Speed Design'} styleName={''} name={'floridaBuildingCodeWindSpeedDesign'} disabled />
                          <TextField validations={['required']} label={''} styleName={''} name={'floridaBuildingCodeWindSpeedDesignNew'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Terrain'} styleName={''} name={'terrain'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'terrainNew'}
                            answers={getAnswers('terrain', questions)}
                            component="select" label={''} styleName={'propertyTerrain'} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label="Internal Pressure Design" styleName={''} name={'internalPressureDesign'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'internalPressureDesignNew'}
                            answers={getAnswers('internalPressureDesign', questions)}
                            component="select" label={''} styleName={''} onChange={function () {}} validations={['required']}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Wind Borne Debris Region (WBDR)'} styleName={''} name={'windBorneDebrisRegion'} disabled />
                          <div className="form-group-double-element">
                            <RadioField
                              label={''}
                              disabled={appState.data.isCalculated}
                              validations={['required']} name={'windBorneDebrisRegionNew'} styleName={''} onChange={function () {}} segmented answers={[
                                {
                                  answer: 'Yes',
                                  label: 'Yes'
                                }, {
                                  answer: 'No',
                                  label: 'No'
                                }, {
                                  answer: 'Other',
                                  label: 'Other'
                                }
                              ]}
                            />
                          </div>
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Wind Mit Factor'} styleName={''} name={'windMitFactor'} disabled />
                          <TextField validations={['required']} styleName={''} label={''} name={'windMitFactorNew'} disabled />
                        </div>

                      </div>

                    </div>
                  </section>
                  <section>
                    <a name="home" />
                    <h3>Home / Location</h3>
                    <div className="flex-parent">
                      {/* Col1 */}
                      <div className="flex-child col3">
                        <div className="form-group labels">
                          <label /><label>Current</label><label>New</label>
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Year Home Built'} styleName={''} name="yearBuilt" disabled />
                          <TextField
                            styleName={''} label={''} name="yearBuiltNew" disabled={appState.data.isCalculated}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Construction'} styleName={''} name="constructionType" disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'constructionTypeNew'}
                            answers={getAnswers('constructionType', questions)}
                            component="select" styleName={''} label={''}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Protection Class'} styleName={''} name={'protectionClass'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'protectionClassNew'}
                            answers={getAnswers('protectionClass', questions)}
                            component="select" label={''} styleName={''}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'BCEG'} styleName={''} name={'buildingCodeEffectivenessGrading'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'buildingCodeEffectivenessGradingNew'}
                            answers={getAnswers('buildingCodeEffectivenessGrading', questions)}
                            component="select" styleName={''} label={''}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Family Units'} styleName={''} name={'familyUnits'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'familyUnitsNew'}
                            answers={getAnswers('familyUnits', questions)}
                            component="select" label={''} styleName={''} onChange={function () {}}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Flood Zone'} styleName={''} name={'floodZone'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'floodZoneNew'}
                            answers={getAnswers('floodZone', questions)}
                            component="select" label={''} styleName={''} onChange={function () {}} answers={[
                              {
                                answer: 'A',
                                label: 'A'
                              }, {
                                answer: 'B',
                                label: 'B'
                              }
                            ]}
                          />
                        </div>
                      </div>
                      {/* Col2 */}
                      <div className="flex-child col3">
                        <div className="form-group labels">
                          <label /><label>Current</label><label>New</label>
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Tidal Waters Dist.'} styleName={''} name={'distanceToTidalWater'} disabled />
                          <TextField validations={['required']} label={''} styleName={''} name={'distanceToTidalWaterNew'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Fire Hydrant Dist.'} styleName={''} name={'distanceToFireHydrant'} disabled />
                          <TextField label={''} styleName={''} name={'distanceToFireHydrantNew'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Fire Station Dist.'} styleName={''} name={'distanceToFireStation'} disabled />
                          <TextField label={''} styleName={''} name={'distanceToFireStationNew'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Residence Type'} styleName={''} name={'residenceType'} disabled />
                          <SelectField
                            isDisabled={appState.data.isCalculated}
                            name={'residenceTypeNew'}
                            answers={getAnswers('residenceType', questions)}
                            component="select" label={''} styleName={''} onChange={function () {}}
                          />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Sq. Ft. of Home'} styleName={''} name={'squareFeet'} disabled />
                          <TextField validations={['required']} label={''} styleName={''} name={'squareFeetNew'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="form-group-double-element">
                          <TextField label={'Year Roof Built'} styleName={''} name="yearOfRoof" disabled />
                          <TextField styleName={''} label={''} name="yearOfRoofNew" disabled={appState.data.isCalculated} />
                        </div>
                      </div>
                    </div>
                  </section>
                  <section>
                    <h3>Previous Endorsements</h3>
                    <BootstrapTable data={endorsementHistory || []}>
                      <TableHeaderColumn dataField="effectiveDate" isKey dataFormat={dateFormatter}>Date</TableHeaderColumn>
                      <TableHeaderColumn dataField="netCharge" dataFormat={amountFormatter}>Amount</TableHeaderColumn>
                      <TableHeaderColumn dataField="transactionType" dataAlign="right">Type</TableHeaderColumn>
                    </BootstrapTable>
                  </section>
                  <section>
                    <a name="policy" />
                    <div className="flex-parent col2">
                      {/* Col1 */}
                      <div className="flex-child">
                        <h3>Primary Policyholder</h3>
                        <div className="flex-parent col2">
                          <TextField validations={['required']} label={'First Name'} styleName={''} name={'pH1FirstName'} disabled={appState.data.isCalculated} />
                          <TextField validations={['required']} label={'Last Name'} styleName={''} name={'pH1LastName'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="flex-parent col2">
                          <PhoneField validations={['required', 'phone']} label={'Primary Phone'} styleName={''} name={'pH1phone'} disabled={appState.data.isCalculated} />
                          <PhoneField validations={['phone']} label={'Secondary Phone'} styleName={''} name={'pH1secondaryPhone'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="flex-parent">
                          <TextField validations={['required']} label={'Email Address'} styleName={''} name={'pH1email'} disabled={appState.data.isCalculated} />
                        </div>
                      </div>
                      {/* Col2 */}
                      <div className="flex-child">
                        <h3>Secondary Policyholder</h3>
                        <div className="flex-parent col2">
                          <TextField validations={['required']} label={'First Name'} styleName={''} name={'pH2FirstName'} disabled={appState.data.isCalculated} />
                          <TextField validations={['required']} label={'Last Name'} styleName={''} name={'pH2LastName'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="flex-parent col2">
                          <PhoneField validations={['required', 'phone']} label={'Primary Phone'} styleName={''} name={'pH2phone'} disabled={appState.data.isCalculated} />
                          <PhoneField validations={['phone']} label={'Secondary Phone'} styleName={''} name={'pH2secondaryPhone'} disabled={appState.data.isCalculated} />
                        </div>
                        <div className="flex-parent">
                          <TextField validations={['required']} label={'Email Address'} styleName={''} name={'pH2email'} disabled={appState.data.isCalculated} />
                        </div>
                      </div>
                    </div>
                  </section>
                  <section>
                    <a name="addresses" />
                    <h3>Mailing Address</h3>
                    <div className="flex-parent wrap">
                      <div className="address">
                        <TextField label={'Address 1'} styleName={''} name={'address1New'} disabled={appState.data.isCalculated} />
                      </div>
                      <div className="address">
                        <TextField label={'Address 2'} styleName={''} name={'address2New'} disabled={appState.data.isCalculated} />
                      </div>
                      <div className="city">
                        <TextField label={'City'} styleName={''} name={'cityNew'} disabled={appState.data.isCalculated} />
                      </div>
                      <div className="state">
                        <TextField label={'State'} styleName={''} name={'stateNew'} disabled={appState.data.isCalculated} />
                      </div>
                      <div className="zip">
                        <TextField label={'Zip'} styleName={''} name={'zipNew'} disabled={appState.data.isCalculated} />
                      </div>
                    </div>
                  </section>
                  <section>
                    <h3>Property Address</h3>
                    <div className="flex-parent wrap">
                      <div className="address">
                        <TextField label={'Address 1'} styleName={''} name={'propertyAddress1New'} disabled={appState.data.isCalculated} />
                      </div>
                      <div className="address">
                        <TextField label={'Address 2'} styleName={''} name={'propertyAddress2New'} disabled={appState.data.isCalculated} />
                      </div>
                      <div className="city">
                        <TextField label={'City'} styleName={''} name={'propertyCityNew'} disabled={appState.data.isCalculated} />
                      </div>
                      <div className="state">
                        <TextField label={'State'} styleName={''} name={'propertyStateNew'} disabled={appState.data.isCalculated} />
                      </div>
                      <div className="zip">
                        <TextField label={'Zip'} styleName={''} name={'propertyZipNew'} disabled={appState.data.isCalculated} />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="endo-results-calc">
                <div className="flex-parent">
                  <div className="form-group">
                    <DateField validations={['date']} label={'Effective Date'} name={'effectiveDate'} />
                  </div>
                  <div className="form-group">
                    <label>New End. Amount</label>
                    <input type="numeric" disabled onChange={function () {}} value="" />
                  </div>
                  <div className="form-group">
                    <label>New End Premium</label>
                    <input type="numeric" disabled onChange={function () {}} value="" />
                  </div>
                  <div className="form-group">
                    <label>New Annual Premium</label>
                    <input type="numeric" disabled onChange={function () {}} value="" />
                  </div>
                  { /* <Link className="btn btn-secondary" to={'/policy/coverage'} >Cancel</Link> */ }
                  <button type="button" className="btn btn-secondary" onClick={() => cancel(this.props)}>Cancel</button>
                  {!appState.data.isCalculated && <button type="button" className="btn btn-primary" onClick={() => calculate(this.props)} disabled={pristine}>Review</button>}
                  { appState.data.isCalculated && <button type="submit" className="btn btn-primary">Save</button>}

                </div>
              </div>
            </div>
            <aside className="underwriting-validation">
              <h4 className="uw-validation-header">Underwriting Validation</h4>
            </aside>
          </div>
        </Form>
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
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

/**
------------------------------------------------
redux mapping
------------------------------------------------
*/
const mapStateToProps = state => ({
  tasks: state.cg,
  endorsementHistory: state.service.endorsementHistory,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Endorsements.values', {}),
  initialValues: handleInitialize(state),
  policy: handleGetPolicy(state),
  questions: state.questions
});

const mapDispatchToProps = dispatch => ({
  actions: {
    questionsActions: bindActionCreators(questionsActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Endorsements', enableReinitialize: true })(Endorsements));


  // const discountSurcharge = [
  //   {
  //     discountSurcharge: 'Wind Excluded',
  //     value: _.get(rating, 'windMitigationDiscount') === 0 ? 'No' : 'Yes'
  //   }, {
  //     discountSurcharge: 'Property Ever Rented',
  //     value: _.get(underwritingAnswers, 'rented.answer')
  //   }, {
  //     discountSurcharge: 'Seasonally Occupied',
  //     value: _.get(underwritingAnswers, 'monthsOccupied.answer')
  //   }, {
  //     discountSurcharge: 'No Prior Insurance',
  //     value: _.get(underwritingAnswers, 'noPriorInsuranceSurcharge.answer')
  //   }, {
  //     discountSurcharge: 'Burglar Alarm',
  //     value: _.get(property, 'burglarAlarm') ? 'Yes' : 'No'
  //   }, {
  //     discountSurcharge: 'Fire Alarm',
  //     value: _.get(property, 'fireAlarm') ? 'Yes' : 'No'
  //   }, {
  //     discountSurcharge: 'Sprinkler',
  //     value: _.get(property, 'sprinkler') === 'N' ? 'No' : 'Yes'
  //   }, {
  //     discountSurcharge: 'Wind Mit Factor',
  //     value: _.get(rating, 'windMitigationDiscount')
  //   }
  // ];

  // const coverageLimitsData = [
  //   {
  //     coverage: 'Dwelling',
  //     value: `$ ${_.get(coverageLimits, 'dwelling.amount')}`
  //   }, {
  //     coverage: 'Other Structures',
  //     value: `$ ${_.get(coverageLimits, 'otherStructures.amount')}`
  //   }, {
  //     coverage: 'Personal Property',
  //     value: `$ ${_.get(coverageLimits, 'personalProperty.amount')}`
  //   }, {
  //     coverage: 'Additional Living Expenses',
  //     value: `$ ${_.get(coverageLimits, 'lossOfUse.amount')}`
  //   }, {
  //     coverage: 'Personal Liability',
  //     value: `$ ${_.get(coverageLimits, 'personalLiability.amount')}`
  //   }, {
  //     coverage: 'Medical Payments',
  //     value: `$ ${_.get(coverageLimits, 'medicalPayments.amount')}`
  //   }
  // ];

  // const coverageOptionsData = [
  //   {
  //     coverage: 'Mold Property Limit',
  //     value: `$ ${_.get(coverageLimits, 'moldProperty.amount')}`
  //   }, {
  //     coverage: 'Mold Liability Limit',
  //     value: `$ ${_.get(coverageLimits, 'moldLiability.amount')}`
  //   }, {
  //     coverage: 'Personal Property Repl Cost',
  //     value: _.get(coverageOptions, 'personalPropertyReplacementCost.answer') ? 'Yes' : 'No'
  //   }, {
  //     coverage: 'Ordinance or Law Coverage',
  //     value: `${_.get(coverageLimits, 'ordinanceOrLaw.amount')}%`
  //   }, {
  //     coverage: 'Incidental Occ Main',
  //     value: _.get(coverageOptions, 'propertyIncidentalOccupanciesMainDwelling.answer') ? 'Yes' : 'No'
  //   }, {
  //     coverage: 'Incidental Occ Other',
  //     value: _.get(coverageOptions, 'propertyIncidentalOccupanciesOtherStructures.answer') ? 'Yes' : 'No'
  //   }
  // ];

  // const premium = [{
  //   premium: 'Current Premium',
  //   value: `$ ${_.get(rating, 'totalPremium')}`
  // }, {
  //   premium: 'Initial Premium',
  //   value: `$ ${_.get(rating, 'netPremium')}`
  // }];

  // const billing = [
  //   {
  //     coverage: 'Balance Due',
  //     value: `$ ${_.get(rating, 'totalPremium')}`
  //   }, {
  //     coverage: 'Next Payment',
  //     value: `$ ${_.get(rating, 'totalPremium')}`
  //   }, {
  //     coverage: 'Bill To',
  //     value: _.get(props.policy, 'billToType')
  //   }, {
  //     coverage: 'Bill Plan',
  //     value: _.get(props.policy, 'billPlan')
  //   }
  // ];

  // const deductibleData = [
  //   {
  //     displayText: 'All Other Perils',
  //     amount: `$ ${_.get(deductibles, 'allOtherPerils.amount')}`
  //   }, {
  //     displayText: 'Hurricane',
  //     amount: `${_.get(deductibles, 'hurricane.amount')}%`
  //   }, {
  //     displayText: 'Sinkhole',
  //     amount: `${_.get(deductibles, 'sinkhole.amount') ? `${_.get(deductibles, 'sinkhole.amount')}%` : 'No'}`
  //   }
  // ];
