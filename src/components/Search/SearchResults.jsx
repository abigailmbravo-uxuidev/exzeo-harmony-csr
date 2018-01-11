import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

export const SearchResults = (props) => {
  const model = props.tasks[props.appState.modelName] || {};
  const previousTask = model.data && model.data.previousTask
    ? model.data.previousTask
    : {};
  const activeTask = model.data && model.data.activeTask
    ? model.data.activeTask
    : {};

    console.log(localStorage.getItem('lastSearchData'));


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
                <i className="card-icon fa fa-map-marker"/>
                <section>
                  <h4>{address.physicalAddress.address1}</h4>
                  <p>{address.physicalAddress.city}, {address.physicalAddress.state}
                    {address.physicalAddress.zip}</p>
                </section>
                <i className="fa fa-chevron-circle-right"/>
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
            <i className="card-icon fa fa-user-circle"/>
            <div className="card-name">
              <h5 title={quote.policyHolders && quote.policyHolders.length > 0
                  ? `${quote.policyHolders[0].firstName} ${quote.policyHolders[0].lastName}`
                  : ''}>{quote.policyHolders[0] && `${quote.policyHolders[0].firstName.replace(/(^.{13}).*$/, '$1...')}`}
                {quote.policyHolders[0] && `${quote.policyHolders[0].lastName.replace(/(^.{13}).*$/, '$1...')}`}</h5>
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

  if (props.tasks[props.appState.modelName] && props.tasks[props.appState.modelName].data.activeTask && props.tasks[props.appState.modelName].data.activeTask.name === 'choosePolicy') {
    const defaultPolicyResults = props.tasks[props.appState.modelName].data.previousTask
      ? props.tasks[props.appState.modelName].data.previousTask.value.policies
      : [];

    const policyResults = [];

    if (defaultPolicyResults && defaultPolicyResults.length > 0) {
      for (let i = 0; i < defaultPolicyResults.length; i += 1) {
        const currentPolicy = defaultPolicyResults[i];
        const selectedPolicies = _.filter(defaultPolicyResults, policy => policy && policy.policyNumber === currentPolicy.policyNumber);
        if (!_.some(policyResults, p => p && p.policyNumber === currentPolicy.policyNumber) && selectedPolicies.length > 0) {
          policyResults.push(_.maxBy(selectedPolicies, 'policyVersion'));
        }
      }
    }

    return (<div className="policy-list">
      {
        policyResults && policyResults.map((policy, index) => <div id={policy._id} className="card" key={index}>
          <div className="icon-name">
            <i className="card-icon fa fa-user-circle"/>
            <div className="card-name">
              <h5 title={`${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}`}>{policy.policyHolders[0] && `${policy.policyHolders[0].firstName.replace(/(^.{13}).*$/, '$1...')}`}
                {policy.policyHolders[0] && `${policy.policyHolders[0].lastName.replace(/(^.{13}).*$/, '$1...')}`}</h5>
            </div>
          </div>
          {/* <div>
                <button className="row" onClick={() => props.handleSelectPolicy(policy, props)}  tabIndex="-1">Open New Tab</button>
              </div>*/
          }
          <section>
            <ul id="policy-search-results" className="policy-search-results">
              <li className="header">
                <span className="policy-no">Policy No.</span>
                <span className="property-address">Property Address</span>
                <span className="quote-state">Policy Status</span>
                <span className="effctive-date">Effective Date</span>
                {/* <span className="started-on">Started On</span>
                  <span className="premium">Premium</span>
                  */
                }
              </li>
              <li>
                <a id={policy.policyNumber + policy.property.physicalAddress.address1} className={`${policy.policyNumber + policy.property.physicalAddress.address1} row`} aria-label={policy.policyNumber + policy.property.physicalAddress.address1} value={policy.policyNumber + policy.property.physicalAddress.address1} onClick={() => props.handleNewTab(policy, props)} tabIndex="-1">
                  <span className="quote-no">{policy.policyNumber}</span>
                  <span className="property-address">{
                      `${policy.property.physicalAddress.address1}
                        ${policy.property.physicalAddress.city}, ${policy.property.physicalAddress.state}
                        ${policy.property.physicalAddress.zip}`
                    }</span>
                  <span className="quote-state">{policy.status}</span>
                  <span className="effctive-date">{moment.utc(policy.effectiveDate).format('MM/DD/YYYY')}</span>
                  {/* <span
                      className="started-on"
                    >{moment.utc(policy.createdAt).format('MM/DD/YYYY')}</span>
                    <span
                      className="premium"
                    >$ {policy.rating ? policy.rating.totalPremium : '-'}</span>
                  */
                  }
                </a>
              </li>
            </ul>
          </section>
        </div>)
      }
    </div>);
  }

  //TODO RESULT CARD AND ADD CARD EXAMPLES FOR AGENCY AND USER ADMIN ONLY

  
      return (
        <div className="user-list">
          <div className="agency contact card" >
            <div className="contact-title">
              <i className="fa fa-address-book"></i>
              <label>Agency</label>
            </div>
            <div className="contact-details">
              <h4 className="agency"><span className="agency-code">16666</span> - <span className="agency-display-name">TYPTAP MANAGEMENT COMPANY</span> | <span className="agency-legal-name">TYPTAP MANAGEMENT COMPANY</span></h4>
              <p>3001 S.E. MARICAMP ROAD, OCALA, FL 34471</p>
              <div className="additional-contacts">
                <ul>
                  <li>
                    <div>
                      <h5>WALLY WAGONER</h5>
                      <span>Contact</span>
                    </div>
                    <div className="contact-methods">
                      <p className="phone">
                        <i className="fa fa-phone-square" />
                        <a href="tel:3525099008">(352) 509-9008</a>
                      </p>
                      <p className="phone">
                        <small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                        <a href="tel:8442897968">(844) 289-7968</a>
                      </p>
                      <p className="fax">
                        <i className="fa fa-fax" />
                        <a href="tel:3525334073">(352) 533-4073</a>
                      </p>
                      <p>
                        <i className="fa fa-envelope" />
                        <a href="mailto:test@typtap.com">test@typtap.com</a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-sm agency"><i className="fa fa-plus"></i>Agency</button>
        </div>
      );
    

  return <span/>;
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

const mapStateToProps = state => ({ tasks: state.cg, appState: state.appState });

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
