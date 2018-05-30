import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormSyncErrors, change } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import { moveToTaskAndExecuteComplete, completeTask, clearSearchResults } from '../../actions/cgActions';
import { setAppState, toggleLoading } from '../../actions/appStateActions';
import { clearAppError } from '../../actions/errorActions';
import { searchPolicy, searchAgents, searchAgencies, getAgencies, clearPolicyResults, clearAgencies, clearAgent } from '../../actions/serviceActions';
import { setSearch } from '../../actions/searchActions';
import Pagination from '../Common/Pagination';
import Rules from '../Form/Rules';
// Components from Core
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import NewQuoteSearch from './components/NewQuoteSearch';
import QuoteSearch from './components/QuoteSearch';
import PolicySearch from './components/PolicySearch';
import UserSearch from './components/UserSearch.jsx';
import AgencySearch from './components/AgencySearch';
import AgentSearch from './components/AgentSearch';

const { Select, SelectTypeAhead, Input } = Inputs;
const { isRequired, normalizeDate } = lifecycle;

const userTasks = {
  handleSearchBarSubmit: 'search'
};

const agencySearchOptions = [
  { answer: 'agent', label: 'Agent Search' },
  { answer: 'agency', label: 'Agency Search' }
];

const nonAgencySearchOptions = [
  { answer: 'address', label: 'New Quote' },
  { answer: 'quote', label: 'Quote Search' },
  { answer: 'policy', label: 'Policy Search' }
];

const handleInitialize = () => ({ searchType: 'policy', sortBy: 'policyNumber' });

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
    pageSize: 25,
    policyStatus: (encodeURIComponent(data.policyStatus) !== 'undefined' ? encodeURIComponent(data.policyStatus) : ''),
    agencyCode: (encodeURIComponent(data.agencyCode) !== 'undefined' ? encodeURIComponent(data.agencyCode) : ''),
    effectiveDate: (encodeURIComponent(data.effectiveDate) !== 'undefined' ? encodeURIComponent(moment(data.effectiveDate).utc().format('YYYY-MM-DD')) : '')
  };

  props.setSearch(taskData);
  localStorage.setItem('lastSearchData', JSON.stringify(taskData));
  props.toggleLoading(true);
  props.searchPolicy(taskData, data.sortBy).then(() => {
    taskData.isLoading = false;
    props.setSearch(taskData);
    props.toggleLoading(false);
  });
};

