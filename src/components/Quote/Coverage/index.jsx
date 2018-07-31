import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import { Prompt } from 'react-router-dom';
import { batchActions } from 'redux-batched-actions';
import { reduxForm, formValueSelector } from 'redux-form';
import { getAnswers } from '../../../utilities/forms';
import { setPercentageOfValue } from '../../../utilities/endorsementModel';
import { getAgencies, getAgentsByAgency } from '../../../state/actions/serviceActions';
import { batchCompleteTask, startWorkflow } from '../../../state/actions/cgActions';
import { setAppState } from '../../../state/actions/appStateActions';
import { setAppError } from '../../../state/actions/errorActions';
import { getUIQuestions } from '../../../state/actions/questionsActions';
import { getLatestQuote } from '../../../state/actions/quoteStateActions';
import { checkQuoteState, getQuoteDataFromCgState } from '../../../state/selectors/quote.selectors';
import QuoteBaseConnect from '../../../containers/Quote';
import Footer from '../../Common/Footer';
import ProducedBy from './ProducedBy';
import PolicyHolder from './PolicyHolder';
import Property from './Property';
import Coverages from './Coverages';
import WindMitigation from './WindMitigation';

export const handleGetZipCodeSettings = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return null;

  const zipCodeSettings = _.find(taskData.model.variables, { name: 'getZipCodeSettings' }) ?
    _.find(taskData.model.variables, { name: 'getZipCodeSettings' }).value.result[0] : null;

  const zipCodeSettingsQuote = _.find(taskData.model.variables, { name: 'getZipCodeSettingsForQuote' }) ?
    _.find(taskData.model.variables, { name: 'getZipCodeSettingsForQuote' }).value.result[0] : null;

  return zipCodeSettingsQuote || zipCodeSettings;
};

export function calculatePercentage(oldFigure, newFigure) {
  let percentChange = 0;
  if ((oldFigure !== 0) && (newFigure !== 0)) {
    percentChange = (oldFigure / newFigure) * 100;
  }

  return percentChange;
}

