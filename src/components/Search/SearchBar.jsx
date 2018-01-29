import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import localStorage from 'localStorage';
import { connect } from 'react-redux';
import { reduxForm, Form, Field, propTypes, getFormSyncErrors } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import Rules from '../Form/Rules';
import SelectField from '../Form/inputs/SelectField';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as errorActions from '../../actions/errorActions';
import * as serviceActions from '../../actions/serviceActions';

const userTasks = {
  handleSearchBarSubmit: 'search'
};

const handleInitialize = () => ({ searchType: 'quote' });

export const handleSearchBarSubmit = (data, dispatch, props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSearchBarSubmit;
  const modelName = props.appState.modelName;
  const searchType = props.fieldValues.searchType;
  const taskData = {
    firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    quoteNumber: (encodeURIComponent(data.quoteNumber) !== 'undefined' ? encodeURIComponent(data.quoteNumber) : ''),
    policyNumber: (encodeURIComponent(data.policyNumber) !== 'undefined' ? encodeURIComponent(data.policyNumber) : ''),
    zip: (encodeURIComponent(data.zip) !== 'undefined' ? encodeURIComponent(data.zip) : ''),
    quoteState: (encodeURIComponent(data.quoteState) !== 'undefined' ? encodeURIComponent(data.quoteState) : ''),
    searchType
  };

  const agencyAgentData = {
    firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    displayName: (encodeURIComponent(data.displayName) !== 'undefined' ? encodeURIComponent(data.displayName) : ''),
    address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    licNumber: (encodeURIComponent(data.licNumber) !== 'undefined' ? encodeURIComponent(data.licNumber) : ''),
    fein: (encodeURIComponent(data.fein) !== 'undefined' ? encodeURIComponent(data.fein) : ''),
    agentCode: (encodeURIComponent(data.agentCode) !== 'undefined' ? encodeURIComponent(data.agentCode) : ''),
    agencyCode: (encodeURIComponent(data.agencyCode) !== 'undefined' ? encodeURIComponent(data.agencyCode) : ''),
    phone: (encodeURIComponent(data.phone) !== 'undefined' ? encodeURIComponent(data.phone) : ''),
    searchType
  };

  if (searchType === 'policy') {
    // 60 days past only
    taskData.resultStart = 60;
  }

  if (searchType === 'agency') {
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, agentSubmitting: true });

    props.actions.serviceActions.searchAgencies('TTIC', 'FL', agencyAgentData.displayName,
    agencyAgentData.agencyCode, agencyAgentData.address, agencyAgentData.licNumber,
    agencyAgentData.fein, agencyAgentData.phone).then(() => {
      props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, agentSubmitting: false });
    });
  }

  if (searchType === 'agent') {
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, agentSubmitting: true });

    props.actions.serviceActions.searchAgents('TTIC', 'FL', agencyAgentData.firstName, agencyAgentData.lastName,
     agencyAgentData.agentCode, agencyAgentData.address, agencyAgentData.licNumber).then(() => {
       props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, agentSubmitting: false });
     });
  }

  if (searchType !== 'agency' && searchType !== 'agent') {
    localStorage.setItem('lastSearchData', JSON.stringify(taskData));
  } else {
    localStorage.setItem('lastSearchData', JSON.stringify(agencyAgentData));
    return;
  }

  props.actions.errorActions.clearAppError();
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });

  // we need to make sure the active task is search otherwise we need to reset the workflow
  if (props.tasks[modelName].data.activeTask && (props.tasks[modelName].data.activeTask.name !== userTasks.handleSearchBarSubmit)) {
    const completeStep = {
      stepName: taskName,
      data: taskData
    };
    props.actions.cgActions.moveToTaskAndExecuteComplete(props.appState.modelName, workflowId, taskName, completeStep);
  } else {
    props.actions.appStateActions.setAppState(modelName, workflowId, { ...props.appState.data, submitting: true });
    props.actions.cgActions.completeTask(modelName, workflowId, taskName, taskData);
  }
};

