import { date } from '@exzeo/core-ui';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { searchData } from '@exzeo/core-ui/src/@Harmony';

import { sortDiariesByDate } from '../../utilities/diaries';
import { SECONDARY_DATE_FORMAT } from '../../constants/dates';
import { RESULTS_PAGE_SIZE, SEARCH_TYPES } from '../../constants/search';

import * as types from './actionTypes';
import * as errorActions from './error.actions';

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
 * Main submit handler for Search. Determine which type of search is being requested and kick it off
 * @param {object} data - form data
 * @param {object} searchType
 * @returns {Function}
 */
export function handleSearchSubmit(data, searchType) {
  return async dispatch => {
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
    }
  };
}
