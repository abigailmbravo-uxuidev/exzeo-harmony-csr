import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as cgActions from '../../state/actions/cgActions';
import * as appStateActions from '../../state/actions/appStateActions';
import * as serviceActions from '../../state/actions/serviceActions';
import * as searchActions from '../../state/actions/searchActions';
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
    props.handleNewTab(data, props);
  }
};


export const SearchResults = (props) => {
  const model = props.tasks[props.appState.modelName] || {};
  const previousTask = model.data && model.data.previousTask ? model.data.previousTask : {};
  const activeTask = model.data && model.data.activeTask ? model.data.activeTask : {};

  const searchData = JSON.parse(localStorage.getItem('lastSearchData'));
  if (props.search && props.search.searchType === 'policy') {
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
        {props.search && props.search.isLoading && <Loader />}
        {
          policyResults && policyResults.length > 0 && policyResults.map((policy, index) => (
            <PolicySearchCard
              policyKeyEnter={event => onKeypressSubmit(event, policy, props)}
              policy={policy}
              index={index}
              key={index}
              policySelection={() => props.handleNewTab(policy, props)}
            />
          ))
      }
        {
          props.search && props.search.hasSearched && !props.search.isLoading && policyResults && policyResults.length === 0 && <NoPolicyResultsConnect />
      }
      </div>
    );
  }

  if (previousTask && previousTask.name === 'searchAddress' && activeTask.name !== 'askToSearchAgain') {
    const addresses = previousTask.value.result.IndexResult;
    return (
      <div>
        <ul id="property-search-results" className="results result-cards property-search-results">
          {
          addresses
            ? addresses.map((address, index) => (
              <AddressSearchCard
                address={address}
                index={index}
                key={index}
                addressSelection={() => props.handleNewTab(address, props)}
                addressKeyEnter={event => onKeypressSubmit(event, address, props)}
              />
              ))
            : null
        }
          <AddressTip />
        </ul>
      </div>);
  }

  if (previousTask.value && activeTask.name === 'chooseQuote') {
    const quoteResults = previousTask.value.result.quotes;

    return (
      <div className="quote-list">
        {
        quoteResults && quoteResults.map((quote, index) => (
          <QuoteSearchCard
            quote={quote}
            index={index}
            key={index}
            quoteSelection={() => props.handleNewTab(quote, props)}
            quoteKeyEnter={event => onKeypressSubmit(event, quote, props)}
          />
        ))
      }
      </div>);
  }

  if (searchData && searchData.searchType === 'agency') {
    const agencyResults = props.agencies ? props.agencies : [];

    if (agencyResults.length <= 0 && searchData.searchType === 'agency' && props.appState.data && !props.appState.data.agentSubmitting) {
      return (
        <NoResults />
      );
    }
    return (
      <div className="user-list agency-list">
        { props.appState.data && props.appState.data.agentSubmitting && <Loader />}
        {
        agencyResults && agencyResults.map((agency, index) => (
          <AgencySearchCard agency={agency} index={index} key={index} agencySelection={() => props.handleNewTab(agency, props)} agencyKeyEnter={event => onKeypressSubmit(event, agency, props)} />
        ))
      }
      </div>);
  }

  if (searchData && searchData.searchType === 'agent') {
    const agentResults = props.agents ? props.agents : [];
    if (props.appState.data && !props.appState.data.agentSubmitting && agentResults.length <= 0 && searchData.searchType === 'agent') {
      return (
        <NoResults />
      );
    }
    return (
      <div className="user-list agent-list">
        { props.appState.data && props.appState.data.agentSubmitting && <Loader />}
        {
        agentResults && agentResults.map((agent, index) => (
          <AgentSearchCard agent={agent} index={index} key={index} agentSelection={() => props.handleNewTab(agent, props)} agentKeyEnter={event => onKeypressSubmit(event, agent, props)} />
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
  tasks: state.cg, appState: state.appState, agencies: state.agencyState.agencies, agents: state.service.agents, defaultPolicyResults: state.service.policyResults, search: state.search
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
