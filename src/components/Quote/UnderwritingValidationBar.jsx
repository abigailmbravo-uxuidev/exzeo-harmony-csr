import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';

export const handleFormSubmit = (data, dispatch, props) => {
  const uwExceptions = props.quoteData.underwritingExceptions || [];
  console.log(props.userProfile);

  for (let i = 0; i < uwExceptions.length; i += 1) {
    const uwException = uwExceptions[i];
    if (uwException.canOverride && data[uwException._id] === true) {
      uwException.overridden = true;
      uwException.overriddenAt = moment.utc();
      uwException.overriddenBy = { userId: props.userProfile.user_id, userName: props.userProfile.username };
    } else if (uwException.canOverride) {
      uwException.overridden = false;
    }
  }
  props.actions.serviceActions.saveUnderwritingExceptions(props.quoteData._id, uwExceptions);
};

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


export const handleInitialize = (state) => {
  const values = {};
  const quoteData = handleGetQuoteData(state);

  if (!quoteData) return values;

  const underwritingExceptions = quoteData && quoteData.underwritingExceptions ? quoteData.underwritingExceptions : [];

  for (let i = 0; i < underwritingExceptions.length; i += 1) {
    const uwException = underwritingExceptions[i];
    if (uwException.canOverride) {
      values[uwException._id] = uwException.overridden;
    }
  }
  return values;
};


export const UnderwritingValidationBar = (props) => {
  const {
     handleSubmit,
     pristine,
     quoteData
   } = props;

  if (!quoteData) { // eslint-disable-line
    return <div />;
  }
  let underwritingExceptions = [];

  underwritingExceptions = quoteData && quoteData.underwritingExceptions ? quoteData.underwritingExceptions : [];

  const hasOverrideExceptions = _.filter(underwritingExceptions, { canOverride: true }).length > 0;

  return (
    <Form id="UnderwritingOverride" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <aside className="underwriting-validation">
        <h4 className="uw-validation-header">Qualifier Status</h4>
        <div>
          {quoteData && (!quoteData.rating || quoteData.policyHolders.length === 0) &&
          <section className="msg-info">
            <h5>
              <i className="fa fa-exclamation-circle" aria-hidden="true" />&nbsp;Info</h5>

            <div>
              <ul className="fa-ul">
                { quoteData.policyHolders && quoteData.policyHolders.length === 0 && <li key={0}><i className="fa-li fa fa-exclamation-circle" aria-hidden="true" />Needs a Primary Policyholder</li> }
                { !quoteData.rating && <li key={1}><i className="fa-li fa fa-exclamation-circle" aria-hidden="true" />Needs Underwriting</li> }
              </ul>
            </div>
          </section>
        }
          {underwritingExceptions && _.filter(underwritingExceptions, { canOverride: false }).length > 0 &&
          <section className="msg-error">
            <h5>
              <i className="fa fa-exclamation-circle" aria-hidden="true" /><span>Error</span>
            </h5>
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
              <i className="fa fa-exclamation-triangle" aria-hidden="true" /><span>Caution</span>{ hasOverrideExceptions && !pristine && <button className="btn btn-sm btn-primary" type="submit">Save</button> }
            </h5>
            <div>
              <ul className="fa-ul">
                {_.orderBy(_.filter(underwritingExceptions, { canOverride: true }), ['overridden'], ['asc']).map((underwritingException, index) => (
                  <li className={underwritingException.overridden ? 'overridden' : ''} key={index}>
                    <i className="fa-li fa fa-exclamation-triangle" aria-hidden="true" />
                    <span>{underwritingException.internalMessage}</span>
                    <div className="override-wrapper">
                      <Field
                        name={underwritingException._id}
                        id={underwritingException._id}
                        component="input"
                        type="checkbox"
                      />
                      <label htmlFor={underwritingException._id}>Override </label>
                    </div>
                  </li>
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
  userProfile: state.authState.userProfile,
  tasks: state.cg,
  appState: state.appState,
  completedTasks: state.completedTasks,
  quoteData: handleGetQuoteData(state),
  fieldValues: _.get(state.form, 'UnderwritingOverride.values', {}),
  initialValues: handleInitialize(state)
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
