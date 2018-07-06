import * as types from './actionTypes';
import * as serviceRunner from '../../utilities/serviceRunner';
import * as errorActions from './errorActions';
import moment from "moment/moment";
import {
  DEFAULT_SEARCH_PARAMS,
  RESULTS_PAGE_SIZE,
  SEARCH_TYPES,
  LOCAL_STORAGE_KEY,
  SECONDARY_DATE_FORMAT
} from "../../constants/search";


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
  }
}

/**
 * Reset search state
 * @returns {{type: string}}
 */
export function resetSearch() {
  return {
    type: types.RESET_SEARCH
  }
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
  results,
  totalRecords,
  noResults
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
  }
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
  }
}

/**
 * Build query string and call address search service
 * @param {string} address
 * @returns {Promise<Array>}
 */
export async function fetchAddresses(address) {
  const config = {
    service: 'property-search',
    method: 'GET',
    path: `/v1/search/${address.replace(' ', '&#32;')}/1/10`
  };

  try {
    const response = await serviceRunner.callService(config);
    return response && response.data && response.data.result ? response.data.result : [];
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
 * @returns {Promise<Array>}
 */
export async function fetchQuotes({
  firstName,
  lastName,
  address,
  companyCode,
  quoteNumber,
  quoteState,
  state,
  currentPage,
  pageSize,
  sort,
  sortDirection
}) {
  const config = {
    service: 'quote-data',
    method: 'GET',
    path: `/quotes?companyCode=${companyCode}&state=${state}&product=HO3&quoteNumber=${quoteNumber}&lastName=${lastName}&firstName=${firstName}&propertyAddress=${address}&page=${currentPage}&pageSize=${pageSize}&sort=${sort}&sortDirection=${sortDirection}&quoteState=${quoteState.replace(' ', '%20')}`
  };

  try {
    const response = await serviceRunner.callService(config);
    return response && response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 * Build query string and call policy service
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} address
 * @param {string} agencyCode
 * @param {string} effectiveDate
 * @param {string} policyNumber
 * @param {string} policyStatus
 * @param {string} currentPage
 * @param {string} pageSize
 * @param {string} resultStart
 * @param {string} sortBy
 * @param {string} sortDirection
 * @returns {Promise<Array>}
 */
export async function fetchPolicies({
  firstName,
  lastName,
  address,
  agencyCode,
  companyCode,
  effectiveDate,
  policyNumber,
  policyStatus,
  currentPage,
  pageSize,
  resultStart,
  sortBy,
  sortDirection,
  state,
}) {
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `/transactions?companyCode=${companyCode}&state=${state}&product=HO3&policyNumber=${policyNumber}&firstName=${firstName}&lastName=${lastName}&propertyAddress=${address}&page=${currentPage}&pageSize=${pageSize}&resultStart=${resultStart}&sort=${sortBy}&sortDirection=${sortDirection}&effectiveDate=${effectiveDate}&agencyCode=${agencyCode}&status=${policyStatus}`
  };

  try {
    const response = await serviceRunner.callService(config);
    return response ? response.data : [];
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
 * @returns {Promise<Array>}
 */
export async function fetchAgents({ companyCode, state, firstName, lastName, agentCode, address, licenseNumber }) {
  const config = {
    service: 'agency',
    method: 'GET',
    path: `v1/agents/${companyCode}/${state}?firstName=${firstName}&lastName=${lastName}&agentCode=${agentCode}&mailingAddress=${address}&licenseNumber=${licenseNumber}`
  };

  try {
    const response = await serviceRunner.callService(config);
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
 * @returns {Promise<Array>}
 */
export async function fetchAgencies({ companyCode, state, displayName, agencyCode, address, licenseNumber, fein, phone }) {
  const config = {
    service: 'agency',
    method: 'GET',
    path: `v1/agencies/${companyCode}/${state}?displayName=${displayName}&agencyCode=${agencyCode}&mailingAddress=${address}&licenseNumber=${licenseNumber}&taxIdNumber=${fein}&primaryPhoneNumber=${phone}`
  };

  try {
    const response = await serviceRunner.callService(config);
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
    results: results.IndexResults,
    totalRecords: results.TotalCount,
    noResults: !results.TotalCount
  }
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
  }
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
  }
}

/**
 * Format results from agent query for state
 * @param results
 * @returns {{results: [], totalRecords: number, noResults: boolean}}
 */
function formatAgentResults(results) {
  const totalRecords = Array.isArray(results) ? results.length : 0;
  return {
    results: results,
    totalRecords,
    noResults: !totalRecords
  }
}

/**
 * Format results from agency query for state
 * @param results
 * @returns {{results: [], totalRecords: number, noResults: boolean}}
 */
function formatAgencyResults(results) {
  const totalRecords = Array.isArray(results) ? results.length : 0;
  return {
    results: results,
    totalRecords,
    noResults: !totalRecords
  }
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
 * Entry point for AddressSearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export function handleAddressSearch(data) {
  return async dispatch => {
    const taskData = {
      address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskData));
    await dispatch(searchAddresses(taskData.address));
  }
}

/**
 * Entry point for QuoteSearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export function handleQuoteSearch(data) {
  return async dispatch => {
    const taskData = {
      firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
      lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
      address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
      zip: (encodeURIComponent(data.zip) !== 'undefined' ? encodeURIComponent(data.zip) : ''),
      quoteNumber: (encodeURIComponent(data.quoteNumber) !== 'undefined' ? encodeURIComponent(data.quoteNumber) : ''),
      policyNumber: (encodeURIComponent(data.policyNumber) !== 'undefined' ? encodeURIComponent(data.policyNumber) : ''),
      quoteState: (encodeURIComponent(data.quoteState) !== 'undefined' ? encodeURIComponent(data.quoteState) : ''),
      currentPage: setPageNumber(data.currentPage, data.isNext),
      companyCode: DEFAULT_SEARCH_PARAMS.companyCode,
      state: DEFAULT_SEARCH_PARAMS.state,
      sort: 'quoteNumber',
      sortDirection: 'desc',
      pageSize: RESULTS_PAGE_SIZE
    };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskData));
      await dispatch(searchQuotes(taskData));
    } catch (err) {
      console.error(err);
    }
  }
}

/**
 * Entry point for PolicySearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export function handlePolicySearch(data) {
  return async dispatch => {
    const taskData = {
      firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
      lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
      address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
      policyNumber: (encodeURIComponent(data.policyNumber) !== 'undefined' ? encodeURIComponent(data.policyNumber) : ''),
      policyStatus: (encodeURIComponent(data.policyStatus) !== 'undefined' ? encodeURIComponent(data.policyStatus) : ''),
      agencyCode: (encodeURIComponent(data.agencyCode) !== 'undefined' ? encodeURIComponent(data.agencyCode) : ''),
      effectiveDate: (encodeURIComponent(data.effectiveDate) !== 'undefined' ? encodeURIComponent(moment(data.effectiveDate).utc().format(SECONDARY_DATE_FORMAT)) : ''),
      currentPage: setPageNumber(data.currentPage, data.isNext),
      sortBy: data.sortBy,
      sortDirection: data.sortBy === 'policyNumber' ? 'desc' : 'asc',
      resultStart: 60,
      pageSize: RESULTS_PAGE_SIZE,
      companyCode: 'TTIC',
      state: 'FL'
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskData));
    await dispatch(searchPolicies(taskData));
  }
}

/**
 * Entry point for AgentSearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export function handleAgentSearch(data) {
  return dispatch => {
    const taskData = {
      agentCode: (encodeURIComponent(data.agentCode) !== 'undefined' ? encodeURIComponent(data.agentCode) : ''),
      firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
      lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
      address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
      licenseNumber: (encodeURIComponent(data.licenseNumber) !== 'undefined' ? encodeURIComponent(data.licenseNumber) : ''),
      companyCode: DEFAULT_SEARCH_PARAMS.companyCode,
      state: DEFAULT_SEARCH_PARAMS.state,
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskData));
    dispatch(searchAgents(taskData));
  }
}

/**
 * Entry point for AgencySearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export function handleAgencySearch(data) {
  return dispatch => {

    const taskData = {
      agencyCode: (encodeURIComponent(data.agencyCode) !== 'undefined' ? encodeURIComponent(data.agencyCode) : ''),
      displayName: (encodeURIComponent(data.displayName) !== 'undefined' ? encodeURIComponent(data.displayName) : ''),
      address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
      licenseNumber: (encodeURIComponent(data.licenseNumber) !== 'undefined' ? encodeURIComponent(data.licenseNumber) : ''),
      fein: (encodeURIComponent(data.fein) !== 'undefined' ? encodeURIComponent(data.fein) : ''),
      phone: (encodeURIComponent(data.phone) !== 'undefined' ? encodeURIComponent(data.phone) : ''),
      companyCode: DEFAULT_SEARCH_PARAMS.companyCode,
      state: DEFAULT_SEARCH_PARAMS.state
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskData));
    dispatch(searchAgencies(taskData));
  }
}

/**
 * Main submit handler for Search. Determine which type of search is being requested and kick it off
 * @param {object} data - form data
 * @param {object} props - props passed to search form at time of search
 * @returns {Function}
 */
export function handleSearchSubmit(data, props) {
  return async dispatch => {
    const { searchType } = props;

    dispatch(toggleLoading(true));

    if (searchType === SEARCH_TYPES.newQuote) {
      await dispatch(handleAddressSearch(data));
    }
    if (searchType === SEARCH_TYPES.quote) {
      await dispatch(handleQuoteSearch(data));
    }
    if (searchType === SEARCH_TYPES.policy) {
      await dispatch(handlePolicySearch(data));
    }
    if (searchType === SEARCH_TYPES.agent) {
      await dispatch(handleAgentSearch(data));
    }
    if (searchType === SEARCH_TYPES.agency) {
      await dispatch(handleAgencySearch(data));
    }

    dispatch(toggleLoading(false));
  }
}


