import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import localStorage from 'localStorage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import normalizePhone from '../Form/normalizePhone';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';

export const handleGetQuote = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const quoteEnd = _.find(taskData.model.variables, { name: 'retrieveQuote' })
    ? _.find(taskData.model.variables, { name: 'retrieveQuote' }).value.result
    : {};
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' })
    ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result
    : quoteEnd;
  return quoteData;
};

export const selectPolicy = (quote, props) => {
  if (!quote.policyNumber) return;

  props.actions.serviceActions.getPolicyFromPolicyNumber(quote.companyCode, quote.state, quote.product, quote.policyNumber).then((result) => {
    const lastSearchData = {
      firstName: '',
      lastName: '',
      address: '',
      quoteNumber: '',
      policyNumber: encodeURIComponent(quote.policyNumber),
      zip: '',
      searchType: 'policy'
    };

    localStorage.setItem('lastSearchData', JSON.stringify(lastSearchData));
    localStorage.setItem('isNewTab', true);
    localStorage.setItem('policyID', result.payload[0].data.policy.policyID);
    window.open('/policy/coverage', '_blank');
  });
};

export const DetailHeader = (props) => {
  const { quoteData } = props;
   if (!quoteData || !quoteData._id) { // eslint-disable-line
     return <div className="detailHeader" />;
   }
  return (<div className="detailHeader">
    <section id="quoteDetails" className="quoteDetails">
      <dl>
        <div>
          <dd>{quoteData.product === 'HO3' ? `${quoteData.product} Homeowners` : quoteData.product}</dd>
          <dd>{(quoteData.quoteNumber ? quoteData.quoteNumber : '-')}</dd>
          <dd>{quoteData.quoteState === 'Policy Issued' ? <button tabIndex={'0'} className="btn btn-link" onClick={() => selectPolicy(quoteData, props)}>{quoteData.quoteState}</button> : quoteData.quoteState}</dd>
        </div>
      </dl>
    </section>
    <section id="policyholder" className="policyholder">
      <dl>
        <div>
          <dt>Policyholder</dt>
          <dd>{props.quoteData && props.quoteData.policyHolders &&
              props.quoteData.policyHolders[0] ? `${props.quoteData.policyHolders[0].firstName} ${props.quoteData.policyHolders[0].lastName}` : '-'}</dd>
          <dd>{quoteData.policyHolders && quoteData.policyHolders[0] ? normalizePhone(quoteData.policyHolders[0].primaryPhoneNumber) : '' }</dd>
        </div>
      </dl>
    </section>
    {quoteData.policyHolderMailingAddress && <section id="policyHolderMailingAddress" className="policyHolderMailingAddress">
      <dl>
        <div>
          <dt>Mailing Address</dt>
          <dd>{quoteData.policyHolderMailingAddress.address1}</dd>
          <dd>{quoteData.policyHolderMailingAddress.address2}</dd>
          <dd>
            {quoteData.policyHolderMailingAddress.city},&nbsp;
                  {quoteData.policyHolderMailingAddress.state}&nbsp;
            {quoteData.policyHolderMailingAddress.zip}
          </dd>
        </div>
      </dl>
      </section>}
    <section id="propertyAddress" className="propertyAddress">
      <dl>
        <div>
          <dt>Property Address</dt>
          <dd>{quoteData.property.physicalAddress.address1}</dd>
          <dd>{quoteData.property.physicalAddress.address2}</dd>
          <dd>
            {quoteData.property.physicalAddress.city},&nbsp;
                  {quoteData.property.physicalAddress.state}&nbsp;
            {quoteData.property.physicalAddress.zip}
          </dd>
        </div>
      </dl>
    </section>
    <section id="propertyCounty" className="propertyCounty">
      <dl>
        <div>
          <dt>Property County</dt>
          <dd>{quoteData.property.physicalAddress.county}</dd>
        </div>
      </dl>
    </section>
    <section id="territory" className="territory">
      <dl>
        <div>
          <dt>Territory</dt>
          <dd>{quoteData.property.territory}</dd>
        </div>
      </dl>
    </section>
    <section id="quoteEffectiveDate" className="quoteEffectiveDate">
      <dl>
        <div>
          <dt>Effective Date</dt>
          <dd>{moment.utc(_.get(quoteData, 'effectiveDate')).format('YYYY-MM-DD')}</dd>
        </div>
      </dl>
    </section>
    <section id="premium" className="premium">
      <dl>
        <div>
          <dt>Premium</dt>
          <dd>
                $ {quoteData.rating && quoteData.rating.totalPremium ? quoteData.rating.totalPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '--'}
          </dd>
        </div>
      </dl>
    </section>
  </div>);
};


DetailHeader.propTypes = {
  completedTasks: PropTypes.any, // eslint-disable-line
  quoteData: PropTypes.shape()
};


const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  quoteData: handleGetQuote(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailHeader);
