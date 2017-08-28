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

const userTasks = {
  handleSearchBarSubmit: 'search'
};

const handleInitialize = () => ({ searchType: 'quote' });

export const handleSearchBarSubmit = (data, dispatch, props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSearchBarSubmit;
  const modelName = props.appState.modelName;
  const taskData = {
    firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    quoteNumber: (encodeURIComponent(data.quoteNumber) !== 'undefined' ? encodeURIComponent(data.quoteNumber) : ''),
    policyNumber: (encodeURIComponent(data.policyNumber) !== 'undefined' ? encodeURIComponent(data.policyNumber) : ''),
    zip: (encodeURIComponent(data.zip) !== 'undefined' ? encodeURIComponent(data.zip) : ''),
    quoteState: (encodeURIComponent(data.quoteState) !== 'undefined' ? encodeURIComponent(data.quoteState) : ''),
    searchType: props.fieldValues.searchType
  };

  localStorage.setItem('lastSearchData', JSON.stringify(taskData));


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
  questions: state.questions
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

const searchBarForm = reduxForm({
  form: 'SearchBar',
  enableReinitialize: true,
  validate
})(SearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(searchBarForm);
