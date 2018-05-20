import React from 'react';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import { Prompt } from 'react-router-dom';
import { reduxForm, formValueSelector, FormSection } from 'redux-form';
import { premiumEndorsementList } from './constants/endorsementTypes';
import endorsementUtils from '../../../utilities/endorsementModel';
import { getUIQuestions } from '../../../actions/questionsActions';
import {
  getUnderwritingQuestions,
  submitEndorsementForm,
  getEndorsementHistory,
  getZipcodeSettings,
  clearRate,
  getNewRate
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

  const policy = _find(taskData.model.variables, { name: 'retrievePolicy' });

  return policy
    ? policy.value[0]
      ? policy.policyNumber : null
    : null;
};

export class Endorsements extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCalculated: false
    };
  }

  componentDidMount() {
    const { policy, getUnderwritingQuestions, getZipcodeSettings, getEndorsementHistory, getUIQuestions, clearRate } = this.props;
    getUIQuestions('askToCustomizeDefaultQuoteCSR');
    clearRate();
    if (policy && policy.policyNumber && policy.property && policy.property.physicalAddress) {
      getUnderwritingQuestions(policy.companyCode, policy.state, policy.product, policy.property);
      getEndorsementHistory(policy.policyNumber);
      getZipcodeSettings(policy.companyCode, policy.state, policy.product, policy.property.physicalAddress.zip);
    }
  }

  clearCalculate = () => {
    const { change, clearRate, initialValues } = this.props;
    change('endorsementDate', initialValues.endorsementDate);
    change('newEndorsementAmount', '');
    change('newEndorsementPremium', '');
    change('newAnnualPremium', '');
    clearRate();
    this.setState({ isCalculated: false });
  };

  setCalculate = (rate = {}) => {
    const { change, initialize } = this.props;
    const { getRate = {} } = rate;
    const windMitFactor = getRate.rating ? getRate.rating.worksheet.elements.windMitigationFactors.windMitigationDiscount : 0;
    change('newEndorsementAmount', getRate.endorsementAmount || 0);
    change('newEndorsementPremium', getRate.newCurrentPremium || '');
    change('newAnnualPremium', getRate.newAnnualPremium || '');
    change('windMitFactor', windMitFactor);
    initialize({}, { keepValues: true });
  };

  calculate = async (data, dispatch, props) => {
    const { getNewRate } = props;
    const rate = await getNewRate(data, props);
    this.setState({ isCalculated: true }, () => this.setCalculate(rate, data));
  };

  save = async (data, dispatch, props) => {
    await props.submitEndorsementForm(data, props);
    this.setState({ isCalculated: false }, this.setCalculate);
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

  normalizeSinkholeAmount = (value, prevValue, allValues) => {
    const { change } = this.props;
    if (String(value) === 'true') {
      change('deductibles.sinkhole.amount', 10);
      change('deductibles.sinkhole.calculatedAmount', endorsementUtils.setPercentageOfValue(allValues.coverageLimits.dwelling.amount, 10));
    } else {
      change('deductibles.sinkhole.amount', 0);
      change('deductibles.sinkhole.calculatedAmount', 0);
    }
    return value;
  };

  normalizeDwellingAmount = (value, prevValue, fieldValues) => {
    const { change } = this.props;

    const roundedDwellingAmount = Math.round(value / 1000) * 1000;

    if (fieldValues.coverageLimits.otherStructures.percentage !== 'other') {
      change('coverageLimits.otherStructures.amount', endorsementUtils.setPercentageOfValue(roundedDwellingAmount, fieldValues.coverageLimits.otherStructures.percentage));
    }
    if (fieldValues.coverageLimits.personalProperty.percentage !== 'other') {
      change('coverageLimits.personalProperty.amount', endorsementUtils.setPercentageOfValue(roundedDwellingAmount, fieldValues.coverageLimits.personalProperty.percentage));
    }
    change('deductibles.hurricane.calculatedAmount', String(endorsementUtils.setPercentageOfValue(roundedDwellingAmount, fieldValues.deductibles.hurricane.amount)));
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
    const { change, initialValues } = this.props;

    if (value === 0) {
      change('coverageOptions.personalPropertyReplacementCost.answer', false);
    } else {
      change('coverageOptions.personalPropertyReplacementCost.answer', initialValues.coverageOptions.personalPropertyReplacementCost.answer || false);
    return value;
    }

    const fieldValue = endorsementUtils.setPercentageOfValue(allValues.coverageLimits.dwelling.amount, value);
    change(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  normalizeDwellingDependencies = (value, allValues, field) => {
    if (Number.isNaN(value)) return;
    const { change } = this.props;
    const fieldValue = endorsementUtils.setPercentageOfValue(allValues.coverageLimits.dwelling.amount, value);

    change(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
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
                <ResultsCalculator min={policy.effectiveDate} max={policy.endDate}>
                  <button
                    id="cancel-button"
                    type="button"
                    className="btn btn-secondary"
                    tabIndex="0"
                    onClick={() => this.clearCalculate()}
                    onKeyPress={event => event.charCode === 13 && this.clearCalculate()}
                  >Cancel
                  </button>
                  <button
                    type="submit"
                    tabIndex="0"
                    className="btn btn-primary"
                    disabled={(!isCalculated && pristine) || submitting}
                  >{(isCalculated && !anyTouched) ? 'Save' : 'Review'}</button>
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
//   ...propTypes
//   // TODO flesh these out in subsequent PR
// };

const defaultObj = {};
const defaultArr = [];
const selector = formValueSelector('Endorsements');
const mapStateToProps = state => ({
  endorsementHistory: state.service.endorsementHistory || defaultArr,
  initialValues: endorsementUtils.initializeEndorsementForm(state.service.latestPolicy),
  newPolicyNumber: getNewPolicyNumber(state),
  policy: state.service.latestPolicy || defaultObj,
  questions: state.questions,
  selectedValues: selector(state, 'coverageLimits.personalProperty.amount', 'clearFields'),
  summaryLedger: state.service.getSummaryLedger || defaultObj,
  underwritingQuestions: state.service.underwritingQuestions,
  userProfile: state.authState.userProfile || defaultObj,
  zipcodeSettings: state.service.getZipcodeSettings
});

export default connect(mapStateToProps, {
  getNewRate,
  getUnderwritingQuestions,
  submitEndorsementForm,
  getEndorsementHistory,
  getZipcodeSettings,
  clearRate,
  getUIQuestions
})(reduxForm({ form: 'Endorsements', enableReinitialize: true })(Endorsements));
