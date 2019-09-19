import { date } from '@exzeo/core-ui';
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
 * @param propertyAddress
 * @param companyCode
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

// TODO the 'fetch*' methods below are being moved to core-ui to be shared amongst the UI apps
/**
 * Build query string and call address search service
 * @param {string} query
 * @returns {Promise<{}>}
 */
export async function fetchAddresses(query) {
  const config = {
    service: 'property-search',
    method: 'GET',
    path: `/v1/search/${query}/1/10`
  };

  try {
    const response = await serviceRunner.callService(config, 'fetchAddresses');
    return response && response.data && response.data.result
      ? response.data.result
      : {};
  } catch (error) {
    throw error;
  }
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
 * Call agency service
 * @param {object} query
 * @returns {Promise<{}>}
 */
export async function fetchAgents(query) {
  const querystring = buildQuerystring(query);
  const config = {
    service: 'agency',
    method: 'GET',
    path: `agents?${querystring}`
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
 * Call agency service
 * @param {object} query
 * @returns {Promise<{}>}
 */
export async function fetchAgencies(query) {
  const querystring = buildQuerystring(query);
  const config = {
    service: 'agency',
    method: 'GET',
    path: `agencies?${querystring}`
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
 * Format value to put in URI for request.
 * @param value
 * @param sub
 * @returns {string}
 */
function formatForURI(value, sub = '') {
  const encodedVal = encodeURIComponent(value);
  return encodedVal !== 'undefined' ? encodedVal : sub;
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
 * @param {object} data - form data
 * @returns {Function}
 */
export async function handleAddressSearch(data) {
  const { company, product, state, address } = data;
  try {
    const query = formatForURI(`${String(address).trim()}, ${state}`);

    const results = await fetchAddresses(query);
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
      page: setPageNumber(data.currentPage, data.isNext),
      pageSize: RESULTS_PAGE_SIZE,
      sort: 'quoteNumber',
      sortDirection: 'desc'
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
      effectiveDate: date.formatDate(data.effectiveDate, SECONDARY_DATE_FORMAT),
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
      companyCode: DEFAULT_SEARCH_PARAMS.companyCode,
      state: DEFAULT_SEARCH_PARAMS.state,
      firstName: formatForURI(data.firstName),
      lastName: formatForURI(data.lastName),
      agentCode: formatForURI(data.agentCode),
      address: formatForURI(String(data.address).trim()),
      licenseNumber: formatForURI(data.licenseNumber)
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
      companyCode: DEFAULT_SEARCH_PARAMS.companyCode,
      state: DEFAULT_SEARCH_PARAMS.state,
      displayName: formatForURI(data.displayName),
      agencyCode: formatForURI(data.agencyCode),
      mailingAddress: formatForURI(String(data.address).trim()),
      licenseNumber: formatForURI(data.licenseNumber),
      taxIdNumber: formatForURI(data.fein),
      primaryPhoneNumber: formatForURI(data.phone)
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
      assignees: data.assignees.map(a => a.answer),
      reason: data.reason,
      dueDateMin: data.dateRange.min,
      dueDateMax: data.dateRange.max
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
 * @param {object} props - props passed to search form at time of search
 * @returns {Function}
 */
export function handleSearchSubmit(data, props) {
  return async dispatch => {
    try {
      dispatch(toggleLoading(true));
      const { searchType } = props;
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
    } finally {
      dispatch(toggleLoading(false));
    }
  };
}
