import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import localStorage from 'localStorage';
import { Link } from 'react-router-dom';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import normalizePhone from '../Form/normalizePhone';
import Loader from '../Common/Loader';
import NoResults from './NoResultsForService';
import NoPolicyResultsConnect from './NoPolicyResults';

const onKeypressPolicy = (event, policy, props) => {
  if (event.charCode === 13) {
    //  handleSelectPolicy(policy, props);
  }
};

export const SearchResults = (props) => {
  const model = props.tasks[props.appState.modelName] || {};
  const previousTask = model.data && model.data.previousTask
    ? model.data.previousTask
    : {};
  const activeTask = model.data && model.data.activeTask
    ? model.data.activeTask
    : {};

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
      <div className="quote-list">
        {props.search && props.search.isLoading && <Loader />}
        {
          policyResults && policyResults.length > 0 && policyResults.map((policy, index) => (<div tabIndex={0} onKeyPress={event => onKeypressPolicy(event, policy, props)} id={policy.PolicyID} className="card" key={index}>
            <div className="icon-name">
              <i className="card-icon fa fa-user-circle" />
              <div className="card-name">
                <h4 title={policy.policyHolders && policy.policyHolders.length > 0 ? `${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}` : ''}>{policy.policyHolders[0] && `${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}`}</h4>
              </div>
            </div>
            <section>
              <ul id="policy-search-results" className="policy-search-results">
                <li className="header">
                  <span className="policy-no">Policy No.</span>
                  <span className="property-address">Property Address</span>
                  <span className="quote-state">Policy Status</span>
                  <span className="effctive-date">Effective Date</span>
                </li>
                <li>
                  <Link to={{ pathname: '/policy/coverage', state: { policyNumber: policy.policyNumber } }} className={`${policy.policyNumber + policy.property.physicalAddress.address1} row`}>
                    <span className="quote-no">{policy.policyNumber}</span>
                    <span className="property-address">{
                  `${policy.property.physicalAddress.address1}
                      ${policy.property.physicalAddress.city}, ${policy.property.physicalAddress.state}
                      ${policy.property.physicalAddress.zip}`
                }</span>
                    <span className="quote-state">{policy.status}</span>
                    <span className="effctive-date">{moment.utc(policy.effectiveDate).format('MM/DD/YYYY')}</span>
                  </Link>
                </li>
              </ul>
            </section>
          </div>))
      }
        {
          props.search && props.search.hasSearched && policyResults && policyResults.length === 0 && <NoPolicyResultsConnect />
      }
      </div>
    );
  }

  if (previousTask && previousTask.name === 'searchAddress' && activeTask.name !== 'askToSearchAgain') {
    const addresses = previousTask.value.result.IndexResult;
    return (<div>
      <ul id="property-search-results" className="results result-cards property-search-results">
        {
          addresses
            ? addresses.map((address, index) => (<li id={address.id} key={index}>

              {/* <div>
                    <button className="row" onClick={() => props.handleSelectAddress(address, props)} tabIndex="-1">Open New Tab</button>
                  </div>*/
              }

              <a id={address.physicalAddress.address1} aria-label={address.physicalAddress.address1} className={address.physicalAddress.address1} value={address.physicalAddress.address1} onClick={() => props.handleNewTab(address, props)} tabIndex="-1">
                <i className="card-icon fa fa-map-marker" />
                <section>
                  <h4>{address.physicalAddress.address1}</h4>
                  <p>{address.physicalAddress.city}, {address.physicalAddress.state}
                    {address.physicalAddress.zip}</p>
                </section>
                <i className="fa fa-chevron-circle-right" />
              </a>
            </li>))
            : null
        }
        <p>
          <small>
            <strong>TIP:</strong>
            If you don't see your address in the list provided, try entering less address information to see if that improves your search results. Please note, at this time we are only writing single family dwellings in the state of Florida. If you still have problems finding an address, please
            <a href="tel:888-210-5235">
              <strong>call us</strong>
            </a>
            and one of our representatives will be glad to help you.</small>
        </p>
      </ul>
    </div>);
  }

  if (previousTask.value && activeTask.name === 'chooseQuote') {
    const quoteResults = previousTask.value.result.quotes;

    return (<div className="quote-list">
      {
        quoteResults && quoteResults.map((quote, index) => <div id={quote._id} className="card" key={index}>
          <div className="icon-name">
            <i className="card-icon fa fa-user-circle" />
            <div className="card-name">
              <h5
                title={quote.policyHolders && quote.policyHolders.length > 0
                  ? `${quote.policyHolders[0].firstName} ${quote.policyHolders[0].lastName}`
                  : ''}
              >{quote.policyHolders[0] && `${quote.policyHolders[0].firstName.replace(/(^.{20}).*$/, '$1...')}`}<br />
                {quote.policyHolders[0] && `${quote.policyHolders[0].lastName.replace(/(^.{20}).*$/, '$1...')}`}</h5>
            </div>
          </div>

          {/* <div>
                <button className="row" onClick={() => props.handleSelectQuote(quote, props)} tabIndex="-1">Open New Tab</button>
              </div>*/
          }

          <section>
            <ul id="quote-search-results" className="quote-search-results">
              <li className="header">
                <span className="quote-no">Quote No.</span>
                <span className="property-address">Property Address</span>
                <span className="quote-state">Quote State</span>
                <span className="effctive-date">Effective Date</span>
                <span className="started-on">Started On</span>
                <span className="premium">Premium</span>
              </li>
              <li>
                <a id={quote.quoteNumber + quote.property.physicalAddress.address1} className={`${quote.quoteNumber + quote.property.physicalAddress.address1} row`} aria-label={quote.quoteNumber + quote.property.physicalAddress.address1} value={quote.quoteNumber + quote.property.physicalAddress.address1} onClick={() => props.handleNewTab(quote, props)} tabIndex="-1">
                  <span className="quote-no">{quote.quoteNumber}</span>
                  <span className="property-address">{`${quote.property.physicalAddress.address1} ${quote.property.physicalAddress.city}, ${quote.property.physicalAddress.state} ${quote.property.physicalAddress.zip}`}</span>
                  <span className="quote-state">{quote.quoteState}</span>
                  <span className="effctive-date">{moment.utc(quote.effectiveDate).format('MM/DD/YYYY')}</span>
                  <span className="started-on">{moment.utc(quote.createdAt).format('MM/DD/YYYY')}</span>
                  <span className="premium">$ {
                    quote.rating
                      ? quote.rating.totalPremium
                      : '-'
                  }</span>
                </a>
              </li>
            </ul>
          </section>
        </div>)
      }
    </div>);
  }

  if (searchData && searchData.searchType === 'agency') {
    const agencyResults = props.agencies ? props.agencies : [];

    if (agencyResults.length <= 0 && searchData.searchType === 'agency' &&  props.appState.data && !props.appState.data.agentSubmitting) {
      return (
        <NoResults />
      )
    } else {
    return (<div className="user-list agency-list">
      { props.appState.data && props.appState.data.agentSubmitting && <Loader />}
      {
        agencyResults && agencyResults.map((agency, index) => <div className="card-wrapper" key={index}>
          <span className="fa fa-chevron-circle-right" id={`agency-code-${agency.agencyCode}`} onClick={() => props.handleNewTab(agency, props)} tabIndex="-1" />
          <div className="agency contact card">

            <div className="contact-title">
              <i className="fa fa-address-book" />
              <label>Agency</label>
            </div>
            <div className="contact-details">
              <div className="card-name">

                <h4 className="agency"><span className="agency-code">{agency.agencyCode}</span> | <span className="agency-display-name">{agency.displayName}</span> | <span className="agency-legal-name">{agency.legalName}</span> | <span className="agency-license">{agency.licenseNumber}</span></h4>

                <div className="contact-address">
                  {agency.physicalAddress.address1},&nbsp;
                  {agency.physicalAddress.address2}{agency.physicalAddress.address2 ? ', ' : ' ' }
                  {agency.physicalAddress.city},&nbsp;
                  {agency.physicalAddress.state}&nbsp;
                  {agency.physicalAddress.zip}
                  {agency.status ? <span className="additional-data status"><label>STATUS:&nbsp;</label>{agency.status}</span> : null}
                  <span className="additional-data tier"><label>TIER:&nbsp;</label>{agency.tier >= 0 ? agency.tier : ''}</span>
                  {agency.websiteUrl ? <span className="additional-data website"><label>WEBSITE:&nbsp;</label><a href={`${agency.websiteUrl}`} target="_blank">{agency.websiteUrl}</a></span> : null}
                </div>
                <div className="additional-contacts">
                  <ul>
                    <li>
                      <div>
                        <h5>{agency.contactFirstName} {agency.contactLastName}</h5>
                      </div>
                      <div className="contact-methods">
                        {agency.primaryPhoneNumber ?
                          <p className="phone">
                            <i className="fa fa-phone-square" />
                            <a href={`tel:${agency.primaryPhoneNumber}`}>{normalizePhone(agency.primaryPhoneNumber)}</a>
                          </p> : null }
                        {agency.secondaryPhoneNumber ?
                          <p className="phone">
                            <small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                            <a href={`tel:${agency.secondaryPhoneNumber}`}>{normalizePhone(agency.secondaryPhoneNumber)}</a>
                          </p> : null }
                        {agency.faxNumber ?
                          <p className="fax">
                            <i className="fa fa-fax" />
                            <a href={`tel:${agency.faxNumber}`}>{normalizePhone(agency.faxNumber)}</a>
                          </p> : null }
                        {agency.contactEmailAddress ?
                          <p>
                            <i className="fa fa-envelope" />
                            <a href={`mailto:${agency.contactEmailAddress}`}>{agency.contactEmailAddress}</a>
                          </p> : null }
                        {agency.customerServiceEmailAddress ?
                          <p className="phone">
                            <span className="contact-divider">|</span>
                            <small>CSR <i className="fa fa-envelope" /></small>
                            <a href={`mailto:${agency.customerServiceEmailAddress}`}>{agency.customerServiceEmailAddress}</a>
                          </p> : null }
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>)
      }
    </div>);
    }
  }

  if (searchData && searchData.searchType === 'agent') {
    const agentResults = props.agents ? props.agents : [];
    if (props.appState.data && !props.appState.data.agentSubmitting && agentResults.length <= 0 && searchData.searchType === 'agent') {
      return (
        <NoResults />
      )
    } else {
    return (<div className="user-list agent-list">
      { props.appState.data && props.appState.data.agentSubmitting && <Loader />}
      {
        agentResults && agentResults.map((agent, index) => <div className="agency agent contact card" key={index}>
          <div className="contact-title">
            <i className="fa fa-address-card margin bottom" />
            {agent.agentOfRecord ? <small><i className="card-icon fa fa-bookmark" /><label>AOR</label></small> : null }
            {agent.appointed ? <small><i className="card-icon fa fa-certificate" /><label>Appointed</label></small> : null }
          </div>
          <div className="contact-details">
            <div className="card-name">
              <h4 className="agent"><span className="agent-code">{agent.agentCode}</span> | <span className="agent-name">{agent.firstName} {agent.lastName}</span> | <span className="agent-license">{agent.licenseNumber}</span></h4>
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
        </div>)
            }
    </div>
    );
  }
  }
  return <span />;
};

SearchResults.propTypes = {
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ dontSeeAddress: PropTypes.bool })
  }),
  tasks: PropTypes.shape(),
  handleSelectAddress: PropTypes.func,
  handleSelectQuote: PropTypes.func,
  handleNewQuote: PropTypes.func,
  handleSelectPolicy: PropTypes.func
};

const mapStateToProps = state => ({ tasks: state.cg, appState: state.appState, agencies: state.service.agencies, agents: state.service.agents, defaultPolicyResults: state.service.policyResults, search: state.search,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
