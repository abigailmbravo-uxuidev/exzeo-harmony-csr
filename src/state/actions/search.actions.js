import { date } from '@exzeo/core-ui';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { searchData } from '@exzeo/core-ui/src/@Harmony';

import { sortDiariesByDate } from '../../utilities/diaries';
import { SECONDARY_DATE_FORMAT } from '../../constants/dates';
import { RESULTS_PAGE_SIZE, SEARCH_TYPES } from '../../constants/search';

import * as types from './actionTypes';
import * as errorActions from './error.actions';

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
 * Build query string and encodeURI
 * @param firstName
 * @param lastName
 * @param mailingAddress
 * @param propertyAddress
 * @param companyCode
 * @param state
 * @param product
 * @param effectiveDate
 * @param policyNumber
 * @param quoteNumber
 * @param status
 * @param quoteState
 * @param page
 * @param pageSize
 * @param sort
 * @param sortDirection
 * @param agencyCode
 * @param agentCode
 * @param licenseNumber
 * @param displayName
 * @param taxIdNumber
 * @param primaryPhoneNumber,
 * @returns {string} querystring
 */
function buildQuerystring({
  firstName,
  lastName,
  mailingAddress,
  propertyAddress,
  effectiveDate,
  policyNumber,
  quoteNumber,
  status,
  quoteState,
  page,
  pageSize,
  sort,
  sortDirection,
  companyCode,
  state,
  product,
  agencyCode,
  agentCode,
  licenseNumber,
  displayName,
  taxIdNumber,
  primaryPhoneNumber
}) {
  const fields = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(mailingAddress && { mailingAddress }),
    ...(propertyAddress && { propertyAddress }),
    ...(effectiveDate && { effectiveDate }),
    ...(policyNumber && { policyNumber }),
    ...(quoteNumber && { quoteNumber }),
    ...(status && { status }),
    ...(quoteState && { quoteState }),
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(sort && { sort }),
    ...(sortDirection && { sortDirection }),
    ...(companyCode && { companyCode }),
    ...(state && { state }),
    ...(product && { product }),
    ...(agencyCode && { agencyCode }),
    ...(agentCode && { agentCode }),
    ...(licenseNumber && { licenseNumber }),
    ...(displayName && { displayName }),
    ...(taxIdNumber && { taxIdNumber }),
    ...(primaryPhoneNumber && { primaryPhoneNumber })
  };

  return encodeURI(
    Object.keys(fields)
      .map(key => `${key}=${fields[key]}`)
      .join('&')
  );
}

/**
 * Call quote search service
 * @param {object} query
 * @returns {Promise<{}>}
 */
export async function fetchQuotes(query) {
  const querystring = buildQuerystring(query);
  const config = {
    service: 'quote-data',
    method: 'GET',
    path: `/quotes?${querystring}`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchQuotes');
    return response && response.data && response.data.result
      ? response.data.result
      : {};
  } catch (error) {
    throw error;
  }
}

/**
 * Call policy search service
 * @param {object} query
 * @returns {Promise<{}>}
 */
