import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleNewTab from '../../../utilities/handleNewTab';
import { SEARCH_TYPES } from '../../../constants/search';

import NoResults from './NoResults';
import PolicyCard from './PolicyCard';
import AddressCard from './AddressCard';
import AddressTip from './AddressTip';
import AgencyCard from './AgencyCard';
import AgentCard from './AgentCard';
import QuoteCard from './QuoteCard';

export function onKeyPressSubmit(event, data, props) {
  if (event.charCode === 13) {
    handleNewTab(data, props.searchType);
  }
}

export class SearchResults extends Component {
  render() {
    const { hasSearched, searchType, search: { results, noResults }, error } = this.props;
    return (
      <div className="results-wrapper">

        {hasSearched && (noResults || error.message) &&
          <NoResults searchType={searchType} error={error} />
        }

        {hasSearched && searchType === SEARCH_TYPES.newQuote && !!results.length &&
          <ul id="property-search-results" className="results result-cards property-search-results">
            {!!results.length && results.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                handleKeyPress={(e) => onKeyPressSubmit(e, address, searchType)}
                handleClick={() => handleNewTab(address, searchType)}
              />
            ))}
            <AddressTip />
          </ul>
        }

        {hasSearched && searchType === SEARCH_TYPES.quote && !!results.length &&
          <div className="quote-list">
            {results.map((quote) => (
              <QuoteCard
                key={quote._id}
                quote={quote}
                handleKeyPress={(e) => onKeyPressSubmit(e, quote, searchType)}
                handleClick={() => handleNewTab(quote, searchType)}
              />
            ))}
          </div>
        }

        {hasSearched && searchType === SEARCH_TYPES.policy && !!results.length &&
          <div className="policy-list">
            {results.map((policy) => (
              <PolicyCard
                key={policy.policyID}
                policy={policy}
                handleKeyPress={(e) => onKeyPressSubmit(e, policy, searchType)}
                handleClick={() => handleNewTab(policy, searchType)}
              />
            ))}
          </div>
        }

        {hasSearched && searchType === SEARCH_TYPES.agent && !!results.length &&
          <div className="user-list agent-list">
            {results.map((agent) => (
              <AgentCard
                key={agent._id}
                agent={agent}
                handleKeyPress={(e) => onKeyPressSubmit(e, agent, searchType)}
                handleClick={() => handleNewTab(agent, searchType)}
              />
            ))}
          </div>
        }

        {hasSearched && searchType === SEARCH_TYPES.agency && !!results.length &&
          <div className="user-list agency-list">
            {results.map((agency) => (
              <AgencyCard
                key={agency.agencyCode}
                agency={agency}
                handleKeyPress={(e) => onKeyPressSubmit(e, agency, searchType)}
                handleClick={() => handleNewTab(agency, searchType)}
              />
            ))}
          </div>
        }

      </div>
    );
  }
}

SearchResults.propTypes = {
  searchType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  error: state.error,
  search: state.search
});

export default connect(mapStateToProps)(SearchResults);