export const handleInitialize = (quoteData, questions) => {
  const values = {};
  values.clearFields = false;
  values.electronicDelivery = _.get(quoteData, 'policyHolders[0].electronicDelivery') || false;

  values.agencyCode = _.get(quoteData, 'agencyCode');
  values.agentCode = _.get(quoteData, 'agentCode');

  values.effectiveDate = moment(_.get(quoteData, 'effectiveDate')).utc().format('YYYY-MM-DD');

  values.pH1email = _.get(quoteData, 'policyHolders[0].emailAddress');
  values.pH1FirstName = _.get(quoteData, 'policyHolders[0].firstName');
  values.pH1LastName = _.get(quoteData, 'policyHolders[0].lastName');
  values.pH1phone = _.get(quoteData, 'policyHolders[0].primaryPhoneNumber') || '';
  values.pH1phone2 = _.get(quoteData, 'policyHolders[0].secondaryPhoneNumber') || '';

  values.pH2email = _.get(quoteData, 'policyHolders[1].emailAddress');
  values.pH2FirstName = _.get(quoteData, 'policyHolders[1].firstName');
  values.pH2LastName = _.get(quoteData, 'policyHolders[1].lastName');
  values.pH2phone = _.get(quoteData, 'policyHolders[1].primaryPhoneNumber') || '';
  values.pH2phone2 = _.get(quoteData, 'policyHolders[1].secondaryPhoneNumber') || '';

  values.address1 = _.get(quoteData, 'property.physicalAddress.address1');
  values.address2 = _.get(quoteData, 'property.physicalAddress.address2');
  values.city = _.get(quoteData, 'property.physicalAddress.city');
  values.state = _.get(quoteData, 'property.physicalAddress.state');
  values.zip = _.get(quoteData, 'property.physicalAddress.zip');
  values.protectionClass = _.get(quoteData, 'property.protectionClass');
  values.constructionType = _.get(quoteData, 'property.constructionType');
  values.yearOfRoof = _.get(quoteData, 'property.yearOfRoof');
  values.squareFeet = _.get(quoteData, 'property.squareFeet');
  values.yearBuilt = _.get(quoteData, 'property.yearBuilt');
  values.buildingCodeEffectivenessGrading = _.get(quoteData, 'property.buildingCodeEffectivenessGrading');
  values.familyUnits = _.get(quoteData, 'property.familyUnits');
  values.distanceToTidalWater = _.get(quoteData, 'property.distanceToTidalWater');
  values.distanceToFireHydrant = _.get(quoteData, 'property.distanceToFireHydrant');
  values.distanceToFireStation = _.get(quoteData, 'property.distanceToFireStation');
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
  values.personalPropertyAmount = String(_.get(quoteData, 'coverageLimits.personalProperty.amount'));
  values.personalProperty = _.map(getAnswers('personalPropertyAmount', questions), 'answer').includes(calculatePercentage(personalProperty, dwelling)) ? String(calculatePercentage(personalProperty, dwelling)) : undefined;
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

const checkSentToDocusign = state => state === 'Application Sent DocuSign';

export const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.match.params.workflowId;
  const submitData = data;

  props.setAppState(props.appState.modelName, workflowId, {
    ...props.appState.data,
    submitting: true
  });
  submitData.effectiveDate = momentTZ.tz(momentTZ.utc(submitData.effectiveDate).format('YYYY-MM-DD'), props.zipCodeSettings.timezone).utc().format();

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
  submitData.pH1phone2 = submitData.pH1phone2
    ? submitData.pH1phone2.replace(/[^\d]/g, '')
    : submitData.pH1phone2;

  submitData.pH2phone = submitData.pH2phone
    ? submitData.pH2phone.replace(/[^\d]/g, '')
    : submitData.pH2phone;
  submitData.pH2phone2 = submitData.pH2phone2
    ? submitData.pH2phone2.replace(/[^\d]/g, '')
    : submitData.pH2phone2;

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

  props.batchCompleteTask(props.appState.modelName, workflowId, steps)
    .then(() => {
      props.getLatestQuote(true, props.quoteData._id);
      // now update the workflow details so the recalculated rate shows
      props.setAppState(
        props.appState.modelName,
        workflowId, { ...props.appState.data, submitting: false, selectedLink: 'customerData' }
      );
    });
};

let setAgents = false;

export class Coverage extends Component {
  componentDidMount() {
    const { getUIQuestions, setAppState, batchCompleteTask, appState, match  } = this.props;
    getUIQuestions('askToCustomizeDefaultQuoteCSR');

    // this.props.startWorkflow('csrQuote', { dsUrl: `${process.env.REACT_APP_API_URL}/ds` }).then((result) => {
    const steps = [
      { name: 'hasUserEnteredData', data: { answer: 'No' } },
      { name: 'moveTo', data: { key: 'customerData' } }
    ];

    setAppState('csrQuote', match.params.workflowId, {
      ...appState.data,
      submitting: true,
      selectedLink: 'customerData'
    });
    batchCompleteTask(appState.modelName, match.params.workflowId, steps)
  }

  componentWillReceiveProps(nextProps) {
    const { quoteData, getAgencies, getAgentsByAgency } = nextProps;
    if (!setAgents && quoteData && quoteData.companyCode && quoteData.state && quoteData.agencyCode) {
      getAgencies(quoteData.companyCode, quoteData.state);
      getAgentsByAgency(quoteData.companyCode, quoteData.state, quoteData.agencyCode);
      setAgents = true;
    }
    if (this.props.quoteData._id !== nextProps.quoteData._id) {
      this.props.getLatestQuote(true, nextProps.quoteData._id);
    }
  }

  setPHToggle = () => {
    const { clearFields, change } = this.props;
    if (clearFields) {
      change('clearFields', false);
    }
  };

  normalizeDwellingAmount = (value, previousValue, allValues) => {
    const { change } = this.props;

    const roundedDwellingAmount = Math.round(value / 1000) * 1000;

    if (allValues.otherStructures !== 'other') {
      change('otherStructuresAmount', setPercentageOfValue(roundedDwellingAmount, allValues.otherStructures));
    }
    if (allValues.personalProperty !== 'other') {
      change('personalPropertyAmount', setPercentageOfValue(roundedDwellingAmount, allValues.personalProperty));
    }
    change('calculatedHurricane', String(setPercentageOfValue(roundedDwellingAmount, allValues.hurricane)));
    change('lossOfUse', setPercentageOfValue(roundedDwellingAmount, 10));
    change('calculatedSinkhole', String(setPercentageOfValue(roundedDwellingAmount, 10)));

    return value;
  };