export const handleSearchBarSubmit = (data, dispatch, props) => {
  const { instanceId: workflowId } = props.appState;
  const taskName = userTasks.handleSearchBarSubmit;
  const { modelName } = props.appState;
  const { searchType } = props.fieldValues;
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
    props.setAppState(props.appState.modelName, workflowId, {
      ...props.appState.data,
      agentSubmitting: true
    });

    props.searchAgencies(
      'TTIC', 'FL', agencyAgentData.displayName,
      agencyAgentData.agencyCode, agencyAgentData.address, agencyAgentData.licNumber,
      agencyAgentData.fein, agencyAgentData.phone
    ).then(() => {
      props.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, agentSubmitting: false });
    });
  }

  if (searchType === 'agent') {
    props.setAppState(props.appState.modelName, workflowId, {
      ...props.appState.data,
      agentSubmitting: true
    });

    props.searchAgents(
      'TTIC', 'FL', agencyAgentData.firstName, agencyAgentData.lastName,
      agencyAgentData.agentCode, agencyAgentData.address, agencyAgentData.licNumber
    ).then(() => {
      props.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, agentSubmitting: false });
    });
  }

  if (searchType !== 'agency' && searchType !== 'agent') {
    localStorage.setItem('lastSearchData', JSON.stringify(taskData));
    props.setSearch(taskData);
  } else {
    localStorage.setItem('lastSearchData', JSON.stringify(agencyAgentData));
    props.setSearch(agencyAgentData);
    return;
  }

  props.clearAppError();
  props.toggleLoading(true);

  // we need to make sure the active task is search otherwise we need to reset the workflow
  if (props.tasks[modelName].data.activeTask && (props.tasks[modelName].data.activeTask.name !== userTasks.handleSearchBarSubmit)) {
    const completeStep = {
      stepName: taskName,
      data: taskData
    };
    props.moveToTaskAndExecuteComplete(props.appState.modelName, workflowId, taskName, completeStep);
    props.toggleLoading(true);
  } else {
    props.toggleLoading(true);
    props.completeTask(modelName, workflowId, taskName, taskData);
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

export class SearchBar extends Component {
  componentDidMount() {
    localStorage.removeItem('lastSearchData');
    this.props.getAgencies('TTIC', 'FL');
  }

  componentWillReceiveProps(nextProps) {
    const { change } = nextProps;
    const model = nextProps.tasks[nextProps.appState.modelName] || {};
    const previousTask = model.data && model.data.previousTask
      ? model.data.previousTask
      : {};

    const quoteSearchResponse = previousTask.value && previousTask.value.result ? previousTask.value.result : {};

    if (nextProps.search.searchType === 'policy' && nextProps.search.hasSearched && nextProps.policyResults) {
      const totalPages = Math.ceil(nextProps.policyResults.totalNumberOfRecords / nextProps.policyResults.pageSize);
      const pageNumber = nextProps.policyResults.currentPage;
      change('pageNumber', pageNumber);
      change('totalPages', totalPages);
      nextProps.setSearch({ ...nextProps.search, totalPages, pageNumber });
    }


    if (nextProps.search.searchType === 'quote' && nextProps.search.hasSearched) {
      const totalPages = Math.ceil(quoteSearchResponse.totalNumberOfRecords / quoteSearchResponse.pageSize);
      const pageNumber = quoteSearchResponse.currentPage;
      change('pageNumber', pageNumber);
      change('totalPages', totalPages);
      nextProps.setSearch({ ...nextProps.search, totalPages, pageNumber });
    }

    if (nextProps.fieldValues && !nextProps.fieldValues.searchType) {
      this.clearForm();
      if (nextProps.pathName === '/') {
        change('searchType', 'policy');
        change('sortBy', 'policyNumber');
      } else {
        change('searchType', 'agency');
      }
    }
  }

  changeSearchType = (event, newValue) => {
    const { changeSearchType } = this.props;
    changeSearchType(newValue);
    this.clearForm();
    this.resetPolicySearch();
  };

  resetPolicySearch = () => {
    const { setSearch, clearPolicyResults } = this.props;
    setSearch({
      searchType: 'policy', hasSearched: false, isLoading: false, policyAdvanceSearch: false
    });
    clearPolicyResults();
  };

  clearForm = () => {
    const { appState, form, reset, tasks, clearSearchResults, clearAppError, clearAgencies, clearAgent, setAppState, getAgencies } = this.props;
    const modelName = appState.modelName;
    const data = tasks[modelName].data;
    const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData')) || {};
    lastSearchData.searchType = '';
    localStorage.setItem('lastSearchData', JSON.stringify(lastSearchData));
    reset(form);
    clearSearchResults(modelName, data);
    clearAppError();
    clearAgencies();
    clearAgent();
    this.resetPolicySearch();
    getAgencies('TTIC', 'FL');
    change('sortBy', 'policyNumber');
    toggleLoading(false);
  };

  changePageQuote = (isNext) => {
    const { fieldValues, appState, tasks, setSearch, clearAppError, completeTask, moveToTaskAndExecuteComplete, toggleLoading } = this.props;
    const workflowId = appState.instanceId;
    const taskName = userTasks.handleSearchBarSubmit;
    const modelName = appState.modelName;
    const searchType = 'quote';

    const taskData = {
      firstName: (encodeURIComponent(fieldValues.firstName) !== 'undefined' ? encodeURIComponent(fieldValues.firstName) : ''),
      lastName: (encodeURIComponent(fieldValues.lastName) !== 'undefined' ? encodeURIComponent(fieldValues.lastName) : ''),
      address: (encodeURIComponent(fieldValues.address) !== 'undefined' ? encodeURIComponent(String(fieldValues.address).trim()) : ''),
      quoteNumber: (encodeURIComponent(fieldValues.quoteNumber) !== 'undefined' ? encodeURIComponent(fieldValues.quoteNumber) : ''),
      quoteState: (encodeURIComponent(fieldValues.quoteState) !== 'undefined' ? encodeURIComponent(fieldValues.quoteState) : ''),
      searchType,
      isLoading: true,
      hasSearched: true,
      resultStart: '60',
      pageSize: '25'
    };


    taskData.pageNumber = isNext ? String(Number(fieldValues.pageNumber) + 1) : String(Number(fieldValues.pageNumber) - 1);

    setSearch(taskData);
    localStorage.setItem('lastSearchData', JSON.stringify(taskData));

    clearAppError();
    toggleLoading(true);

    // we need to make sure the active task is search otherwise we need to reset the workflow
    if (tasks[modelName].data.activeTask && (tasks[modelName].data.activeTask.name !== userTasks.handleSearchBarSubmit)) {
      const completeStep = {
        stepName: taskName,
        data: taskData
      };
      moveToTaskAndExecuteComplete(appState.modelName, workflowId, taskName, completeStep);
    } else {
      toggleLoading(true);
      completeTask(modelName, workflowId, taskName, taskData);
    }
  };

  changePagePolicy = (isNext) => {
    const { fieldValues, setSearch, searchPolicy,   } = this.props;

    const taskData = {
      firstName: (encodeURIComponent(fieldValues.firstName) !== 'undefined' ? encodeURIComponent(fieldValues.firstName) : ''),
      lastName: (encodeURIComponent(fieldValues.lastName) !== 'undefined' ? encodeURIComponent(fieldValues.lastName) : ''),
      address: (encodeURIComponent(fieldValues.address) !== 'undefined' ? encodeURIComponent(String(fieldValues.address).trim()) : ''),
      policyNumber: (encodeURIComponent(fieldValues.policyNumber) !== 'undefined' ? encodeURIComponent(fieldValues.policyNumber) : ''),
      searchType: 'policy',
      isLoading: true,
      hasSearched: true,
      resultStart: 60,
      pageSize: 25,
      policyStatus: (encodeURIComponent(fieldValues.policyStatus) !== 'undefined' ? encodeURIComponent(fieldValues.policyStatus) : ''),
      agencyCode: (encodeURIComponent(fieldValues.agencyCode) !== 'undefined' ? encodeURIComponent(fieldValues.agencyCode) : ''),
      effectiveDate: (encodeURIComponent(fieldValues.effectiveDate) !== 'undefined' ? encodeURIComponent(moment(fieldValues.effectiveDate).utc().format('YYYY-MM-DD')) : '')
    };

    taskData.pageNumber = isNext ? Number(fieldValues.pageNumber) + 1 : Number(fieldValues.pageNumber) - 1;
    setSearch(taskData);
    searchPolicy(taskData, fieldValues.sortBy).then(() => {
      taskData.isLoading = false;
      setSearch(taskData);
    });
  };

  render() {
    const {
      advancedSearch,
      searchType,
      toggleAdvancedSearch,
      appState,
      questions,
      handleSubmit,
      formErrors,
      fieldValues,
      policyResults,
      agencyList,
      pathName
    } = this.props;

    const agencyListValues = (searchType === 'policy' && advancedSearch) ? agencyList.map(agency => ({
      label: agency.displayName,
      answer: agency.agencyCode,
      value: agency.agencyCode
    })) : [];

    let searchHandler = searchType === 'policy' ? handlePolicySearchSubmit : handleSearchBarSubmit;

    const model = this.props.tasks[this.props.appState.modelName] || {};
    const previousTask = model.data && model.data.previousTask
      ? model.data.previousTask
      : {};

    const quoteResults = previousTask.value && previousTask.value.result ? previousTask.value.result : [];
    const searchAnswers = pathName === '/agency' ? agencySearchOptions : nonAgencySearchOptions;

    return (
      <div id="SearchBar">
        <form onSubmit={handleSubmit(handlePolicySearchSubmit)}>
        <div className="search-input-wrapper">

          <div className="form-group search-context">
              <Field
                name="searchType"
                label="Search Context"
                component={Select}
                id="searchType"
                validate={isRequired}
                onChange={this.changeSearchType}
                answers={searchAnswers}
              />
          </div>

          {searchType === 'address' &&
            <NewQuoteSearch
              disabled={appState.data.submitting || !fieldValues.address || !String(fieldValues.address).trim()}
            />
          }
          {searchType === 'quote' &&
            <QuoteSearch
              questions={questions}
              disabled={appState.data.submitting}
            />
          }
          {searchType === 'policy' &&
            <PolicySearch
              questions={questions}
              effectiveDateFormErrors={formErrors['effectiveDate']}
              agencyListValues={agencyListValues}
              advancedSearch={advancedSearch}
              toggleAdvancedSearch={toggleAdvancedSearch}
              disabled={appState.data.submitting}
            />
          }

          {/* <!-- Should be available only in user admin  --> */}
          {searchType === 'user' &&
            <UserSearch disabled={appState.data.submitting} />
          }
          {searchType === 'agency' &&
            <AgencySearch disabled={appState.data.submitting} />
          }
          {searchType === 'agent' &&
            <AgentSearch disabled={appState.data.submitting} />
          }
          {/* <!-- End should be available only in user admin  --> */}

          {searchType === 'quote' && quoteResults && quoteResults.quotes && quoteResults.quotes.length > 0 && fieldValues.totalPages > 1 &&
          <Pagination
            changePageForward={() => this.changePageQuote(true)}
            changePageBack={() => this.changePageQuote(false)}
            pageNumber={fieldValues.pageNumber}
            totalPages={fieldValues.totalPages}
          />
          }

          {searchType === 'policy' && policyResults && policyResults.policies && policyResults.policies.length > 0 && fieldValues.totalPages > 1 &&
          <Pagination
            changePageForward={() => this.changePagePolicy(true)}
            changePageBack={() => this.changePagePolicy(false)}
            pageNumber={fieldValues.pageNumber}
            totalPages={fieldValues.totalPages}
          />
          }
        </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'SearchBar.values', {}),
  formErrors: getFormSyncErrors('SearchBar')(state),
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

export default connect(mapStateToProps, {
  moveToTaskAndExecuteComplete,
  completeTask,
  clearSearchResults,
  setAppState,
  clearAppError,
  searchPolicy,
  searchAgents,
  searchAgencies,
  getAgencies,
  clearPolicyResults,
  clearAgencies,
  clearAgent,
  setSearch,
  toggleLoading
})(reduxForm({ form: 'SearchBar', enableReinitialize: true, validate })(SearchBar));
