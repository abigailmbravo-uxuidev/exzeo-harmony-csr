import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emptyArray, emptyObject } from '@exzeo/core-ui';

import { SEARCH_CONFIG, SEARCH_TYPES } from '../../constants/search';
import {
  resetSearch,
  handleSearchSubmit,
  toggleLoading
} from '../../state/actions/search.actions';
import { getAgencies } from '../../state/actions/service.actions';
import { clearAppError } from '../../state/actions/error.actions';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import AddressSearch from './Address';
import PolicySearch from './Policy';
import QuoteSearch from './Quote';
import AgencySearch from './Agency';
import AgentSearch from './Agent';
import UserSearch from './User';
import DiariesSearch from './Diaries';

const initialSearchResults = {
  currentPage: 1,
  loading: false,
  noResults: false,
  pageSize: 0,
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

export class SearchPage extends Component {
  state = {
    advancedSearch: false,
    hasSearched: false,
    searchType: SEARCH_TYPES.policy,
    searchConfig: SEARCH_TYPES.policy,
    searchReady: false,
    searchResults: initialSearchResults
  };

  componentDidMount() {
    this.setSearchConfig();
  }

  componentWillUnmount() {
    this.props.resetSearch();
  }

  setHasSearched = hasSearched => {
    this.setState({ hasSearched });
  };

  setSearchConfig = () => {
    const { pathName } = this.props;
    // determine which page we are on and setup correct search properties
    if (pathName === '/') {
      this.setState({
        searchType: SEARCH_TYPES.policy,
        searchConfig: SEARCH_TYPES.policy,
        searchReady: true
      });
    } else if (pathName === '/agency') {
      this.setState({
        searchType: SEARCH_TYPES.agency,
        searchConfig: SEARCH_TYPES.agency,
        searchReady: true
      });
    } else if (pathName === '/diaries') {
      this.setState({
        searchType: SEARCH_TYPES.diaries,
        searchConfig: SEARCH_TYPES.diaries,
        searchReady: true
      });
    }
  };

  changeSearchType = searchType => {
    this.setState({
      searchType,
      searchConfig: searchType,
      hasSearched: false,
      advancedSearch: false,
      searchResults: initialSearchResults
    });
    this.props.resetSearch();
  };

  toggleAdvancedSearch = () => {
    const { advancedSearch } = this.state;
    this.setState({ advancedSearch: !advancedSearch });
  };

  setInitialValues = (searchType, searchConfig) => {
    const { userProfile } = this.props;
    const initialValues = SEARCH_CONFIG[searchConfig].initialValues;

    return searchType === 'diaries'
      ? {
          ...initialValues,
          assignees: [
            {
              answer: userProfile.userId,
              label: `${userProfile.profile.given_name} ${userProfile.profile.family_name}`,
              type: 'user'
            }
          ]
        }
      : initialValues;
  };

  handleSubmit = async (data, dispatch, props) => {
    try {
      const { handleSearchSubmit } = this.props;
      const searchResults = await handleSearchSubmit(data, props);
      this.setState({ searchResults });
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Search error: ', error);
      }
    }
  };

  render() {
    const {
      agencies,
      clearAppError,
      getAgencies,
      toggleLoading,
      userProfile: {
        profile: { beta }
      }
    } = this.props;

    const {
      advancedSearch,
      hasSearched,
      searchConfig,
      searchReady,
      searchType,
      searchResults
    } = this.state;

    const SearchForm = SEARCH_FORMS[searchType];

    return (
      <React.Fragment>
        <div className={advancedSearch ? 'policy-advanced search' : 'search'}>
          {searchReady && (
            <SearchBar
              advancedSearch={advancedSearch}
              changeSearchType={this.changeSearchType}
              initialValues={this.setInitialValues(searchType, searchConfig)}
              onSubmitSuccess={() => this.setHasSearched(true)}
              searchType={searchType}
              clearAppError={clearAppError}
              getAgencies={getAgencies}
              agencies={agencies}
              handleSearchSubmit={this.handleSubmit}
              toggleLoading={toggleLoading}
              currentPage={searchResults.currentPage}
              render={({ changeSearchType, handlePagination, formProps }) => (
                <SearchForm
                  advancedSearch={advancedSearch}
                  beta={beta}
                  changeSearchType={changeSearchType}
                  searchTypeOptions={SEARCH_CONFIG[searchConfig].searchOptions}
                  handlePagination={handlePagination}
                  hasSearched={hasSearched}
                  toggleAdvancedSearch={this.toggleAdvancedSearch}
                  {...formProps}
                />
              )}
            />
          )}
        </div>
        <main
          role="document"
          className={advancedSearch ? 'policy-advanced' : ''}
        >
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

                    {this.props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

// TODO temp fix until Auth is updated
const stubProfile = { profile: {} };
const mapStateToProps = state => {
  return {
    userProfile: state.authState.userProfile || stubProfile,
    agencies: state.service.agencies || emptyArray
  };
};

export default connect(
  mapStateToProps,
  {
    clearAppError,
    getAgencies,
    handleSearchSubmit,
    resetSearch,
    toggleLoading
  }
)(SearchPage);
