import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {reduxForm, Form, propTypes} from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import RadioField from '../Form/inputs/RadioField';

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
                          <section className="producer">

                                <RadioField validations={['required']} name={'everRented'} styleName={''} label={'Is the home or any structures on the property ever rented?'} onChange={function() {}} segmented answers={[
                                      {
                                          answer: 'Yes',
                                          label: 'Yes'
                                      }, {
                                          answer: 'Occasionally',
                                          label: 'Occasionally'
                                      }, {
                                          answer: 'Never',
                                          label: 'Never'
                                      }
                                  ]}/>


                                <RadioField validations={['required']} name={'lastClaimFiled'} styleName={''} label={'When was the last claim filed?'} onChange={function() {}} segmented answers={[
                                        {
                                            answer: 'No claims ever filed',
                                            label: 'No claims ever filed'
                                        }, {
                                            answer: 'Less than 3 Years',
                                            label: 'Less than 3 Years'
                                        }, {
                                            answer: '3-5 Years',
                                            label: '3-5 Years'
                                        }, {
                                            answer: 'Over 5 Years',
                                            label: 'Over 5 Years'
                                        }, {
                                            answer: 'Unknown',
                                            label: 'Unknown'
                                        }
                                    ]}/>


                                  <RadioField validations={['required']} name={'monthsYearOwnerLive'} styleName={''} label={'How many months a year does the owner live in the home?'} onChange={function() {}} segmented answers={[
                                            {
                                                answer: '0-3',
                                                label: '0-3'
                                            }, {
                                                answer: '4-6',
                                                label: '4-6'
                                            }, {
                                                answer: '7-9',
                                                label: '7-9'
                                            }, {
                                                answer: '10+',
                                                label: '10+'
                                            }
                                        ]}/>

                                      <RadioField validations={['required']} name={'wiringPlumbingHVACupdate'} styleName={''} label={'Have the wiring, plumbing, and HVAC been updated in the last 35 years?'} onChange={function() {}} segmented answers={[
                                                  {
                                                      answer: 'Yes',
                                                      label: 'Yes'
                                                  }, {
                                                      answer: 'No',
                                                      label: 'No'
                                                  }, {
                                                      answer: 'Unkown',
                                                      label: 'Unknown'
                                                  }
                                              ]}/>
                                            <RadioField validations={['required']} name={'businessProperty'} styleName={''} label={'Is a business conducted on the property?'} onChange={function() {}} segmented answers={[
                                                          {
                                                              answer: 'Yes',
                                                              label: 'Yes'
                                                          }, {
                                                              answer: 'No',
                                                              label: 'No'
                                                          }
                                                      ]}/>

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
