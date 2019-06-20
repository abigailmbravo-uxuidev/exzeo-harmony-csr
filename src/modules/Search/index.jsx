import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SEARCH_CONFIG, SEARCH_TYPES } from '../../constants/search';
import { resetSearch } from '../../state/actions/search.actions';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import AddressSearch from './Address';
import PolicySearch from './Policy';
import QuoteSearch from './Quote';
import AgencySearch from './Agency';
import AgentSearch from './Agent';
import UserSearch from './User';
import DiariesSearch from './Diaries';

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
    searchReady: false
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
      advancedSearch: false
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

  render() {
    const {
      advancedSearch,
      hasSearched,
      searchConfig,
      searchReady,
      searchType
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
              render={({ changeSearchType, handlePagination, formProps }) => (
                <SearchForm
                  advancedSearch={advancedSearch}
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

const mapStateToProps = state => {
  return {
    userProfile: state.authState.userProfile
  };
};

export default connect(
  mapStateToProps,
  { resetSearch }
)(SearchPage);
