import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormSyncErrors, change } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import {
  moveToTaskAndExecuteComplete,
  completeTask,
  clearSearchResults
} from '../../actions/cgActions';
import { setAppState } from '../../actions/appStateActions';
import { clearAppError } from '../../actions/errorActions';
import {
  searchPolicy,
  searchAgents,
  searchAgencies,
  getAgencies,
  clearPolicyResults,
  clearAgencies,
  clearAgent
} from '../../actions/serviceActions';
import {
  setSearch,
  searchQuotes,
  searchAddresses,
  searchPolicies,
  handleSearchSubmit,
  resetSearch,
  toggleLoading } from '../../actions/searchActions';
import Pagination from '../Common/Pagination';
import Rules from '../Form/Rules';
// Components from Core
import { Select } from '@exzeo/core-ui/lib/Input';
import { isRequired } from '@exzeo/core-ui/lib/InputLifecycle';
import NewQuoteSearch from './components/NewQuoteSearch';
import QuoteSearch from './components/QuoteSearch';
import PolicySearch from './components/PolicySearch';
import UserSearch from './components/UserSearch.jsx';
import AgencySearch from './components/AgencySearch';
import AgentSearch from './components/AgentSearch';

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

const INITIAL_VALUES = { searchType: 'policy', sortBy: 'policyNumber' };

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
    this.props.toggleLoading(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fieldValues && !nextProps.searchType) {
      this.clearForm();
      if (nextProps.pathName === '/') {
        change('searchType', 'policy');
        change('sortBy', 'policyNumber');
      } else if (nextProps.pathName === '/agency') {
        change('searchType', 'agency');
      }
    }
  }

  handleSearchFormSubmit = (data, dispatch, props) => {
    dispatch(handleSearchSubmit(data, props))
  };

  handlePagination = (isNext) => {
    const { handleSubmit } = this.props;
    return handleSubmit((data, dispatch, props) => {
      const submitData = { ...data, isNext, currentPage: props.search.currentPage };
      dispatch(handleSearchSubmit(submitData, this.props));
    })
  };

  changeSearchType = (event, newValue) => {
    const { changeSearchType, resetSearch } = this.props;
    changeSearchType(newValue);
    resetSearch();
    this.clearForm();
  };

  resetPolicySearch = () => {
    const { setSearch, clearPolicyResults } = this.props;
    setSearch({
      searchType: 'policy', hasSearched: false, isLoading: false, policyAdvanceSearch: false
    });
    clearPolicyResults();
  };

  clearForm = () => {
    const {
      appState, form, reset, tasks, clearSearchResults, clearAppError, clearAgencies, clearAgent, setAppState, getAgencies
    } = this.props;
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
    const {
      fieldValues, appState, tasks, setSearch, clearAppError, completeTask, moveToTaskAndExecuteComplete, toggleLoading
    } = this.props;
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

  changePagePolicy = async (isNext) => {
    const { fieldValues, searchPolicies, changeCurrentPage } = this.props;
    const pageNumber = isNext ? Number(fieldValues.pageNumber) + 1 : Number(fieldValues.pageNumber) - 1;
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
      pageNumber,
      policyStatus: (encodeURIComponent(fieldValues.policyStatus) !== 'undefined' ? encodeURIComponent(fieldValues.policyStatus) : ''),
      agencyCode: (encodeURIComponent(fieldValues.agencyCode) !== 'undefined' ? encodeURIComponent(fieldValues.agencyCode) : ''),
      effectiveDate: (encodeURIComponent(fieldValues.effectiveDate) !== 'undefined' ? encodeURIComponent(moment(fieldValues.effectiveDate).utc().format('YYYY-MM-DD')) : '')
    };

    changeCurrentPage(pageNumber);
    await searchPolicies(taskData, fieldValues.sortBy);
  };

  render() {
    const {
      advancedSearch,
      searchType,
      toggleAdvancedSearch,
      currentPage,
      totalPages,
      search,
      appState,
      questions,
      handleSubmit,
      formErrors,
      fieldValues,
      agencyList,
      pathName
    } = this.props;

    const agencyListValues = (searchType === 'policy' && advancedSearch) ? agencyList.map(agency => ({
      label: agency.displayName,
      answer: agency.agencyCode,
      value: agency.agencyCode
    })) : [];

    const searchAnswers = pathName === '/agency' ? agencySearchOptions : nonAgencySearchOptions;

    return (
      <div id="SearchBar">
        <form onSubmit={handleSubmit(this.handleSearchFormSubmit)}>
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
                effectiveDateFormErrors={formErrors.effectiveDate}
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

            {(searchType === 'quote' || searchType === 'policy') && search.results.length > 0 && search.totalPages > 1 &&
              <Pagination
                changePageForward={this.handlePagination(true)}
                changePageBack={this.handlePagination(false)}
                pageNumber={search.currentPage}
                totalPages={search.totalPages}
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
  initialValues: INITIAL_VALUES,
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
  toggleLoading,
  searchQuotes,
  searchAddresses,
  searchPolicies,
  handleSearchSubmit,
  resetSearch
})(reduxForm({
  form: 'SearchBar',
  enableReinitialize: true,
  validate,
})(SearchBar));
