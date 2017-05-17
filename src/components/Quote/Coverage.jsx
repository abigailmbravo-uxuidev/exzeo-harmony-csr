import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { reduxForm, Form, propTypes } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import TextField from '../Form/inputs/TextField';
import SelectField from '../Form/inputs/SelectField';
import RadioField from '../Form/inputs/RadioField';
import SelectFieldAgency from '../Form/inputs/SelectFieldAgency';
import SelectFieldAgents from '../Form/inputs/SelectFieldAgents';

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }) ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result : {};
  return quoteData;
};

const handleInitialize = (state) => {
  const quoteData = handleGetQuoteData(state);

  const values = {};

  values.agencyCode = '20000'; // _.get(quoteData, 'agencyCode');
  values.agentCode = '60000'; // _.get(quoteData, 'agentCode');
  values.effectiveDate = moment.utc(_.get(quoteData, 'effectiveDate')).format('YYYY-MM-DD');

  values.pH1email = _.get(quoteData, 'policyHolders[0].emailAddress');
  values.pH1FirstName = _.get(quoteData, 'policyHolders[0].firstName');
  values.pH1LastName = _.get(quoteData, 'policyHolders[0].lastName');
  values.pH1phone = _.get(quoteData, 'policyHolders[0].primaryPhoneNumber');

  values.pH2email = _.get(quoteData, 'policyHolders[1].emailAddress');
  values.pH2FirstName = _.get(quoteData, 'policyHolders[1].firstName');
  values.pH2LastName = _.get(quoteData, 'policyHolders[1].lastName');
  values.pH2phone = _.get(quoteData, 'policyHolders[1].primaryPhoneNumber');

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

  values.dwelling = _.get(quoteData, 'coverageLimits.dwelling.amount');
  values.dwellingMin = _.get(quoteData, 'coverageLimits.dwelling.minAmount');
  values.dwellingMax = _.get(quoteData, 'coverageLimits.dwelling.maxAmount');

  values.dwelling = _.get(quoteData, 'coverageLimits.dwelling.amount');
  values.lossOfUse = _.get(quoteData, 'coverageLimits.lossOfUse.amount');
  values.medicalPayments = _.get(quoteData, 'coverageLimits.medicalPayments.amount');
  values.moldLiability = _.get(quoteData, 'coverageLimits.moldLiability.amount');
  values.moldProperty = _.get(quoteData, 'coverageLimits.moldProperty.amount');
  values.ordinanceOrLaw = _.get(quoteData, 'coverageLimits.ordinanceOrLaw.amount');
  values.otherStructures = _.get(quoteData, 'coverageLimits.otherStructures.amount');
  values.personalLiability = _.get(quoteData, 'coverageLimits.personalLiability.amount');
  values.personalProperty = _.get(quoteData, 'coverageLimits.personalProperty.amount');
  values.personalPropertyReplacementCost = 'No';


  values.sinkhole = _.get(quoteData, 'coverageOptions.sinkholePerilCoverage.answer');

  values.allOtherPerils = _.get(quoteData, 'deductibles.allOtherPerils.amount');
  values.hurricane = _.get(quoteData, 'deductibles.hurricane.amount');

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


  return values;
};

const handleGetDocs = (state, name) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const result = _.find(taskData.model.variables, { name });
  const doc = (result && result.value) ? [result.value.result] : [];
  return _.concat([], doc);
};

/**
------------------------------------------------
 The render is where all the data is being pulled
 from the props.
 The quote data data comes from the previous task
 which is createQuote / singleQuote. This might
 not be the case in later calls, you may need
 to pull it from another place in the model
------------------------------------------------
*/

export class Coverage extends Component {

