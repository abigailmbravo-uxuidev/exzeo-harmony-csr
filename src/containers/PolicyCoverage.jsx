import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {reduxForm, Form, propTypes} from 'redux-form';
import Footer from '../components/Common/Footer';
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
              <div className="demographics flex-parent">
                <div className="policy-holder flex-child">
                  <h4>Covreage &amp; Premium</h4>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <label>Label</label>
                      input
                    </div>
                    <div className="flex-child">
                      <label>Label</label>
                      input
                    </div>
                  </div>
                </div>
              </div>
              <div className="property flex-parent">
                <div className="property-address flex-child">
                  <h4>Property Info</h4>
                </div>
              </div>
              <div className="coverage-options flex-parent">
                <div className="coverages flex-child">
                  <h4>Claims</h4>
                </div>
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