export const validate = (values) => {
  const errors = {};
  if (values.firstName) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.firstName);
    if (onlyAlphaNumeric) {
      errors.firstName = onlyAlphaNumeric;
    }
  }

  if (values.lastName) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.lastName);
    if (onlyAlphaNumeric) {
      errors.lastName = onlyAlphaNumeric;
    }
  }

  if (values.agentName) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.agentName);
    if (onlyAlphaNumeric) {
      errors.agentName = onlyAlphaNumeric;
    }
  }

  if (values.agentCode) {
    const numbersOnly = Rules.numbersOnly(values.agentCode);
    if (numbersOnly) {
      errors.agentCode = numbersOnly;
    }
  }

  if (values.agencyCode) {
    const numbersOnly = Rules.numbersOnly(values.agencyCode);
    if (numbersOnly) {
      errors.agencyCode = numbersOnly;
    }
  }

  if (values.quoteNumber) {
    const numberDashesOnly = Rules.numberDashesOnly(values.quoteNumber);
    if (numberDashesOnly) {
      errors.quoteNumber = numberDashesOnly;
    }
  }

  if (values.policyNumber) {
    const numberDashesOnly = Rules.numberDashesOnly(values.policyNumber);
    if (numberDashesOnly) {
      errors.policyNumber = numberDashesOnly;
    }
  }

  if (values.zip) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.zip);
    if (onlyAlphaNumeric) {
      errors.zip = onlyAlphaNumeric;
    }
  }
  if (values.address) {
    const required = Rules.required(String(values.address).trim());
    const invalidCharacters = Rules.invalidCharacters(values.address);
    if (required) {
      errors.address = required;
    } else if (invalidCharacters) {
      errors.address = invalidCharacters;
    }
  }

  return errors;
};

const getErrorToolTip = (formErrors, fieldName) => {
  const errorFieldName = `error${fieldName}`;
  return ((formErrors && formErrors[fieldName]) ? <span>
    <i className="fa fa-exclamation-circle" data-tip data-for={errorFieldName} />
    <ReactTooltip place="right" id={errorFieldName} type="error" effect="float">{formErrors[fieldName]}</ReactTooltip>
  </span> : <span />);
};

const generateField = (name, placeholder, labelText, formErrors, formGroupCss) => {
  const field = (<div className={(formErrors && formErrors[name]) ? `form-group error ${formGroupCss}` : `form-group ${formGroupCss}`}>
    <label htmlFor={name}>{getErrorToolTip(formErrors, name)} {labelText}
    </label>
    <Field
      name={name}
      className={''}
      placeholder={placeholder}
      type="text"
      component="input"
    />
  </div>);
  return field;
};

const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

