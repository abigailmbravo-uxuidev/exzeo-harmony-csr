import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import TextField from '../Form/inputs/TextField';
import PhoneField from '../Form/inputs/PhoneField';
import HiddenField from '../Form/inputs/HiddenField';
import SelectField from '../Form/inputs/SelectField';
import RadioField from '../Form/inputs/RadioField';
import SelectFieldAgency from '../Form/inputs/SelectFieldAgency';
import SelectFieldAgents from '../Form/inputs/SelectFieldAgents';

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }) ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result : {};
  return quoteData;
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

  values.agencyCode = '20000'; // _.get(quoteData, 'agencyCode');
  values.agentCode = '60000'; // _.get(quoteData, 'agentCode');
  values.effectiveDate = moment.utc(_.get(quoteData, 'effectiveDate')).format('YYYY-MM-DD');

  values.pH1email = _.get(quoteData, 'policyHolders[0].emailAddress');
  values.pH1FirstName = _.get(quoteData, 'policyHolders[0].firstName');
  values.pH1LastName = _.get(quoteData, 'policyHolders[0].lastName');
  values.pH1phone = _.get(quoteData, 'policyHolders[0].primaryPhoneNumber') || '';
  values.pH1secondaryPhone = _.get(quoteData, 'policyHolders[0].secondaryPhoneNumber') || '';

  values.pH2email = _.get(quoteData, 'policyHolders[1].emailAddress');
  values.pH2FirstName = _.get(quoteData, 'policyHolders[1].firstName');
  values.pH2LastName = _.get(quoteData, 'policyHolders[1].lastName');
  values.pH2phone = _.get(quoteData, 'policyHolders[1].primaryPhoneNumber') || '';
  values.pH2secondaryPhone = _.get(quoteData, 'policyHolders[1].secondaryPhoneNumber') || '';


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

  values.dwellingAmount = _.get(quoteData, 'coverageLimits.dwelling.amount');
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

const handleGetDocs = (state, name) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const result = _.find(taskData.model.variables, { name });
  const doc = (result && result.value) ? [result.value.result] : [];
  return _.concat([], doc);
};


export class Coverage extends Component {

