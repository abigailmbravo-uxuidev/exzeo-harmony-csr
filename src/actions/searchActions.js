import * as types from './actionTypes';
import * as serviceRunner from '../utilities/serviceRunner';
import * as errorActions from './errorActions';
import moment from "moment/moment";
import _ from "lodash";

/**
 *
 * @param loading
 * @returns {{type: string, loading: *}}
 */
export const toggleLoading = (loading) => {
  return {
    type: types.TOGGLE_LOADING,
    loading
  }
};

/**
 *
 * @param data
 * @returns {{type: string, search: {}}}
 */
export const setSearch = data => ({
  type: types.SEARCH,
  search: {
    ...data
  }
});

/**
 *
 * @returns {{type: string}}
 */
export function resetSearch() {
  return {
    type: types.RESET_SEARCH
  }
}

/**
 * Set data from search request into state
 * @param {object} searchResults - formatted search results object
 * @returns {{type: string, currentPage: *, pageSize: *, sortBy: *, sortDirection: *, results: *, totalRecords: *}}
 */
export function setSearchResults({ currentPage, pageSize, sortBy, sortDirection, results, totalRecords }) {
  return {
    type: types.SET_SEARCH_RESULTS,
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    results,
    totalRecords
  };
}

/**
 *
 * @param address
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
 *
 * @param quoteSearchData
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
 *
 * @param policySearchData
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
 *
 * @param agentSearchData
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
 *
 * @param agentSearchData
 * @returns {Function}
 */
