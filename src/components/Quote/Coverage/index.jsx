import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import { Prompt } from 'react-router-dom';
import { batchActions } from 'redux-batched-actions';
import { reduxForm, Form, change } from 'redux-form';
import * as serviceActions from '../../../actions/serviceActions';
import * as cgActions from '../../../actions/cgActions';
import * as appStateActions from '../../../actions/appStateActions';
import * as questionsActions from '../../../actions/questionsActions';
import * as quoteStateActions from '../../../actions/quoteStateActions';
import QuoteBaseConnect from '../../../containers/Quote';
import HiddenField from '../../Form/inputs/HiddenField';
import Footer from '../../Common/Footer';
import ProducedBy from './ProducedBy';
import PolicyHolder from './PolicyHolder';
import Property from './Property';
import { setPercentageOfValue } from '../../../utilities/endorsementModel';
import Coverages from './Coverages';
import WindMitigation from './WindMitigation';

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
const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

export const handleInitialize = (state) => {
  const quoteData = handleGetQuoteData(state);

  const { questions } = state;
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

const checkQuoteState = quoteData => _.some(['Policy Issued', 'Documents Received'], state => state === quoteData.quoteState);
const checkSentToDocusign = state => state === 'Application Sent DocuSign';

export const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.appState.instanceId;
  const submitData = data;

  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, {
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

  props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
    .then(() => {
      props.actions.quoteStateActions.getLatestQuote(true, props.quoteData._id);
      // now update the workflow details so the recalculated rate shows
      props.actions.appStateActions.setAppState(
        props.appState.modelName,
        workflowId, { ...props.appState.data, submitting: false, selectedLink: 'customerData' }
      );
    });
};

let setAgents = false;

export class Coverage extends Component {
  componentDidMount() {
    this.props.actions.questionsActions.getUIQuestions('askToCustomizeDefaultQuoteCSR');

    const isNewTab = localStorage.getItem('isNewTab') === 'true';
    if (isNewTab) {
      localStorage.setItem('isNewTab', false);

      this.props.actions.cgActions.startWorkflow('csrQuote', { dsUrl: `${process.env.REACT_APP_API_URL}/ds` }).then((result) => {
        const steps = [];
        const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData'));

        steps.push({ name: 'search', data: lastSearchData });

        if (lastSearchData.searchType === 'quote') {
          const quoteId = localStorage.getItem('quoteId');

          this.props.actions.quoteStateActions.getLatestQuote(true, quoteId);

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

        steps.push({ name: 'hasUserEnteredData', data: { answer: 'No' } });
        steps.push({ name: 'moveTo', data: { key: 'customerData' } });

        const startResult = result.payload ? result.payload[0].workflowData.csrQuote.data : {};

        this.props.actions.appStateActions.setAppState('csrQuote', startResult.modelInstanceId, { ...this.props.appState.data, submitting: true });
        this.props.actions.cgActions.batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps).then(() => {
          this.props.actions.appStateActions.setAppState(
            this.props.appState.modelName,
            startResult.modelInstanceId, { ...this.props.appState.data, selectedLink: 'customerData' }
          );
          this.handleAgencyChange(this.props, this.props.quoteData.agencyCode, true);
        });
      });
    } else if (this.props.appState.instanceId) {
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        submitting: true
      });
      const steps = [
        { name: 'hasUserEnteredData', data: { answer: 'No' } },
        { name: 'moveTo', data: { key: 'customerData' } }
      ];

      const workflowId = this.props.appState.instanceId;
      this.props.actions.cgActions.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
        .then(() => {
          this.props.actions.quoteStateActions.getLatestQuote(true, this.props.quoteData._id);
          this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
            ...this.props.appState.data,
            selectedLink: 'customerData'
          });
        });
      this.handleAgencyChange(this.props, this.props.quoteData.agencyCode, true);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      const { quoteData } = nextProps;
      if (quoteData && quoteData.companyCode && quoteData.state && quoteData.agencyCode && !setAgents) {
        this.props.actions.serviceActions.getAgencies(quoteData.companyCode, quoteData.state);
        this.props.actions.serviceActions.getAgentsByAgency(quoteData.companyCode, quoteData.state, quoteData.agencyCode);
        setAgents = true;
      }
      if (!_.isEqual(this.props.quoteData, nextProps.quoteData)) {
        this.props.actions.quoteStateActions.getLatestQuote(true, nextProps.quoteData._id);
      }
    }
  }

  setPHToggle = () => {
    const { fieldValues, change: changeF } = this.props;
    if (fieldValues.clearFields) {
      changeF('clearFields', false);
    }
  };

  normalizeDwellingAmount = (value, previousValue, allValues) => {
    const { change: changeF } = this.props;

    const roundedDwellingAmount = Math.round(value / 1000) * 1000;

    if (allValues.otherStructures !== 'other') {
      changeF('otherStructuresAmount', setPercentageOfValue(roundedDwellingAmount, allValues.otherStructures));
    }
    if (allValues.personalProperty !== 'other') {
      changeF('personalPropertyAmount', setPercentageOfValue(roundedDwellingAmount, allValues.personalProperty));
    }
    changeF('calculatedHurricane', String(setPercentageOfValue(roundedDwellingAmount, allValues.hurricane)));
    changeF('lossOfUse', setPercentageOfValue(roundedDwellingAmount, 10));
    changeF('calculatedSinkhole', String(setPercentageOfValue(roundedDwellingAmount, 10)));

    return value;
  };

  normalizeDwellingDependencies = (value, previousValue, allValues, field) => {
    if (Number.isNaN(value)) return;
    const { change: changeF } = this.props;
    const fieldValue = setPercentageOfValue(allValues.dwellingAmount, value);

    changeF(field, Number.isNaN(fieldValue) ? '' : fieldValue);
    return value;
  };

  normalizePersonalPropertyPercentage = (value, previousValue, allValues, field) => {
    if (Number.isNaN(value)) return;
    const { change: changeF, initialValues } = this.props;

    // apply percentage to personal property
    this.normalizeDwellingDependencies(value, previousValue, allValues, field);

    if (value === 0) {
      changeF('personalPropertyReplacementCostCoverage', false);
    } else {
      changeF('personalPropertyReplacementCostCoverage', initialValues.personalPropertyReplacementCostCoverage || false);
    }
    return value;
  };

  normalizeSinkholeAmount = (value, previousValue, allValues) => {
    const { change: changeF } = this.props;
    if (String(value) === 'true') {
      changeF('sinkhole', 10);
      changeF('calculatedSinkhole', setPercentageOfValue(allValues.dwellingAmount, 10));
    } else {
      changeF('sinkhole', 0);
      changeF('calculatedSinkhole', 0);
    }
    return value;
  };

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

    const dependencyValue = Math.round(Number(String(fieldValues.dwellingAmount).replace(/\D+/g, '')) / 1000) * 1000;

    dispatch(change('Coverage', 'calculatedSinkhole', String(setPercentageOfValue(Number(dependencyValue), 10))));
  }

  handleAgencyChange = (agencyCode, isInit) => {
    if (!isInit) {
      this.props.dispatch(batchActions([
        change('Coverage', 'agencyCode', agencyCode),
        change('Coverage', 'agentCode', '')
      ]));
    }

    if (agencyCode) {
      const agency = _.find(this.props.agencies, a => String(a.agencyCode) === String(agencyCode));
      if (agency) {
        this.props.actions.serviceActions.getAgentsByAgency(agency.companyCode, agency.state, agencyCode).then((response) => {
          if (response.payload && response.payload[0].data.agents && response.payload[0].data.agents.length === 1) {
            this.props.dispatch(change('Coverage', 'agentCode', response.payload[0].data.agents[0].agentCode));
          }
        });
      }
    }
  };

  clearSecondaryPolicyholder = (value) => {
    const { dispatch, quoteData } = this.props;
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
      quoteData, fieldValues, handleSubmit, initialValues, pristine, agents, agencies, questions, dirty
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
      <QuoteBaseConnect>
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />
        <div className="route-content">

          <Form id="Coverage" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <HiddenField name="propertyIncidentalOccupanciesMainDwelling" />
            <HiddenField name="propertyIncidentalOccupanciesOtherStructures" />
            <HiddenField name="liabilityIncidentalOccupancies" />
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
                  fieldValues={fieldValues}
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
          </Form>
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <button tabIndex="0" aria-label="reset-btn form-coverage" className="btn btn-secondary" type="button" form="Coverage" onClick={() => this.props.reset('Coverage')}>
              Reset
            </button>
            <button tabIndex="0" aria-label="submit-btn form-coverage" className="btn btn-primary" type="submit" form="Coverage" disabled={this.props.appState.data.submitting || pristine || checkQuoteState(quoteData)}>
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

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  getAgents: state.service.getAgents,
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
    quoteStateActions: bindActionCreators(quoteStateActions, dispatch),
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
