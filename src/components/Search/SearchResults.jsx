import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import localStorage from 'localStorage';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as searchActions from '../../actions/searchActions';
import normalizePhone from '../Form/normalizePhone';
import Loader from '../Common/Loader';
import NoResults from './NoResultsForService';
import NoPolicyResultsConnect from './NoPolicyResults';
import PolicySearchCard from './PolicySearchCard.jsx';
import QuoteSearchCard from './QuoteSearchCard';
import AddressSearchCard from './AddressSearchCard';
import AgencySearchCard from './AgencySearchCard';

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
                addressSelection={() => props.handleNewTab(address, props)}
                addressKeyEnter={event => onKeypressSubmit(event, address, props)}
              />
              ))
            : null
        }
          <p>
            <small>
              <strong>TIP:</strong>
            If you don't see your address in the list provided, try entering less address information to see if that improves your search results. Please note, at this time we are only writing single family dwellings in the state of Florida. If you still have problems finding an address, please
              <a href="tel:888-210-5235">
                <strong>call us</strong>
              </a>
            and one of our representatives will be glad to help you.
            </small>
          </p>
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
          <AgencySearchCard agency={agency} index={index} agencySelection={() => props.handleNewTab(agency, props)} agencyKeyEnter={event => onKeypressSubmit(event, agency, props)} />
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
          <div className="agency agent contact card" key={index}>
            <div className="contact-title">
              <i className="fa fa-address-card margin bottom" />
              {agent.agentOfRecord ? <small><i className="card-icon fa fa-bookmark" /><label>AOR</label></small> : null }
              {agent.appointed ? <small><i className="card-icon fa fa-certificate" /><label>Appointed</label></small> : null }
            </div>
            <div className="contact-details">
              <div className="card-name">
                <h4 onClick={() => props.handleNewTab(agent, props)}><span className="agent-code">{agent.agentCode}</span> | <span className="agent-name">{`${agent.firstName} ${agent.lastName}`}</span> | <span className="agent-license">{agent.licenseNumber}</span></h4>
                <div className="contact-address">
                  {agent.mailingAddress.address1},&nbsp;
                  {agent.mailingAddress.address2}{agent.mailingAddress.address2 ? ', ' : ' ' }
                  {agent.mailingAddress.city},&nbsp;
                  {agent.mailingAddress.state}&nbsp;
                  {agent.mailingAddress.zip}
                  {agent.status ? <span className="additional-data status"><label>STATUS:&nbsp;</label>{agent.status}</span> : null}
                </div>
                <div className="additional-contacts">
                  <ul>
                    <li>
                      <div className="contact-methods">
                        {agent.primaryPhoneNumber ?
                          <p className="phone">
                            <i className="fa fa-phone-square" />
                            <a href={`tel:${agent.primaryPhoneNumber}`}>{normalizePhone(agent.primaryPhoneNumber)}</a>
                          </p> : null }
                        {agent.secondaryPhoneNumber ?
                          <p className="phone">
                            <small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                            <a href={`tel:${agent.secondaryPhoneNumber}`}>{normalizePhone(agent.secondaryPhoneNumber)}</a>
                          </p> : null }
                        {agent.faxNumber ?
                          <p className="fax">
                            <i className="fa fa-fax" />
                            <a href={`tel:${agent.faxNumber}`}>{normalizePhone(agent.faxNumber)}</a>
                          </p> : null }
                        {agent.emailAddress ?
                          <p>
                            <i className="fa fa-envelope" />
                            <a href={`mailto:${agent.emailAddress}`}>{agent.emailAddress}</a>
                          </p> : null }
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>))
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
  tasks: state.cg, appState: state.appState, agencies: state.service.agencies, agents: state.service.agents, defaultPolicyResults: state.service.policyResults, search: state.search
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
