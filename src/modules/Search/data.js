import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { searchData } from '@exzeo/core-ui/src/@Harmony';
import { date } from '@exzeo/core-ui';
import { SECONDARY_DATE_FORMAT } from '../../constants/dates';
import { RESULTS_PAGE_SIZE, SEARCH_TYPES } from '../../constants/search';
import {
  buildAssigneesList,
  buildQuerystring,
  formatAddressResults,
  formatAgencyResults,
  formatAgentResults,
  formatDiaryResults,
  formatPolicyResults,
  formatQuoteResults,
  setPageNumber
} from './utilities';

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
 * @param {string} query.companyCode
 * @param {string} query.state
 * @param {string} query.firstName
 * @param {string} query.lastName
 * @param {string} query.agentCode
 * @param {string} query.address
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
 * @param {{companyCode: *, taxIdNumber: string, mailingAddress: string, displayName: *, licenseNumber: *, primaryPhoneNumber: (string|string|phone), state: *, agencyCode: *}} query
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
 *
 * @returns {Promise<*>}
 */
export async function fetchDiaryOptions() {
  try {
    const config = {
      service: 'diaries',
      method: 'GET',
      path: `diaryOptions`
    };

    const response = await serviceRunner.callService(
      config,
      'fetchDiaryOptions'
    );
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

export async function getDiaryAssigneeOptions(userProfile) {
  const { resources } = userProfile;
  const query = resources
    .filter(r => r.uri.includes('Diaries'))
    .reduce((acc, val) => `${acc},${val.uri}|${val.right}`, '');

  try {
    const config = {
      method: 'GET',
      service: 'security-manager-service',
      path: `/user?r=${query}`
    };
    const response = await serviceRunner.callService(
      config,
      'getDiaryAssigneeOptions'
    );
    const users =
      response.data && Array.isArray(response.data.result)
        ? response.data.result
        : [];

    return buildAssigneesList(users);
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param step
 * @returns {Promise<*>}
 */
export async function getUIQuestions(step) {
  try {
    const data = { step };
    const response = await serviceRunner.callQuestions(data);
    return response && response.data ? response.data.data : [];
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
export async function handleSearchSubmit(data, searchType) {
  try {
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
    searchResults.totalPages =
      Math.ceil(searchResults.totalRecords / RESULTS_PAGE_SIZE) || 0;

    // Setting search results in redux for backwards compat with other search types/features - will be removed  when search is refactored into core-ui
    return searchResults;
  } catch (error) {
    throw error;
  }
}
