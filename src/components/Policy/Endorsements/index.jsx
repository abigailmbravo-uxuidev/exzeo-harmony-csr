import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import { Prompt } from 'react-router-dom';
import {
  reduxForm,
  formValueSelector,
  FormSection,
  clearFields
} from 'redux-form';
import { Loader, validation } from '@exzeo/core-ui';

import endorsementUtils from '../../../utilities/endorsementModel';
import { getUIQuestions } from '../../../state/actions/questions.actions';
import {
  getNewRate,
  submitEndorsementForm
} from '../../../state/actions/policy.actions';
import { getUnderwritingQuestions } from '../../../state/actions/service.actions';
import { setAppError } from '../../../state/actions/error.actions';
// Component Sections
import Footer from '../../Common/Footer';

import { premiumEndorsementList } from './constants/endorsementTypes';
import Coverage from './Coverage';
import WindMitigation from './WindMitigation';
import HomeLocation from './HomeLocation';
import PreviousEndorsements from './PreviousEndorsements';
import PolicyHolder from './PolicyHolder';
import Address from './Address';
import ResultsCalculator from './ResultsCalculator';
import GoToMenu from './GoToMenu';

export const getNewPolicyNumber = state => {
  const taskData =
    state.cg && state.cg.endorsePolicyModelSave
      ? state.cg.endorsePolicyModelSave.data
      : null;
  if (!taskData || !taskData.model || !taskData.model.variables) {
    return null;
  }

  const policy = _find(taskData.model.variables, { name: 'retrievePolicy' });

  return policy ? (policy.value[0] ? policy.policyNumber : null) : null;
};

const FORM_NAME = 'Endorsements';

