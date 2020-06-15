import React, { useEffect, useState } from 'react';
import { Loader } from '@exzeo/core-ui';

import { SEARCH_CONFIG, SEARCH_TYPES } from '../../constants/search';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import AddressSearch from './Address';
import PolicySearch from './Policy';
import QuoteSearch from './Quote';
import AgencySearch from './Agency';
import AgentSearch from './Agent';
import UserSearch from './User';
import DiariesSearch from './Diaries';
import { handleSearchSubmit } from './data';

const initialSearchResults = {
  currentPage: 1,
  loading: false,
  noResults: false,
  pageSize: 0,
  companyCode: '',
  state: '',
  product: '',
  results: [],
  sortBy: '',
  sortDirection: '',
  totalPages: 0,
  totalRecords: 0
};

const SEARCH_FORMS = {
  [SEARCH_TYPES.newQuote]: AddressSearch,
  [SEARCH_TYPES.policy]: PolicySearch,
  [SEARCH_TYPES.quote]: QuoteSearch,
  [SEARCH_TYPES.agent]: AgentSearch,
  [SEARCH_TYPES.agency]: AgencySearch,
  [SEARCH_TYPES.user]: UserSearch,
  [SEARCH_TYPES.diaries]: DiariesSearch
};

export const SearchPage = ({
  pathName,
  userProfile,
  children,
  errorHandler
}) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchType, setSearchType] = useState(SEARCH_TYPES.policy);
  const [searchConfig, setSearchConfig] = useState(SEARCH_TYPES.policy);
  const [searchReady, setSearchReady] = useState(false);
  const [searchResults, setSearchResults] = useState(initialSearchResults);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (pathName === '/') {
      setConfig(SEARCH_TYPES.policy);
    } else if (pathName === '/agency') {
      setConfig(SEARCH_TYPES.agency);
    } else if (pathName === '/diaries') {
      setConfig(SEARCH_TYPES.diaries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  const setConfig = searchType => {
    setSearchType(searchType);
    setSearchConfig(searchType);
    setSearchReady(true);
  };

  const changeSearchType = searchType => {
    setSearchType(searchType);
    setSearchConfig(searchType);
    setHasSearched(false);
    setSearchResults(initialSearchResults);
    setShowLoader(false);
  };

  const resetResults = () => {
    setSearchResults(initialSearchResults);
  };

  const setInitialValues = (searchType, searchConfig) => {
    const initialValues = SEARCH_CONFIG[searchConfig].initialValues;

    return searchType === SEARCH_TYPES.diaries
      ? {
          ...initialValues,
          assignees: [
            {
              answer: userProfile?.userId,
              label: `${userProfile?.profile.given_name} ${userProfile?.profile?.family_name}`,
              type: 'user'
            }
          ]
        }
      : initialValues;
  };

  const handleSubmit = async data => {
    try {
      setShowLoader(true);
      const searchResults = await handleSearchSubmit(data, searchType);
      setSearchResults(searchResults ? searchResults : initialSearchResults);
      setHasSearched(true);
      setShowLoader(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const SearchForm = SEARCH_FORMS[searchType];

  return (
    <React.Fragment>
      {showLoader && <Loader />}

      <div className="search">
        {searchReady && (
          <SearchBar
            changeSearchType={changeSearchType}
            initialValues={setInitialValues(searchType, searchConfig)}
            onSubmitSuccess={() => setHasSearched(true)}
            searchType={searchType}
            handleSearchSubmit={handleSubmit}
            currentPage={searchResults.currentPage}
            resetResults={resetResults}
            render={({
              handlePagination,
              formValues,
              initialValues,
              resetFormResults
            }) => (
              <SearchForm
                formValues={formValues}
                searchResults={searchResults}
                userProfile={userProfile}
                searchTypeOptions={SEARCH_CONFIG[searchConfig].searchOptions}
                handlePagination={handlePagination}
                hasSearched={hasSearched}
                initialValues={initialValues}
                handleSubmit={handleSubmit}
                resetFormResults={resetFormResults}
              />
            )}
          />
        )}
      </div>
      <main role="document">
        <div className="content-wrapper">
          <div className="dashboard" role="article">
            <div className="route">
              <div className="search route-content">
                <div className="survey-wrapper scroll">
                  <SearchResults
                    hasSearched={hasSearched}
                    searchType={searchType}
                    search={searchResults}
                  />
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default SearchPage;
