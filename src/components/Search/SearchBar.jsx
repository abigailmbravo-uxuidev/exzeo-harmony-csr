import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import localStorage from 'localStorage';
import { connect } from 'react-redux';
import {
  reduxForm,
  Form,
  Field,
  propTypes,
  getFormSyncErrors,
  change
} from 'redux-form';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import moment from 'moment';
import Rules from '../Form/Rules';
import SelectField from '../Form/inputs/SelectField';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as errorActions from '../../actions/errorActions';
import * as serviceActions from '../../actions/serviceActions';
import * as searchActions from '../../actions/searchActions';
import normalizeDate from '../Form/normalizeDate';
import Pagination from '../Common/Pagination';

const userTasks = {
  handleSearchBarSubmit: 'search'
};

export const togglePolicyAdvanceSearch = (props) => {
  const toggleValue = !!props.search.policyAdvanceSearch;
  props.actions.searchActions.setSearch({ ...props.search, policyAdvanceSearch: !toggleValue });
};

export const resetPolicySearch = (props) => {
  props.actions.searchActions.setSearch({
    searchType: 'policy', hasSearched: false, isLoading: false, policyAdvanceSearch: false
  });
  props.actions.serviceActions.clearPolicyResults();
};

export const changePagePolicy = (props, isNext) => {
  const { fieldValues } = props;

  const taskData = {
    firstName: (
      encodeURIComponent(fieldValues.firstName) !== 'undefined' ? encodeURIComponent(fieldValues.firstName) : ''),
    lastName: (
      encodeURIComponent(fieldValues.lastName) !== 'undefined' ? encodeURIComponent(fieldValues.lastName) : ''),
    address: (
      encodeURIComponent(fieldValues.address) !== 'undefined' ? encodeURIComponent(String(fieldValues.address).trim()) : ''),
    policyNumber: (
      encodeURIComponent(fieldValues.policyNumber) !== 'undefined' ? encodeURIComponent(fieldValues.policyNumber) : ''),
    searchType: 'policy',
    isLoading: true,
    hasSearched: true,
    resultStart: 60,
    pageSize: 25,
    policyStatus: (
      encodeURIComponent(fieldValues.policyStatus) !== 'undefined' ? encodeURIComponent(fieldValues.policyStatus) : ''),
    agencyCode: (
      encodeURIComponent(fieldValues.agencyCode) !== 'undefined' ? encodeURIComponent(fieldValues.agencyCode) : ''),
    effectiveDate: (
      encodeURIComponent(fieldValues.effectiveDate) !== 'undefined' ? encodeURIComponent(moment(fieldValues.effectiveDate).utc().format('YYYY-MM-DD')) : '')
  };

  taskData.pageNumber = isNext ? Number(fieldValues.pageNumber) + 1 : Number(fieldValues.pageNumber) - 1;
  props.actions.searchActions.setSearch(taskData);
  props.actions.serviceActions.searchPolicy(taskData, fieldValues.sortBy).then(() => {
    taskData.isLoading = false;
    props.actions.searchActions.setSearch(taskData);
  });
};

