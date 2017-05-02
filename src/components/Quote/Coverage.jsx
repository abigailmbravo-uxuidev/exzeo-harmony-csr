import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {reduxForm, Form, propTypes} from 'redux-form';
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

const handleFormSubmit = (data, dispatch, props) => {
    alert('submit');
};

const handleInitialize = (state) => {
    const formValues = {
        textField1: '',
        billTo: 'Mortgagee',
        billPlan: 'Annual',
        textField2: '5000',
        isActive: true,
        deductible: 200000,
        disabled: true
    };
    return formValues;
};

// ------------------------------------------------
// The render is where all the data is being pulled
//  from the props.
// The quote data data comes from the previous task
//  which is createQuote / singleQuote. This might
//  not be the case in later calls, you may need
//  to pull it from another place in the model
// ------------------------------------------------
export const Coverage = (props) => {
    const {handleSubmit} = props;
    return (
        <QuoteBaseConnect>
            <ClearErrorConnect/>
            <div className="route-content">
                <Form id="Coverage" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                    <div className="scroll">
                        <div className="form-group survey-wrapper" role="group">
                          <h1>Coverage &amp; Rating</h1>
                          <section className="producer ">
                              <h4>Produced By</h4>
                                <div className="flex-parent">
                                    <div className="flex-child">
                                        <label>Effective Date</label>
                                        <div>(date picker)</div>
                                    </div>

                                  <div className="flex-child">
                                      <SelectField name="" component="select" styleName={''} label="Agency" onChange={function() {}} validations={['required']} answers={[
                                          {
                                              answer: 'ABC',
                                              label: 'ABC'
                                          }, {
                                              answer: 'XYZ',
                                              label: 'XYZ'
                                          }
                                      ]} validate={[value => (value
                                              ? undefined
                                              : 'Field Required')]}/>
                                  </div>
                                  <div className="flex-child">
                                      <SelectField name="" component="select" styleName={''} label="Agent" onChange={function() {}} validations={['required']} answers={[
                                          {
                                              answer: '40891 Michael Palanti',
                                              label: '40891 Michael Palanti'
                                          }, {
                                              answer: '12345 John Smith',
                                              label: '12345 John Smith'
                                          }
                                      ]} validate={[value => (value
                                              ? undefined
                                              : 'Field Required')]}/>
                                  </div>
                              </div>
                          </section>

                            <section className="demographics flex-parent">
                                <div className="policy-holder-a flex-child">
                                    <h4>Primary Policyholder</h4>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'First Name'} styleName={''} name={'fNamePrimary'}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Last Name'} styleName={''} name={'lNamePrimary'}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Primary Phone'} styleName={''} name={'primaryPrimaryPhone'}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Secondary'} styleName={''} name={'primarySecondaryPhone'}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Email Address'} styleName={''} name={'emailPrimary'}/>
                                        </div>
                                    </div>

                                </div>

                                <div className="policy-holder-b flex-child">
                                    <h4>Secondary Policyholder</h4>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'First Name'} styleName={''} name={'fNameSecondary'}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Last Name'} styleName={''} name={'lNameSecondary'}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Primary Phone'} styleName={''} name={'secondaryPrimaryPhone'}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Secondary Phone'} styleName={''} name={'secondarySecondaryPhone'}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Email Address'} styleName={''} name={'emailSecondary'}/>
                                        </div>
                                    </div>

                                </div>

                            </section>
                            <section className="property flex-parent">
                                <div className="property-address flex-child">
                                    <h4>Property (Risk)</h4>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Address 1'} styleName={''} value={'123 Main St'} name={'address1 '}
                                              input={{
                                                disabled : true
                                              }} />
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Address 2'} styleName={''} name={'address2'} input={{
                                              disabled : true
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'City'} styleName={''} name={'city'} input={{
                                              disabled : true
                                            }}/>
                                        </div>
                                        <div className="flex-child">
                                            <SelectField name="state" component="select" styleName={''} label="State" input={{
                                              disabled : true
                                            }} onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'FL',
                                                    label: 'FL'
                                                }, {
                                                    answer: 'PA',
                                                    label: 'PA'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Zip'} styleName={''} name={'zip'} input={{
                                              disabled : true
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="territory" component="select" styleName={''} label="Territory" input={{
                                              disabled : true
                                            }} onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'Some Place',
                                                    label: 'Some Place'
                                                }, {
                                                    answer: 'Some Other Place',
                                                    label: 'Some Other Place'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="property-details flex-child">
                                    <h4>Home and Location</h4>

                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="construction" component="select" styleName={''} label="Construction" input={{
                                              disabled : true
                                            }} onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'Masonry',
                                                    label: 'Masonry'
                                                }, {
                                                    answer: 'Sticks',
                                                    label: 'Sticks'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                        <div className="flex-child">
                                            <SelectField name="protectionClass" component="select" styleName={''} label="Protection Class" input={{
                                              disabled : true
                                            }} onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '01',
                                                    label: '01'
                                                }, {
                                                    answer: '02',
                                                    label: '02'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Year Roof Built'} styleName={''} name={'yearRoofBuilt'} input={{
                                              disabled : true
                                            }}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Sq. Footage of Dwelling'} styleName={''} name={'footageDwelling'} input={{
                                              disabled : true
                                            }}/>
                                        </div>
                                    </div>

                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Year Home Built'} styleName={''} name={'yearHomeBuilt'} input={{
                                              disabled : true
                                            }} />
                                        </div>
                                        <div className="flex-child">
                                            <SelectField name="BCEG" component="select" styleName={''} label="BCEG" input={{
                                              disabled : true
                                            }} onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '99 - Unknown',
                                                    label: '99 - Unknown'
                                                }, {
                                                    answer: '85 - Stuff',
                                                    label: '85 - Stuff'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                        <div className="flex-child">
                                          <SelectField name="roofType" component="select" styleName={''} label="Roof Type" input={{
                                            disabled : true
                                          }} onChange={function() {}} validations={['required']} answers={[
                                              {
                                                  answer: 'Shingle',
                                                  label: 'Shingle'
                                              }, {
                                                  answer: 'Tile',
                                                  label: 'Tile'
                                              }
                                          ]} validate={[value => (value
                                                  ? undefined
                                                  : 'Field Required')]}/>
                                        </div>
                                        <div className="flex-child">
                                            <SelectField name="distanceTidalWater" component="select" styleName={''} label="Distance to Tidal Waters" input={{
                                              disabled : true
                                            }} onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'More than 1500ft',
                                                    label: 'More than 1500ft'
                                                }, {
                                                    answer: 'Less than 1500ft',
                                                    label: 'Less than 1500ft'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>

                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Fire Units'} styleName={''} name={'fireUnits'} input={{
                                              disabled : true
                                            }}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Number of Stories'} styleName={''} name={'numberStories'} input={{
                                              disabled : true
                                            }}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Family Units'} styleName={''} name={'familyUnits'} input={{
                                              disabled : true
                                            }}/>
                                        </div>
                                        <div className="flex-child">
                                            <SelectField name="distanceHydrant" component="select" styleName={''} label="Distance to Hydrant" input={{
                                              disabled : true
                                            }} onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'More than 1500ft',
                                                    label: 'More than 1500ft'
                                                }, {
                                                    answer: 'Less than 1500ft',
                                                    label: 'Less than 1500ft'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>

                                    <div className="flex-parent">
                                        <div className="flex-child">

                                        </div>
                                        <div className="flex-child"></div>
                                        <div className="flex-child"></div>
                                        <div className="flex-child">
                                            <SelectField name="distanceFireDept" component="select" styleName={''} label="Distance to Fire Dept." input={{
                                              disabled : true
                                            }} onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'More than 1500ft',
                                                    label: 'More than 1500ft'
                                                }, {
                                                    answer: 'Less than 1500ft',
                                                    label: 'Less than 1500ft'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>

                                </div>
                            </section>
                            <section className="coverage-options flex-parent">
                                <div className="coverages flex-child">
                                    <h4>Coverages</h4>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Dwelling (A - 250,000 - 320,000)'} styleName={''} name={'dwellingA'}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Other Structure (B)'} styleName={''} name={'otherStructureB'}/>
                                        </div>
                                        <div className="flex-child">
                                            <SelectField name="otherStructureBSelect" component="select" styleName={''} label=" " onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '10% of Coverage A',
                                                    label: '10% of Coverage A'
                                                }, {
                                                    answer: '15% of Coverage A',
                                                    label: '15% of Coverage A'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Personal Property (C)'} styleName={''} name={'personalPropertyC'}/>
                                        </div>
                                        <div className="flex-child">
                                            <SelectField name="personalPropertyCSelect" component="select" styleName={''} label="" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '35% of Coverage A',
                                                    label: '35% of Coverage A'
                                                }, {
                                                    answer: '45% of Coverage A',
                                                    label: '45% of Coverage A'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Loss of Use (D)'} styleName={''} name={'lossUseD'}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="personalLiabilityE" component="select" styleName={''} label="Personal Liability (E)" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '300,000',
                                                    label: '300,000'
                                                }, {
                                                    answer: '500,000',
                                                    label: '500,000'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Medical Payments (F)'} styleName={''} name={'medicalPaymentsF'}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="other-coverages flex-child">
                                    <h4>Other Coverages</h4>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="moldPropertyLimit" component="select" styleName={''} label="Mold Property Limit" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '10,000 (included)',
                                                    label: '10,000 (included)'
                                                }, {
                                                    answer: '25,000',
                                                    label: '25,000'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="moldLisbilityLimit" component="select" styleName={''} label="Mold Liability Limit" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '50,000 (included)',
                                                    label: '50,000 (included)'
                                                }, {
                                                    answer: '75,000',
                                                    label: '75,000'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <RadioField validations={['required']} name={'personalPropertyReplacementCost'} styleName={'billPlan'} label={'Personal Property Repl Cost'} onChange={function() {}} segmented answers={[
                                                {
                                                    answer: 'No',
                                                    label: 'No'
                                                }, {
                                                    answer: 'Yes',
                                                    label: 'Yes'
                                                }
                                            ]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="lossAssessment" component="select" styleName={''} label="Loss Assessment" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '1,000 (included)',
                                                    label: '1,000 (included)'
                                                }, {
                                                    answer: '2,500',
                                                    label: '2,500'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="ordinanceLawCoverage" component="select" styleName={''} label="Ordinace of Law Coverage" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '25% of Coverage A (included)',
                                                    label: '25% of Coverage A (included)'
                                                }, {
                                                    answer: '45% of Coverage A',
                                                    label: '45% of Coverage A'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="deductibles flex-child">
                                    <h4>Deductibles</h4>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="hurricane" component="select" styleName={''} label="Hurricne" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '2% of Coverage A',
                                                    label: '2% of Coverage A'
                                                }, {
                                                    answer: '5% of Coverage A',
                                                    label: '5% of Coverage A'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="allOtherPerils" component="select" styleName={''} label="All Other Perils" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: '1,000',
                                                    label: '1,000'
                                                }, {
                                                    answer: '2,500',
                                                    label: '2,500'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="sinkhole" component="select" styleName={''} label="Sinkhole" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'Coverage Excluded',
                                                    label: 'Coverage Excluded'
                                                }, {
                                                    answer: 'Coverage Included',
                                                    label: 'Coverage Included'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="discounts flex-child">
                                    <h4>Discounts</h4>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <RadioField validations={['required']} name={'burglarAlarm'} styleName={''} label={'Burglar Alarm'} onChange={function() {}} segmented answers={[
                                                {
                                                    answer: 'No',
                                                    label: 'No'
                                                }, {
                                                    answer: 'Yes',
                                                    label: 'Yes'
                                                }
                                            ]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <RadioField validations={['required']} name={'fireAlarm'} styleName={''} label={'Fire Alarm'} onChange={function() {}} segmented answers={[
                                                {
                                                    answer: 'No',
                                                    label: 'No'
                                                }, {
                                                    answer: 'Yes',
                                                    label: 'Yes'
                                                }
                                            ]}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <RadioField validations={['required']} name={'sprinkler'} styleName={''} label={'Sprinkler'} onChange={function() {}} segmented answers={[
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
                                            ]}/>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="wind flex-parent">
                                <div className="wind-col1">
                                    <h4>Wind Mitigation</h4>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <SelectField name="" component="select" styleName={'weakestRoofWallConnect'} label="What is the weakest roof to wall connection?" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'Toe Nails',
                                                    label: 'Toe Nails'
                                                }, {
                                                    answer: 'Cement',
                                                    label: 'Cement'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>
                                    </div>

                                    <div className="flex-parent">

                                        <div className="flex-child">
                                            <SelectField name="weakestRoofDeckAttch" component="select" styleName={''} label="What is the weakest form of roof deck attachment?" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'A',
                                                    label: 'A'
                                                }, {
                                                    answer: 'B',
                                                    label: 'B'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>

                                    </div>

                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <RadioField validations={['required']} name={'secondaryWaterResistance'} styleName={''} label={'Is there Secondary Water Resistance?'} onChange={function() {}} segmented answers={[
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
                                            ]}/>
                                        </div>
                                    </div>

                                    <div className="flex-parent">

                                        <div className="flex-child">
                                            <SelectField name="weakestWindDebris" component="select" styleName={''} label="What is the weakest form of wind borne debris opening protection on the structure?" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'None',
                                                    label: 'None'
                                                }, {
                                                    answer: 'Some',
                                                    label: 'Some'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>

                                    </div>

                                    <div className="flex-parent">

                                        <div className="flex-child">
                                          <SelectField name="roofShape" component="select" styleName={''} label="Roof Shape" onChange={function() {}} validations={['required']} answers={[
                                              {
                                                  answer: 'Hip',
                                                  label: 'Hip'
                                              }, {
                                                  answer: 'Flat',
                                                  label: 'Flat'
                                              }
                                          ]} validate={[value => (value
                                                  ? undefined
                                                  : 'Field Required')]}/>
                                        </div>
                                    </div>

                                    <div className="flex-parent">

                                        <div className="flex-child">
                                            <SelectField name="roofCovering" component="select" styleName={''} label="What is the roof covering?" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'Non-FBC',
                                                    label: 'Non-FBC'
                                                }, {
                                                    answer: 'FBC',
                                                    label: 'FBC'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>

                                    </div>

                                </div>
                                <div className="wind-col2">
                                    <h4>&nbsp;</h4>

                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'What is the FBC wind speed for this property?'} styleName={''} name={'FBCwindSpead'}/>
                                        </div>

                                    </div>

                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'What is the FBC wind speed design for this property?'} styleName={''} name={'FBCwindSpeadDesign'}/>
                                        </div>

                                    </div>

                                    <div className="flex-parent">

                                        <div className="flex-child">
                                            <RadioField validations={['required']} name={'windDebrisRegion'} styleName={''} label={'Is the property in the wind borne debris region?'} onChange={function() {}} segmented answers={[
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
                                            ]}/>
                                        </div>
                                    </div>

                                    <div className="flex-parent">

                                        <div className="flex-child">
                                            <SelectField name="internalPressureDesign" component="select" styleName={''} label="Internal Pressure Design" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'Enclosed',
                                                    label: 'Enclosed'
                                                }, {
                                                    answer: 'Exclosed',
                                                    label: 'Exclosed'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
                                        </div>

                                    </div>

                                    <div className="flex-parent">

                                        <div className="flex-child">
                                            <SelectField name="" component="select" styleName={'propertyTerrain'} label="What terrain is the property located in?" onChange={function() {}} validations={['required']} answers={[
                                                {
                                                    answer: 'A',
                                                    label: 'A'
                                                }, {
                                                    answer: 'B',
                                                    label: 'B'
                                                }
                                            ]} validate={[value => (value
                                                    ? undefined
                                                    : 'Field Required')]}/>
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
                            <TextField validations={['required']} label={'textField1'} styleName={''} name={'textField1'}/>
                            <DisplayField validations={['required']} label={'textField2'} styleName={'textField2'} name={'textField2'}/>
                            <SelectField name="billTo" component="select" styleName={'billTo'} label="Bill To" onChange={function() {}} validations={['required']} answers={[
                                {
                                    answer: 'Policy Holder',
                                    label: 'Policy Holder'
                                }, {
                                    answer: 'Mortgagee',
                                    label: 'Mortgagee'
                                }
                            ]} validate={[value => (value
                                    ? undefined
                                    : 'Field Required')]}/>
                            <RadioField validations={['required']} name={'billPlan'} styleName={'billPlan'} label={'Bill Plan'} onChange={function() {}} segmented answers={[
                                {
                                    answer: 'Annual',
                                    label: 'Annual'
                                }, {
                                    answer: 'Semi-Annual',
                                    label: 'Semi-Annual'
                                }
                            ]}/>

                            <SliderField validations={['required']} name={'deductible'} styleName={'deductible'} label={'Deductible'} onChange={function() {}} leftLabel={'100,000'} max={500000} min={100000} rightLabel={'500,000'}/>

                            <CheckField isSwitch validations={['required']} styleName={'isActive'} name={'isActive'} label={'Is Active'} onChange={function() {}}/>
                        </div>

                    </div>
                </Form>
            </div>
        </QuoteBaseConnect>
    );
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
        data: PropTypes.shape({submitting: PropTypes.boolean})
    })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
    tasks: state.cg,
    appState: state.appState,
    fieldValues: _.get(state.form, 'Coverage.values', {}),
    initialValues: handleInitialize(state)
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'Coverage'})(Coverage));