  componentDidMount() {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
      ...this.props.appState.data,
      quote: this.props.quoteData,
      updateWorkflowDetails: true,
      hideYoChildren: false
    });
  }

  clearForm = () => {
    const { dispatch, quoteData } = this.props;

    dispatch(change('Coverage', 'effectiveDate', moment.utc(_.get(quoteData, 'effectiveDate')).format('YYYY-MM-DD')));

    dispatch(change('Coverage', 'pH1email', _.get(quoteData, 'policyHolders[0].emailAddress')));
    dispatch(change('Coverage', 'pH1FirstName', _.get(quoteData, 'policyHolders[0].firstName')));
    dispatch(change('Coverage', 'pH1LastName', _.get(quoteData, 'policyHolders[0].lastName')));
    dispatch(change('Coverage', 'pH1phone', _.get(quoteData, 'policyHolders[0].primaryPhoneNumber')));
    dispatch(change('Coverage', 'pH1secondaryPhone', _.get(quoteData, 'policyHolders[0].secondaryPhoneNumber')));

    dispatch(change('Coverage', 'pH2email', _.get(quoteData, 'policyHolders[1].emailAddress')));
    dispatch(change('Coverage', 'pH2FirstName', _.get(quoteData, 'policyHolders[1].firstName')));
    dispatch(change('Coverage', 'pH2LastName', _.get(quoteData, 'policyHolders[1].lastName')));
    dispatch(change('Coverage', 'pH2phone', _.get(quoteData, 'policyHolders[1].primaryPhoneNumber')));
    dispatch(change('Coverage', 'pH2secondaryPhone', _.get(quoteData, 'policyHolders[1].secondaryPhoneNumber')));

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

    dispatch(change('Coverage', 'dwellingAmount', _.get(quoteData, 'coverageLimits.dwelling.amount')));
    dispatch(change('Coverage', 'dwellingMin', _.get(quoteData, 'coverageLimits.dwelling.minAmount')));
    dispatch(change('Coverage', 'dwellingMax', _.get(quoteData, 'coverageLimits.dwelling.maxAmount')));

    dispatch(change('Coverage', 'lossOfUse', _.get(quoteData, 'coverageLimits.lossOfUse.amount')));
    dispatch(change('Coverage', 'medicalPayments', _.get(quoteData, 'coverageLimits.medicalPayments.amount')));
    dispatch(change('Coverage', 'moldLiability', _.get(quoteData, 'coverageLimits.moldLiability.amount')));
    dispatch(change('Coverage', 'moldProperty', _.get(quoteData, 'coverageLimits.moldProperty.amount')));
    dispatch(change('Coverage', 'ordinanceOrLaw', _.get(quoteData, 'coverageLimits.ordinanceOrLaw.amount')));

    const otherStructures = _.get(quoteData, 'coverageLimits.otherStructures.amount');
    const dwelling = _.get(quoteData, 'coverageLimits.dwelling.amount');
    const personalProperty = _.get(quoteData, 'coverageLimits.personalProperty.amount');
    const hurricane = _.get(quoteData, 'deductibles.hurricane.amount');
    const calculatedHurricane = _.get(quoteData, 'deductibles.hurricane.calculatedAmount');


    dispatch(change('Coverage', 'dwellingAmount', dwelling));

    dispatch(change('Coverage', 'otherStructuresAmount', otherStructures));
    dispatch(change('Coverage', 'otherStructures', String(calculatePercentage(otherStructures, dwelling))));
    dispatch(change('Coverage', 'personalLiability', _.get(quoteData, 'coverageLimits.personalLiability.amount')));
    dispatch(change('Coverage', 'personalProperty', String(calculatePercentage(personalProperty, dwelling))));
    dispatch(change('Coverage', 'personalPropertyAmount', personalProperty));
    dispatch(change('Coverage', 'personalPropertyReplacementCostCoverage', false));


    dispatch(change('Coverage', 'sinkholePerilCoverage', _.get(quoteData, 'coverageOptions.sinkholePerilCoverage.answer')));

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

  handleFormSubmit = (data) => {
    const workflowId = this.props.appState.instanceId;
    const submitData = data;

    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, submitting: true });

    submitData.agencyCode = String(data.agencyCode);
    submitData.agentCode = String(data.agentCode);
    submitData.dwellingAmount = Number(data.dwellingAmount);
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

    submitData.pH1phone = submitData.pH1phone.replace(/[^\d]/g, '');
    submitData.pH1secondaryPhone = submitData.pH1secondaryPhone ? submitData.pH1secondaryPhone.replace(/[^\d]/g, '') : submitData.pH1secondaryPhone;

    submitData.pH2phone = submitData.pH2phone ? submitData.pH2phone.replace(/[^\d]/g, '') : submitData.pH2phone;
    submitData.pH2secondaryPhone = submitData.pH2secondaryPhone ? submitData.pH2secondaryPhone.replace(/[^\d]/g, '') : submitData.pH2secondaryPhone;


    const steps = [
      { name: 'hasUserEnteredData', data: { answer: 'Yes' } },
      { name: 'askCustomerData', data: submitData },
      { name: 'askToCustomizeDefaultQuote', data: { shouldCustomizeQuote: 'Yes' } },
      { name: 'customizeDefaultQuote', data: submitData }

    ];

    this.props.actions.cgActions.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
          workflowId, { ...this.props.appState.data, recalc: false, quote: this.props.quoteData, updateWorkflowDetails: true });
        // this.context.router.history.push('/quote/underwriting');
        toastr.success('Quote Saved', `Quote: ${this.props.quoteData.quoteNumber} has been saved successfully`);
      });
  };

  updateDwellingAndDependencies = (event) => {
    const { dispatch, fieldValues } = this.props;

    if (Number.isNaN(event.target.value)) return;

    if (fieldValues.otherStructures !== 'other') {
      dispatch(change('Coverage', 'otherStructuresAmount', String(setPercentageOfValue(Number(event.target.value), Number(fieldValues.otherStructures)))));
    }
    if (fieldValues.personalProperty !== 'other') {
      dispatch(change('Coverage', 'personalPropertyAmount', String(setPercentageOfValue(Number(event.target.value), Number(fieldValues.personalProperty)))));
    }
    dispatch(change('Coverage', 'calculatedHurricane', String(setPercentageOfValue(Number(event.target.value), Number(fieldValues.hurricane)))));


    dispatch(change('Coverage', 'lossOfUse', String(setPercentageOfValue(Number(event.target.value), 10))));
  }

  updateDependencies = (event, field, dependency) => {
    const { dispatch, fieldValues } = this.props;
    if (Number.isNaN(event.target.value)) return;

    const fieldValue = setPercentageOfValue(fieldValues[dependency], Number(event.target.value));

    dispatch(change('Coverage', field, Number.isNaN(fieldValue) ? '' : String(fieldValue)));
  }

  render() {
    const { fieldValues, handleSubmit, initialValues, agencyDocs, agentDocs, pristine } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <Form id="Coverage" onSubmit={handleSubmit(this.handleFormSubmit)} noValidate>
            <HiddenField name={'propertyIncidentalOccupanciesMainDwelling'} />
            <HiddenField name={'propertyIncidentalOccupanciesOtherStructures'} />
            <HiddenField name={'liabilityIncidentalOccupancies'} />

            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <section className="producer ">
                  <h4>Produced By</h4>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <div><TextField validations={['required']} label={'Effective Date'} styleName={''} name={'effectiveDate'} type={'date'} /></div>
                    </div>

                    <div className="flex-child">
                      {/* <SelectFieldAgency
                        name="agencyCode"
                        label="Agency"
                        onChange={function () { }}
                        validations={['required']}
                        agencies={agencyDocs}
                      /> */}
                      <SelectField
                        name="agencyCode" component="select" styleName={''} label="Agency" onChange={function () {}} answers={[
                          {
                            answer: '20000',
                            label: 'TypTap Insurance Company'
                          }
                        ]}
                      />
                    </div>
                    <div className="flex-child">
                      <SelectField
                        name="agentCode" component="select" styleName={''} label="Agent" onChange={function () {}} answers={[
                          {
                            answer: '60000',
                            label: 'Wally Wagoner'
                          }
                        ]}
                      />
                    </div>
                  </div>
                </section>

                <section className="demographics flex-parent">
                  <div className="policy-holder-a flex-child">
                    <h4>Primary Policyholder</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'First Name'} styleName={''} name={'pH1FirstName'} />
                      </div>
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Last Name'} styleName={''} name={'pH1LastName'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <PhoneField validations={['required', 'phone']} label={'Primary Phone'} styleName={''} name={'pH1phone'} />
                      </div>
                      <div className="flex-child">
                        <PhoneField label={'Secondary Phone'} styleName={''} name={'pH1secondaryPhone'} validations={['phone']} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Email Address'} styleName={''} name={'pH1email'} />
                      </div>
                    </div>
                  </div>

                  <div className="policy-holder-b flex-child">
                    <h4>Secondary Policyholder</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField label={'First Name'} styleName={''} name={'pH2FirstName'} />
                      </div>
                      <div className="flex-child">
                        <TextField label={'Last Name'} styleName={''} name={'pH2LastName'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <PhoneField label={'Primary Phone'} styleName={''} name={'pH2phone'} validations={['phone']} />
                      </div>
                      <div className="flex-child">
                        <PhoneField label={'Secondary Phone'} styleName={''} name={'pH2secondaryPhone'} validations={['phone']} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['email']} label={'Email Address'} styleName={''} name={'pH2email'} />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="property flex-parent">
                  <div className="property-address flex-child">
                    <h4>Property (Risk)</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          label={'Address 1'} styleName={''} name={'address1'} disabled
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          label={'Address 2'} styleName={''} name={'address2'} disabled
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child city">
                        <TextField
                          label={'City'} styleName={''} name={'city'} disabled
                        />
                      </div>

                    </div>
                    <div className="flex-parent">
                      <div className="flex-child state">
                        <TextField
                          label={'State'} styleName={''} name={'state'} disabled
                        />
                      </div>
                      <div className="flex-child zip">
                        <TextField
                          label={'Zip'} styleName={''} name={'zip'} disabled
                        />
                      </div>
                    </div>
                    <div className="flex-parent" />
                  </div>
                  <div className="property-details flex-child">
                    <h4>Home and Location</h4>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          label={'Year Home Built'} styleName={''} name={'yearBuilt'} disabled
                        />
                      </div>
                      <div className="flex-child">
                        <SelectField
                          name="protectionClass" component="select" styleName={''} label="Protection Class" disabled answers={[
                            {
                              answer: '1',
                              label: '01'
                            }, {
                              answer: '2',
                              label: '02'
                            },
                            {
                              answer: '3',
                              label: '03'
                            },
                            {
                              answer: '4',
                              label: '04'
                            },
                            {
                              answer: '5',
                              label: '05'
                            },
                            {
                              answer: '6',
                              label: '06'
                            },
                            {
                              answer: '7',
                              label: '07'
                            },
                            {
                              answer: '8',
                              label: '08'
                            },
                            {
                              answer: '9',
                              label: '09'
                            },
                            {
                              answer: '10',
                              label: '10'
                            }
                          ]}
                        />
                      </div>
                      <div className="flex-child">
                        <TextField
                          label={'Tidal Waters Dist.'} styleName={''} name={'distanceToTidalWater'} disabled
                        />
                      </div>

                      <div className="flex-child">
                        <SelectField
                          name="residenceType" component="select" styleName={''} label="Residence Type" disabled answers={[
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

                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          component="select" styleName={''} label="Construction" name={'constructionType'}
                          answers={[
                            {
                              answer: 'FRAME',
                              label: 'Frame'
                            }, {
                              answer: 'PLASTIC SIDING',
                              label: 'Plastic Siding'
                            },
                            {
                              answer: 'ALUMINUM SIDING',
                              label: 'Aluminum Siding'
                            },
                            {
                              answer: 'MASONRY',
                              label: 'Masonry'
                            },
                            {
                              answer: 'MASONRY VENEER',
                              label: 'Masonry Veneer'
                            },
                            {
                              answer: 'SUPERIOR',
                              label: 'Superior'
                            }
                          ]}
                        />
                      </div>
                      <div className="flex-child">
                        <SelectField
                          component="select" styleName={''} label="BCEG" input={{
                            name: 'buildingCodeEffectivenessGrading',
                            disabled: true,
                            value: fieldValues.buildingCodeEffectivenessGrading
                          }} onChange={function () {}} answers={[
                            {
                              answer: '1',
                              label: '01'
                            }, {
                              answer: '2',
                              label: '02'
                            },
                            {
                              answer: '3',
                              label: '03'
                            },
                            {
                              answer: '4',
                              label: '04'
                            },
                            {
                              answer: '5',
                              label: '05'
                            },
                            {
                              answer: '6',
                              label: '06'
                            },
                            {
                              answer: '7',
                              label: '07'
                            },
                            {
                              answer: '8',
                              label: '08'
                            },
                            {
                              answer: '9',
                              label: '09'
                            },
                            {
                              answer: '98',
                              label: '98'
                            },
                            {
                              answer: '99',
                              label: '99'
                            }
                          ]}
                        />
                      </div>

                      <div className="flex-child">
                        <TextField
                          label={'Fire Hydrant Dist.'} styleName={''} input={{
                            name: 'distanceToFireHydrant',
                            disabled: true,
                            value: fieldValues.distanceToFireHydrant
                          }}
                        />
                      </div>
                      <div className="flex-child">
                        <TextField
                          label={'Sq. Ft. of Home'} styleName={''} input={{
                            name: 'squareFeet',
                            disabled: true,
                            value: fieldValues.squareFeet
                          }}
                        />
                      </div>


                    </div>

                    <div className="flex-parent">


                      <div className="flex-child">
                        <TextField
                          label={'Year Roof Built'} styleName={''} name="yearOfRoof" disabled
                        />
                      </div>
                      <div className="flex-child">
                        <SelectField
                          name="distanceHydrant" component="select" styleName={''} label="Family Units" input={{
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
                            },
                            {
                              answer: '5-8',
                              label: '5-8'
                            }, {
                              answer: '9+',
                              label: '9+'
                            }
                          ]}
                        />
                      </div>
                      <div className="flex-child">
                        <TextField
                          label={'Fire Station Dist.'} styleName={''} input={{
                            name: 'distanceToFireStation',
                            disabled: true,
                            value: fieldValues.distanceToFireStation
                          }}
                        />
                      </div>

                      <div className="flex-child">
                        <TextField
                          label={'Flood Zone'} styleName={''} input={{
                            name: 'floodZone',
                            disabled: true,
                            value: fieldValues.floodZone
                          }}
                        />
                      </div>
                    </div>


                  </div>
                </section>
                <section className="coverage-options flex-parent">
                  <div className="coverages flex-child">
                    <h4>Coverages</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          validations={['required', 'range']} label={`Dwelling (A - ${fieldValues.dwellingMin} - ${fieldValues.dwellingMax})`} styleName={''} name={'dwellingAmount'}
                          min={initialValues.dwellingMin} max={initialValues.dwellingMax} onChange={value => this.updateDwellingAndDependencies(value)}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          validations={['required']}
                          name="otherStructuresAmount"
                          label={'Other Structure (B)'} styleName={'coverage-b'} disabled={fieldValues.otherStructures !== 'other'}
                        />
                      </div>
                      <div className="flex-child">
                        <SelectField
                          name="otherStructures" component="select" styleName={'coverage-b-percentage'} label="Percentage" onChange={event => this.updateDependencies(event, 'otherStructuresAmount', 'dwellingAmount')} validations={['required']} answers={[
                            {
                              answer: '0',
                              label: '0%'
                            }, {
                              answer: '2',
                              label: '2%'
                            }, {
                              answer: '5',
                              label: '5%'
                            },
                            {
                              answer: '10',
                              label: '10%'
                            }, {
                              answer: 'other',
                              label: 'Other'
                            }

                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          validations={['required']}
                          label={'Personal Property (C)'} styleName={'coverage-c'} name="personalPropertyAmount" disabled={fieldValues.personalProperty !== 'other'}
                        />
                      </div>
                      <div className="flex-child">
                        <SelectField
                          name="personalProperty" component="select" styleName={'coverage-c-percentage'} label="Percentage" onChange={event => this.updateDependencies(event, 'personalPropertyAmount', 'dwellingAmount')} validations={['required']} answers={[
                            {
                              answer: '0',
                              label: '0%'
                            }, {
                              answer: '25',
                              label: '25%'
                            }, {
                              answer: '35',
                              label: '35%'
                            }, {
                              answer: '50',
                              label: '50%'
                            }, {
                              answer: 'other',
                              label: 'Other'
                            }

                          ]}
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
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          label={'Loss of Use (D)'} styleName={''} name="lossOfUse" disabled
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="personalLiability" component="select" styleName={''} label="Personal Liability (E)" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '100000',
                              label: '$100,000'
                            }, {
                              answer: '300000',
                              label: '$300,000'
                            }

                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          label={'Medical Payments (F)'} styleName={''}
                          input={{
                            name: 'medicalPayments',
                            disabled: true,
                            value: '$2000'
                          }}
                        />

                      </div>
                    </div>
                  </div>
                  <div className="other-coverages flex-child">
                    <h4>Other Coverages</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="moldProperty" component="select" styleName={''} label="Mold Property Limit" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '10000',
                              label: '$10,000'
                            }, {
                              answer: '25000',
                              label: '$25,000'
                            }, {
                              answer: '50000',
                              label: '$50,000'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="moldLiability" component="select" styleName={''} label="Mold Liability Limit" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '50000',
                              label: '$50,000'
                            }, {
                              answer: '100000',
                              label: '$100,000'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
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
                    <div className="flex-parent" />
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="ordinanceOrLaw" component="select" styleName={''} label="Ordinace of Law Coverage" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '25',
                              label: '25% of Coverage A (included)'
                            }, {
                              answer: '50',
                              label: '50% of Coverage A'
                            }
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="deductibles flex-child">
                    <h4>Deductibles</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="hurricane" component="select" styleName={''} label="Hurricane" onChange={event => this.updateDependencies(event, 'calculatedHurricane', 'dwellingAmount')} validations={['required']} answers={[
                            {
                              answer: '2',
                              label: '2% of Coverage A'
                            }, {
                              answer: '5',
                              label: '5% of Coverage A'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          validations={['required']}
                          label={'Calculated Hurricane'} styleName={'coverage-c'} name="calculatedHurricane" disabled
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="allOtherPerils" component="select" styleName={''} label="All Other Perils" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '500',
                              label: '$500'
                            }, {
                              answer: '1000',
                              label: '$1,000'
                            }, {
                              answer: '2500',
                              label: '$2,500'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="sinkholePerilCoverage" component="select" styleName={''} label="Sinkhole" onChange={function () {}} answers={[
                            {
                              answer: false,
                              label: 'Coverage Excluded'
                            }, {
                              answer: true,
                              label: 'Coverage Included'
                            }
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="discounts flex-child">
                    <h4>Discounts</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
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
                    <div className="flex-parent">
                      <div className="flex-child">
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
                    <div className="flex-parent">
                      <div className="flex-child">
                        <RadioField
                          name={'sprinkler'} styleName={''} label={'Sprinkler'} onChange={function () {}} segmented answers={[
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
                </section>
                <section className="wind flex-parent">
                  <div className="wind-col1 flex-child">
                    <h4>Wind Mitigation</h4>
                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          name="roofCovering" component="select" styleName={''} label="Roof Covering" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Non-FBC',
                              label: 'Non-FBC'
                            }, {
                              answer: 'FBC',
                              label: 'FBC'
                            },
                            {
                              answer: 'Other',
                              label: 'Other'
                            }
                          ]}
                        />
                      </div>

                    </div>

                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          name="roofDeckAttachment" component="select" styleName={''} label="Roof Deck Attachment" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'A'
                            },
                            {
                              answer: 'B'
                            },
                            {
                              answer: 'C'
                            },
                            {
                              answer: 'D'
                            },
                            {
                              answer: 'Concrete'
                            },
                            {
                              answer: 'Other'
                            }
                          ]}
                        />
                      </div>

                    </div>


                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="roofToWallConnection" component="select" styleName={'weakestRoofWallConnect'} label="Roof to Wall Attachment" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Toe Nails'
                            },
                            {
                              answer: 'Clips'
                            },
                            {
                              answer: 'Single Wraps'
                            },
                            {
                              answer: 'Double Wraps'
                            },
                            {
                              answer: 'Other'
                            }
                          ]}
                        />
                      </div>
                    </div>

                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          name="roofGeometry" component="select" styleName={''} label="Roof Geometry" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Flat'
                            },
                            {
                              answer: 'Gable'
                            },
                            {
                              answer: 'Hip'
                            },
                            {
                              answer: 'Other'
                            }
                          ]}
                        />
                      </div>
                    </div>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <RadioField
                          validations={['required']} name={'secondaryWaterResistance'} styleName={''} label={'Secondary Water Resistance (SWR)'} onChange={function () {}} segmented answers={[
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

                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          name="openingProtection" component="select" styleName={''} label="Opening Protection" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'None'
                            },
                            {
                              answer: 'Basic'
                            },
                            {
                              answer: 'Hurricane'
                            },
                            {
                              answer: 'Other'
                            }
                          ]}
                        />
                      </div>

                    </div>


                  </div>
                  <div className="wind-col2 flex-child">
                    <h4>&nbsp;</h4>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'FBC Wind Speed'} styleName={''} name={'floridaBuildingCodeWindSpeed'} />
                      </div>

                    </div>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'FBC Wind Speed Design'} styleName={''} name={'floridaBuildingCodeWindSpeedDesign'} />
                      </div>

                    </div>

                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          name="terrain" component="select" styleName={'propertyTerrain'} label="Terrain" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'B',
                              label: 'B'
                            }, {
                              answer: 'C',
                              label: 'C'
                            },
                            {
                              answer: 'HVHZ',
                              label: 'HVHZ'
                            },
                            {
                              answer: 'Other',
                              label: 'Other'
                            }
                          ]}
                        />
                      </div>

                    </div>


                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          name="internalPressureDesign" component="select" styleName={''} label="Internal Pressure Design" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Enclosed',
                              label: 'Enclosed'
                            }, {
                              answer: 'Partial',
                              label: 'Partial'
                            },
                            {
                              answer: 'Other',
                              label: 'Other'
                            }
                          ]}
                        />
                      </div>

                    </div>

                    <div className="flex-parent">

                      <div className="flex-child">
                        <RadioField
                          validations={['required']} name={'windBorneDebrisRegion'} styleName={''} label={'Wind Borne Debris Region (WBDR)'} onChange={function () {}} segmented answers={[
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


                  </div>
                </section>

                <div className="btn-footer">
                  <button
                    className="btn btn-secondary" type="button" form="Coverage" onClick={this.clearForm}
                  >
                                    Cancel
                                </button>
                  <button
                    className="btn btn-primary" type="submit" form="Coverage" disabled={this.props.appState.data.submitting || pristine}
                  >
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
  fieldValues: _.get(state.form, 'Coverage.values', {}),
  initialValues: handleInitialize(state),
  agencyDocs: handleGetDocs(state, 'getAgencyDocument'),
  agentDocs: handleGetDocs(state, 'getAgentDocument'),
  quoteData: handleGetQuoteData(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Coverage', enableReinitialize: true })(Coverage));