export const changePageQuote = (props, isNext) => {
  const { fieldValues } = props;
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSearchBarSubmit;
  const modelName = props.appState.modelName;
  const searchType = 'quote';

  const taskData = {
    firstName: (encodeURIComponent(fieldValues.firstName) !== 'undefined' ? encodeURIComponent(fieldValues.firstName) : ''),
    lastName: (encodeURIComponent(fieldValues.lastName) !== 'undefined' ? encodeURIComponent(fieldValues.lastName) : ''),
    address: (encodeURIComponent(fieldValues.address) !== 'undefined' ? encodeURIComponent(String(fieldValues.address).trim()) : ''),
    quoteNumber: (encodeURIComponent(fieldValues.policyNumber) !== 'undefined' ? encodeURIComponent(fieldValues.policyNumber) : ''),
    quoteState: (encodeURIComponent(fieldValues.quoteState) !== 'undefined' ? encodeURIComponent(fieldValues.quoteState) : ''),
    searchType,
    isLoading: true,
    hasSearched: true,
    resultStart: '60',
    pageSize: '25'
  };


  taskData.pageNumber = isNext ? String(Number(fieldValues.pageNumber) + 1) : String(Number(fieldValues.pageNumber) - 1);

  props.actions.searchActions.setSearch(taskData);
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

const handleInitialize = () => ({ searchType: 'policy', sortBy: 'policyNumber' });

export const handlePolicySearchSubmit = (data, dispatch, props) => {
  const taskData = {
    firstName: (
      encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (
      encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    address: (
      encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    policyNumber: (
      encodeURIComponent(data.policyNumber) !== 'undefined' ? encodeURIComponent(data.policyNumber) : ''),
    searchType: 'policy',
    isLoading: true,
    hasSearched: true,
    pageNumber: 1,
    resultStart: 60,
    pageSize: 25,
    policyStatus: (
      encodeURIComponent(data.policyStatus) !== 'undefined' ? encodeURIComponent(data.policyStatus) : ''),
    agencyCode: (
      encodeURIComponent(data.agencyCode) !== 'undefined' ? encodeURIComponent(data.agencyCode) : ''),
    effectiveDate: (
      encodeURIComponent(data.effectiveDate) !== 'undefined' ? encodeURIComponent(moment(data.effectiveDate).utc().format('YYYY-MM-DD')) : '')
  };

  props.actions.searchActions.setSearch(taskData);
  localStorage.setItem('lastSearchData', JSON.stringify(taskData));

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
    searchType,
    hasSearched: true,
    pageNumber: '1'
  };

  const agencyAgentData = {
    firstName: (
      encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (
      encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    displayName: (
      encodeURIComponent(data.displayName) !== 'undefined' ? encodeURIComponent(data.displayName) : ''),
    address: (
      encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    licNumber: (
      encodeURIComponent(data.licNumber) !== 'undefined' ? encodeURIComponent(data.licNumber) : ''),
    fein: (
      encodeURIComponent(data.fein) !== 'undefined' ? encodeURIComponent(data.fein) : ''),
    agentCode: (
      encodeURIComponent(data.agentCode) !== 'undefined' ? encodeURIComponent(data.agentCode) : ''),
    agencyCode: (
      encodeURIComponent(data.agencyCode) !== 'undefined' ? encodeURIComponent(data.agencyCode) : ''),
    phone: (
      encodeURIComponent(data.phone) !== 'undefined' ? encodeURIComponent(data.phone) : ''),
    searchType
  };

  if (searchType === 'agency') {
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, {
      ...props.appState.data,
      agentSubmitting: true
    });

    props.actions.serviceActions.searchAgencies(
      'TTIC', 'FL', agencyAgentData.displayName,
      agencyAgentData.agencyCode, agencyAgentData.address, agencyAgentData.licNumber,
      agencyAgentData.fein, agencyAgentData.phone
    ).then(() => {
      props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, agentSubmitting: false });
    });
  }

  if (searchType === 'agent') {
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, {
      ...props.appState.data,
      agentSubmitting: true
    });

    props.actions.serviceActions.searchAgents(
      'TTIC', 'FL', agencyAgentData.firstName, agencyAgentData.lastName,
      agencyAgentData.agentCode, agencyAgentData.address, agencyAgentData.licNumber
    ).then(() => {
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
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, {
    ...props.appState.data,
    submitting: true
  });

  // we need to make sure the active task is search otherwise we need to reset the workflow
  if (props.tasks[modelName].data.activeTask && (props.tasks[modelName].data.activeTask.name !== userTasks.handleSearchBarSubmit)) {
    const completeStep = {
      stepName: taskName,
      data: taskData
    };
    props.actions.cgActions.moveToTaskAndExecuteComplete(props.appState.modelName, workflowId, taskName, completeStep);
  } else {
    props.actions.appStateActions.setAppState(modelName, workflowId, {
      ...props.appState.data,
      submitting: true
    });
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

  if (values.effectiveDate) {
    const isDate = moment(values.effectiveDate, 'MM/DD/YYYY', true).isValid()
      ? undefined
      : 'Not a valid date';
    if (isDate) {
      errors.effectiveDate = isDate;
    }
  }

  return errors;
};

const getErrorToolTip = (formErrors, fieldName) => {
  const errorFieldName = `error${fieldName}`;
  return (
    (formErrors && formErrors[fieldName]) ?
      <span>
        <i className="fa fa-exclamation-circle" data-tip="data-tip" data-for={errorFieldName} />
        <ReactTooltip place="right" id={errorFieldName} type="error" effect="float">{formErrors[fieldName]}</ReactTooltip>
      </span> : <span />);
};

const generateField = (name, placeholder, labelText, formErrors, formGroupCss) => {
  const field = (<div className={(
      formErrors && formErrors[name]) ? `form-group error ${formGroupCss}` : `form-group ${formGroupCss}`}
  >
    <label htmlFor={name}>{getErrorToolTip(formErrors, name)}
      {labelText}
    </label>
    <Field
      name={name}
      className=""
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
    const model = nextProps.tasks[nextProps.appState.modelName] || {};
    const previousTask = model.data && model.data.previousTask
      ? model.data.previousTask
      : {};

    const quoteSearchResponse = previousTask.value && previousTask.value.result ? previousTask.value.result : {};

    if (nextProps.search.searchType === 'policy' && nextProps.search.hasSearched && !_.isEqual(this.props.policyResults, nextProps.policyResults)) {
      const totalPages = Math.ceil(nextProps.policyResults.totalNumberOfRecords / nextProps.policyResults.pageSize);
      const pageNumber = nextProps.policyResults.currentPage;
      dispatch(change('SearchBar', 'pageNumber', pageNumber));
      dispatch(change('SearchBar', 'totalPages', totalPages));
      nextProps.actions.searchActions.setSearch({
        ...nextProps.search,
        totalPages,
        pageNumber
      });
    }
    if (nextProps.search.searchType === 'quote' && nextProps.search.hasSearched && !_.isEqual(this.props.quoteSearchResponse, quoteSearchResponse)) {
      const totalPages = Math.ceil(quoteSearchResponse.totalNumberOfRecords / quoteSearchResponse.pageSize);
      const pageNumber = quoteSearchResponse.currentPage;
      dispatch(change('SearchBar', 'pageNumber', pageNumber));
      dispatch(change('SearchBar', 'totalPages', totalPages));
      nextProps.actions.searchActions.setSearch({ ...nextProps.search, totalPages, pageNumber });
    }
  }

  render() {
    const {
      appState,
      questions,
      handleSubmit,
      formErrors,
      fieldValues,
      policyResults,
      form,
      actions,
      tasks,
      reset,
      search,
      agencyList,
      pathName
    } = this.props;

    const agencyListValues = agencyList.map(agency => ({
      label: agency.displayName,
      answer: agency.agencyCode
    }));

    const clearForm = () => {
      const modelName = appState.modelName;
      const data = tasks[modelName].data;
      const workflowId = appState.instanceId;
      const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData')) || {};
      lastSearchData.searchType = '';
      localStorage.setItem('lastSearchData', JSON.stringify(lastSearchData));
      reset(form);
      actions.cgActions.clearSearchResults(modelName, data);
      actions.errorActions.clearAppError();
      actions.serviceActions.clearAgencies();
      actions.serviceActions.clearAgent();
      resetPolicySearch(this.props);
      this.props.actions.appStateActions.setAppState(appState.modelName, workflowId, { submitting: false });
      this.props.actions.serviceActions.getAgencies('TTIC', 'FL');
    };

    let searchHandler = handleSearchBarSubmit;

    if (fieldValues.searchType === 'policy') searchHandler = handlePolicySearchSubmit;

    const model = this.props.tasks[this.props.appState.modelName] || {};
    const previousTask = model.data && model.data.previousTask
      ? model.data.previousTask
      : {};

    const quoteResults = previousTask.value && previousTask.value.result ? previousTask.value.result : [];

    return (
      <Form id="SearchBar" onSubmit={handleSubmit(searchHandler)} noValidate>
        <div className="search-input-wrapper">
          <div className="form-group search-context">
            { pathName === '/agency' ? <SelectField
              id="searchType"
              name="searchType"
              component="select"
              styleName=""
              label="Search Context"
              validations={['required']}
              onChange={clearForm}
              answers={[
              {
                answer: 'agent',
                label: 'Agent Search'
              }, {
                answer: 'agency',
                label: 'Agency Search'
              }
            ]}
            /> :
            <SelectField
              id="searchType"
              name="searchType"
              component="select"
              styleName=""
              label="Search Context"
              validations={['required']}
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
            />}
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
                name="quoteState"
                component="select"
                styleName=""
                label="Quote Status"
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
          { fieldValues.searchType === 'quote' && quoteResults && quoteResults.quotes && quoteResults.quotes.length > 0 && fieldValues.totalPages > 1 &&
          <Pagination changePageForward={() => changePageQuote(this.props, true)} changePageBack={() => changePageQuote(this.props, false)} fieldValues={fieldValues} />
      }
          {fieldValues.searchType === 'policy' && <div className="search-inputs fade-in p">

            <SelectField
              name="sortBy"
              component="select"
              styleName="search-context"
              label="Sort By"
              validations={['required']}
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
              id="searchPolicySubmit"
              className="btn btn-success multi-input"
              type="submit"
              form="SearchBar"
              disabled={appState.data.submitting || formErrors}
            >
              <i className="fa fa-search" />Search
            </button>
            <button type="button" className="advanced-search-btn btn-sm btn-icon" onClick={() => togglePolicyAdvanceSearch(this.props)}><i className={this.props.search.policyAdvanceSearch ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} /></button>
          </div>
        }
          { fieldValues.searchType === 'policy' && policyResults && policyResults.policies && policyResults.policies.length > 0 && fieldValues.totalPages > 1 &&
          <Pagination changePageForward={() => changePagePolicy(this.props, true)} changePageBack={() => changePagePolicy(this.props, false)} fieldValues={fieldValues} />
      }
          {/* <!-- Should be available only in user admin  --> */}
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
          {/* <!-- End should be available only in user admin  --> */}
          {/* <!-- Advanced search for policy --> */}
          {
  fieldValues.searchType === 'policy' && search.policyAdvanceSearch &&
  <div className="advanced-search fade-in">
    <SelectField
      name="agencyCode"
      component="select"
      styleName=""
      label="Agency Name"
      answers={agencyListValues}
    />
    <div className="form-group effectiveDate">
      <label htmlFor="effectiveDate">{getErrorToolTip(formErrors, 'effectiveDate')}
        {'Effective Date'}
      </label>
      <Field name="effectiveDate" className="" placeholder="MM/DD/YYYY" type="text" normalize={normalizeDate} component="input" />
    </div>
    <div className="form-group quote-state">
      <SelectField
        name="policyStatus"
        component="select"
        styleName=""
        label="Policy Status"
  // answers={getAnswers('policyStatus', questions)}
        answers={[
        {
        answer: '0',
        label: 'Policy Issued'
        }, {
        answer: '1',
        label: 'In Force'
        }, {
        answer: '2',
        label: 'Pending Voluntary Cancellation'
        }, {
        answer: '3',
        label: 'Pending Underwriting Cancellation'
        }, {
        answer: '4',
        label: 'Pending Underwriting Non-Renewal'
        }, {
        answer: '8',
        label: 'Cancelled'
        }, {
        answer: '9',
        label: 'Not In Force'
        }
        ]}
      />
    </div>
    <SelectField
      name="sortBy"
      component="select"
      label="Sort By"
      validations={['required']}
      answers={[
      {
      answer: 'policyNumber',
      label: 'Policy Number'
      }, {
      answer: 'firstName',
      label: 'First Name'
      }, {
      answer: 'lastName',
      label: 'Last Name'
      }
      ]}
    />
  </div>
  }
          {/* <!-- End advanced search for policy --> */}
        </div>
      </Form>
    );
  }
}

export const SearchBar = props => new SearchForm(props);

SearchBar.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.shape({}),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
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
  agencyList: state.service.agencies || [],
  policyResults: state.service.policyResults,
  search: state.search,
  pathName: window.location.pathname
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

const searchBarForm = reduxForm({ form: 'SearchBar', enableReinitialize: true, validate })(SearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(searchBarForm);
