import React, { Component } from 'react';
import { SEARCH_CONFIG, SEARCH_TYPES } from './constants';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import AddressSearch from './Address';
import PolicySearch from './Policy';
import QuoteSearch from './Quote';
import AgencySearch from './Agency';
import AgentSearch from './Agent';
import UserSearch from './User';

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
    searchType: SEARCH_TYPES.policy,
    searchConfig: SEARCH_TYPES.policy
  };

  componentDidMount() {
    this.setSearchConfig();
  }

  toggleAdvancedSearch = () => {
    const { advancedSearch } = this.state;
    this.setState({ advancedSearch: !advancedSearch })
  };

  changeSearchType = (searchType) => {
    this.setState({searchType});
  };

  setSearchConfig = () => {
    const { pathName } = this.props;
    if (pathName === '/') {
      this.setState({ searchType: SEARCH_TYPES.policy, searchConfig: SEARCH_TYPES.policy });
    }
    if (pathName === '/agency') {
      this.setState({ searchType: SEARCH_TYPES.agency, searchConfig: SEARCH_TYPES.agency });
    }
  };

  render() {
    const { advancedSearch, searchType, searchConfig } = this.state;

    const SearchForm = SEARCH_FORMS[searchType];

    return (
      <React.Fragment>
        <div className={advancedSearch ? 'policy-advanced search' : 'search'}>
          <SearchBar
            advancedSearch={advancedSearch}
            changeSearchType={this.changeSearchType}
            initialValues={SEARCH_CONFIG[searchConfig].initialValues}
            searchTypeOptions={SEARCH_CONFIG[searchConfig].searchOptions}
            searchType={searchType}
            toggleAdvancedSearch={this.toggleAdvancedSearch}
            render={({ submitting, handlePagination }) => (
              <SearchForm
                advancedSearch={advancedSearch}
                handlePagination={handlePagination}
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

                    <SearchResults searchType={searchType} />
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

export default SearchPage;
