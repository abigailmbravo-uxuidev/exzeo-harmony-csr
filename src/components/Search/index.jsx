import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NoResultsConnect from './NoResults';

class SearchPage extends Component {

  state = {
    advancedSearch: false,
    searchType: 'policy',
  };

  toggleAdvancedSearch = () => {
    const { advancedSearch } = this.state;
    this.setState({ advancedSearch: !advancedSearch })
  };

  changeSearchType = (searchType) => {
    this.setState({ searchType });
  };

  render() {
    const { advancedSearch, searchType } = this.state;
    return (
      <React.Fragment>
        <div className={advancedSearch ? 'policy-advanced search' : 'search'}>
          <SearchBar
            advancedSearch={advancedSearch}
            searchType={searchType}
            toggleAdvancedSearch={this.toggleAdvancedSearch}
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
                      <SearchResults searchType={searchType}
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
