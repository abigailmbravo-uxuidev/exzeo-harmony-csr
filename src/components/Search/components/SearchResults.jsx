import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleNewTab, onKeypressSubmit } from '../../../utilities/handleNewTab';

import NoResults from '../components/NoResults';
import PolicySearchCard from '../PolicySearchCard';
import AddressSearchCard from '../AddressSearchCard';
import AddressTip from '../AddressTip';
import AgencySearchCard from '../AgencySearchCard.jsx';
import AgentSearchCard from '../AgentSearchCard';
import QuoteSearchCard from '../QuoteSearchCard';

class SearchResults extends Component {
  render() {
    const { searchType, search: { results }, error } = this.props;
    return (
      <div className="results-wrapper">

        {(search.noResults || error) &&
          <NoResults searchType={searchType} error={error} />
        }

        {searchType === 'address' && !!results.length &&
          <ul id="property-search-results" className="results result-cards property-search-results">
            {!!results.length && results.map((address) => (
              <AddressSearchCard
                key={address.id}
                address={address}
                handleKeyPress={(e) => onKeypressSubmit(e, address, searchType)}
                handleClick={() => handleNewTab(address, searchType)}
              />
            ))}
            <AddressTip />
          </ul>
        }

        {searchType === 'policy' && !!results.length &&
          <div className="policy-list">
            {results.map((policy) => (
              <PolicySearchCard
                key={policy.policyID}
                policy={policy}
                handleKeyPress={(e) => onKeypressSubmit(e, policy, searchType)}
                handleClick={() => handleNewTab(policy, searchType)}
              />
            ))}
          </div>
        }

        {searchType === 'quote' && !!results.length &&
          <div className="quote-list">
            {results.map((quote) => (
              <QuoteSearchCard
                key={quote._id}
                quote={quote}
                handleKeyPress={(e) => onKeypressSubmit(e, quote, searchType)}
                handleClick={() => handleNewTab(quote, searchType)}
              />
            ))}
          </div>
        }

        {searchType === 'agency' && !!results.length &&
          <div className="user-list agency-list">
            {results.map((agency) => (
              <AgencySearchCard
                key={agency.agencyCode}
                agency={agency}
                handleKeyPress={(e) => onKeypressSubmit(e, agency, searchType)}
                handleClick={() => handleNewTab(agency, searchType)}
              />
            ))}
          </div>
        }

        {searchType === 'agent' && !!results.length &&
          <div className="user-list agent-list">
            {results.map((agent) => (
              <AgentSearchCard
                key={agent.licenseNumber}
                agent={agent}
                handleKeyPress={(e) => onKeypressSubmit(e, agent, searchType)}
                handleClick={() => handleNewTab(agent, searchType)}
              />
            ))}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  search: state.search
});

export default connect(mapStateToProps)(SearchResults);
