import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Prompt } from 'react-router-dom';
import { reduxForm, propTypes, formValueSelector, FormSection } from 'redux-form';
import { premiumEndorsementList } from './constants/endorsementTypes';
import endorsementUtils from '../../../utilities/endorsementModel';
import { getUIQuestions } from '../../../actions/questionsActions';
import {
  getUnderwritingQuestions,
  submitEndorsementForm,
  getEndorsementHistory,
  getZipcodeSettings,
  clearRate,
  getRate
} from '../../../actions/serviceActions';
// Component Sections
import PolicyConnect from '../../../containers/Policy';
import Footer from '../../Common/Footer';
import Loader from '../../Common/Loader';
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

export const handleInitialize = ({ service = {} }) => {
  const { latestPolicy } = service;
  const policy = latestPolicy || {};
  const defaultValues = {};
  // Bail if we don't have all our info
  if (!latestPolicy) return defaultValues;

  const dwelling = policy.coverageLimits.dwelling.amount;
  const otherStructures = policy.coverageLimits.otherStructures.amount;
  const personalProperty = policy.coverageLimits.personalProperty.amount;
  // Use the policy object as initial values for Endorsement Form
  const values = { ...policy };
  // Set some things up
  values.clearFields = false;
  values.transactionType = 'Endorsement';
  values.windMitFactor = policy.rating.worksheet.elements.windMitigationFactors.windMitigationDiscount;
  // Coverage Top Left
  values.endorsementDate = endorsementUtils.setEndorsementDate(policy.effectiveDate, policy.endDate);
  values.coverageLimits.otherStructures.percentage = endorsementUtils.calculatePercentage(otherStructures, dwelling);
  values.coverageLimits.personalProperty.percentage = endorsementUtils.calculatePercentage(personalProperty, dwelling);
  values.coverageOptions.personalPropertyReplacementCost.answer = policy.coverageOptions.personalPropertyReplacementCost.answer || false;
  values.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer = policy.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer || false;
  values.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer = policy.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer || false;
  values.coverageOptions.liabilityIncidentalOccupancies.answer = policy.coverageOptions.liabilityIncidentalOccupancies.answer || false;
  values.rating.worksheet.elements.windMitigationFactors.windMitigationDiscount = (policy.rating.worksheet.elements.windMitigationFactors.windMitigationDiscount === 0) ? 'No' : 'Yes';
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
};

