import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import localStorage from 'localStorage';
import { connect } from 'react-redux';
import { reduxForm, Form, Field, propTypes, getFormSyncErrors, change } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import Rules from '../Form/Rules';
import SelectField from '../Form/inputs/SelectField';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as errorActions from '../../actions/errorActions';
import * as serviceActions from '../../actions/serviceActions';
import * as searchActions from '../../actions/searchActions';
import TextField from '../Form/inputs/TextField';

const userTasks = {
  handleSearchBarSubmit: 'search'
};

export const resetPolicySearch = (props) => {
   props.actions.searchActions.setSearch({ searchType : 'policy', hasSearched: false});
   props.actions.serviceActions.clearPolicyResults();
};

export const changePage = (props, isNext) => {
  const { fieldValues } = props;

  const taskData = {
    firstName: (encodeURIComponent(fieldValues.firstName) !== 'undefined' ? encodeURIComponent(fieldValues.firstName) : ''),
    lastName: (encodeURIComponent(fieldValues.lastName) !== 'undefined' ? encodeURIComponent(fieldValues.lastName) : ''),
    address: (encodeURIComponent(fieldValues.address) !== 'undefined' ? encodeURIComponent(String(fieldValues.address).trim()) : ''),
    policyNumber: (encodeURIComponent(fieldValues.policyNumber) !== 'undefined' ? encodeURIComponent(fieldValues.policyNumber) : ''),
    searchType: 'policy',
    isLoading: true,
    hasSearched: true,
    resultStart: 60,
    pageSize: 25
  };


  taskData.pageNumber = isNext ? Number(fieldValues.pageNumber) + 1 : Number(fieldValues.pageNumber) - 1;

  props.actions.searchActions.setSearch(taskData);


  props.actions.serviceActions.searchPolicy(taskData, fieldValues.sortBy).then(() => {
    taskData.isLoading = false;
    props.actions.searchActions.setSearch(taskData);
  });
};

const handleInitialize = () => ({ searchType: 'quote', sortBy: 'policyNumber' });

export const handlePolicySearchSubmit = (data, dispatch, props) => {
  const taskData = {
    firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    policyNumber: (encodeURIComponent(data.policyNumber) !== 'undefined' ? encodeURIComponent(data.policyNumber) : ''),
    searchType: 'policy',
    isLoading: true,
    hasSearched: true,
    pageNumber: 1,
    resultStart: 60,
    pageSize: 25
  };

  props.actions.searchActions.setSearch(taskData);

  props.actions.serviceActions.searchPolicy(taskData, data.sortBy).then(() => {
    taskData.isLoading = false;
    props.actions.searchActions.setSearch(taskData);
  });
};



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
    props.actions.searchActions.setSearch(taskData);
  } else {
    localStorage.setItem('lastSearchData', JSON.stringify(agencyAgentData));
    props.actions.searchActions.setSearch(agencyAgentData);
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

export class SearchForm extends Component {

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;

    if (nextProps.search.hasSearched && !_.isEqual(this.props.policyResults, nextProps.policyResults)) {
      const totalPages = Math.ceil(nextProps.policyResults.totalNumberOfRecords / nextProps.policyResults.pageSize);
      const pageNumber = nextProps.policyResults.currentPage;
      dispatch(change('SearchBar', 'pageNumber', pageNumber));
      dispatch(change('SearchBar', 'totalPages', totalPages));
      nextProps.actions.searchActions.setSearch({ ...nextProps.search, totalPages, pageNumber });
    }
  }

  render() {
    
  const {
    search,
    appState,
    questions,
    handleSubmit,
    formErrors,
    fieldValues,
    policyResults,
    form,
    actions,
    tasks,
    reset
  } = this.props;

  const clearForm = (event, newValue, previousValue) => {
    const modelName = appState.modelName;
    const data = tasks[modelName].data;

    const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData')) || {};
    lastSearchData.searchType = '';
    localStorage.setItem('lastSearchData', JSON.stringify(lastSearchData));
    reset(form);
    actions.cgActions.clearSearchResults(modelName, data);
    actions.errorActions.clearAppError();
    actions.serviceActions.clearAgencies();
    actions.serviceActions.clearAgent();
    resetPolicySearch(this.props);
  };

  let searchHandler = handleSearchBarSubmit;

  if(fieldValues.searchType === 'policy') searchHandler = handlePolicySearchSubmit

  return (
    <Form id="SearchBar" onSubmit={handleSubmit(searchHandler)} noValidate>
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
            disabled={appState.data.submitting || formErrors || !fieldValues.address || !String(fieldValues.address).trim()}
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
            disabled={appState.data.submitting || formErrors}
          >
            <i className="fa fa-search" />Search
          </button>
        </div>
        }
        {fieldValues.searchType === 'policy' && <div className="search-inputs fade-in">

        <SelectField
        name="sortBy" component="select" styleName={'search-context'} label="Sort By" validations={['required']}
        onChange={() => resetPolicySearch(this.props)}
        answers={[
          {
            answer: 'policyNumber',
            label: 'Policy Number'
          },
          {
            answer: 'firstName',
            label: 'First Name'
          },
          {
            answer: 'lastName',
            label: 'Last Name'
          }
        ]}
      />
          {generateField('firstName', 'First Name Search', 'First Name', formErrors, 'first-name-search')}
          {generateField('lastName', 'Last Name Search', 'Last Name', formErrors, 'last-name-search')}
          {generateField('address', 'Property Address Search', 'Property Address', formErrors, 'property-search')}
          {generateField('policyNumber', 'Policy No Search', 'Policy Number', formErrors, 'policy-no-search')}

          <button
            className="btn btn-success multi-input"
            type="submit"
            form="SearchBar"
            disabled={appState.data.submitting || formErrors}
          >
            <i className="fa fa-search" />Search
          </button>
        </div>
        }
        { fieldValues.searchType === 'policy' && policyResults && policyResults.policies && policyResults.policies.length > 0 && <div className="pagination-wrapper">
        <button
          onClick={() => changePage(this.props, false)}
          disabled={String(fieldValues.pageNumber) === '1'}
          tabIndex="0"
          className="btn multi-input"
          type="button"
          form="SearchBar"
        >
          <span className="fa fa-chevron-circle-left" />
        </button>
        <div className="pagination-count">
          <TextField size="2" name={'pageNumber'} label={'Page'} readOnly />
          <span className="pagination-operand">of</span>
          <TextField size="2" name={'totalPages'} label={''} readOnly />
        </div>
        <button
          onClick={() => changePage(this.props, true)}
          disabled={String(fieldValues.pageNumber) === String(fieldValues.totalPages)}
          tabIndex="0"
          className="btn multi-input"
          type="button"
          form="SearchBar"
        >
          <span className="fa fa-chevron-circle-right" />
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
              disabled={appState.data.submitting || formErrors}
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
            disabled={appState.data.submitting || formErrors}
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
            disabled={appState.data.submitting || formErrors}
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
};

const SearchBar = props => new SearchForm(props);

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
  agents: state.agents,
  policyResults: state.service.policyResults,
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  }
});

const searchBarForm = reduxForm({
  form: 'SearchBar',
  enableReinitialize: true,
  validate
})(SearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(searchBarForm);
