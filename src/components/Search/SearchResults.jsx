import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const didNotFindAddressHint = (props) => {
  const dontSeeAddress = !props.appState.data.dontSeeAddress;
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { dontSeeAddress });
}

const SearchResults = (props) => {
  if (
    props.tasks[props.appState.modelName] &&
    props.tasks[props.appState.modelName].data.previousTask &&
    props.tasks[props.appState.modelName].data.previousTask.name === 'searchAddress' &&
    props.tasks[props.appState.modelName].data.activeTask.name !== 'askToSearchAgain'
  ) {
    const addresses = props.tasks[props.appState.modelName].data.previousTask.value.result.IndexResult;
    return (
      <div>
        <ul className="results result-cards">
          {addresses
            ? addresses.map((address, index) => (
              <li id={address.id} key={index}>
                <a onClick={() => props.handleSelectAddress(address, props)} tabIndex="-1">
                  <i className="card-icon fa fa-map-marker" />
                  <section>
                    <h4>{address.physicalAddress.address1}</h4>
                    <p>{address.physicalAddress.city}, {address.physicalAddress.state} {address.physicalAddress.zip}</p>
                  </section>
                  <i className="fa fa-chevron-circle-right" />
                </a>
              </li>
            ))
            : null}
        </ul>
    
        <div className="card address-not-found">
          <a onClick={() => didNotFindAddressHint(props)} className="btn btn-secondary"><i className="fa fa-map-marker"></i> Don't see your address?</a>
          { props.appState.data.dontSeeAddress && <div>
            <p>If you don't see your address in the list provided, try entering less
              address information to see if that improves your search results. Please note, at this
              time we are only writing single family dwellings in the state of Florida.</p>
            <p>If you still have problems finding an address, please <a href="tel:888-210-5235"><strong>call us</strong></a>
              and one of our representatives will be glad to help you.</p>
          </div>
          }
        </div>
      </div>
    );
  }
  if (
    props.tasks[props.appState.modelName] &&
    props.tasks[props.appState.modelName].data.activeTask &&
    props.tasks[props.appState.modelName].data.activeTask.name === 'chooseQuote'
  ) {
    const quoteResults = props.tasks[props.appState.modelName].data.previousTask.value.result;
    const quote = quoteResults[0];
    return (quote ? (
      <div className="quote-list">
              {/*add iteration of cards within this div*/}
              <div id={quote._id} className="card">
                <div className="icon-name">
                  <i className="card-icon fa fa-user-circle" />
                  <h4>{quote.policyHolders[0] && `${quote.policyHolders[0].firstName} ${quote.policyHolders[0].lastName}`}</h4>
                </div>
                <section>
                  <ul>
                    <li className="header">
                      <span className="quote-no">Quote No.</span>
                      <span className="property-address">Property Address</span>
                      <span className="quote-state">Quote State</span>
                      <span className="effctive-date">Effective Date</span>
                      <span className="started-on">Started On</span>
                      <span className="premium">Premium</span>
                    </li>
                    <li>
                      <a onClick={() => props.handleSelectQuote(quote, props)} tabIndex="-1" className="quote-no">{quote.quoteNumber}</a>
                      <span className="property-address">{`${quote.property.physicalAddress.address1}
                        ${quote.property.physicalAddress.city}, ${quote.property.physicalAddress.state}
                        ${quote.property.physicalAddress.zip}
                        `}</span>
                      <span className="quote-state">{quote.quoteState}</span>
                      <span className="effctive-date">{moment.utc(quote.effectiveDate).format('YYYY-MM-DD')}</span>
                      <span className="started-on">{moment.utc(quote.createdAt).format('YYYY-MM-DD')}</span>
                      <span className="premium">$ [{quote.rating ? quote.rating.totalPremium : '-'}]</span>
                    </li>
                  </ul>
                </section>
              </div>
      </div>
    ) : null);
  }

  return <span />;
};

SearchResults.propTypes = {
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({
      dontSeeAddress: PropTypes.bool
    })
  }),
  tasks: PropTypes.shape(),
  handleSelect: PropTypes.func,
  handleSelectQuote: PropTypes.func
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