  normalizeDwellingDependencies = (value, previousValue, allValues, field) => {
    if (Number.isNaN(value)) return;
    const { change } = this.props;
    const fieldValue = setPercentageOfValue(allValues.dwellingAmount, value);

    change(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  normalizePersonalPropertyPercentage = (value, previousValue, allValues, field) => {
    if (Number.isNaN(value)) return;
    const { change, initialValues } = this.props;

    if (value === 0) {
      change('personalPropertyReplacementCostCoverage', false);
    } else {
      change('personalPropertyReplacementCostCoverage', initialValues.personalPropertyReplacementCostCoverage || false);
    }
    const fieldValue = setPercentageOfValue(allValues.dwellingAmount, value);
    change(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  normalizeSinkholeAmount = (value, previousValue, allValues) => {
    const { change } = this.props;
    if (String(value) === 'true') {
      change('sinkhole', 10);
      change('calculatedSinkhole', setPercentageOfValue(allValues.dwellingAmount, 10));
    } else {
      change('sinkhole', 0);
      change('calculatedSinkhole', 0);
    }
    return value;
  };

  handleAgencyChange = (agencyCode) => {
    const { change, getAgentsByAgency } = this.props;
    const agency = _.find(this.props.agencies, a => String(a.agencyCode) === String(agencyCode));
    if (agency) {
      getAgentsByAgency(agency.companyCode, agency.state, agencyCode).then((response) => {
        if (response.payload && response.payload[0].data.agents && response.payload[0].data.agents.length === 1) {
          change('agentCode', response.payload[0].data.agents[0].agentCode);
        } else {
          change('agentCode', '');
        }
      });
    }
    return agencyCode;
  };

  clearSecondaryPolicyholder = (value) => {
    const { dispatch, quoteData, change } = this.props;
    if (!value) {
      const pH2email = _.get(quoteData, 'policyHolders[1].emailAddress');
      const pH2FirstName = _.get(quoteData, 'policyHolders[1].firstName');
      const pH2LastName = _.get(quoteData, 'policyHolders[1].lastName');
      const pH2phone = _.get(quoteData, 'policyHolders[1].primaryPhoneNumber') || '';
      const pH2phone2 = _.get(quoteData, 'policyHolders[1].secondaryPhoneNumber') || '';
      dispatch(batchActions([
        change('Coverage', 'pH2email', pH2email),
        change('Coverage', 'pH2FirstName', pH2FirstName),
        change('Coverage', 'pH2LastName', pH2LastName),
        change('Coverage', 'pH2phone', pH2phone),
        change('Coverage', 'pH2phone2', pH2phone2),
        change('Coverage', 'clearFields', false)
      ]));
    } else {
      dispatch(batchActions([
        change('Coverage', 'pH2email', ''),
        change('Coverage', 'pH2FirstName', ''),
        change('Coverage', 'pH2LastName', ''),
        change('Coverage', 'pH2phone', ''),
        change('Coverage', 'pH2phone2', ''),
        change('Coverage', 'clearFields', true)
      ]));
    }
  };

  render() {
    const {
      agencies,
      agents,
      dirty,
      dwellingMin,
      dwellingMax,
      editingDisabled,
      handleSubmit,
      otherStructures,
      match,
      personalProperty,
      personalPropertyAmount,
      pristine,
      questions,
      quoteData,
      sinkholePerilCoverage
    } = this.props;

    if (!quoteData) {
      return (<QuoteBaseConnect />);
    }

    const mappedAgents = agents && agents.map(agent => ({
      answer: agent.agentCode,
      label: `${agent.firstName} ${agent.lastName} - ${agent.agentCode}`
    }));
    const mappedAgencies = agencies && agencies.map(agency => ({
      answer: agency.agencyCode,
      label: `${agency.displayName} - ${agency.agencyCode}`
    }));

    return (
      <QuoteBaseConnect match={match}>
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />
        <div className="route-content">

          <form id="Coverage" onSubmit={handleSubmit(handleFormSubmit)} >
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <ProducedBy
                  name="produced-by"
                  sectionId="produced-by"
                  header="Produced By"
                  sectionClass="producer produced-by"
                  handleAgencyChange={this.handleAgencyChange}
                  agents={mappedAgents}
                  agencies={mappedAgencies}
                />
                <PolicyHolder
                  name="policyHolders"
                  sectionId="policyHolders"
                  header="Primary Policyholder"
                  headerSecondary="Secondary Policyholder"
                  sectionClass="demographics flex-parent col2"
                  clearSecondaryPolicyholder={this.clearSecondaryPolicyholder}
                  setPHToggle={this.setPHToggle}
                  canSendToDocusign={checkSentToDocusign(quoteData.quoteState) || !(quoteData && quoteData.policyHolders && quoteData.policyHolders[1])}
                />
                <Property
                  sectionId="property-location"
                  sectionClass="property flex-parent property-location"
                  header="Home and Location"
                  questions={questions}
                />
                <Coverages
                  sectionId="coverage-deductibles-discounts"
                  sectionClass="coverage-options flex-parent coverage-deductibles-discounts"
                  sinkholePerilCoverageValue={sinkholePerilCoverage}
                  dwellingMinValue={dwellingMin}
                  dwellingMaxValue={dwellingMax}
                  otherStructuresValue={otherStructures}
                  personalPropertyValue={personalProperty}
                  personalPropertyAmountValue={personalPropertyAmount}
                  questions={questions}
                  normalizeDwellingAmount={this.normalizeDwellingAmount}
                  normalizeDwellingDependencies={this.normalizeDwellingDependencies}
                  normalizePersonalPropertyPercentage={this.normalizePersonalPropertyPercentage}
                  normalizeIncidentalOccupancies={this.normalizeIncidentalOccupancies}
                  normalizeSinkholeAmount={this.normalizeSinkholeAmount}
                />
                <WindMitigation
                  header="Wind Mitigation"
                  sectionClass="wind flex-parent"
                  sectionId="wind-mitigation"
                  questions={questions}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <button data-test="coverage-reset" tabIndex="0" aria-label="reset-btn form-coverage" className="btn btn-secondary" type="button" form="Coverage" onClick={() => this.props.reset('Coverage')}>
              Reset
            </button>
            <button data-test="coverage-submit" tabIndex="0" aria-label="submit-btn form-coverage" className="btn btn-primary" type="submit" form="Coverage" disabled={pristine || editingDisabled}>
              Update
            </button>
          </div>
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
  zipCodeSettings: PropTypes.shape(),
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

const selector = formValueSelector('Coverage');
const mapStateToProps = (state) => {
  const {
    clearFields,
    sinkholePerilCoverage,
    dwellingMin,
    dwellingMax,
    otherStructures,
    personalPropertyAmount,
    personalProperty
  } = selector(
    state,
    'clearFields',
    'sinkholePerilCoverage',
    'dwellingMin',
    'dwellingMax',
    'otherStructures',
    'personalPropertyAmount',
    'personalProperty'
  );
  const quoteData = getQuoteDataFromCgState(state);
  const questions = state.questions;

  return {
    getAgents: state.service.getAgents,
    tasks: state.cg,
    appState: state.appState,
    agents: state.service.agents,
    agencies: state.service.agencies,
    initialValues: handleInitialize(quoteData, questions),
    quoteData,
    zipCodeSettings: handleGetZipCodeSettings(state),
    questions,
    editingDisabled: checkQuoteState(state),
    clearFields,
    sinkholePerilCoverage,
    dwellingMin,
    dwellingMax,
    otherStructures,
    personalPropertyAmount,
    personalProperty
  };
};

export default connect(mapStateToProps, {
  getAgencies,
  getAgentsByAgency,
  batchCompleteTask,
  startWorkflow,
  setAppState,
  getUIQuestions,
  getLatestQuote,
  setAppError
})(reduxForm({
  form: 'Coverage',
  enableReinitialize: true
})(Coverage));
