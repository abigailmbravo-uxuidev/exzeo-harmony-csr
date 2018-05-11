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
import { premiumEndorsementList } from './constants/endorsementTypes';
import endorsementUtils from '../../../utilities/endorsementModel';
import { getQuestionName } from '../../../utilities/forms';

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

export const getNewPolicyNumber = (state) => {
  const taskData = (state.cg && state.cg.endorsePolicyModelSave)
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

export const save = async (data, dispatch, props) => {
  props.actions.cgActions.submitEndorsement(data, props);

  this.setState({ isCalculated: false });
};


const premiumAmountFormatter = cell => Number(cell).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export class Endorsements extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCalculated: false
    };
  }

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
    // TODO make this happen only when we call **calculate**
    if (!_.isEqual(this.props.getRate, nextProps.getRate) && nextProps.getRate && nextProps.getRate.newAnnualPremium) {
      const { getRate } = nextProps;

      nextProps.dispatch(batchActions([
        change('Endorsements', 'newEndorsementAmount', getRate.endorsementAmount || 0),
        change('Endorsements', 'newEndorsementPremium', getRate.newCurrentPremium || ''),
        change('Endorsements', 'newAnnualPremium', getRate.newAnnualPremium || ''),
        change('Endorsements', 'windMitFactorNew', _.get(getRate, 'worksheet.elements.windMitigationFactors.windMitigationDiscount'))
      ]));
    }

    // TODO this only happens after SAVE or SUBMIT
    if (nextProps.policy && (nextProps.policy.policyID !== this.props.policy.policyID)) {
      this.setCalculate();
      this.props.reset();
      this.props.actions.serviceActions.getEndorsementHistory(nextProps.policy.policyNumber);
    }

    // TODO this only happens after SAVE or SUBMIT
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

    // TODO this only happens after save and checks for SUBMIT FAILED
    if (this.props.tasks && this.props.tasks.endorsePolicyModelSave && this.props.tasks.endorsePolicyModelSave.data &&
      nextProps.tasks && nextProps.tasks.endorsePolicyModelSave && nextProps.tasks.endorsePolicyModelSave.data &&
      !_.isEqual(this.props.tasks.endorsePolicyModelSave.data, nextProps.tasks.endorsePolicyModelSave.data)) {
      if (nextProps.tasks.endorsePolicyModelSave.data.result && nextProps.tasks.endorsePolicyModelSave.data.result.status !== 200) {
        nextProps.dispatch(errorActions.setAppError({ message: nextProps.tasks.endorsePolicyModelSave.data.result.result }));
        this.setCalculate(nextProps);
      }
    }

    // TODO this can be handled by normalizing the two fields that affect the third.
    if (
      _.isEqual(this.props.fieldValues.propertyIncidentalOccupanciesMainDwellingNew, nextProps.fieldValues.propertyIncidentalOccupanciesMainDwellingNew) ||
      _.isEqual(this.props.fieldValues.propertyIncidentalOccupanciesOtherStructuresNew, nextProps.fieldValues.propertyIncidentalOccupanciesOtherStructuresNew)) {
      const setLiabilityIncidentalOccupanciesNew =
        nextProps.fieldValues.propertyIncidentalOccupanciesMainDwellingNew ||
        nextProps.fieldValues.propertyIncidentalOccupanciesOtherStructuresNew;

      nextProps.dispatch(change('Endorsements', 'liabilityIncidentalOccupanciesNew', setLiabilityIncidentalOccupanciesNew));
    }
  }

  calculate = async (data, dispatch, props) => {
    const { serviceActions } = props.actions;
    try {
      await serviceActions.getRate(data, props);
      this.setState({ isCalculated: true });
    } catch (error) {
      this.setState({ isCalculated: false });
    }
  };

  save = async (data, dispatch, props) => {
    await props.actions.cgActions.submitEndorsement(data, props);

    this.setState({ isCalculated: false });
  };

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

  setCalculate = () => {
    const { isCalculated } = this.state;
    if (!isCalculated) return;

    const { actions: { serviceActions } } = this.props;
    serviceActions.clearRate();
    this.setState({ isCalculated: false });
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

    const fieldValue = endorsementUtils.setPercentageOfValue(allValues[dependency], value);
    changeF(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  normalizeDependencies = (value, allValues, field, dependency) => {
    if (Number.isNaN(value)) return;
    this.setCalculate();
    const { change: changeF } = this.props;
    const fieldValue = endorsementUtils.setPercentageOfValue((allValues[dependency]), value);

    changeF(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  render() {
    const {
      dirty,
      endorsementHistory,
      handleSubmit,
      initialValues,
      selectedFields = {},
      submitting,
      pristine,
      policy,
      questions,
      underwritingQuestions,
      userProfile
    } = this.props;
    const { isCalculated } = this.state;

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
        {this.props.submitting && <Loader />}

        {initialValues.endorsementDateNew ?
          <form
            id="Endorsements"
            className="content-wrapper"
            onSubmit={isCalculated ? handleSubmit(this.save) : handleSubmit(this.calculate)}
            onKeyPress={e => (e.key === 'Enter' && e.target.type !== 'submit') && e.preventDefault()}
          >

            <div className="route-content">
              <div className="endorsements">
                <GoToMenu />
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
                    <WindMitigation questions={questions} />
                    <HomeLocation questions={questions} />
                    <PreviousEndorsements mappedEndorsementHistory={mappedEndorsementHistory} />
                    <PolicyHolder
                      clearSecondaryPolicyholder={this.clearSecondaryPolicyholder}
                      setPHToggle={this.setPHToggle}
                      policyHolders={policy.policyHolders}
                    />
                    <MailingAddress />
                    <PropertyAddress />
                  </div>
                </div>
                <ResultsCalculator
                  min={policy.effectiveDate}
                  max={policy.endDate}
                  setCalculate={this.setCalculate}
                >
                  {/* <Link className="btn btn-secondary" to={'/policy/coverage'} >Cancel</Link> */}
                  <button
                    id="cancel-button"
                    tabIndex="0"
                    type="button"
                    className="btn btn-secondary"
                    onKeyPress={(event) => {
                            if (event.charCode === 13) {
                              this.setCalculate();
                            }
                          }}
                    onClick={() => this.setCalculate()}
                  >Cancel
                  </button>
                  <button
                    type="submit"
                    tabIndex="0"
                    className="btn btn-primary"
                    disabled={(!isCalculated && pristine) || submitting}
                  >{isCalculated ? 'Save' : 'Review'}</button>
                </ResultsCalculator>

              </div>

              <UnderwritingValidations />

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
