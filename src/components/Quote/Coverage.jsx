import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { reduxForm, Form, propTypes } from 'redux-form';
import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import TextField from '../Form/inputs/TextField';
import SelectField from '../Form/inputs/SelectField';
import RadioField from '../Form/inputs/RadioField';
import CheckField from '../Form/inputs/CheckField';
import DisplayField from '../Form/inputs/DisplayField';
import SliderField from '../Form/inputs/SliderField';
import SelectFieldAgency from '../Form/inputs/SelectFieldAgency';
import SelectFieldAgents from '../Form/inputs/SelectFieldAgents';

const handleFormSubmit = (data, dispatch, props) => {
  alert('submit');
};

const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'getQuote' }) ? _.find(taskData.model.variables, { name: 'getQuote' }).value.result : {};
  const values = {};

  values.agency = _.get(quoteData, 'agencyCode');
  values.agent = _.get(quoteData, 'agentCode');
  values.effectiveDate = moment.utc(_.get(quoteData, 'effectiveDate')).format('YYYY-MM-DD');

  values.email = _.get(quoteData, 'policyholders[0].emailAddress');
  values.pH1FirstName = _.get(quoteData, 'policyholders[0].firstName');
  values.pH1LastName = _.get(quoteData, 'policyholders[0].lastName');
  values.phone = _.get(quoteData, 'policyholders[0].primaryPhoneNumber');

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


  return values;
};

const handleGetAgencyDocs = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const result = _.find(taskData.model.variables, { name: 'getAgencyDocument' }).value.result;
  return _.concat([], [result]);
};

const handleGetAgentDocs = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const result = _.find(taskData.model.variables, { name: 'getAgentDocument' }).value.result;
  return _.concat([], [result]);
};

// ------------------------------------------------
// The render is where all the data is being pulled
//  from the props.
// The quote data data comes from the previous task
//  which is createQuote / singleQuote. This might
//  not be the case in later calls, you may need
//  to pull it from another place in the model
// ------------------------------------------------
export class Coverage extends Component {

  componentDidMount() {
    const workflowId = this.props.appState.instanceId;
    const taskName = 'moveTo';
    const taskData = { key: 'customerData' };
    this.props.actions.cgActions.completeTask(this.props.appState.modelName, workflowId, taskName, taskData);
  }

