import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';

export const handleFormSubmit = (data, dispatch, props) => {

};

export const UnderwritingValidationBar = (props) => {
  const { tasks,
     appState,
     handleSubmit,
     pristine
   } = props;

  const taskData = (tasks && appState && tasks[appState.modelName]) ? tasks[appState.modelName].data : null;

  // combine all quote Objects from UW Exceptions into an array
  // pull the latest quote object by lastUpdated date and set it as quote data

  let underwritingExceptions = [];
  let quoteData = null;
  if (taskData) {
    const quoteEnd = _.find(taskData.model.variables, { name: 'retrieveQuote' })
    ? _.find(taskData.model.variables, { name: 'retrieveQuote' }).value.result
    : null;
    quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' })
    ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result
    : quoteEnd;
    underwritingExceptions = quoteData && quoteData.underwritingExceptions ? quoteData.underwritingExceptions : [];
  }

    if (!quoteData) { // eslint-disable-line
      return <div />;
    }
  return (
    <Form id="UnderwritingOverride" submit={handleSubmit(handleFormSubmit)} noValidate>
      <aside className="underwriting-validation">
        <h4 className="uw-validation-header">Qualifier Status</h4>
        <button type="submit" disabled={pristine}>Save</button>
        <div>

          {underwritingExceptions && _.filter(underwritingExceptions, { canOverride: false }).length > 0 &&
          <section className="msg-error">
            <h5>
              <i className="fa fa-exclamation-circle" aria-hidden="true" />&nbsp;Error</h5>

            <div>
              <ul className="fa-ul">
                {_.filter(underwritingExceptions, { canOverride: false }).map((underwritingException, index) => (
                  <li key={index}><i className="fa-li fa fa-exclamation-circle" aria-hidden="true" />{underwritingException.internalMessage}</li>
                ))}
              </ul>
            </div>
          </section>
        }
          {underwritingExceptions && _.filter(underwritingExceptions, { canOverride: true }).length > 0 &&
          <section className="msg-caution">
            <h5>
              <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;Caution</h5>
            <div>
              <ul className="fa-ul">
                {_.filter(underwritingExceptions, { canOverride: true }).map((underwritingException, index) => (
                  <li key={index}><i className="fa-li fa fa-exclamation-triangle" aria-hidden="true" /><span>{underwritingException.internalMessage}</span>
                    <label htmlFor={underwritingException._id}>Override </label>
                    <Field
                      name={underwritingException._id}
                      id={underwritingException._id}
                      component="input"
                      type="checkbox"
                    /></li>
                ))}
              </ul>
            </div>

          </section>
        }

        </div>
      </aside>
    </Form>
  );
};


UnderwritingValidationBar.propTypes = {
  completedTasks: PropTypes.any, // eslint-disable-line
  actions: PropTypes.shape(),
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      quote: PropTypes.object,
      updateUnderwriting: PropTypes.boolean
    })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  completedTasks: state.completedTasks
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});
// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'UnderwritingOverride', enableReinitialize: true })(UnderwritingValidationBar));
