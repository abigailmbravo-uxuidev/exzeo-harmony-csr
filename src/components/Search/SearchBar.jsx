import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field, propTypes, getFormSyncErrors } from 'redux-form';
import ReactTooltip from 'react-tooltip';

import Rules from '../Form/Rules';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const userTasks = {
  handleSearchBarSubmit: 'search'
};

const handleSearchBarSubmit = (data, dispatch, props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSearchBarSubmit;
  const taskData = {
    firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(data.address) : ''),
    quoteNumber: (encodeURIComponent(data.quoteNumber) !== 'undefined' ? encodeURIComponent(data.quoteNumber) : ''),
    zip: (encodeURIComponent(data.zip) !== 'undefined' ? encodeURIComponent(data.zip) : ''),
    searchType: props.searchType
  };
  console.log('SEARCH DATA: ', taskData);
  // we need to make sure the active task is search otherwise we need to reset the workflow
  if (props.tasks[props.appState.modelName].data.activeTask.name !== userTasks.handleSearchBarSubmit) {
    const completeStep = {
      stepName: taskName,
      data: taskData
    };
    props.actions.cgActions.moveToTaskAndExecuteComplete(props.appState.modelName, workflowId, taskName, completeStep);
  } else {
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
    props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
  }
};

const validate = (values) => {
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

  if (values.quoteNumber) {
    const numberDashesOnly = Rules.numberDashesOnly(values.quoteNumber);
    if (numberDashesOnly) {
      errors.quoteNumber = numberDashesOnly;
    }
  }

  if (values.zip) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.zip);
    if (onlyAlphaNumeric) {
      errors.zip = onlyAlphaNumeric;
    }
  }

  if (values.address) {
    const required = Rules.required(values.address);
    const invalidCharacters = Rules.invalidCharacters(values.address);
    if (invalidCharacters) {
      errors.address = invalidCharacters;
    }
    if (required) {
      errors.address = required;
    }
  }

  return errors;
};

const setIsRetrieve = () => window.location.pathname === '/quote/retrieve';

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
      className={focus ? 'focus-user' : ''}
      placeholder={placeholder}
      type="text"
      component="input"
    />
  </div>);
  return field;
};

const SearchForm = (props) => {
  const {
    handleSubmit,
    formErrors,
    isRetrieve
  } = props;
  if (isRetrieve) {
    return (
      <Form id="SearchBar" onSubmit={handleSubmit(handleSearchBarSubmit)} noValidate>
        <div className="search-input-wrapper">
          {generateField('firstName', 'First Name Search', 'First Name', formErrors, 'first-name-search')}
          {generateField('lastName', 'Last Name Search', 'Last Name', formErrors, 'last-name-search')}
          {generateField('address', 'Property Address Search', 'Property Address', formErrors, 'property-search')}
          {generateField('zip', 'Zip Search', 'Zip', formErrors, 'zip-search')}
          {generateField('quoteNumber', 'Quote No Search', 'Quote Number', formErrors, 'quote-no-search')}        
          <button
            className="btn btn-success multi-input"
            type="submit"
            form="SearchBar"
            disabled={props.appState.data.submitting || formErrors}
          >
            <i className="fa fa-search" />Search
          </button>
        </div>
      </Form>
    );
  }

  return (
    <Form id="SearchBar" onSubmit={handleSubmit(handleSearchBarSubmit)} noValidate>
      <div className="search-input-wrapper">
        {generateField('address', 'Search for Property Address', 'Property Address', formErrors, '')}
        <button
          className="btn btn-success multi-input"
          type="submit"
          form="SearchBar"
          disabled={props.appState.data.submitting || formErrors}
        >
          <i className="fa fa-search" />Search
        </button>
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
  formErrors: getFormSyncErrors('SearchBar')(state),
  isRetrieve: setIsRetrieve(),
  searchType: setIsRetrieve() ? 'quote' : 'address'
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

const searchBarForm = reduxForm({
  form: 'SearchBar',
  validate
})(SearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(searchBarForm);
