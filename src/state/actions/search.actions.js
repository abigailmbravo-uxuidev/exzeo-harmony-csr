import moment from 'moment/moment';

import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { sortDiariesByDate } from '../../utilities/diaries';
import { SECONDARY_DATE_FORMAT } from '../../constants/dates';
import {
  DEFAULT_SEARCH_PARAMS,
  RESULTS_PAGE_SIZE,
  SEARCH_TYPES
} from '../../constants/search';

import * as types from './actionTypes';
import * as errorActions from './error.actions';


/**
 *  TODO: THIS FILE HAS A TREMENDOUS AMOUNT OF REPETITION, WILL BE ADDRESSING THIS IN A SUBSEQUENT PR
 */

/**
 * Adjust loading state
 * @param {boolean} loading
 * @returns {{type: string, loading: boolean}}
 */
export function toggleLoading(loading) {
  return {
    type: types.TOGGLE_LOADING,
    loading
  };
}

/**
 * Reset search state
 * @returns {{type: string}}
 */
export function resetSearch() {
  return {
    type: types.RESET_SEARCH
  };
}

/**
 * Set search results
 * @param {array} results
 * @param {number} totalRecords
 * @param {boolean} noResults
 * @param {number} [currentPage]
 * @param {number} [pageSize]
 * @param {string} [sortBy]
 * @param {string} [sortDirection]
 * @returns {{type: string, currentPage: number, pageSize: number, sortBy: string, sortDirection: string, results: array, totalRecords: number, noResults: boolean}}
 */
export function setSearchResults({
  currentPage = 1,
  pageSize = 0,
  sortBy = '',
  sortDirection = '',
  results = [],
  totalRecords = 0,
  noResults = true
}) {
  return {
    type: types.SET_SEARCH_RESULTS,
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    results,
    totalRecords,
    noResults
  };
}

/**
 * Search for addresses matching some given criteria, set results as state
 * @param {string} address
 * @returns {Function}
 */