export async function fetchPolicies(query) {
  const queryString = buildQuerystring(query);
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `/transactions?${queryString}`
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
 * @param {object} query
 * @param {string} query.companyCode
 * @param {string} query.state
 * @param {string} query.firstName
 * @param {string} query.lastName
 * @param {string} query.agentCode
 * @param {string} v.address
 * @param {string} query.licenseNumber
 * @returns {Promise<{}>}
 */
export async function fetchAgents(query) {
  const queryString = buildQuerystring(query);
  const config = {
    service: 'agency',
    method: 'GET',
    path: `agents?${queryString}`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchAgents');
    return response && response.data && response.data.result
      ? response.data.result
      : [];
  } catch (error) {
    throw error;
  }
}

/**
 * Build query string and call agency service to search agencies
 * @param {object} query
 * @param {string} query.companyCode
 * @param {string} query.state
 * @param {string} query.displayName
 * @param {string} query.agencyCode
 * @param {string} query.address
 * @param {string} query.licenseNumber
 * @param {string} query.fein
 * @param {string} query.phone
 * @returns {Promise<{}>}
 */
export async function fetchAgencies(query) {
  const queryString = buildQuerystring(query);
  const config = {
    service: 'agency',
    method: 'GET',
    path: `agencies?${queryString}`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchAgencies');
    return response && response.data && response.data.result
      ? response.data.result
      : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param reason
 * @param dueDateMin
 * @param dueDateMax
 * @param assignees
 * @param open
 * @param product
 * @returns {Promise<void>}
 */
export async function fetchDiaries({
  reason,
  dueDateMin,
  dueDateMax,
  assignees,
  open,
  product
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
      reason,
      product
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
 * @param currentPage
 * @param isNext
 * @returns {string|*|number}
 */
function setPageNumber(currentPage, isNext) {
  if (typeof isNext === 'undefined') {
    return currentPage || 1;
  }
  return isNext ? String(currentPage + 1) : String(currentPage - 1);
}

/**
 *
 * @param currentPage
 * @param pageSize
 * @param sortBy
 * @param sortDirection
 * @param results
 * @param totalRecords
 * @param noResults
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
function formatSearchResults({
  currentPage = 1,
  pageSize = 0,
  sortBy = '',
  sortDirection = '',
  results = [],
  totalRecords = 0,
  noResults = true
}) {
  return {
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
 *
 * @param results
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
function formatAddressResults(results) {
  return formatSearchResults({
    results: results.IndexResult,
    totalRecords: results.TotalCount,
    noResults: !results.TotalCount
  });
}

/**
 *
 * @param results
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
function formatQuoteResults(results) {
  return formatSearchResults({
    currentPage: results.currentPage,
    pageSize: results.pageSize,
    sortBy: results.sort,
    sortDirection: results.sortDirection === -1 ? 'desc' : 'asc',
    results: results.quotes,
    totalRecords: results.totalNumberOfRecords,
    noResults: !results.totalNumberOfRecords
  });
}

/**
 *
 * @param results
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
function formatPolicyResults(results) {
  return formatSearchResults({
    currentPage: results.currentPage || 0,
    pageSize: results.pageSize || 0,
    sortBy: results.sort || '',
    sortDirection: results.sortDirection,
    results: results.policies,
    totalRecords: results.totalNumberOfRecords,
    noResults: !results.totalNumberOfRecords
  });
}

/**
 *
 * @param results
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
function formatAgentResults(results) {
  const totalRecords = Array.isArray(results) ? results.length : 0;
  return formatSearchResults({
    results,
    totalRecords,
    noResults: !totalRecords
  });
}

/**
 *
 * @param results
 * @returns {{sortDirection: string, totalRecords: number, noResults: boolean, pageSize: number, sortBy: string, currentPage: number, results: Array}}
 */
function formatAgencyResults(results) {
  const totalRecords = Array.isArray(results) ? results.length : 0;
  return formatSearchResults({
    results,
    totalRecords,
    noResults: !totalRecords
  });
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

/**
 * Entry point for AddressSearch form
 * @param {Object} data - form data
 * @param {string} data.address
 * @param {string} data.state
 * @returns {Function}
 */
export async function handleAddressSearch({ address, state }) {
  try {
    const results = await searchData.searchAddress({ address, state });
    return formatAddressResults(results);
  } catch (error) {
    throw error;
  }
}

/**
 * Entry point for QuoteSearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export async function handleQuoteSearch(data) {
  try {
    const searchQuery = {
      ...data,
      propertyAddress:
        data.address && data.address !== 'undefined'
          ? String(data.address)
              .replace(/\./g, '')
              .trim()
          : '',
      effectiveDate:
        data.effectiveDate &&
        date.formatDate(data.effectiveDate, SECONDARY_DATE_FORMAT),
      page: setPageNumber(data.currentPage, data.isNext),
      pageSize: RESULTS_PAGE_SIZE,
      sort: data.sortBy ? data.sortBy : 'quoteNumber',
      sortDirection: data.sortBy === 'quoteNumber' ? 'desc' : 'asc'
    };

    const results = await fetchQuotes(searchQuery);
    return formatQuoteResults(results);
  } catch (error) {
    throw error;
  }
}

/**
 * Entry point for PolicySearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export async function handlePolicySearch(data) {
  try {
    const searchQuery = {
      ...data,
      propertyAddress:
        data.address && data.address !== 'undefined'
          ? String(data.address)
              .replace(/\./g, '')
              .trim()
          : '',
      status: data.policyStatus,
      effectiveDate:
        data.effectiveDate &&
        date.formatDate(data.effectiveDate, SECONDARY_DATE_FORMAT),
      page: setPageNumber(data.currentPage, data.isNext),
      pageSize: RESULTS_PAGE_SIZE,
      sort: data.sortBy,
      sortDirection: data.sortBy === 'policyNumber' ? 'desc' : 'asc'
    };

    const results = await fetchPolicies(searchQuery);
    return formatPolicyResults(results);
  } catch (error) {
    throw error;
  }
}

/**
 * Entry point for AgentSearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export async function handleAgentSearch(data) {
  try {
    const searchQuery = {
      companyCode: data.companyCode,
      state: data.state,
      firstName: data.firstName,
      lastName: data.lastName,
      agentCode: data.agentCode,
      mailingAddress: String(data.address ?? '').trim(),
      licenseNumber: data.licenseNumber
    };

    const results = await fetchAgents(searchQuery);
    return formatAgentResults(results);
  } catch (error) {
    throw error;
  }
}

/**
 * Entry point for AgencySearch form
 * @param {object} data - form data
 * @returns {Function}
 */
export async function handleAgencySearch(data) {
  try {
    const searchQuery = {
      companyCode: data.companyCode,
      state: data.state,
      displayName: data.displayName,
      agencyCode: data.agencyCode,
      mailingAddress: String(data.address ?? '').trim(),
      licenseNumber: data.licenseNumber,
      taxIdNumber: data.fein,
      primaryPhoneNumber: data.phone
    };

    const results = await fetchAgencies(searchQuery);
    return formatAgencyResults(results);
  } catch (error) {
    throw error;
  }
}

/**
 * Entry point for DiarySearch form
 * @param data
 * @returns {Function}
 */
export async function handleDiariesSearch(data) {
  try {
    const searchQuery = {
      open: data.open === 'true',
      assignees: (data.assignees || []).map(a => a.answer),
      reason: data.reason,
      dueDateMin: data.dateRange.min,
      dueDateMax: data.dateRange.max,
      product: data.product
    };

    const results = await fetchDiaries(searchQuery);
    return formatDiaryResults(results);
  } catch (error) {
    throw error;
  }
}

/**
 * Main submit handler for Search. Determine which type of search is being requested and kick it off
 * @param {object} data - form data
 * @param {object} searchType
 * @returns {Function}
 */
export function handleSearchSubmit(data, searchType) {
  return async dispatch => {
    try {
      dispatch(toggleLoading(true));
      let searchResults = {};

      if (searchType === SEARCH_TYPES.newQuote) {
        searchResults = await handleAddressSearch(data);
      }
      if (searchType === SEARCH_TYPES.quote) {
        searchResults = await handleQuoteSearch(data);
      }
      if (searchType === SEARCH_TYPES.policy) {
        searchResults = await handlePolicySearch(data);
      }
      if (searchType === SEARCH_TYPES.agent) {
        searchResults = await handleAgentSearch(data);
      }
      if (searchType === SEARCH_TYPES.agency) {
        searchResults = await handleAgencySearch(data);
      }
      if (searchType === SEARCH_TYPES.diaries) {
        searchResults = await handleDiariesSearch(data);
      }
      searchResults.companyCode = data.companyCode;
      searchResults.state = data.state;
      searchResults.product = data.product;
      // Setting search results in redux for backwards compat with other search types/features - will be removed  when search is refactored into core-ui
      dispatch(setSearchResults(searchResults));
      return searchResults;
    } catch (error) {
      console.error(error);
      // 'error' is undefined if we catch here. Making a custom message to handle.
      dispatch(
        errorActions.setAppError(error || { message: 'An error has occurred' })
      );
      return null;
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}
