import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SEARCH_CONFIG, SEARCH_TYPES } from '../../constants/search';
import { resetSearch } from "../../state/actions/searchActions";

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import AddressSearch from './Address/index';
import PolicySearch from './Policy/index';
import QuoteSearch from './Quote/index';
import AgencySearch from './Agency/index';
import AgentSearch from './Agent/index';
import UserSearch from './User/index';

const SEARCH_FORMS = {
  [SEARCH_TYPES.newQuote]: AddressSearch,
  [SEARCH_TYPES.policy]: PolicySearch,
  [SEARCH_TYPES.quote]: QuoteSearch,
  [SEARCH_TYPES.agent]: AgentSearch,
  [SEARCH_TYPES.agency]: AgencySearch,
  [SEARCH_TYPES.user]: UserSearch
};

class SearchPage extends Component {

  state = {
    advancedSearch: false,
    hasSearched: false,
    searchType: SEARCH_TYPES.policy,
    searchConfig: SEARCH_TYPES.policy
  };

  componentDidMount() {
    this.setSearchConfig();
  }

  componentWillUnmount() {
    this.props.resetSearch();
  }

  changeSearchType = (searchType) => {
    this.setState({ searchType, hasSearched: false });
    this.props.resetSearch();
  };

  setHasSearched = (hasSearched) => {
    this.setState({ hasSearched });
  };

  setSearchConfig = () => {
    const { pathName } = this.props;
    // determine which page we are on and setup correct search properties
    if (pathName === '/') {
      this.setState({ searchType: SEARCH_TYPES.policy, searchConfig: SEARCH_TYPES.policy });
    }
    if (pathName === '/agency') {
      this.setState({ searchType: SEARCH_TYPES.agency, searchConfig: SEARCH_TYPES.agency });
    }
  };

  toggleAdvancedSearch = () => {
    const { advancedSearch } = this.state;
    this.setState({ advancedSearch: !advancedSearch })
  };

  render() {
    const { advancedSearch, hasSearched, searchType, searchConfig } = this.state;

    const SearchForm = SEARCH_FORMS[searchType];

    return (
      <React.Fragment>
        <div className={advancedSearch ? 'policy-advanced search' : 'search'}>
          <SearchBar
            advancedSearch={advancedSearch}
            changeSearchType={this.changeSearchType}
            initialValues={SEARCH_CONFIG[searchConfig].initialValues}
            onSubmitSuccess={() => this.setHasSearched(true)}
            searchTypeOptions={SEARCH_CONFIG[searchConfig].searchOptions}
            searchType={searchType}
            render={({ submitting, handlePagination }) => (
              <SearchForm
                advancedSearch={advancedSearch}
                handlePagination={handlePagination}
                hasSearched={hasSearched}
                submitting={submitting}
                toggleAdvancedSearch={this.toggleAdvancedSearch}
              />
            )}
          />
        </div>
        <main role="document" className={advancedSearch ? 'policy-advanced' : ''}>
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

export default connect(null, { resetSearch })(SearchPage);
