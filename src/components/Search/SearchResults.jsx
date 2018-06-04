import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import handleNewTab from '../../utilities/handleNewTab';
import Loader from '../Common/Loader';
import NoResults from './NoResultsForService';
import NoPolicyResultsConnect from './NoPolicyResults';
import PolicySearchCard from './PolicySearchCard.jsx';
import QuoteSearchCard from './QuoteSearchCard';
import AddressSearchCard from './AddressSearchCard';
import AgencySearchCard from './AgencySearchCard';
import AgentSearchCard from './AgentSearchCard';
import AddressTip from './AddressTip';

export const onKeypressSubmit = (event, data, props) => {
  if (event.charCode === 13) {
    handleNewTab(data, props.searchType);
  }
};

export const SearchResults = (props) => {
  const { searchType, searchResults } = props;

  if (searchType === 'policy') {
    const { defaultPolicyResults } = props;
    const policyResults = [];

    const policies = _.get(defaultPolicyResults, 'policies') || [];

    for (let i = 0; i < policies.length; i += 1) {
      const currentPolicy = policies[i];

      const selectedPolicies = _.filter(policies, policy => policy && policy.policyNumber === currentPolicy.policyNumber);
      if (!_.some(policyResults, p => p && p.policyNumber === currentPolicy.policyNumber) && selectedPolicies.length > 0) {
        policyResults.push(_.maxBy(selectedPolicies, 'policyVersion'));
      }
    }

    return (
      <div className="policy-list">
        {searchResults && searchResults.map((policy, index) => (
          <PolicySearchCard
            key={index}
            index={index}
            policy={policy}
            policySelection={() => handleNewTab(policy, props.searchType)}
            policyKeyEnter={event => onKeypressSubmit(event, policy, props)}
          />
        ))}
        {/*{hasSearched && !appState.isLoading && searchResults && searchResults.length === 0 &&*/}
          {/*<NoPolicyResultsConnect />*/}
        {/*}*/}
      </div>
    );
  }

  if (searchType === 'address') {
    return (
      <div>
        <ul id="property-search-results" className="results result-cards property-search-results">
          {searchResults && searchResults.map((address, index) => (
              <AddressSearchCard
                key={index}
                index={index}
                address={address}
                addressSelection={() => handleNewTab(address, props.searchType)}
                addressKeyEnter={event => onKeypressSubmit(event, address, props)}
              />
          ))}
          <AddressTip />
        </ul>
      </div>);
  }

  if (searchType === 'quote') {
    return (
      <div className="quote-list">
        {searchResults && searchResults.map((quote, index) => (
          <QuoteSearchCard
            key={index}
            index={index}
            quote={quote}
            quoteSelection={() => handleNewTab(quote, props.searchType)}
            quoteKeyEnter={event => onKeypressSubmit(event, quote, props)}
          />
        ))}
      </div>);
  }

  if (searchType === 'agency') {
    // const agencyResults = props.agencies ? props.agencies : [];

    // if (agencyResults.length <= 0 && searchType === 'agency') {
    //   return (
    //     <NoResults />
    //   );
    // }
    return (
      <div className="user-list agency-list">
        { searchResults && searchResults.map((agency, index) => (
          <AgencySearchCard
            key={index}
            index={index}
            agency={agency}
            agencySelection={() => handleNewTab(agency, props.searchType)}
            agencyKeyEnter={event => onKeypressSubmit(event, agency, props)}
          />

        ))}
      </div>);
  }

  if (searchType === 'agent') {
    // const agentResults = props.agents ? props.agents : [];
    // if (props.appState.data && !props.appState.data.agentSubmitting && agentResults.length <= 0 && searchType === 'agent') {
    //   return (
    //     <NoResults />
    //   );
    // }
    return (
      <div className="user-list agent-list">
        {searchResults && searchResults.map((agent, index) => (
          <AgentSearchCard
            index={index}
            key={index}
            agent={agent}
            agentSelection={() => handleNewTab(agent, props)}
            agentKeyEnter={event => onKeypressSubmit(event, agent, props)} />
        ))}
      </div>
    );
  }
  return <span />;
};

SearchResults.propTypes = {
};

const mapStateToProps = state => ({
  searchResults: state.search.results
});

export default connect(mapStateToProps)(SearchResults);