export function searchAgencies(agentSearchData) {
  return async (dispatch) => {
    try {
      const results = await fetchAgencies(agentSearchData);
      dispatch(setSearchResults(formatAgencyResults(results)));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}

/**
 *
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
 *
 * @param quoteData
 * @returns {Promise<Array>}
 */
export async function fetchQuotes({
  quoteNumber, lastName, firstName, address, currentPage, pageSize, sort, sortDirection, quoteState
}) {
  const config = {
    service: 'quote-data',
    method: 'GET',
    path: `/quotes?companyCode=TTIC&state=FL&product=HO3&quoteNumber=${quoteNumber}&lastName=${lastName}&firstName=${firstName}&propertyAddress=${address}&page=${currentPage}&pageSize=${pageSize}&sort=${sort}&sortDirection=${sortDirection}&quoteState=${quoteState.replace(' ', '%20')}`
  };

  try {
    const response = await serviceRunner.callService(config);
    return response && response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param policyData
 * @returns {Promise<*|Array>}
 */
export async function fetchPolicies({
  policyNumber, lastName, firstName, address, currentPage, pageSize, sortBy, resultStart, effectiveDate, agencyCode, policyStatus
}) {
  const formattedAddress = address ? address.replace(' ', '&#32;') : '';
  const sortDirection = sortBy === 'policyNumber' ? 'desc' : 'asc';
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `/transactions?companyCode=TTIC&state=FL&product=HO3&policyNumber=${policyNumber}&firstName=${firstName}&lastName=${lastName}&propertyAddress=${formattedAddress}&page=${currentPage}&pageSize=${pageSize}&resultStart=${resultStart}&sort=${sortBy}&sortDirection=${sortDirection}&effectiveDate=${effectiveDate}&agencyCode=${agencyCode}&status=${policyStatus}`
  };

  try {
    const response = await serviceRunner.callService(config);
    return response && response.data || [];
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {object} AgentData
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
 *
 * @param {object} AgencyData
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
 *
 * @param results
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
 *
 * @param results
 * @returns {{currentPage: (number|*), pageSize: (number|*|string), sortBy: *, sortDirection: string, results: *, totalRecords: number, noResults: boolean}}
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
 *
 * @param results
 * @returns {{currentPage: (number|*), pageSize: (number|*|string), sortBy: (*|string), sortDirection: (*|string|string), results: (policies|{policyTerm, updatedAt, policyHolders, state, companyCode, policyNumber, policyID, effectiveDate, property, product}|Array), totalRecords: number, noResults: boolean}}
 */
function formatPolicyResults(results) {
    const { policies } = results;
    const filteredPolicies = [];

    results.policies.forEach(policy => {
      const duplicatePolicies = policies.filter(p => p.policyNumber === policy.policyNumber);
      if (duplicatePolicies.length) {
        filteredPolicies.push(duplicatePolicies.sort((pa, pb) => pb.policyVersion - pa.policyVersion)[0])
      } else {
        filteredPolicies.push(policy);
      }
    });

    // for (let i = 0; i < policies.length; i += 1) {
    //   const currentPolicy = policies[i];
    //
    //   const selectedPolicies = _.filter(policies, policy => policy && policy.policyNumber === currentPolicy.policyNumber);
    //   if (!_.some(policyResults, p => p && p.policyNumber === currentPolicy.policyNumber) && selectedPolicies.length > 0) {
    //     policyResults.push(_.maxBy(selectedPolicies, 'policyVersion'));
    //   }
    // }

  return {
    currentPage: results.currentPage || 0,
    pageSize: results.pageSize || 0,
    sortBy: results.sort || '',
    sortDirection: results.sortDirection,
    results: filteredPolicies,
    totalRecords: results.totalNumberOfRecords,
    noResults: !results.totalNumberOfRecords
  }
}

/**
 *
 * @param results
 * @returns {{results: *, noResults: boolean}}
 */
function formatAgentResults(results) {
  return {
    results: results,
    noResults: !(Array.isArray(results) && results.length)
  }
}

/**
 *
 * @param results
 * @returns {{results: *, noResults: boolean}}
 */
function formatAgencyResults(results) {
  return {
    results: results,
    noResults: !(Array.isArray(results) && results.length)
  }
}

export function setPageNumber(currentPage, isNext) {
  if (typeof isNext === 'undefined') {
    return currentPage || 1;
  }
  return isNext ? String(currentPage + 1) : String(currentPage - 1);
}

const PAGE_SIZE = 25;

/**
 *
 * @param data
 * @param props
 * @returns {Function}
 */
export function handleAddressSearch(data, props) {
  return async dispatch => {
    const taskData = {
      address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    };

    localStorage.setItem('lastSearchData', JSON.stringify(taskData));
    await dispatch(searchAddresses(taskData.address));
  }
}

/**
 *
 * @param data
 * @param props
 * @returns {Function}
 */
export function handlePolicySearch(data, props) {
  return async dispatch => {
    const taskData = {
      firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
      lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
      address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
      policyNumber: (encodeURIComponent(data.policyNumber) !== 'undefined' ? encodeURIComponent(data.policyNumber) : ''),
      policyStatus: (encodeURIComponent(data.policyStatus) !== 'undefined' ? encodeURIComponent(data.policyStatus) : ''),
      agencyCode: (encodeURIComponent(data.agencyCode) !== 'undefined' ? encodeURIComponent(data.agencyCode) : ''),
      effectiveDate: (encodeURIComponent(data.effectiveDate) !== 'undefined' ? encodeURIComponent(moment(data.effectiveDate).utc().format('YYYY-MM-DD')) : ''),
      currentPage: setPageNumber(data.currentPage, data.isNext),
      sortBy: data.sortBy,
      resultStart: 60,
      pageSize: PAGE_SIZE,
    };

    localStorage.setItem('lastSearchData', JSON.stringify(taskData));
    await dispatch(searchPolicies(taskData));
  }
}

/**
 *
 * @param data
 * @param props
 * @returns {Function}
 */
export function handleQuoteSearch(data, props) {
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
      sort: 'quoteNumber',
      sortDirection: 'desc',
      pageSize: PAGE_SIZE
    };
    try {
      localStorage.setItem('lastSearchData', JSON.stringify(taskData));
      await dispatch(searchQuotes(taskData));
    } catch (err) {
      console.error(err);
    }
  }
}

/**
 *
 * @param data
 * @param props
 * @returns {Function}
 */
export function handleAgentSearch(data, props) {
  return dispatch => {

    const agencyAgentData = {
      agentCode: (encodeURIComponent(data.agentCode) !== 'undefined' ? encodeURIComponent(data.agentCode) : ''),
      firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
      lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
      address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
      licenseNumber: (encodeURIComponent(data.licenseNumber) !== 'undefined' ? encodeURIComponent(data.licenseNumber) : ''),
      companyCode: 'TTIC',
      state: 'FL',
    };

    localStorage.setItem('lastSearchData', JSON.stringify(agencyAgentData));
    dispatch(searchAgents(agencyAgentData));
  }
}

/**
 *
 * @param data
 * @param props
 * @returns {Function}
 */
export function handleAgencySearch(data, props) {
  return dispatch => {

    const agencyAgentData = {
      agencyCode: (encodeURIComponent(data.agencyCode) !== 'undefined' ? encodeURIComponent(data.agencyCode) : ''),
      displayName: (encodeURIComponent(data.displayName) !== 'undefined' ? encodeURIComponent(data.displayName) : ''),
      address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
      licenseNumber: (encodeURIComponent(data.licenseNumber) !== 'undefined' ? encodeURIComponent(data.licenseNumber) : ''),
      fein: (encodeURIComponent(data.fein) !== 'undefined' ? encodeURIComponent(data.fein) : ''),
      phone: (encodeURIComponent(data.phone) !== 'undefined' ? encodeURIComponent(data.phone) : ''),
      companyCode: 'TTIC',
      state: 'FL',
    };

    localStorage.setItem('lastSearchData', JSON.stringify(agencyAgentData));
    dispatch(searchAgencies(agencyAgentData));
  }
}

/**
 *
 * @param data
 * @param props
 * @returns {Function}
 */
export function handleSearchSubmit(data, props) {
  return async dispatch => {
    const { searchType } = props;

    dispatch(toggleLoading(true));

    if (searchType === 'address') {
      await dispatch(handleAddressSearch(data, props));
    }
    if (searchType === 'quote') {
      await dispatch(handleQuoteSearch(data, props));
    }
    if (searchType === 'policy') {
      await dispatch(handlePolicySearch(data, props));
    }
    if (searchType === 'agent') {
      await dispatch(handleAgentSearch(data, props));
    }
    if (searchType === 'agency') {
      await dispatch(handleAgencySearch(data, props));
    }

    dispatch(toggleLoading(false));

  }
}

