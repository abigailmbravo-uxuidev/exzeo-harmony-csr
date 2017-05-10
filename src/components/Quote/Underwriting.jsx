import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, propTypes } from 'redux-form';
import { Redirect } from 'react-router';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import RadioField from '../Form/inputs/RadioField';

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'getQuote' }) ? _.find(taskData.model.variables, { name: 'getQuote' }).value.result : {};
  return quoteData;
};


const handleFormSubmit = (data, dispatch, props) => {
  const { appState, actions } = props;

  const workflowId = appState.instanceId;
  const steps = [
    { name: 'moveTo', data: { key: 'underwriting' } },
    { name: 'askUWAnswers', data },
    { name: 'moveTo', data: { key: 'recalc' } }
  ];

  actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
    .then(() => {
      // now update the workflow details so the recalculated rate shows
      actions.appStateActions.setAppState(
        appState.modelName,
        workflowId,
        { updateWorkflowDetails: true }
      );
      props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { activateRedirect: true });
    });
};

const handleInitialize = (state) => {
  // hardcoded values
  const formValues = {
    rented: '',
    monthsOccupied: '',
    previousClaims: '',
    fourPointUpdates: '',
    floodPolicy: '',
    business: ''
  };
  return formValues;
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
export const Underwriting = (props) => {
  const { handleSubmit, actions, appState } = props;

  const redirect = (props.activateRedirect)
    ? (<Redirect to={'/quote/billing'} />)
    : null;

  return (
    <QuoteBaseConnect>
      <ClearErrorConnect />
      <div className="route-content">
        <Form id="Coverage" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          { redirect }
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <h2>Underwriting</h2>
              <section className="producer">
                <RadioField
                  validations={['required']} name={'rented'} styleName={''} label={'Is the home or any structures on the property ever rented?'} onChange={function () {}} segmented answers={[
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
                  ]}
                />

                <RadioField
                  validations={['required']} name={'previousClaims'} styleName={''} label={'When was the last claim filed?'} onChange={function () {}} segmented answers={[
                    {
                      answer: '0',
                      label: 'No claims ever filed'
                    }, {
                      answer: '3',
                      label: 'Less than 3 Years'
                    }, {
                      answer: '5',
                      label: '3-5 Years'
                    }, {
                      answer: '5+',
                      label: 'Over 5 Years'
                    }, {
                      answer: 'Unknown',
                      label: 'Unknown'
                    }
                  ]}
                />

                <RadioField
                  validations={['required']} name={'monthsOccupied'} styleName={''} label={'How many months a year does the owner live in the home?'} onChange={function () {}} segmented answers={[
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
                  ]}
                />

                <RadioField
                  validations={['required']} name={'fourPointUpdates'} styleName={''} label={'Have the wiring, plumbing, and HVAC been updated in the last 35 years?'} onChange={function () {}} segmented answers={[
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
                  ]}
                />
                <RadioField
                  validations={['required']} name={'business'} styleName={''} label={'Is a business conducted on the property?'} onChange={function () {}} segmented answers={[
                    {
                      answer: 'Yes',
                      label: 'Yes'
                    }, {
                      answer: 'No',
                      label: 'No'
                    }
                  ]}
                />
              </section>
              <div className="btn-footer">
                <button className="btn btn-secondary" type="submit" form="Coverage">
                                  Cancel
                              </button>
                <button className="btn btn-primary" type="submit" form="Coverage">
                                    Update
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
Underwriting.propTypes = {
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
  quoteData: handleGetQuoteData(state),
  initialValues: handleInitialize(state),
  activateRedirect: state.appState.data.activateRedirect

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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Underwriting' })(Underwriting));