export class Endorsements extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCalculated: false
    };
  }

  componentDidMount() {
    const { policy, getUnderwritingQuestions, getUIQuestions } = this.props;
    getUIQuestions('askToCustomizeDefaultQuoteCSR');
    getUnderwritingQuestions(
      policy.companyCode,
      policy.state,
      policy.product,
      policy.property
    );
  }

  componentDidUpdate(prevProps) {
    const {
      anyTouched,
      initialValues,
      clearFields,
      change,
      submitting
    } = this.props;
    const { isCalculated } = this.state;
    if (isCalculated && anyTouched) {
      this.setState({
        isCalculated: false
      });
    }
    if (isCalculated && prevProps.anyTouched !== anyTouched && !submitting) {
      clearFields(
        false,
        false,
        'newEndorsementAmount',
        'newEndorsementPremium',
        'newAnnualPremium'
      );
      change('windMitFactor', initialValues.windMitFactor);
      change('rating', initialValues.rating);
    }
  }

  setCalculate = (rate = {}) => {
    const { change, initialize } = this.props;
    const windMitFactor = rate.rating
      ? rate.rating.worksheet.elements.windMitigationFactors
          .windMitigationDiscount
      : 0;
    change('newEndorsementAmount', rate.endorsementAmount || 0);
    change('newEndorsementPremium', rate.newCurrentPremium || '');
    change('newAnnualPremium', rate.newAnnualPremium || '');
    change('windMitFactor', windMitFactor);
    change('rating', rate.rating);
    initialize({}, { keepValues: true });
    this.setState({ isCalculated: true });
  };

  setPHToggle = () => {
    const { change, selectedValues } = this.props;
    if (selectedValues.clearFields) {
      change('clearFields', false);
    }
  };

  setSecondaryPolicyHolder = value => {
    const { change, initialValues } = this.props;
    if (!value) {
      change(
        'policyHolders[1].emailAddress',
        initialValues.policyHolders[1].emailAddress
      );
      change(
        'policyHolders[1].firstName',
        initialValues.policyHolders[1].firstName
      );
      change(
        'policyHolders[1].lastName',
        initialValues.policyHolders[1].lastName
      );
      change(
        'policyHolders[1].primaryPhoneNumber',
        initialValues.policyHolders[1].primaryPhoneNumber
      );
      change(
        'policyHolders[1].secondaryPhoneNumber',
        initialValues.policyHolders[1].secondaryPhoneNumber
      );
      change(
        'policyHolders[1].entityType',
        initialValues.policyHolders[1].entityType
      );
      change('policyHolders[1].order', initialValues.policyHolders[1].order);
    } else {
      change('policyHolders[1].emailAddress', '');
      change('policyHolders[1].firstName', '');
      change('policyHolders[1].lastName', '');
      change('policyHolders[1].primaryPhoneNumber', '');
      change('policyHolders[1].secondaryPhoneNumber', '');
      change('policyHolders[1].entityType', '');
      change('policyHolders[1].order', '');
    }
    return value;
  };

  handleEndorsementFormSubmit = async (data, dispatch, props) => {
    const { isCalculated, anyTouched, setAppError } = this.state;
    try {
      if (isCalculated && !anyTouched) {
        await props.submitEndorsementForm(data, props);
        this.setState({ isCalculated: false }, this.clearCalculate);
      } else {
        const rate = await props.getNewRate(data, props);
        this.setCalculate(rate);
      }
    } catch (error) {
      setAppError(error);
    }
  };

  clearCalculate = () => {
    const { reset } = this.props;

    reset();
    this.setState({ isCalculated: false });
  };

  roundDwellingCoverageAmount = value => {
    return Math.round(value / 1000) * 1000;
  };

  normalizeSinkholeAmount = (value, previousValue, allValues) => {
    const { change } = this.props;

    if (value === 'true') {
      const roundedDwellingAmount = this.roundDwellingCoverageAmount(
        allValues.coverageLimits.dwelling.amount
      );
      change('deductibles.sinkhole.amount', 10);
      change(
        'deductibles.sinkhole.calculatedAmount',
        endorsementUtils.setPercentageOfValue(roundedDwellingAmount, 10)
      );
    } else {
      change('deductibles.sinkhole.amount', 0);
      change('deductibles.sinkhole.calculatedAmount', 0);
    }

    return value === 'true';
  };

  normalizeDwellingAmount = (value, previousValue, allValues) => {
    const { change } = this.props;
    const roundedDwellingAmount = this.roundDwellingCoverageAmount(value);

    if (allValues.coverageLimits.otherStructures.percentage !== 'other') {
      change(
        'coverageLimits.otherStructures.amount',
        endorsementUtils.setPercentageOfValue(
          roundedDwellingAmount,
          allValues.coverageLimits.otherStructures.percentage
        )
      );
    }
    if (allValues.coverageLimits.personalProperty.percentage !== 'other') {
      change(
        'coverageLimits.personalProperty.amount',
        endorsementUtils.setPercentageOfValue(
          roundedDwellingAmount,
          allValues.coverageLimits.personalProperty.percentage
        )
      );
    }

    change(
      'deductibles.hurricane.calculatedAmount',
      endorsementUtils.setPercentageOfValue(
        roundedDwellingAmount,
        allValues.deductibles.hurricane.amount
      )
    );
    change(
      'coverageLimits.lossOfUse.amount',
      endorsementUtils.setPercentageOfValue(roundedDwellingAmount, 10)
    );

    return value;
  };

  normalizeIncidentalOccupancies = (value, previousValue, allValues) => {
    const { change } = this.props;
    if (
      !allValues.coverageOptions.propertyIncidentalOccupanciesMainDwelling
        .answer &&
      !allValues.coverageOptions.propertyIncidentalOccupanciesOtherStructures
        .answer
    ) {
      change('coverageOptions.liabilityIncidentalOccupancies.answer', false);
    }
    const setLiabilityIncidentalOccupanciesNew =
      allValues.coverageOptions.propertyIncidentalOccupanciesMainDwelling
        .answer ||
      allValues.coverageOptions.propertyIncidentalOccupanciesOtherStructures
        .answer;
    change(
      'coverageOptions.liabilityIncidentalOccupancies.answer',
      setLiabilityIncidentalOccupanciesNew
    );

    return value;
  };

  normalizePersonalPropertyPercentage = (
    value,
    previousValue,
    allValues,
    field
  ) => {
    if (Number.isNaN(value)) return;
    const { change, initialValues } = this.props;

    if (value === 0) {
      change('coverageOptions.personalPropertyReplacementCost.answer', false);
    } else {
      change(
        'coverageOptions.personalPropertyReplacementCost.answer',
        initialValues.coverageOptions.personalPropertyReplacementCost.answer ||
          false
      );
    }

    const roundedDwellingAmount = this.roundDwellingCoverageAmount(
      allValues.coverageLimits.dwelling.amount
    );
    const fieldValue = endorsementUtils.setPercentageOfValue(
      roundedDwellingAmount,
      value
    );
    change(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    // always return value at the end of 'normalize' functions
    return value;
  };

  normalizeDwellingDependencies = (value, previousValue, allValues, field) => {
    if (Number.isNaN(value)) return;
    const { change } = this.props;

    const roundedDwellingAmount = this.roundDwellingCoverageAmount(
      allValues.coverageLimits.dwelling.amount
    );
    const fieldValue = endorsementUtils.setPercentageOfValue(
      roundedDwellingAmount,
      value
    );

    change(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  validateEndorsementDate = (...args) => {
    // we shouldn't need to do this, waiting for a patch from redux-form
    const { policy } = this.props;
    if (!policy) return undefined;
    return validation.isDateRange(policy.effectiveDate, policy.endDate)(
      ...args
    );
  };

  render() {
    const { isCalculated } = this.state;
    const {
      anyTouched,
      dirty,
      endorsementHistory,
      handleSubmit,
      initialValues,
      policy,
      pristine,
      questions,
      selectedFields = {
        coverageLimits: { personalProperty: { amount: null } }
      },
      submitting,
      underwritingQuestions,
      userProfile
    } = this.props;

    const mappedEndorsementHistory =
      endorsementHistory &&
      endorsementHistory.map(endorsement => {
        endorsement.netChargeFormat = premiumEndorsementList.some(
          pe => pe === endorsement.transactionType
        )
          ? endorsementUtils.premiumAmountFormatter(endorsement.netCharge)
          : '';
        return endorsement;
      });

    const canPremiumEndorse = userProfile.resources
      ? userProfile.resources.some(
          resource =>
            resource.uri ===
              `${policy.companyCode}:${policy.state}:${policy.product}:PolicyData:PremiumEndorse` &&
            resource.right === 'UPDATE'
        )
      : false;

    if (!canPremiumEndorse) {
      return (
        <div className="messages">
          <div className="message error">
            <i className="fa fa-exclamation-circle" aria-hidden="true" />
            &nbsp;Endorsement page cannot be accessed due to User Permissions.
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Prompt
          when={dirty}
          message="Are you sure you want to leave with unsaved changes?"
        />
        {(this.props.submitting || !endorsementHistory) && <Loader />}
        <form
          id="Endorsements"
          className="content-wrapper endorsement-content-wrapper"
          onSubmit={handleSubmit(this.handleEndorsementFormSubmit)}
          onKeyPress={e =>
            e.key === 'Enter' &&
            e.target.type !== 'submit' &&
            e.preventDefault()
          }
        >
          <div className="route-content">
            <div className="endorsements">
              <GoToMenu />
              <div className="scroll">
                <div className="form-group survey-wrapper" role="group">
                  <Coverage
                    initialValues={initialValues}
                    personalPropertyNewVal={
                      selectedFields.coverageLimits.personalProperty.amount
                    }
                    questions={questions}
                    underwritingQuestions={underwritingQuestions}
                    normalizeDwellingAmount={this.normalizeDwellingAmount}
                    normalizeDwellingDependencies={
                      this.normalizeDwellingDependencies
                    }
                    normalizePersonalPropertyPercentage={
                      this.normalizePersonalPropertyPercentage
                    }
                    normalizeIncidentalOccupancies={
                      this.normalizeIncidentalOccupancies
                    }
                    normalizeSinkholeAmount={this.normalizeSinkholeAmount}
                  />
                  <WindMitigation questions={questions} />
                  <HomeLocation questions={questions} />
                  <PreviousEndorsements
                    mappedEndorsementHistory={mappedEndorsementHistory}
                  />
                  <PolicyHolder
                    setSecondaryPolicyHolder={this.setSecondaryPolicyHolder}
                    setPHToggle={this.setPHToggle}
                    policyHolders={policy.policyHolders}
                  />

                  <FormSection name="policyHolderMailingAddress">
                    <Address
                      name="addresses"
                      sectionId="addresses"
                      header="Mailing Address"
                      testPrefix="phMail"
                    />
                  </FormSection>

                  <FormSection name="property.physicalAddress">
                    <Address header="Property Address" testPrefix="property" />
                  </FormSection>
                </div>
              </div>
              <ResultsCalculator
                min={policy.effectiveDate}
                max={policy.endDate}
                validateEndorsementDate={this.validateEndorsementDate}
              >
                <button
                  id="cancel-button"
                  type="button"
                  className="btn btn-secondary"
                  tabIndex="0"
                  onClick={() => this.clearCalculate()}
                  onKeyPress={event =>
                    event.charCode === 13 && this.clearCalculate()
                  }
                >
                  Cancel
                </button>
                {/*
                    This button has some indirect logic to handle odd states that this form can be in.
                      For disabled: First scenario is the initial view. Second scenario is after "Review" is submitted, and user makes change to the form. Third scenario is self-explanatory.
                      For display: We only want to show 'Save' when 'Review' has been called (isCalculated is true) and the user has not made changes since.
                  */}
                <button
                  type="submit"
                  tabIndex="0"
                  className="btn btn-primary"
                  disabled={
                    (!isCalculated && pristine) ||
                    (isCalculated && !pristine && anyTouched) ||
                    submitting
                  }
                >
                  {isCalculated && !anyTouched ? 'Save' : 'Review'}
                </button>
              </ResultsCalculator>
            </div>
          </div>
        </form>
        <div className="basic-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

Endorsements.propTypes = {
  endorsementHistory: PropTypes.array,
  initialValues: PropTypes.object,
  newPolicyNumber: PropTypes.string,
  policy: PropTypes.object,
  questions: PropTypes.object,
  selectedValues: PropTypes.object,
  summaryLedger: PropTypes.object,
  userProfile: PropTypes.object,
  clearFields: PropTypes.func,
  getNewRate: PropTypes.func,
  getUIQuestions: PropTypes.func,
  getUnderwritingQuestions: PropTypes.func,
  setAppError: PropTypes.func,
  submitEndorsementForm: PropTypes.func
};

const defaultObj = {};
const defaultArr = [];
const selector = formValueSelector('Endorsements');
const mapStateToProps = state => ({
  endorsementHistory: state.policyState.endorsementHistory || defaultArr,
  initialValues: endorsementUtils.initializeEndorsementForm(
    state.policyState.policy
  ),
  newPolicyNumber: getNewPolicyNumber(state),
  policy: state.policyState.policy,
  questions: state.questions,
  selectedValues: selector(
    state,
    'coverageLimits.personalProperty.amount',
    'clearFields'
  ),
  summaryLedger: state.policyState.summaryLedger,
  underwritingQuestions: state.service.underwritingQuestions,
  userProfile: state.authState.userProfile || defaultObj,
  zipcodeSettings: state.service.getZipcodeSettings
});

export default connect(
  mapStateToProps,
  {
    clearFields,
    getNewRate,
    getUIQuestions,
    getUnderwritingQuestions,
    setAppError,
    submitEndorsementForm
  }
)(
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    touchOnChange: true
  })(Endorsements)
);
