import * as types from './actionTypes';
import * as serviceRunner from '../utilities/serviceRunner';
import * as errorActions from './errorActions';

export const setSearch = data => ({
  type: types.SEARCH,
  search: {
    ...data
  }
});

export function setSearchResults(searchResults) {
  return {
    type: types.SET_SEARCH_RESULTS,
    searchResults
  };
}

export async function fetchQuotes({
  quoteNumber, lastName, firstName, address, pageNumber, pageSize, sort, sortDirection, quoteState
}) {
  const config = {
    service: 'quote-data',
    method: 'GET',
    path: `/quotes?companyCode=TTIC&state=FL&product=HO3&quoteNumber=${quoteNumber}&lastName=${lastName}&firstName=${firstName}&propertyAddress=${address}&page=${pageNumber}&pageSize=${pageSize}&sort=${sort}&sortDirection=${sortDirection}&quoteState=${quoteState.replace(' ', '%20')}`
  };

  try {
    const response = await serviceRunner.callService(config);
    return response && response.data && response.data.result ? response.data.result.quotes : [];
  } catch (error) {
    throw error;
  }
}

export async function fetchAddresses(address) {
  const config = {
    service: 'property-search',
    method: 'GET',
    path: `/v1/search/${address.replace(' ', '&#32;')}/1/10`
  };

  try {
    const response = await serviceRunner.callService(config);
    return response && response.data && response.data.result ? response.data.result.IndexResult : [];
  } catch (error) {
    throw error;
  }
}

export async function fetchPolicies({
  policyNumber, lastName, firstName, address, pageNumber, pageSize, sortBy, resultStart, effectiveDate, agencyCode, policyStatus
}) {
  const formattedAddress = address ? address.replace(' ', '&#32;') : '';
  const sortDirection = sortBy === 'policyNumber' ? 'desc' : 'asc';
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `/transactions?companyCode=TTIC&state=FL&product=HO3&policyNumber=${policyNumber}&firstName=${firstName}&lastName=${lastName}&propertyAddress=${formattedAddress}&page=${pageNumber}&pageSize=${pageSize}&resultStart=${resultStart}&sort=${sortBy}&sortDirection=${sortDirection}&effectiveDate=${effectiveDate}&agencyCode=${agencyCode}&status=${policyStatus}`
  };

  try {
    const response = await serviceRunner.callService(config);
    return response && response.data ? response.data.policies : [];
  } catch (error) {
    throw error;
  }
}

export function searchQuotes(quoteSearchData) {
  return async (dispatch) => {
    try {
      const quotes = await fetchQuotes(quoteSearchData);
      dispatch(setSearchResults(quotes));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

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

export function searchPolicies(policySearchData) {
  return async (dispatch) => {
    try {
      const policies = await fetchPolicies(policySearchData);
      dispatch(setSearchResults(policies));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  };
}

