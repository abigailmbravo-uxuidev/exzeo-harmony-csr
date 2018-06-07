import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleNewTab from '../../../utilities/handleNewTab';
import { SEARCH_TYPES } from '../constants';

import NoResults from '../components/NoResults';
import PolicyCard from './PolicyCard';
import AddressCard from './AddressCard';
import AddressTip from './AddressTip';
import AgencyCard from './AgencyCard.jsx';
import AgentCard from './AgentCard';
import QuoteCard from './QuoteCard';

export function onKeypressSubmit(event, data, props) {
  if (event.charCode === 13) {
    handleNewTab(data, props.searchType);
  }
}

export class SearchResults extends Component {
  render() {
    const { searchType, search: { results, noResults }, error } = this.props;
    return (
      <div className="results-wrapper">

        {(noResults || error.message) &&
          <NoResults searchType={searchType} error={error} />
        }

        {searchType === SEARCH_TYPES.newQuote && !!results.length &&
          <ul id="property-search-results" className="results result-cards property-search-results">
            {!!results.length && results.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                handleKeyPress={(e) => onKeypressSubmit(e, address, searchType)}
                handleClick={() => handleNewTab(address, searchType)}
              />
            ))}
            <AddressTip />
          </ul>
        }

        {searchType === SEARCH_TYPES.quote && !!results.length &&
          <div className="quote-list">
            {results.map((quote) => (
              <QuoteCard
                key={quote._id}
                quote={quote}
                handleKeyPress={(e) => onKeypressSubmit(e, quote, searchType)}
                handleClick={() => handleNewTab(quote, searchType)}
              />
            ))}
          </div>
        }

        {searchType === SEARCH_TYPES.policy && !!results.length &&
          <div className="policy-list">
            {results.map((policy) => (
              <PolicyCard
                key={policy.policyID}
                policy={policy}
                handleKeyPress={(e) => onKeypressSubmit(e, policy, searchType)}
                handleClick={() => handleNewTab(policy, searchType)}
              />
            ))}
          </div>
        }

        {searchType === SEARCH_TYPES.agent && !!results.length &&
          <div className="user-list agent-list">
            {results.map((agent) => (
              <AgentCard
                key={agent.licenseNumber}
                agent={agent}
                handleKeyPress={(e) => onKeypressSubmit(e, agent, searchType)}
                handleClick={() => handleNewTab(agent, searchType)}
              />
            ))}
          </div>
        }

        {searchType === SEARCH_TYPES.agency && !!results.length &&
          <div className="user-list agency-list">
            {results.map((agency) => (
              <AgencyCard
                key={agency.agencyCode}
                agency={agency}
                handleKeyPress={(e) => onKeypressSubmit(e, agency, searchType)}
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
