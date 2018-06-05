import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './components/SearchResults';
import AddressSearch from './Address';
import PolicySearch from './Policy';
import QuoteSearch from './Quote';
import AgencySearch from './Agency';
import AgentSearch from './Agent';
import UserSearch from './User';

const POLICY_INITIAL_VALUES = {
  searchType: 'policy',
  sortBy: 'policyNumber'
};
const AGENCY_INITIAL_VALUES = {
  searchType: 'agency'
};
const AGENCY_SEARCH_OPTIONS = [
  { answer: 'agent', label: 'Agent Search' },
  { answer: 'agency', label: 'Agency Search' }
];
const POLICY_SEARCH_OPTIONS = [
  { answer: 'address', label: 'New Quote' },
  { answer: 'quote', label: 'Quote Search' },
  { answer: 'policy', label: 'Policy Search' }
];
const SEARCH_CONFIG = {
  policy: {
    initialValues: POLICY_INITIAL_VALUES,
    searchOptions: POLICY_SEARCH_OPTIONS,
  },
  agency: {
    initialValues: AGENCY_INITIAL_VALUES,
    searchOptions: AGENCY_SEARCH_OPTIONS,
  }
};

const SEARCH_FORMS = {
  address: AddressSearch,
  policy: PolicySearch,
  quote: QuoteSearch,
  agent: AgentSearch,
  agency: AgencySearch,
  user: UserSearch
};

class SearchPage extends Component {

  state = {
    advancedSearch: false,
    searchType: 'policy',
    searchConfig: 'policy'
  };

  componentDidMount() {
    this.setSearchConfig();
  }

  toggleAdvancedSearch = () => {
    const { advancedSearch } = this.state;
    this.setState({ advancedSearch: !advancedSearch })
  };

  changeSearchType = (searchType) => {
    this.setState({ searchType });
  };

  setSearchConfig = () => {
    const { pathName } = this.props;
    if (pathName === '/') {
      this.setState({ searchType: 'policy', searchConfig: 'policy' });
    }
    if (pathName === '/agency') {
      this.setState({ searchType: 'agency', searchConfig: 'agency' });
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
