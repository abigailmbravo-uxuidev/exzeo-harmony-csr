import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  handleNewTab,
  handleDiaryClick,
  handleDiaryKeyPress
} from '../../../utilities/handleNewTab';
import { SEARCH_TYPES } from '../../../constants/search';
import { getDiaryReasons } from '../../../state/selectors/diary.selectors';

import NoResults from './NoResults';
import PolicyCard from './PolicyCard';
import AddressCard from './AddressCard';
import AddressTip from './AddressTip';
import AgencyCard from './AgencyCard';
import AgentCard from './AgentCard';
import QuoteCard from './QuoteCard';
import DiaryList from './DiaryList';

export function onKeyPressSubmit(event, data, props) {
  if (event.charCode === 13) {
    handleNewTab(data, props.searchType, props.search.product);
  }
}

export class SearchResults extends Component {
  render() {
    const {
      hasSearched,
      searchType,
      search: {
        results,
        noResults,
        companyCode = '',
        state = '',
        product = ''
      },
      error,
      diaryReasons
    } = this.props;

    return (
      <div className="results-wrapper">
        {hasSearched && (noResults || error.message) && (
          <div className="results">
            <div className="result-cards">
              <NoResults searchType={searchType} error={error} />
              {hasSearched && searchType === SEARCH_TYPES.agency && (
                <div
                  className="btn-divider-wrapper"
                  data-test="add-agency-has-searched"
                >
                  <NavLink
                    className="btn btn-primary"
                    to="/agency/new/0"
                    activeClassName="active"
                    target="_blank"
                    exact
                  >
                    + Agency
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}

        {hasSearched &&
          searchType === SEARCH_TYPES.newQuote &&
          !!results.length && (
            <div className="quote-list">
              {!!results.length &&
                results.map(address => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    companyCode={companyCode}
                    state={state}
                    product={product}
                    handleKeyPress={e =>
                      onKeyPressSubmit(
                        e,
                        { companyCode, ...address },
                        searchType
                      )
                    }
                    handleClick={() =>
                      handleNewTab(
                        { companyCode, ...address },
                        searchType,
                        product,
                        companyCode
                      )
                    }
                  />
                ))}
              <AddressTip />
            </div>
          )}

        {hasSearched && searchType === SEARCH_TYPES.quote && !!results.length && (
          <div className="quote-list">
            {results.map(quote => (
              <QuoteCard
                key={quote._id}
                quote={quote}
                handleKeyPress={e => onKeyPressSubmit(e, quote, searchType)}
                handleClick={() => handleNewTab(quote, searchType)}
              />
            ))}
          </div>
        )}

        {hasSearched && searchType === SEARCH_TYPES.policy && !!results.length && (
          <div className="policy-list" data-test="policy-list">
            {results.map(policy => (
              <PolicyCard
                key={policy.policyNumber}
                policy={policy}
                handleKeyPress={e => onKeyPressSubmit(e, policy, searchType)}
                handleClick={() => handleNewTab(policy, searchType)}
              />
            ))}
          </div>
        )}

        {hasSearched && searchType === SEARCH_TYPES.agent && !!results.length && (
          <div className="user-list agent-list" data-test="agent-list">
            {results.map(agent => (
              <AgentCard
                key={agent._id}
                agent={agent}
                handleKeyPress={e => onKeyPressSubmit(e, agent, searchType)}
                handleClick={() => handleNewTab(agent, searchType)}
              />
            ))}
          </div>
        )}

        {hasSearched && searchType === SEARCH_TYPES.agency && !!results.length && (
          <React.Fragment>
            <div className="user-list agency-list">
              {results.map(agency => (
                <AgencyCard
                  key={agency.agencyCode}
                  agency={agency}
                  handleKeyPress={e => onKeyPressSubmit(e, agency, searchType)}
                  handleClick={() => handleNewTab(agency, searchType)}
                />
              ))}
            </div>
            <div
              className="btn-divider-wrapper"
              data-test="add-agency-no-results"
            >
              <NavLink
                className="btn btn-primary"
                to="/agency/new/0"
                activeClassName="active"
                target="_blank"
                exact
              >
                + Agency
              </NavLink>
            </div>
          </React.Fragment>
        )}
        {!hasSearched && searchType === SEARCH_TYPES.agency && (
          <div
            className="btn-divider-wrapper"
            data-test="add-agency-not-searched"
          >
            <NavLink
              className="btn btn-primary"
              to="/agency/new/0"
              activeClassName="active"
              target="_blank"
              exact
            >
              + Agency
            </NavLink>
          </div>
        )}

        {hasSearched &&
          searchType === SEARCH_TYPES.diaries &&
          !!results.length && (
            <DiaryList
              product={product}
              handleKeyPress={handleDiaryKeyPress}
              onItemClick={handleDiaryClick}
              clickable
              diaries={results.filter(d =>
                product ? d.resource.product === product : d
              )}
              diaryReasons={diaryReasons}
            />
          )}
      </div>
    );
  }
}

SearchResults.propTypes = {
  hasSearched: PropTypes.bool.isRequired,
  searchType: PropTypes.string.isRequired,
  search: PropTypes.shape({
    results: PropTypes.array,
    noResults: PropTypes.bool
  })
};

const mapStateToProps = state => ({
  error: state.error,
  diaryReasons: getDiaryReasons(state)
});

export default connect(mapStateToProps)(SearchResults);