export function searchAddresses(address) {
  return async (dispatch) => {
    try {
      const results = await fetchAddresses(address);
      dispatch(setSearchResults(formatAddressResults(results)));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 * Search for quotes matching some given criteria, set results as state
 * @param {object} quoteSearchData
 * @returns {Function}
 */
export function searchQuotes(quoteSearchData) {
  return async (dispatch) => {
    try {
      const results = await fetchQuotes(quoteSearchData);
      dispatch(setSearchResults(formatQuoteResults(results)));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 * Search for policies matching some given criteria, set results as state
 * @param {object} policySearchData
 * @returns {Function}
 */
export function searchPolicies(policySearchData) {
  return async (dispatch) => {
    try {
      const results = await fetchPolicies(policySearchData);
      dispatch(setSearchResults(formatPolicyResults(results)));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 * Search for agents matching some given criteria, set results as state
 * @param {object} agentSearchData
 * @returns {Function}
 */
export function searchAgents(agentSearchData) {
  return async (dispatch) => {
    try {
      const results = await fetchAgents(agentSearchData);
      dispatch(setSearchResults(formatAgentResults(results)));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 * Search for agencies matching some given criteria, set results as state
 * @param {object} agencySearchData
 * @returns {Function}
 */
export function searchAgencies(agencySearchData) {
  return async (dispatch) => {
    try {
      const results = await fetchAgencies(agencySearchData);
      dispatch(setSearchResults(formatAgencyResults(results)));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 * Build query string and call address search service
 * @param {string} address
 * @returns {Promise<{}>}
 */
export async function fetchAddresses(address) {
  const config = {
    service: 'property-search',
    method: 'GET',
    path: `/v1/search/${address}/1/10`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchAddresses');
    return response && response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 * Build query string and call quote search service
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} address
 * @param {string} companyCode
 * @param {string} quoteNumber
 * @param {string} quoteState
 * @param {string} state
 * @param {string} currentPage
 * @param {string} pageSize
 * @param {string} sort
 * @param {string} sortDirection
 * @returns {Promise<{}>}
 */
export async function fetchQuotes({
  firstName,
  lastName,
  address,
  quoteNumber,
  quoteState,
  currentPage,
  pageSize,
  sort,
  sortDirection
}) {
  // TODO: the service requires that companyCode and state are included in this query. Hard coding for now.
  const config = {
    service: 'quote-data',
    method: 'GET',
    path: `/quotes?companyCode=TTIC&state=FL&quoteNumber=${quoteNumber}&lastName=${lastName}&firstName=${firstName}&propertyAddress=${address}&page=${currentPage}&pageSize=${pageSize}&sort=${sort}&sortDirection=${sortDirection}&quoteState=${quoteState}`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchQuotes');
    return response && response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}

/**
 * Build query string and call policy service
 * @param firstName
 * @param lastName
 * @param address
 * @param agencyCode
 * @param companyCode
 * @param effectiveDate
 * @param policyNumber
 * @param policyStatus
 * @param currentPage
 * @param pageSize
 * @param sortBy
 * @param sortDirection
 * @param state
 * @returns {Promise<{}>}
 */
export async function fetchPolicies({
  firstName,
  lastName,
  address,
  agencyCode,
  effectiveDate,
  policyNumber,
  policyStatus,
  currentPage,
  pageSize,
  sortBy,
  sortDirection,
}) {
  // TODO: the service requires that companyCode and state are included in this query. Hard coding for now.
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `/transactions?companyCode=TTIC&state=FL&policyNumber=${policyNumber}&firstName=${firstName}&lastName=${lastName}&propertyAddress=${address}&page=${currentPage}&pageSize=${pageSize}&sort=${sortBy}&sortDirection=${sortDirection}&effectiveDate=${effectiveDate}&agencyCode=${agencyCode}&status=${policyStatus}`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchPolicies');
    return response ? response.data : {};
  } catch (error) {
    throw error;
  }
}

/**
 * Build query string and call agency service to search agents
 * @param {string} companyCode
 * @param {string} state
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} agentCode
 * @param {string} address
 * @param {string} licenseNumber
 * @returns {Promise<{}>}
 */
export async function fetchAgents({
  companyCode, state, firstName, lastName, agentCode, address, licenseNumber
}) {
  const config = {
    service: 'agency',
    method: 'GET',
    path: `agents?companyCode=${companyCode}&state=${state}&firstName=${firstName}&lastName=${lastName}&agentCode=${agentCode}&mailingAddress=${address}&licenseNumber=${licenseNumber}`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchAgents');
    return response && response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 * Build query string and call agency service to search agencies
 * @param {string} companyCode
 * @param {string} state
 * @param {string} displayName
 * @param {string} agencyCode
 * @param {string} address
 * @param {string} licenseNumber
 * @param {string} fein
 * @param {string} phone
 * @returns {Promise<{}>}
 */
export async function fetchAgencies({
  companyCode, state, displayName, agencyCode, address, licenseNumber, fein, phone
}) {
  const config = {
    service: 'agency',
    method: 'GET',
    path: `agencies?companyCode=${companyCode}&state=${state}&displayName=${displayName}&agencyCode=${agencyCode}&mailingAddress=${address}&licenseNumber=${licenseNumber}&taxIdNumber=${fein}&primaryPhoneNumber=${phone}`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchAgencies');
    return response && response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 * Format results from address query for state
 * @param {object} results
 * @returns {{results: *, totalRecords: *, noResults: boolean}}
 */
function formatAddressResults(results) {
  return {
    results: results.IndexResult,
    totalRecords: results.TotalCount,
    noResults: !results.TotalCount
  };
}

/**
 * Format results from quote query for state
 * @param {object} results
 * @returns {{currentPage: number, pageSize: number, sortBy: string, sortDirection: string, results: array, totalRecords: number, noResults: boolean}}
 */
function formatQuoteResults(results) {
  return {
    currentPage: results.currentPage,
    pageSize: results.pageSize,
    sortBy: results.sort,
    sortDirection: results.sortDirection === -1 ? 'desc' : 'asc',
    results: results.quotes,
    totalRecords: results.totalNumberOfRecords,
    noResults: !results.totalNumberOfRecords
  };
}

/**
 * Format results from policy query for state
 * @param {object} results
 * @returns {{currentPage: number, pageSize: number, sortBy: string, sortDirection: string, results: array, totalRecords: number, noResults: boolean}}
 */
function formatPolicyResults(results) {
  return {
    currentPage: results.currentPage || 0,
    pageSize: results.pageSize || 0,
    sortBy: results.sort || '',
    sortDirection: results.sortDirection,
    results: results.policies,
    totalRecords: results.totalNumberOfRecords,
    noResults: !results.totalNumberOfRecords
  };
}

/**
 * Format results from agent query for state
 * @param results
 * @returns {{results: [], totalRecords: number, noResults: boolean}}
 */
function formatAgentResults(results) {
  const totalRecords = Array.isArray(results) ? results.length : 0;
  return {
    results,
    totalRecords,
    noResults: !totalRecords
  };
}

/**
 * Format results from agency query for state
 * @param results
 * @returns {{results: [], totalRecords: number, noResults: boolean}}
 */
function formatAgencyResults(results) {
  const totalRecords = Array.isArray(results) ? results.length : 0;
  return {
    results,
    totalRecords,
    noResults: !totalRecords
  };
}

/**
 * Set page number based on whether or not there is a current page and/or if we are going backwards/forwards
 * @param currentPage
 * @param isNext
 * @returns {*}
 */
export function setPageNumber(currentPage, isNext) {
  if (typeof isNext === 'undefined') {
    return currentPage || 1;
  }
  return isNext ? String(currentPage + 1) : String(currentPage - 1);
}

/**
 * Format value to put in URI for request.
 * @param value
 * @param sub
 * @returns {string}
 */
export function formatForURI(value, sub = '') {
  const encodedVal = encodeURIComponent(value);
  return encodedVal !== 'undefined' ? encodedVal : sub;
}

/**
 * Entry point for AddressSearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export function handleAddressSearch(data) {
  return async (dispatch) => {
    const taskData = {
      address: formatForURI(String(data.address).trim())
    };

    await dispatch(searchAddresses(taskData.address));
  };
}

/**
 * Entry point for QuoteSearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export function handleQuoteSearch(data) {
  return async (dispatch) => {
    const taskData = {
      firstName: formatForURI(data.firstName),
      lastName: formatForURI(data.lastName),
      address: formatForURI(String(data.address).trim()),
      zip: formatForURI(data.zip),
      quoteNumber: formatForURI(data.quoteNumber),
      policyNumber: formatForURI(data.policyNumber),
      quoteState: formatForURI(data.quoteState),
      currentPage: setPageNumber(data.currentPage, data.isNext),
      companyCode: DEFAULT_SEARCH_PARAMS.companyCode,
      state: DEFAULT_SEARCH_PARAMS.state,
      sort: 'quoteNumber',
      sortDirection: 'desc',
      pageSize: RESULTS_PAGE_SIZE
    };

    await dispatch(searchQuotes(taskData));
  };
}

/**
 * Entry point for PolicySearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export function handlePolicySearch(data) {
  return async (dispatch) => {
    const taskData = {
      firstName: formatForURI(data.firstName),
      lastName: formatForURI(data.lastName),
      address: formatForURI(String(data.address).trim()),
      policyNumber: formatForURI(data.policyNumber),
      policyStatus: formatForURI(data.policyStatus),
      agencyCode: formatForURI(data.agencyCode),
      effectiveDate: formatForURI(data.effectiveDate && moment(data.effectiveDate).utc().format(SECONDARY_DATE_FORMAT)),
      currentPage: setPageNumber(data.currentPage, data.isNext),
      sortBy: data.sortBy,
      sortDirection: data.sortBy === 'policyNumber' ? 'desc' : 'asc',
      pageSize: RESULTS_PAGE_SIZE,
      companyCode: DEFAULT_SEARCH_PARAMS.companyCode,
      state: DEFAULT_SEARCH_PARAMS.state
    };

    await dispatch(searchPolicies(taskData));
  };
}

/**
 * Entry point for AgentSearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export function handleAgentSearch(data) {
  return async (dispatch) => {
    const taskData = {
      agentCode: formatForURI(data.agentCode),
      firstName: formatForURI(data.firstName),
      lastName: formatForURI(data.lastName),
      address: formatForURI(String(data.address).trim()),
      licenseNumber: formatForURI(data.licenseNumber),
      companyCode: DEFAULT_SEARCH_PARAMS.companyCode,
      state: DEFAULT_SEARCH_PARAMS.state
    };

    await dispatch(searchAgents(taskData));
  };
}

/**
 * Entry point for AgencySearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export function handleAgencySearch(data) {
  return async (dispatch) => {
    const taskData = {
      agencyCode: formatForURI(data.agencyCode),
      displayName: formatForURI(data.displayName),
      address: formatForURI(String(data.address).trim()),
      licenseNumber: formatForURI(data.licenseNumber),
      fein: formatForURI(data.fein),
      phone: formatForURI(data.phone),
      companyCode: DEFAULT_SEARCH_PARAMS.companyCode,
      state: DEFAULT_SEARCH_PARAMS.state
    };

    await dispatch(searchAgencies(taskData));
  };
}

// THISPR - **** finish ****
/**
 * Entry point for DiarySearch form
 * @param data
 * @returns {Function}
 */
export function handleDiariesSearch(data) {
  return async (dispatch) => {
    const taskData = {
      open: data.open === 'true',
      assignees: data.assignees.map(a => a.answer),
      reason: data.reason,
      dueDateMin: data.dateRange.min,
      dueDateMax: data.dateRange.max
    };

    await dispatch(searchDiaries(taskData));
  };
}

/**
 *
 * @param diarySearchData
 * @returns {Function}
 */
export function searchDiaries(diarySearchData) {
  return async (dispatch) => {
    try {
      const results = await fetchDiaries(diarySearchData);
      dispatch(setSearchResults(formatDiaryResults(results)));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

/**
 *
 * @param reason
 * @param dueDateMin
 * @param dueDateMax
 * @param assignees
 * @param open
 * @returns {Promise<void>}
 */
export async function fetchDiaries({
  reason,
  dueDateMin,
  dueDateMax,
  assignees,
  open
}) {
  const config = {
    service: 'diaries',
    method: 'POST',
    path: '/read',
    data: {
      assignees: assignees.length === 0 ? null : assignees,
      dueDateMax,
      dueDateMin,
      open,
      reason
    }
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchDiaries');
    return response && response.data ? response.data : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param results
 */
function formatDiaryResults(results) {
  const sortedResults = sortDiariesByDate(results.result);

  return {
    results: sortedResults,
    totalRecords: sortedResults.length,
    noResults: !sortedResults.length
  };
}
// THISPR - **** finish ****

/**
 * Main submit handler for Search. Determine which type of search is being requested and kick it off
 * @param {object} data - form data
 * @param {object} props - props passed to search form at time of search
 * @returns {Function}
 */
export function handleSearchSubmit(data, props) {
  return async (dispatch) => {
    const { searchType } = props;

    dispatch(toggleLoading(true));

    try {
      if (searchType === SEARCH_TYPES.newQuote) await dispatch(handleAddressSearch(data));

      if (searchType === SEARCH_TYPES.quote) await dispatch(handleQuoteSearch(data));

      if (searchType === SEARCH_TYPES.policy) await dispatch(handlePolicySearch(data));

      if (searchType === SEARCH_TYPES.agent) await dispatch(handleAgentSearch(data));

      if (searchType === SEARCH_TYPES.agency) await dispatch(handleAgencySearch(data));

      if (searchType === SEARCH_TYPES.diaries) await dispatch(handleDiariesSearch(data));
    } catch (error) {
      // 'error' is undefined if we catch here. Making a custom message to handle.
      dispatch(errorActions.setAppError(error || { message: 'An error has occurred' }));
    }

    dispatch(toggleLoading(false));
  };
}

