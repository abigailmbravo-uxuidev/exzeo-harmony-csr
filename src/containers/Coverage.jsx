import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {reduxForm, Form, propTypes} from 'redux-form';
import * as cgActions from '../actions/cgActions';
import * as appStateActions from '../actions/appStateActions';
import QuoteBaseConnect from './QuoteBase';
import ClearErrorConnect from '../components/Error/ClearError';
import TextField from '../components/Form/inputs/TextField';
import SelectField from '../components/Form/inputs/SelectField';
import RadioField from '../components/Form/inputs/RadioField';
import CheckField from '../components/Form/inputs/CheckField';
import DisplayField from '../components/Form/inputs/DisplayField';
import SliderField from '../components/Form/inputs/SliderField';

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
        deductible: 200000
    };
    return formValues;
};

/** 
------------------------------------------------
The render is where all the data is being pulled 
from the props. The quote data data comes from the 
previous task which is createQuote / singleQuote. 
This might not be the case in later calls, you may 
need to pull it from another place in the model
------------------------------------------------
*/

export const Coverage = (props) => {
    const {handleSubmit} = props;
    return (
        <QuoteBaseConnect>
            <ClearErrorConnect/>
            <div className="route-content">
                <Form id="Coverage" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                    <div className="scroll">
                        <div className="form-group survey-wrapper" role="group">

                            <div className="demographics flex-parent">
                                <div className="policy-holder flex-child">
                                    <h4>Name of Insured</h4>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'First Name'} styleName={''} name={'textField1'}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Last Name'} styleName={''} name={'textField1'}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Cell Phone'} styleName={''} name={'textField1'}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Home Phone'} styleName={''} name={'textField1'}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Work Phone'} styleName={''} name={'textField1'}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Email Address'} styleName={''} name={'textField1'}/>
                                        </div>
                                    </div>
                                    <div className="flex-parent">
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Second Insured First Name'} styleName={''} name={'textField1'}/>
                                        </div>
                                        <div className="flex-child">
                                            <TextField validations={['required']} label={'Last Name'} styleName={''} name={'textField1'}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="producer flex-child">
                                    <h4>Produced By</h4>
                                </div>
                            </div>
                            <div className="property flex-parent">
                                <div className="property-address flex-child">
                                    <h4>Property (Risk)</h4>
                                      <div className="flex-parent">
                                          <div className="flex-child">
                                              <TextField validations={['required']} label={'Address 1'} styleName={''} name={'textField1'}/>
                                          </div>
                                      </div>
                                      <div className="flex-parent">
                                          <div className="flex-child">
                                              <TextField validations={['required']} label={'Address 2'} styleName={''} name={'textField1'}/>
                                          </div>
                                      </div>
                                      <div className="flex-parent">
                                          <div className="flex-child">
                                              <TextField validations={['required']} label={'City'} styleName={''} name={'textField1'}/>
                                          </div>
                                          <div className="flex-child">
                                            <SelectField name="" component="select" styleName={''} label="State" onChange={function() {}} validations={['required']} answers={[
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
                                              <TextField validations={['required']} label={'Zip'} styleName={''} name={'textField1'}/>
                                          </div>
                                      </div>
                                      <div className="flex-parent">
                                          <div className="flex-child">
                                            <SelectField name="" component="select" styleName={''} label="Territory" onChange={function() {}} validations={['required']} answers={[
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
                                </div>
                            </div>
                            <div className="coverage-options flex-parent">
                                <div className="coverages flex-child">
                                    <h4>Coverages</h4>
                                </div>
                                <div className="other-coverages flex-child">
                                    <h4>Other Coverages</h4>
                                </div>
                                <div className="deductibles flex-child">
                                    <h4>Deductibles</h4>
                                </div>
                                <div className="discounts flex-child">
                                    <h4>Discounts</h4>
                                </div>
                            </div>
                            <div className="wind flex-parent">
                                <div className="wind-col1">
                                    <h4>Wind Mitigation</h4>
                                </div>
                                <div className="wind-col2">
                                    <h4>&nbsp;</h4>
                                </div>
                            </div>

                            <div className="workflow-steps">
                                <button className="btn btn-primary" type="submit" form="Coverage">
                                    Update
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
