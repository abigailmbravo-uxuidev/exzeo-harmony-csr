import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Prompt } from 'react-router-dom';
import { reduxForm, propTypes, change, formValueSelector, FormSection } from 'redux-form';
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
import Address from './Address';
import ResultsCalculator from './ResultsCalculator';
import GoToMenu from './GoToMenu';
import UnderwritingValidations from './UnderwritingValidations';

export const getNewPolicyNumber = (state) => {
  const taskData = (state.cg && state.cg.endorsePolicyModelSave)
    ? state.cg.endorsePolicyModelSave.data
    : null;
  if (!taskData || !taskData.model || !taskData.model.variables) { return null; }

  const policy = _.find(taskData.model.variables, { name: 'retrievePolicy' });

  return policy
    ? policy.value[0]
      ? policy.policyNumber : null
    : null;
};

export const handleInitialize = ({ service = {}, questions = [] }) => {
  const { latestPolicy, getRate } = service;
  const policy = latestPolicy || {};
  const rating = getRate || {};
  const values = {
    policyHolders: [{}, {}],
    property: { windMitigation: {}, physicalAddress: {} },
    policyHolderMailingAddress: {},
    coverageLimits: {
      dwelling: {},
      otherStructures: {},
      personalProperty: {},
      lossOfUse: {},
      medicalPayments: {},
      moldProperty: {},
      personalLiability: {},
      moldLiability: {},
      ordinanceOrLaw: {}
    },
    deductibles: {
      allOtherPerils: {},
      hurricane: {},
      sinkhole: {}

    },
    coverageOptions: {
      sinkholePerilCoverage: {},
      propertyIncidentalOccupanciesMainDwelling: {},
      propertyIncidentalOccupanciesOtherStructures: {},
      liabilityIncidentalOccupancies: {},
      personalPropertyReplacementCost: {}
    },
    underwritingAnswers: {
      rented: {},
      monthsOccupied: {},
      noPriorInsuranceSurcharge: {}

    },
    rating: {
      worksheet: {
        elements: {
          windMitigationFactors: {

          }
        }
      }
    }
  };
  const dwelling = _.get(policy, 'coverageLimits.dwelling.amount');
  const otherStructures = _.get(policy, 'coverageLimits.otherStructures.amount');
  const personalProperty = _.get(policy, 'coverageLimits.personalProperty.amount');
  const hurricane = _.get(policy, 'deductibles.hurricane.amount');
  // Bail if we don't have all our info
  if (!latestPolicy && !getRate) { return values; }
  // Set some things up
  values.uwExceptions = _.get(policy, 'underwritingExceptions');
  values.transactionType = 'Endorsement';
  values.dwellingMin = _.get(policy, 'coverageLimits.dwelling.minAmount');
  values.dwellingMax = _.get(policy, 'coverageLimits.dwelling.maxAmount');
  values.billToType = _.get(policy, 'billToType');
  values.billPlan = _.get(policy, 'billPlan');

  // Coverage Top Left
  values.clearFields = false;
  values.policyID = policy._id;
  values.endorsementDate = endorsementUtils.setEndorsementDate(policy.effectiveDate, policy.endDate);
  values.coverageLimits.dwelling.amount = dwelling;
  values.coverageLimits.otherStructures.amount = otherStructures;
  values.coverageLimits.otherStructures.percentage = endorsementUtils.calculatePercentage(otherStructures, dwelling);
  values.coverageLimits.personalProperty.amount = personalProperty;
  values.coverageLimits.personalProperty.percentage = endorsementUtils.calculatePercentage(personalProperty, dwelling);
  values.coverageLimits.lossOfUse.amount = _.get(policy, 'coverageLimits.lossOfUse.amount');
  values.coverageLimits.personalLiability.amount = _.get(policy, 'coverageLimits.personalLiability.amount');
  values.coverageLimits.medicalPayments.amount = _.get(policy, 'coverageLimits.medicalPayments.amount');
  values.coverageLimits.moldProperty.amount = _.get(policy, 'coverageLimits.moldProperty.amount');
  values.coverageLimits.moldLiability.amount = _.get(policy, 'coverageLimits.moldLiability.amount');
  values.deductibles.allOtherPerils.amount = _.get(policy, 'deductibles.allOtherPerils.amount');
  values.deductibles.hurricane.amount = hurricane;
  values.deductibles.hurricane.calculatedAmount = _.get(policy, 'deductibles.hurricane.calculatedAmount');
  values.coverageOptions.sinkholePerilCoverage.initialValue = _.get(policy, 'coverageOptions.sinkholePerilCoverage.answer') ? `10% of ${getQuestionName('dwellingAmount', questions)}` : 'Coverage Excluded';
  values.coverageOptions.sinkholePerilCoverage.answer = _.get(policy, 'coverageOptions.sinkholePerilCoverage.answer');
  // Coverage Top Right
  values.coverageOptions.personalPropertyReplacementCost.answer = _.get(policy, 'coverageOptions.personalPropertyReplacementCost.answer', false);
  values.coverageLimits.ordinanceOrLaw.amount = _.get(policy, 'coverageLimits.ordinanceOrLaw.amount');
  values.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer = _.get(policy, 'coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer', false);
  values.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer = _.get(policy, 'coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer', false);
  values.coverageOptions.liabilityIncidentalOccupancies.answer = _.get(policy, 'coverageOptions.liabilityIncidentalOccupancies.answer', false);
  values.property.townhouseRowhouse = _.get(policy, 'property.townhouseRowhouse');
  values.rating.worksheet.elements.windMitigationFactors.windMitigationDiscount = _.get(policy, 'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount') === 0 ? 'No' : 'Yes';
  values.underwritingAnswers.rented.answer = _.get(policy, 'underwritingAnswers.rented.answer');
  values.underwritingAnswers.monthsOccupied.answer = _.get(policy, 'underwritingAnswers.monthsOccupied.answer');
  values.underwritingAnswers.noPriorInsuranceSurcharge.answer = _.get(policy, 'underwritingAnswers.noPriorInsuranceSurcharge.answer');
  values.property.burglarAlarm = _.get(policy, 'property.burglarAlarm');
  values.property.fireAlarm = _.get(policy, 'property.fireAlarm');
  values.property.sprinkler = _.get(policy, 'property.sprinkler');
  // Wind Mitigation
  values.property.windMitigation.roofCovering = _.get(policy, 'property.windMitigation.roofCovering');
  values.property.windMitigation.roofDeckAttachment = _.get(policy, 'property.windMitigation.roofDeckAttachment');
  values.property.windMitigation.roofToWallConnection = _.get(policy, 'property.windMitigation.roofToWallConnection');
  values.property.windMitigation.roofGeometry = _.get(policy, 'property.windMitigation.roofGeometry');
  values.property.windMitigation.secondaryWaterResistance = _.get(policy, 'property.windMitigation.secondaryWaterResistance');
  values.property.windMitigation.openingProtection = _.get(policy, 'property.windMitigation.openingProtection');
  values.property.windMitigation.floridaBuildingCodeWindSpeed = _.get(policy, 'property.windMitigation.floridaBuildingCodeWindSpeed');
  values.property.windMitigation.floridaBuildingCodeWindSpeedDesign = _.get(policy, 'property.windMitigation.floridaBuildingCodeWindSpeedDesign');
  values.property.windMitigation.terrain = _.get(policy, 'property.windMitigation.terrain');
  values.property.windMitigation.internalPressureDesign = _.get(policy, 'property.windMitigation.internalPressureDesign');
  values.property.windMitigation.windBorneDebrisRegion = _.get(policy, 'property.windMitigation.windBorneDebrisRegion');
  values.property.windMitigation.roofToWallConnection = _.get(policy, 'property.windMitigation.roofToWallConnection');
  // Display only values
  const windMitigationDiscount = _.get(policy, 'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount');
  const updatedRatingWindMitDiscount = _.get(rating, 'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount');
  values.windMitFactor = windMitigationDiscount;
  values.windMitFactorRated = updatedRatingWindMitDiscount || windMitigationDiscount;
  // Home/Location Bottom Left
  values.property.yearBuilt = _.get(policy, 'property.yearBuilt');
  values.property.constructionType = _.get(policy, 'property.constructionType');
  values.property.yearOfRoof = _.get(policy, 'property.yearOfRoof') || '';
  values.property.protectionClass = _.get(policy, 'property.protectionClass', '');
  values.property.buildingCodeEffectivenessGrading = _.get(policy, 'property.buildingCodeEffectivenessGrading', '');
  values.buildingCodeEffectivenessGradingNew = values.property.buildingCodeEffectivenessGrading;
  values.property.familyUnits = _.get(policy, 'property.familyUnits', '');
  // Home/Location Bottom Right
  values.property.distanceToTidalWater = _.get(policy, 'property.distanceToTidalWater', '');
  values.property.distanceToFireHydrant = _.get(policy, 'property.distanceToFireHydrant', '');
  values.property.distanceToFireStation = _.get(policy, 'property.distanceToFireStation', '');
  values.property.residenceType = _.get(policy, 'property.residenceType', '');
  values.property.squareFeet = _.get(policy, 'property.squareFeet', '');
  values.property.floodZone = _.get(policy, 'property.floodZone', '');
  // Policyholders
  values.policyHolders = _.get(policy, 'policyHolders', []);
  // Mailing Address
  values.policyHolderMailingAddress.address1 = _.get(policy, 'policyHolderMailingAddress.address1');
  values.policyHolderMailingAddress.address2 = _.get(policy, 'policyHolderMailingAddress.address2');
  values.policyHolderMailingAddress.city = _.get(policy, 'policyHolderMailingAddress.city');
  values.policyHolderMailingAddress.state = _.get(policy, 'policyHolderMailingAddress.state');
  values.policyHolderMailingAddress.zip = _.get(policy, 'policyHolderMailingAddress.zip');
  // Property Address
  values.property.physicalAddress.address1 = _.get(policy, 'property.physicalAddress.address1');
  values.property.physicalAddress.address2 = _.get(policy, 'property.physicalAddress.address2');
  values.property.physicalAddress.city = _.get(policy, 'property.physicalAddress.city');
  values.property.physicalAddress.state = _.get(policy, 'property.physicalAddress.state');
  values.property.physicalAddress.zip = _.get(policy, 'property.physicalAddress.zip');

  return values;
};

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



    // TODO this can be handled by normalizing the two fields that affect the third.
    if (
      _.isEqual(this.props.fieldValues.propertyIncidentalOccupanciesMainDwellingNew, nextProps.fieldValues.propertyIncidentalOccupanciesMainDwellingNew) ||
      _.isEqual(this.props.fieldValues.propertyIncidentalOccupanciesOtherStructuresNew, nextProps.fieldValues.propertyIncidentalOccupanciesOtherStructuresNew)) {
      const setLiabilityIncidentalOccupanciesNew =
        nextProps.fieldValues.propertyIncidentalOccupanciesMainDwellingNew ||
        nextProps.fieldValues.propertyIncidentalOccupanciesOtherStructuresNew;

      nextProps.dispatch(change('Endorsements', 'coverageOptions.liabilityIncidentalOccupancies.answer', setLiabilityIncidentalOccupanciesNew));
    }
  }

  clearCalculate = () => {
    const { change: changeF, actions: { serviceActions }, policy } = this.props;
    const endorsementDate = endorsementUtils.setEndorsementDate(policy.effectiveDate, policy.endDate);
    changeF('endorsementDate', endorsementDate);
    changeF('newEndorsementAmount', '');
    changeF('newEndorsementPremium', '');
    changeF('newAnnualPremium', '');
    serviceActions.clearRate();
    this.setState({ isCalculated: false });
  };

  resetCalculate = () => {
    const { change: changeF, getRate } = this.props;
    changeF('newEndorsementAmount', getRate.endorsementAmount || 0);
    changeF('newEndorsementPremium', getRate.newCurrentPremium || '');
    changeF('newAnnualPremium', getRate.newAnnualPremium || '');
    changeF('windMitFactorNew', _.get(getRate, 'worksheet.elements.windMitigationFactors.windMitigationDiscount'));
  };

  calculate = async (data, dispatch, props) => {
    const { serviceActions } = props.actions;
    try {
      await serviceActions.getRate(data, props);
      this.setState({ isCalculated: true }, this.resetCalculate);
    } catch (error) {
      this.setState({ isCalculated: false });
    }
  };

  save = async (data, dispatch, props) => {
    await props.actions.serviceActions.submitEndorsementForm(data, props);
    this.setState({ isCalculated: false });
    this.resetCalculate();
    this.props.reset();
  };

  setPHToggle = () => {
    const { change: changeF, selectedValues } = this.props;
    if (selectedValues.clearFields) {
      changeF('clearFields', false);
    }
  };

  clearSecondaryPolicyholder = (value) => {
    const { change: changeF, initialValues } = this.props;
    if (!value) {
      changeF('policyHolders[1].emailAddress', initialValues.policyHolders[1].emailAddress);
      changeF('policyHolders[1].firstName', initialValues.policyHolders[1].firstName);
      changeF('policyHolders[1].lastName', initialValues.policyHolders[1].lastName);
      changeF('policyHolders[1].primaryPhoneNumber', initialValues.policyHolders[1].primaryPhoneNumber);
      changeF('policyHolders[1].secondaryPhoneNumber', initialValues.policyHolders[1].secondaryPhoneNumber);
    } else {
      changeF('policyHolders[1].emailAddress', '');
      changeF('policyHolders[1].firstName', '');
      changeF('policyHolders[1].lastName', '');
      changeF('policyHolders[1].primaryPhoneNumber', '');
      changeF('policyHolders[1].secondaryPhoneNumber', '');
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

    if (fieldValues.coverageLimits.otherStructures.amount !== 'other') {
      changeF('coverageLimits.otherStructures.amount', endorsementUtils.setPercentageOfValue(roundedDwellingAmount, fieldValues.coverageLimits.otherStructures.amount));
    }
    if (fieldValues.coverageLimits.personalProperty.amount !== 'other') {
      changeF('coverageLimits.personalProperty.amount', endorsementUtils.setPercentageOfValue(roundedDwellingAmount, fieldValues.coverageLimits.personalProperty.amount));
    }
    changeF('deductibles.hurricane.calculatedAmount', endorsementUtils.setPercentageOfValue(roundedDwellingAmount, fieldValues.deductibles.hurricane.calculatedAmount));
    changeF('coverageLimits.lossOfUse.amount', endorsementUtils.setPercentageOfValue(roundedDwellingAmount, 10));

    return value;
  };

  normalizePersonalPropertyDependencies = (value, allValues, field, dependency) => {
    if (Number.isNaN(value)) return;
    this.setCalculate();
    const { change: changeF, initialValues } = this.props;

    if (value === 0) {
      changeF('coverageOptions.personalPropertyReplacementCost.answer', false);
    } else {
      changeF('coverageOptions.personalPropertyReplacementCost.answer', initialValues.coverageOptions.personalPropertyReplacementCost.answer || false);
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

    const mappedEndorsementHistory = endorsementHistory && endorsementHistory.map((endorsement) => {
      endorsement.netChargeFormat = premiumEndorsementList.some(pe => pe === endorsement.transactionType)
        ? endorsementUtils.premiumAmountFormatter(endorsement.netCharge)
        : '';
      return endorsement;
    });

    const canPremiumEndorse = userProfile.resources
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

        {initialValues.endorsementDate ?
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

                    <FormSection name="policyHolderMailingAddress">
                      <Address name="addresses" sectionId="addresses" header="Mailing Address" />
                    </FormSection>

                    <FormSection name="property.physicalAddress">
                      <Address header="Property Address" />
                    </FormSection>

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
                    type="button"
                    className="btn btn-secondary"
                    tabIndex="0"
                    onClick={() => this.clearCalculate()}
                    onKeyPress={event => event.charCode === 13 && this.setCalculate()}
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

Endorsements.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape().isRequired,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ isSubmitting: PropTypes.bool })
  }).isRequired
};

const defaultObj = {};
const defaultArr = [];
const selector = formValueSelector('Endorsements');
const mapStateToProps = state => ({
  tasks: state.cg,
  endorsementHistory: state.service.endorsementHistory || defaultArr,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Endorsements.values', defaultObj),
  initialValues: handleInitialize(state),
  policy: state.service.latestPolicy || defaultObj,
  questions: state.questions,
  underwritingQuestions: state.service.underwritingQuestions,
  getRate: state.service.getRate,
  newPolicyNumber: getNewPolicyNumber(state),
  summaryLedger: state.service.getSummaryLedger || defaultObj,
  zipcodeSettings: state.service.getZipcodeSettings,
  userProfile: state.authState.userProfile || defaultObj,
  selectedValues: selector(state, 'coverageLimits.personalProperty.amount', 'clearFields')
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