  componentDidMount() {
    // const workflowId = this.props.appState.instanceId;
    // const taskName = 'moveTo';
    // const taskData = { key: 'customerData' };
    // this.props.actions.cgActions.completeTask(this.props.appState.modelName, workflowId, taskName, taskData);

    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
      quote: this.props.quoteData,
      updateWorkflowDetails: true,
      hideYoChildren: false
    });
  }

  handleFormSubmit = (data) => {
    const workflowId = this.props.appState.instanceId;
    const submitData = data;

    submitData.agencyCode = String(data.agencyCode);
    submitData.agentCode = String(data.agentCode);

    const steps = [
      { name: 'hasUserEnteredData', data: { answer: 'Yes' } },
      { name: 'askCustomerData', data: submitData },
      { name: 'askToCustomizeDefaultQuote', data: { shouldCustomizeQuote: 'No' } }
    ];

    this.props.actions.cgActions.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
          workflowId, { recalc: false, updateWorkflowDetails: true });
        // this.context.router.history.push('/quote/underwriting');
      });
  };

  render() {
    const { fieldValues, handleSubmit, agencyDocs, agentDocs } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <Form id="Coverage" onSubmit={handleSubmit(this.handleFormSubmit)} noValidate>
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h2>Coverage / Rating</h2>

                <section className="producer ">
                  <h4>Produced By</h4>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <div><TextField validations={['required']} label={'Effective Date'} styleName={''} name={'effectiveDate'} type={'date'} /></div>
                    </div>

                    <div className="flex-child">
                      <SelectFieldAgency
                        name="agencyCode"
                        label="Agency"
                        onChange={function () { }}
                        validations={['required']}
                        agencies={agencyDocs}
                      />
                    </div>
                    <div className="flex-child">
                      <SelectFieldAgents
                        name="agentCode"
                        label="Agent"
                        onChange={function () { }}
                        validations={['required']}
                        agents={agentDocs}
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
                        <TextField validations={['required']} label={'Primary Phone'} styleName={''} name={'pH1phone'} />
                      </div>
                      <div className="flex-child">
                        <TextField label={'Secondary'} styleName={''} name={'secondaryPhone'} />
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
                        <TextField validations={['required']} label={'First Name'} styleName={''} name={'pH2FirstName'} />
                      </div>
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Last Name'} styleName={''} name={'pH2LastName'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Primary Phone'} styleName={''} name={'pH2phone'} />
                      </div>
                      <div className="flex-child">
                        <TextField label={'Secondary'} styleName={''} name={'secondaryPhone'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Email Address'} styleName={''} name={'pH2email'} />
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
                          label={'Address 1'} styleName={''}
                          input={{
                            name: 'address1',
                            disabled: true,
                            value: fieldValues.address1
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          label={'Address 2'} styleName={''} input={{
                            name: 'address2',
                            disabled: true,
                            value: fieldValues.address2
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          label={'City'} styleName={''} input={{
                            name: 'city',
                            disabled: true,
                            value: fieldValues.city
                          }}
                        />
                      </div>
                      <div className="flex-child">
                        <SelectField
                          name="state" component="select" styleName={''} label="State" input={{
                            name: 'state',
                            disabled: true,
                            value: fieldValues.state
                          }} onChange={function () {}} answers={[
                            {
                              answer: 'FL',
                              label: 'FL'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>
                      <div className="flex-child">
                        <TextField
                          label={'Zip'} styleName={''} name={'zip'} input={{
                            name: 'zip',
                            disabled: true,
                            value: fieldValues.zip
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-parent" />
                  </div>
                  <div className="property-details flex-child">
                    <h4>Home and Location</h4>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="construction" component="select" styleName={''} label="Construction" input={{
                            name: 'constructionType',
                            disabled: true,
                            value: fieldValues.constructionType
                          }} onChange={function () {}} answers={[
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
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>
                      <div className="flex-child">
                        <SelectField
                          name="protectionClass" component="select" styleName={''} label="Protection Class" input={{
                            name: 'protectionClass',
                            disabled: true,
                            value: fieldValues.protectionClass
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
                              answer: '10',
                              label: '10'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>
                      <div className="flex-child">
                        <TextField
                          label={'Year Roof Built'} styleName={''} input={{
                            name: 'yearOfRoof',
                            disabled: true,
                            value: fieldValues.yearOfRoof
                          }}
                        />
                      </div>
                      <div className="flex-child">
                        <TextField
                          label={'Sq. Footage of Dwelling'} styleName={''} input={{
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
                          label={'Year Home Built'} styleName={''} input={{
                            name: 'yearBuilt',
                            disabled: true,
                            value: fieldValues.yearBuilt
                          }}
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
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>
                      <div className="flex-child">
                        <SelectField
                          name="roofType" component="select" styleName={''} label="Residence Type" input={{
                            name: 'residenceType',
                            disabled: true,
                            value: fieldValues.residenceType
                          }} onChange={function () {}} answers={[
                            {
                              answer: 'Single Family',
                              label: 'Single Family'
                            }, {
                              answer: 'Commercial',
                              label: 'Commercial'
                            }
                          ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}
                        />
                      </div>
                      <div className="flex-child">
                        <TextField
                          label={'Distance to Tidal Waters'} styleName={''} input={{
                            name: 'distanceToTidalWater',
                            disabled: true,
                            value: fieldValues.distanceToTidalWater
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          label={'Distance to Fire Hydrant'} styleName={''} input={{
                            name: 'distanceToFireHydrant',
                            disabled: true,
                            value: fieldValues.distanceToFireHydrant
                          }}
                        />
                      </div>
                      <div className="flex-child">
                        <TextField
                          label={'Distance to Fire Station'} styleName={''} input={{
                            name: 'distanceToFireStation',
                            disabled: true,
                            value: fieldValues.distanceToFireStation
                          }}
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
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
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

                    <div className="flex-parent">
                      <div className="flex-child" />
                      <div className="flex-child" />
                      <div className="flex-child" />
                    </div>

                  </div>
                </section>
                <section className="coverage-options flex-parent">
                  <div className="coverages flex-child">
                    <h4>Coverages</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={`Dwelling (A - ${fieldValues.dwellingMin} - ${fieldValues.dwellingMax})`} styleName={''} name={'dwelling'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField
                          label={'Other Structure (B)'} styleName={''}
                          input={{
                            name: 'otherStructures',
                            disabled: true,
                            value: fieldValues.otherStructures
                          }}
                        />
                      </div>
                      {/* <div className="flex-child">
                        <SelectField
                          name="otherStructureBSelect" component="select" styleName={''} label=" " validations={['required']} answers={[
                            {
                              answer: '10',
                              label: '10% of Coverage A'
                            }, {
                              answer: '15',
                              label: '15% of Coverage A'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div> */}
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Personal Property (C)'} styleName={''} name={'personalProperty'} />
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
                        <TextField validations={['required']} label={'Loss of Use (D)'} styleName={''} name={'lossOfUse'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Personal Liability (E)'} styleName={''} name={'personalLiability'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Medical Payments (F)'} styleName={''} name={'medicalPayments'} />
                      </div>
                    </div>
                  </div>
                  <div className="other-coverages flex-child">
                    <h4>Other Coverages</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Mold Property Limit'} styleName={''} name={'moldProperty'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Mold Liability Limit'} styleName={''} name={'moldLiability'} />

                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <RadioField
                          name={'personalPropertyReplacementCost'} styleName={'billPlan'} label={'Personal Property Repl Cost'} onChange={function () {}} segmented answers={[
                            {
                              answer: 'No',
                              label: 'No'
                            }, {
                              answer: 'Yes',
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
                              answer: '45',
                              label: '45% of Coverage A'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="deductibles flex-child">
                    <h4>Deductibles</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="hurricane" component="select" styleName={''} label="Hurricane" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '2',
                              label: '2% of Coverage A'
                            }, {
                              answer: '5',
                              label: '5% of Coverage A'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="allOtherPerils" component="select" styleName={''} label="All Other Perils" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '1000',
                              label: '$1,000'
                            }, {
                              answer: '2500',
                              label: '$2,500'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="sinkhole" component="select" styleName={''} label="Sinkhole" onChange={function () {}} answers={[
                            {
                              answer: false,
                              label: 'Coverage Excluded'
                            }, {
                              answer: true,
                              label: 'Coverage Included'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
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
                          name="roofToWallConnection" component="select" styleName={'weakestRoofWallConnect'} label="What is the weakest roof to wall connection?" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Toe Nails',
                              label: 'Toe Nails'
                            }, {
                              answer: 'Cement',
                              label: 'Cement'
                            },
                            {
                              answer: 'Other',
                              label: 'Other'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>
                    </div>

                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          name="roofDeckAttachment" component="select" styleName={''} label="What is the weakest form of roof deck attachment?" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'A',
                              label: 'A'
                            }, {
                              answer: 'B',
                              label: 'B'
                            }, {
                              answer: 'Other',
                              label: 'Other'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>

                    </div>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <RadioField
                          validations={['required']} name={'secondaryWaterResistance'} styleName={''} label={'Is there Secondary Water Resistance?'} onChange={function () {}} segmented answers={[
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
                          name="windBorneDebrisRegion" component="select" styleName={''} label="What is the weakest form of wind borne debris opening protection on the structure?" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'None',
                              label: 'None'
                            }, {
                              answer: 'Some',
                              label: 'Some'
                            }, {
                              answer: 'Other',
                              label: 'Other'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>

                    </div>

                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          name="roofGeometry" component="select" styleName={''} label="Roof Shape" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Hip',
                              label: 'Hip'
                            }, {
                              answer: 'Flat',
                              label: 'Flat'
                            },
                            {
                              answer: 'Other',
                              label: 'Other'
                            }
                          ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}
                        />
                      </div>
                    </div>

                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          name="roofCovering" component="select" styleName={''} label="What is the roof covering?" onChange={function () {}} validations={['required']} answers={[
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
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>

                    </div>

                  </div>
                  <div className="wind-col2 flex-child">
                    <h4>&nbsp;</h4>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'What is the FBC wind speed for this property?'} styleName={''} name={'floridaBuildingCodeWindSpeed'} />
                      </div>

                    </div>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'What is the FBC wind speed design for this property?'} styleName={''} name={'floridaBuildingCodeWindSpeedDesign'} />
                      </div>

                    </div>

                    <div className="flex-parent">

                      <div className="flex-child">
                        <RadioField
                          validations={['required']} name={'windBorneDebrisRegion'} styleName={''} label={'Is the property in the wind borne debris region?'} onChange={function () {}} segmented answers={[
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
                          name="internalPressureDesign" component="select" styleName={''} label="Internal Pressure Design" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Enclosed',
                              label: 'Enclosed'
                            }, {
                              answer: 'Exclosed',
                              label: 'Exclosed'
                            },
                            {
                              answer: 'Other',
                              label: 'Other'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>

                    </div>

                    <div className="flex-parent">

                      <div className="flex-child">
                        <SelectField
                          name="terrain" component="select" styleName={'propertyTerrain'} label="What terrain is the property located in?" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'A',
                              label: 'A'
                            }, {
                              answer: 'B',
                              label: 'B'
                            },
                            {
                              answer: 'C',
                              label: 'C'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>

                    </div>

                  </div>
                </section>

                <div className="btn-footer">
                  <button className="btn btn-secondary" type="submit" form="Coverage">
                                    Cancel
                                </button>
                  <button className="btn btn-primary" type="submit" form="Coverage">
                                      Save {/* Save &amp; Re-Evaluate */}
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Coverage' })(Coverage));
