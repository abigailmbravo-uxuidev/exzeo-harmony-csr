import * as types from './actionTypes';
import * as serviceRunner from '../utilities/serviceRunner';
import * as errorActions from './errorActions';
import moment from "moment/moment";

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
 * @param address
 * @returns {Function}
 */
export function searchAddresses(address) {
  return async (dispatch) => {
    try {
      const addresses = await fetchAddresses(address);
      dispatch(setSearchResults(addresses));
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
 * @param quoteNumber
 * @param lastName
 * @param firstName
 * @param address
 * @param currentPage
 * @param pageSize
 * @param sort
 * @param sortDirection
 * @param quoteState
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
 * @param address
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
 * @param policyNumber
 * @param lastName
 * @param firstName
 * @param address
 * @param currentPage
 * @param pageSize
 * @param sortBy
 * @param resultStart
 * @param effectiveDate
 * @param agencyCode
 * @param policyStatus
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
 * @param results
 * @returns {{currentPage: number, pageSize: (number|string), sortBy: *, sortDirection: (string), results: *, totalRecords: number}}
 */
function formatQuoteResults(results) {
  return {
    currentPage: results.currentPage,
    pageSize: results.pageSize,
    sortBy: results.sort,
    sortDirection: results.sortDirection,
    results: results.quotes,
    totalRecords: results.totalNumberOfRecords
  }
}

/**
 *
 * @param results
 * @returns {{currentPage: number, pageSize: (number|string), sortBy: *, sortDirection: (string), results: (policies|{policyTerm, updatedAt, policyHolders, state, companyCode, policyNumber, policyID, effectiveDate, property, product}|Array), totalRecords: number}}
 */
function formatPolicyResults(results) {
  return {
    currentPage: results.currentPage,
    pageSize: results.pageSize,
    sortBy: results.sort,
    sortDirection: results.sortDirection,
    results: results.policies,
    totalRecords: results.totalNumberOfRecords,
  }
}

const PAGE_SIZE = 25;
export function setPageNumber(currentPage, isNext) {
  if (typeof isNext === 'undefined') {
    return currentPage || 1;
  }
  return isNext ? String(currentPage + 1) : String(currentPage - 1);
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
      quoteNumber: (encodeURIComponent(data.quoteNumber) !== 'undefined' ? encodeURIComponent(data.quoteNumber) : ''),
      policyNumber: (encodeURIComponent(data.policyNumber) !== 'undefined' ? encodeURIComponent(data.policyNumber) : ''),
      zip: (encodeURIComponent(data.zip) !== 'undefined' ? encodeURIComponent(data.zip) : ''),
      quoteState: (encodeURIComponent(data.quoteState) !== 'undefined' ? encodeURIComponent(data.quoteState) : ''),
      currentPage: setPageNumber(data.currentPage, data.isNext),
      sort: 'quoteNumber',
      sortDirection: 'desc'
    };
    try {
      localStorage.setItem('lastSearchData', JSON.stringify(taskData));
      await dispatch(searchQuotes(data));
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
export function handleSearchSubmit(data, props) {
  return async dispatch => {
    const { searchType } = props;

    dispatch(toggleLoading(true));
    if (searchType === 'agency' || searchType === 'agent') {
      await dispatch(handleAgencySearch(data, props));
    } else

    if (searchType === 'policy') {
      await dispatch(handlePolicySearch(data, props));
    }

    if (searchType === 'quote') {
      await dispatch(handleQuoteSearch(data, props));
    }

    if (searchType === 'address') {
      await dispatch(handleAddressSearch(data, props));
    }
    dispatch(toggleLoading(false));

  }
}

/**
 *
 * @param data
 * @param props
 * @returns {Promise<void>}
 */
export async function handleAgencySearch(data, props) {
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
    searchType: props.searchType
  };

  if (props.searchType === 'agency') {
    props.setAppState(props.appState.modelName, '', {
      ...props.appState.data,
      agentSubmitting: true
    });

    await props.searchAgencies(
      'TTIC', 'FL', agencyAgentData.displayName,
      agencyAgentData.agencyCode, agencyAgentData.address, agencyAgentData.licNumber,
      agencyAgentData.fein, agencyAgentData.phone
    );
      props.setAppState(props.appState.modelName, '', {...props.appState.data, agentSubmitting: false});
  }

  if (props.searchType === 'agent') {
    props.setAppState(props.appState.modelName, '', {
      ...props.appState.data,
      agentSubmitting: true
    });

    await props.searchAgents(
      'TTIC', 'FL', agencyAgentData.firstName, agencyAgentData.lastName,
      agencyAgentData.agentCode, agencyAgentData.address, agencyAgentData.licNumber
      );

    props.setAppState(props.appState.modelName, '', { ...props.appState.data, agentSubmitting: false });

    localStorage.setItem('lastSearchData', JSON.stringify(agencyAgentData));
    props.setSearch(agencyAgentData);
  }
}


