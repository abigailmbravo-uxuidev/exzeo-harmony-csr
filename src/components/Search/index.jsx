import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NoResultsConnect from './NoResults';

const agencySearchOptions = [
  { answer: 'agent', label: 'Agent Search' },
  { answer: 'agency', label: 'Agency Search' }
];

const nonAgencySearchOptions = [
  { answer: 'address', label: 'New Quote' },
  { answer: 'quote', label: 'Quote Search' },
  { answer: 'policy', label: 'Policy Search' }
];

class SearchPage extends Component {

  state = {
    advancedSearch: false,
    searchType: 'policy',
    hasSearched: false,
  };

  toggleAdvancedSearch = () => {
    const { advancedSearch } = this.state;
    this.setState({ advancedSearch: !advancedSearch })
  };

  toggleHasSearched = (hasSearched) => {
    this.setState({ hasSearched })
  };

  changeSearchType = (context) => {
    this.setState({ searchType: context });
  };

  render() {
    const { advancedSearch, searchType, hasSearched } = this.state;
    return (
      <React.Fragment>
        <div className={advancedSearch ? 'policy-advanced search' : 'search'}>
          <SearchBar
            advancedSearch={advancedSearch}
            hasSearched={hasSearched}
            searchType={searchType}
            toggleAdvancedSearch={this.toggleAdvancedSearch}
            toggleHasSearched={this.toggleHasSearched}
            changeSearchType={this.changeSearchType}
          />
        </div>
        <main role="document" className={advancedSearch ? 'policy-advanced' : ''}>
          <div className="content-wrapper">
            <div className="dashboard" role="article">
              <div className="route">
                <div className="search route-content">
                  <div className="survey-wrapper scroll">
                    <div className="results-wrapper">
                      <NoResultsConnect />
                      <SearchResults
                        searchType={searchType}
                        hasSearched={hasSearched}
                      />
                    </div>
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