  render() {
    const { fieldValues, handleSubmit, agencyDocs, agentDocs } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <Form id="Coverage" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">

                <section className="producer ">
                  <h4>Produced By</h4>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <div><TextField validations={['required']} label={'Effective Date'} styleName={''} name={'effectiveDate'} type={'date'} /></div>
                    </div>

                    <div className="flex-child">
                      <SelectFieldAgency
                        name="agency"
                        label="Agency"
                        onChange={function () { }}
                        validations={['required']}
                        agencies={agencyDocs}
                      />
                    </div>
                    <div className="flex-child">
                      <SelectFieldAgents
                        name="agent"
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
                        <TextField validations={['required']} label={'First Name'} styleName={''} name={'fNamePrimary'} />
                      </div>
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Last Name'} styleName={''} name={'lNamePrimary'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Primary Phone'} styleName={''} name={'primaryPrimaryPhone'} />
                      </div>
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Secondary'} styleName={''} name={'primarySecondaryPhone'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Email Address'} styleName={''} name={'emailPrimary'} />
                      </div>
                    </div>

                  </div>

                  <div className="policy-holder-b flex-child">
                    <h4>Secondary Policyholder</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'First Name'} styleName={''} name={'fNameSecondary'} />
                      </div>
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Last Name'} styleName={''} name={'lNameSecondary'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Primary Phone'} styleName={''} name={'secondaryPrimaryPhone'} />
                      </div>
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Secondary Phone'} styleName={''} name={'secondarySecondaryPhone'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Email Address'} styleName={''} name={'emailSecondary'} />
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
                          validations={['required']} label={'Address 1'} styleName={''}
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
                          validations={['required']} label={'Address 2'} styleName={''} input={{
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
                          validations={['required']} label={'City'} styleName={''} input={{
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
                          }} onChange={function () {}} validations={['required']} answers={[
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
                          validations={['required']} label={'Zip'} styleName={''} name={'zip'} input={{
                            name: 'zip',
                            disabled: true,
                            value: fieldValues.zip
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      {/* <div className="flex-child">
                        <SelectField
                          name="territory" component="select" styleName={''} label="Territory" input={{
                            disabled: true
                          }} onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Some Place',
                              label: 'Some Place'
                            }, {
                              answer: 'Some Other Place',
                              label: 'Some Other Place'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div> */}
                    </div>
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
                          }} onChange={function () {}} validations={['required']} answers={[
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
                          }} onChange={function () {}} validations={['required']} answers={[
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
                          validations={['required']} label={'Year Roof Built'} styleName={''} input={{
                            name: 'yearOfRoof',
                            disabled: true,
                            value: fieldValues.yearOfRoof
                          }}
                        />
                      </div>
                      <div className="flex-child">
                        <TextField
                          validations={['required']} label={'Sq. Footage of Dwelling'} styleName={''} input={{
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
                          validations={['required']} label={'Year Home Built'} styleName={''} input={{
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
                          }} onChange={function () {}} validations={['required']} answers={[
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
                          }} onChange={function () {}} validations={['required']} answers={[
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
                          validations={['required']} label={'Distance to Tidal Waters'} styleName={''} input={{
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
                          validations={['required']} label={'Distance to Fire Hydrant'} styleName={''} input={{
                            name: 'distanceToFireHydrant',
                            disabled: true,
                            value: fieldValues.distanceToFireHydrant
                          }}
                        />
                      </div>
                      <div className="flex-child">
                        <TextField
                          validations={['required']} label={'Distance to Fire Station'} styleName={''} input={{
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
                          }} onChange={function () {}} validations={['required']} answers={[
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
                          validations={['required']} label={'Flood Zone'} styleName={''} input={{
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
                        <TextField validations={['required']} label={'Dwelling (A - 250,000 - 320,000)'} styleName={''} name={'dwellingA'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Other Structure (B)'} styleName={''} name={'otherStructureB'} />
                      </div>
                      <div className="flex-child">
                        <SelectField
                          name="otherStructureBSelect" component="select" styleName={''} label=" " onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '10% of Coverage A',
                              label: '10% of Coverage A'
                            }, {
                              answer: '15% of Coverage A',
                              label: '15% of Coverage A'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Personal Property (C)'} styleName={''} name={'personalPropertyC'} />
                      </div>
                      <div className="flex-child">
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
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Loss of Use (D)'} styleName={''} name={'lossUseD'} />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="personalLiabilityE" component="select" styleName={''} label="Personal Liability (E)" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '300,000',
                              label: '300,000'
                            }, {
                              answer: '500,000',
                              label: '500,000'
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>
                    </div>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'Medical Payments (F)'} styleName={''} name={'medicalPaymentsF'} />
                      </div>
                    </div>
                  </div>
                  <div className="other-coverages flex-child">
                    <h4>Other Coverages</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="moldPropertyLimit" component="select" styleName={''} label="Mold Property Limit" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '10,000 (included)',
                              label: '10,000 (included)'
                            }, {
                              answer: '25,000',
                              label: '25,000'
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
                          name="moldLisbilityLimit" component="select" styleName={''} label="Mold Liability Limit" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '50,000 (included)',
                              label: '50,000 (included)'
                            }, {
                              answer: '75,000',
                              label: '75,000'
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
                          validations={['required']} name={'personalPropertyReplacementCost'} styleName={'billPlan'} label={'Personal Property Repl Cost'} onChange={function () {}} segmented answers={[
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
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="lossAssessment" component="select" styleName={''} label="Loss Assessment" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '1,000 (included)',
                              label: '1,000 (included)'
                            }, {
                              answer: '2,500',
                              label: '2,500'
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
                          name="ordinanceLawCoverage" component="select" styleName={''} label="Ordinace of Law Coverage" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '25% of Coverage A (included)',
                              label: '25% of Coverage A (included)'
                            }, {
                              answer: '45% of Coverage A',
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
                          name="hurricane" component="select" styleName={''} label="Hurricne" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: '2% of Coverage A',
                              label: '2% of Coverage A'
                            }, {
                              answer: '5% of Coverage A',
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
                              answer: '1,000',
                              label: '1,000'
                            }, {
                              answer: '2,500',
                              label: '2,500'
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
                          name="sinkhole" component="select" styleName={''} label="Sinkhole" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Coverage Excluded',
                              label: 'Coverage Excluded'
                            }, {
                              answer: 'Coverage Included',
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
                          validations={['required']} name={'burglarAlarm'} styleName={''} label={'Burglar Alarm'} onChange={function () {}} segmented answers={[
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
                    <div className="flex-parent">
                      <div className="flex-child">
                        <RadioField
                          validations={['required']} name={'fireAlarm'} styleName={''} label={'Fire Alarm'} onChange={function () {}} segmented answers={[
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
                    <div className="flex-parent">
                      <div className="flex-child">
                        <RadioField
                          validations={['required']} name={'sprinkler'} styleName={''} label={'Sprinkler'} onChange={function () {}} segmented answers={[
                            {
                              answer: 'No',
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
                  <div className="wind-col1">
                    <h4>Wind Mitigation</h4>
                    <div className="flex-parent">
                      <div className="flex-child">
                        <SelectField
                          name="" component="select" styleName={'weakestRoofWallConnect'} label="What is the weakest roof to wall connection?" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Toe Nails',
                              label: 'Toe Nails'
                            }, {
                              answer: 'Cement',
                              label: 'Cement'
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
                          name="weakestRoofDeckAttch" component="select" styleName={''} label="What is the weakest form of roof deck attachment?" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'A',
                              label: 'A'
                            }, {
                              answer: 'B',
                              label: 'B'
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
                          name="weakestWindDebris" component="select" styleName={''} label="What is the weakest form of wind borne debris opening protection on the structure?" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'None',
                              label: 'None'
                            }, {
                              answer: 'Some',
                              label: 'Some'
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
                          name="roofShape" component="select" styleName={''} label="Roof Shape" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'Hip',
                              label: 'Hip'
                            }, {
                              answer: 'Flat',
                              label: 'Flat'
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
                            }
                          ]} validate={[value => (value
                                                      ? undefined
                                                      : 'Field Required')]}
                        />
                      </div>

                    </div>

                  </div>
                  <div className="wind-col2">
                    <h4>&nbsp;</h4>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'What is the FBC wind speed for this property?'} styleName={''} name={'FBCwindSpead'} />
                      </div>

                    </div>

                    <div className="flex-parent">
                      <div className="flex-child">
                        <TextField validations={['required']} label={'What is the FBC wind speed design for this property?'} styleName={''} name={'FBCwindSpeadDesign'} />
                      </div>

                    </div>

                    <div className="flex-parent">

                      <div className="flex-child">
                        <RadioField
                          validations={['required']} name={'windDebrisRegion'} styleName={''} label={'Is the property in the wind borne debris region?'} onChange={function () {}} segmented answers={[
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
                          name="" component="select" styleName={'propertyTerrain'} label="What terrain is the property located in?" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'A',
                              label: 'A'
                            }, {
                              answer: 'B',
                              label: 'B'
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
                                    Reset
                                </button>
                  <button className="btn btn-primary" type="submit" form="Coverage">
                                      Save &amp; Re-Evaluate
                                  </button>
                </div>

              </div>

              <div hidden>
                <TextField validations={['required']} label={'textField1'} styleName={''} name={'textField1'} />
                <DisplayField validations={['required']} label={'textField2'} styleName={'textField2'} name={'textField2'} />
                <SelectField
                  name="billTo" component="select" styleName={'billTo'} label="Bill To" onChange={function () {}} validations={['required']} answers={[
                    {
                      answer: 'Policy Holder',
                      label: 'Policy Holder'
                    }, {
                      answer: 'Mortgagee',
                      label: 'Mortgagee'
                    }
                  ]} validate={[value => (value
                                      ? undefined
                                      : 'Field Required')]}
                />
                <RadioField
                  validations={['required']} name={'billPlan'} styleName={'billPlan'} label={'Bill Plan'} onChange={function () {}} segmented answers={[
                    {
                      answer: 'Annual',
                      label: 'Annual'
                    }, {
                      answer: 'Semi-Annual',
                      label: 'Semi-Annual'
                    }
                  ]}
                />

                <SliderField validations={['required']} name={'deductible'} styleName={'deductible'} label={'Deductible'} onChange={function () {}} leftLabel={'100,000'} max={500000} min={100000} rightLabel={'500,000'} />

                <CheckField isSwitch validations={['required']} styleName={'isActive'} name={'isActive'} label={'Is Active'} onChange={function () {}} />
              </div>

            </div>
          </Form>
        </div>
      </QuoteBaseConnect>
    );
  }

}

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
  agencyDocs: handleGetAgencyDocs(state),
  agentDocs: handleGetAgentDocs(state)
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