export class Endorsements extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCalculated: false
    };
  }

  componentDidMount() {
    const { policy, getUnderwritingQuestions, getZipcodeSettings, getEndorsementHistory, getUIQuestions } = this.props;
    getUIQuestions('askToCustomizeDefaultQuoteCSR');
    if (policy && policy.policyNumber && policy.property && policy.property.physicalAddress) {
      getUnderwritingQuestions(policy.companyCode, policy.state, policy.product, policy.property);
      getEndorsementHistory(policy.policyNumber);
      getZipcodeSettings(policy.companyCode, policy.state, policy.product, policy.property.physicalAddress.zip);
    }
  }

  clearCalculate = () => {
    const { change, clearRate , policy } = this.props;
    const endorsementDate = endorsementUtils.setEndorsementDate(policy.effectiveDate, policy.endDate);
    change('endorsementDate', endorsementDate);
    change('newEndorsementAmount', '');
    change('newEndorsementPremium', '');
    change('newAnnualPremium', '');
    clearRate();
    this.setState({ isCalculated: false });
  };

  resetCalculate = () => {
    const { change, getRate } = this.props;
    change('newEndorsementAmount', getRate.endorsementAmount || 0);
    change('newEndorsementPremium', getRate.newCurrentPremium || '');
    change('newAnnualPremium', getRate.newAnnualPremium || '');
    change('windMitFactor', getRate.rating.worksheet.elements.windMitigationFactors.windMitigationDiscount);
  };

  calculate = async (data, dispatch, props) => {
    const { fetchRate } = props;
    try {
      await fetchRate(data, props);
      this.setState({ isCalculated: true }, this.resetCalculate);
    } catch (error) {
      this.setState({ isCalculated: false });
    }
  };

  save = async (data, dispatch, props) => {
    await props.submitEndorsementForm(data, props);
    this.setState({ isCalculated: false }, this.resetCalculate);

  };

  setPHToggle = () => {
    const { change, selectedValues } = this.props;
    if (selectedValues.clearFields) {
      change('clearFields', false);
    }
  };

  setSecondaryPolicyHolder = (value) => {
    const { change, initialValues } = this.props;
    if (!value) {
      change('policyHolders[1].emailAddress', initialValues.policyHolders[1].emailAddress);
      change('policyHolders[1].firstName', initialValues.policyHolders[1].firstName);
      change('policyHolders[1].lastName', initialValues.policyHolders[1].lastName);
      change('policyHolders[1].primaryPhoneNumber', initialValues.policyHolders[1].primaryPhoneNumber);
      change('policyHolders[1].secondaryPhoneNumber', initialValues.policyHolders[1].secondaryPhoneNumber);
    } else {
      change('policyHolders[1].emailAddress', '');
      change('policyHolders[1].firstName', '');
      change('policyHolders[1].lastName', '');
      change('policyHolders[1].primaryPhoneNumber', '');
      change('policyHolders[1].secondaryPhoneNumber', '');
    }
    return value;
  };

  setCalculate = () => {
    const { isCalculated } = this.state;
    if (!isCalculated) return;

    this.props.clearRate();
    this.setState({ isCalculated: false });
  };

  normalizeSinkholeAmount = (value, prevValue, allValues) => {
    const { change } = this.props;
    if (value) {
      change('deductibles.sinkhole.amount', 10);
      change('deductibles.sinkhole.calculatedAmount', endorsementUtils.setPercentageOfValue(allValues.coverageLimits.dwelling.amount, 10))
    } else {
      change('deductibles.sinkhole.amount', 0);
      change('deductibles.sinkhole.calculatedAmount', 0);
    }
  };

  normalizeDwellingAmount = (value, prevValue, fieldValues) => {
    const { change } = this.props;
    this.setCalculate();

    const roundedDwellingAmount = Math.round(value / 1000) * 1000;

    if (fieldValues.coverageLimits.otherStructures.percentage !== 'other') {
      change('coverageLimits.otherStructures.amount', endorsementUtils.setPercentageOfValue(roundedDwellingAmount, fieldValues.coverageLimits.otherStructures.percentage));
    }
    if (fieldValues.coverageLimits.personalProperty.percentage !== 'other') {
      change('coverageLimits.personalProperty.amount', endorsementUtils.setPercentageOfValue(roundedDwellingAmount, fieldValues.coverageLimits.personalProperty.percentage));
    }
    change('deductibles.hurricane.calculatedAmount', endorsementUtils.setPercentageOfValue(roundedDwellingAmount, fieldValues.deductibles.hurricane.amount));
    change('coverageLimits.lossOfUse.amount', endorsementUtils.setPercentageOfValue(roundedDwellingAmount, 10));

    return value;
  };

  normalizeIncidentalOccupancies = (value, previousValue, allValues) => {
    const { change } = this.props;
    if (!allValues.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer &&
        !allValues.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer) {
      change('coverageOptions.liabilityIncidentalOccupancies.answer', false);
    }
    const setLiabilityIncidentalOccupanciesNew =
      allValues.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer ||
      allValues.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer;
    change('coverageOptions.liabilityIncidentalOccupancies.answer', setLiabilityIncidentalOccupanciesNew);
    return value;
  };

  normalizePersonalPropertyPercentage = (value, allValues, field) => {
    if (Number.isNaN(value)) return;
    this.setCalculate();
    const { change, initialValues } = this.props;

    if (value === 0) {
      change('coverageOptions.personalPropertyReplacementCost.answer', false);
    } else {
      change('coverageOptions.personalPropertyReplacementCost.answer', initialValues.coverageOptions.personalPropertyReplacementCost.answer || false);
    }

    const fieldValue = endorsementUtils.setPercentageOfValue(allValues.coverageLimits.dwelling.amount, value);
    change(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  normalizeDwellingDependencies = (value, allValues, field) => {
    // console.log(value, allValues, field, dependency);
    if (Number.isNaN(value)) return;
    this.setCalculate();
    const { change } = this.props;
    const fieldValue = endorsementUtils.setPercentageOfValue(allValues.coverageLimits.dwelling.amount, value);

    change(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  render() {
    const { isCalculated } = this.state;
    const {
      dirty,
      endorsementHistory,
      handleSubmit,
      initialValues,
      policy,
      pristine,
      questions,
      selectedFields = {},
      submitting,
      underwritingQuestions,
      userProfile
    } = this.props;

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
                      normalizeDwellingAmount={this.normalizeDwellingAmount}
                      normalizeDwellingDependencies={this.normalizeDwellingDependencies}
                      normalizePersonalPropertyPercentage={this.normalizePersonalPropertyPercentage}
                      normalizeIncidentalOccupancies={this.normalizeIncidentalOccupancies}
                      normalizeSinkholeAmount={this.normalizeSinkholeAmount}
                    />
                    <WindMitigation questions={questions} />
                    <HomeLocation questions={questions} />
                    <PreviousEndorsements mappedEndorsementHistory={mappedEndorsementHistory} />
                    <PolicyHolder
                      setSecondaryPolicyHolder={this.setSecondaryPolicyHolder}
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

// Endorsements.propTypes = {
//   ...propTypes,
//   tasks: PropTypes.shape().isRequired,
//   appState: PropTypes.shape({
//     modelName: PropTypes.string,
//     instanceId: PropTypes.string,
//     data: PropTypes.shape({ isSubmitting: PropTypes.bool })
//   }).isRequired
// };

const defaultObj = {};
const defaultArr = [];
const selector = formValueSelector('Endorsements');
const mapStateToProps = state => ({
  appState: state.appState,
  endorsementHistory: state.service.endorsementHistory || defaultArr,
  getRate: state.service.getRate,
  initialValues: handleInitialize(state),
  newPolicyNumber: getNewPolicyNumber(state),
  policy: state.service.latestPolicy || defaultObj,
  questions: state.questions,
  selectedValues: selector(state, 'coverageLimits.personalProperty.amount', 'clearFields'),
  summaryLedger: state.service.getSummaryLedger || defaultObj,
  tasks: state.cg,
  underwritingQuestions: state.service.underwritingQuestions,
  userProfile: state.authState.userProfile || defaultObj,
  zipcodeSettings: state.service.getZipcodeSettings,
});

export default connect(mapStateToProps, {
  fetchRate: getRate,
  getUnderwritingQuestions,
  submitEndorsementForm,
  getEndorsementHistory,
  getZipcodeSettings,
  clearRate,
  getUIQuestions
})(reduxForm({ form: 'Endorsements', enableReinitialize: true })(Endorsements));