const SearchForm = (props) => {
  const {
    questions,
    handleSubmit,
    formErrors,
    fieldValues
  } = props;

  const clearForm = (event, newValue, previousValue) => {
    const modelName = props.appState.modelName;
    const data = props.tasks[modelName].data;

    props.reset(props.form);
    props.actions.cgActions.clearSearchResults(modelName, data);
    props.actions.errorActions.clearAppError();
    props.actions.serviceActions.clearAgencies();
    props.actions.serviceActions.clearAgent();
  };

  return (
    <Form id="SearchBar" onSubmit={handleSubmit(handleSearchBarSubmit)} noValidate>
      <div className="search-input-wrapper">
        <div className="form-group search-context">
          <SelectField
            name="searchType" component="select" styleName={''} label="Search Context" validations={['required']}
            onChange={clearForm}
            answers={[
              {
                answer: 'address',
                label: 'New Quote'
              },
              {
                answer: 'quote',
                label: 'Quote Search'
              },
              {
                answer: 'policy',
                label: 'Policy Search'
              },
              {
                answer: 'agent',
                label: 'Agent Search'
              },
              {
                answer: 'agency',
                label: 'Agency Search'
              }
            ]}
          />
        </div>
        {fieldValues.searchType === 'address' && <div className="search-inputs fade-in">
          {generateField('address', 'Property Address Search', 'Property Address', formErrors, 'property-search')}
          <button
            className="btn btn-success multi-input"
            type="submit"
            form="SearchBar"
            disabled={props.appState.data.submitting || formErrors || !fieldValues.address || !String(fieldValues.address).trim()}
          >
            <i className="fa fa-search" />Search
          </button>
        </div>
        }
        {fieldValues.searchType === 'quote' && <div className="search-inputs fade-in">

          {generateField('firstName', 'First Name Search', 'First Name', formErrors, 'first-name-search')}
          {generateField('lastName', 'Last Name Search', 'Last Name', formErrors, 'last-name-search')}
          {generateField('address', 'Property Address Search', 'Property Address', formErrors, 'property-search')}
          {generateField('quoteNumber', 'Quote No Search', 'Quote Number', formErrors, 'quote-no-search')}
          <div className="form-group quote-state">
            <SelectField
              name="quoteState" component="select" styleName={''} label="Quote State"
              onChange={clearForm}
              answers={getAnswers('quoteState', questions)}
            />
          </div>

          <button
            className="btn btn-success multi-input"
            type="submit"
            form="SearchBar"
            disabled={props.appState.data.submitting || formErrors}
          >
            <i className="fa fa-search" />Search
          </button>
        </div>
        }
        {fieldValues.searchType === 'policy' && <div className="search-inputs fade-in">

          {generateField('firstName', 'First Name Search', 'First Name', formErrors, 'first-name-search')}
          {generateField('lastName', 'Last Name Search', 'Last Name', formErrors, 'last-name-search')}
          {generateField('address', 'Property Address Search', 'Property Address', formErrors, 'property-search')}
          {generateField('policyNumber', 'Policy No Search', 'Policy Number', formErrors, 'policy-no-search')}

          <button
            className="btn btn-success multi-input"
            type="submit"
            form="SearchBar"
            disabled={props.appState.data.submitting || formErrors}
          >
            <i className="fa fa-search" />Search
          </button>
        </div>
        }
        {/* <!-- Should be available only in user admin  -->*/}
        {fieldValues.searchType === 'user' && <div className="search-tools">
          <div className="search-inputs fade-in">

            {generateField('user', 'Search for user by name', 'User Name', formErrors, 'user-name-search')}

            <button
              className="btn btn-success multi-input"
              type="submit"
              form="SearchBar"
              disabled={props.appState.data.submitting || formErrors}
            >
              <i className="fa fa-search" />Search
              </button>
          </div>
          <div className="filters fade-in">FILTERS HERE</div>
          </div>
        }
        {fieldValues.searchType === 'agency' && <div className="search-inputs fade-in">

          {generateField('agencyCode', 'Agency ID Search', 'Agency ID', formErrors, 'agency-id-search')}
          {generateField('displayName', 'Agency Name Search', 'Agency Name', formErrors, 'agency-name-search')}
          {generateField('address', 'Agency Address Search', 'Agency Address', formErrors, 'agency-address-search')}
          {generateField('licNumber', 'Lic No Search', 'Lic Number', formErrors, 'agency-reg-lic-fein-search')}
          {generateField('fein', 'FEIN No Search', 'FEIN Number', formErrors, 'agency-reg-lic-fein-search')}
          {generateField('phone', 'Phone No Search', 'Agency Phone Number', formErrors, 'agency-phone-search')}

          <button
            className="btn btn-success multi-input"
            type="submit"
            form="SearchBar"
            disabled={props.appState.data.submitting || formErrors}
          >
            <i className="fa fa-search" />Search
          </button>
        </div>
        }
        {fieldValues.searchType === 'agent' && <div className="search-inputs fade-in">

          {generateField('agentCode', 'Agent ID Search', 'Agent ID', formErrors, 'agency-id-search')}
          {generateField('firstName', 'First Name Search', 'First Name', formErrors, 'first-name-search')}
          {generateField('lastName', 'Last Name Search', 'Last Name', formErrors, 'last-name-search')}
          {generateField('address', 'Agent Address Search', 'Agent Address', formErrors, 'agency-address-search')}
          {generateField('licNumber', 'Lic No Search', 'Lic Number', formErrors, 'agency-reg-lic-fein-search')}

          <button
            className="btn btn-success multi-input"
            type="submit"
            form="SearchBar"
            disabled={props.appState.data.submitting || formErrors}
          >
            <i className="fa fa-search" />Search
        </button>
        </div>
      }
        {/* <!-- End should be available only in user admin  -->*/}
      </div>
    </Form>
  );
};

const SearchBar = props => SearchForm(props);

SearchBar.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.shape({}),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({
      submitting: PropTypes.boolean
    })
  })
};

SearchForm.propTypes = {
  ...propTypes
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'SearchBar.values', {}),
  formErrors: getFormSyncErrors('SearchBar')(state),
  searchType: state.appState.data.searchType,
  initialValues: handleInitialize(state),
  error: state.error,
  cleanForm: state.pristine,
  questions: state.questions,
  agencies: state.agencies,
  agents: state.agents
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

const searchBarForm = reduxForm({
  form: 'SearchBar',
  enableReinitialize: true,
  validate
})(SearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(searchBarForm);
