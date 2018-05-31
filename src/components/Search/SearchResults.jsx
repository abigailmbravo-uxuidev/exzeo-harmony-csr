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
  const { searchType, hasSearched, appState, searchResults } = props;

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
        {/* {appState.loading && <Loader />} */}
        {
          searchResults && searchResults.map((policy, index) => (
            <PolicySearchCard
              policyKeyEnter={event => onKeypressSubmit(event, policy, props)}
              policy={policy}
              index={index}
              key={index}
              policySelection={() => handleNewTab(policy, props.searchType)}
            />
          ))
      }
        {
          hasSearched && !appState.isLoading && searchResults && searchResults.length === 0 && <NoPolicyResultsConnect />
      }
      </div>
    );
  }

  if (searchType === 'address') {
    return (
      <div>
        <ul id="property-search-results" className="results result-cards property-search-results">
          {
          searchResults
            ? searchResults.map((address, index) => (
              <AddressSearchCard
                address={address}
                index={index}
                key={index}
                addressSelection={() => handleNewTab(address, props.searchType)}
                addressKeyEnter={event => onKeypressSubmit(event, address, props)}
              />
              ))
            : null
        }
          <AddressTip />
        </ul>
      </div>);
  }

  if (searchType === 'quote') {
    return (
      <div className="quote-list">
        {
        searchResults && searchResults.map((quote, index) => (
          <QuoteSearchCard
            quote={quote}
            index={index}
            key={index}
            quoteSelection={() => handleNewTab(quote, props.searchType)}
            quoteKeyEnter={event => onKeypressSubmit(event, quote, props)}
          />
        ))
      }
      </div>);
  }

  if (searchType === 'agency') {
    const agencyResults = props.agencies ? props.agencies : [];

    if (agencyResults.length <= 0 && searchType === 'agency' && props.appState.data && !props.appState.data.agentSubmitting) {
      return (
        <NoResults />
      );
    }
    return (
      <div className="user-list agency-list">
        { props.appState.data && props.appState.data.agentSubmitting && <Loader />}
        {
        agencyResults && agencyResults.map((agency, index) => (
          <AgencySearchCard agency={agency} index={index} key={index} agencySelection={() => handleNewTab(agency, props.searchType)} agencyKeyEnter={event => onKeypressSubmit(event, agency, props)} />
        ))
      }
      </div>);
  }

  if (searchType === 'agent') {
    const agentResults = props.agents ? props.agents : [];
    if (props.appState.data && !props.appState.data.agentSubmitting && agentResults.length <= 0 && searchType === 'agent') {
      return (
        <NoResults />
      );
    }
    return (
      <div className="user-list agent-list">
        { props.appState.data && props.appState.data.agentSubmitting && <Loader />}
        {
        agentResults && agentResults.map((agent, index) => (
          <AgentSearchCard agent={agent} index={index} key={index} agentSelection={() => handleNewTab(agent, props)} agentKeyEnter={event => onKeypressSubmit(event, agent, props)} />
          ))
            }
      </div>
    );
  }
  return <span />;
};

SearchResults.propTypes = {
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ dontSeeAddress: PropTypes.bool })
  }),
  tasks: PropTypes.shape()
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  agencies: state.service.agencies,
  agents: state.service.agents,
  defaultPolicyResults: state.service.policyResults,
  searchResults: state.search.results
});

export default connect(mapStateToProps)(SearchResults);
