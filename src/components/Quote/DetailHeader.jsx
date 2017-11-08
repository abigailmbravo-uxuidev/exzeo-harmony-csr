import React, { Component } from 'react';
import _ from 'lodash';
import localStorage from 'localStorage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import normalizePhone from '../Form/normalizePhone';
import * as serviceActions from '../../actions/serviceActions';
import * as quoteStateActions from '../../actions/quoteStateActions';


export const selectPolicy = (quote, props) => {
  if (!quote.quoteNumber) return;

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

    const policy = result.payload && result.payload[0] && result.payload[0].data ? result.payload[0].data.policy : null;

    if (!policy) return;

    localStorage.setItem('lastSearchData', JSON.stringify(lastSearchData));
    localStorage.setItem('isNewTab', true);
    localStorage.setItem('policyNumber', policy.policyNumber);
    window.open('/policy/coverage', '_blank');
  });
};

export class DetailHeader extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.quoteState && nextProps.quoteState.update && nextProps.quoteState.quoteId) {
      this.props.actions.serviceActions.getQuote(nextProps.quoteState.quoteId);
      this.props.actions.quoteStateActions.getLatestQuote(false, nextProps.quoteState.quoteId);
    }
  }
  render() {
    const { quoteData } = this.props;
      if (!quoteData || !quoteData._id) { // eslint-disable-line
        return <div className="detailHeader" />;
      }
    return (<div className="detailHeader">
      <section id="quoteDetails" className="quoteDetails">
        <dl>
          <div>
            <dd>{quoteData.product === 'HO3' ? `${quoteData.product} Homeowners` : quoteData.product}</dd>
            <dd>{(quoteData.quoteNumber ? quoteData.quoteNumber : '-')}</dd>
            <dd>{quoteData.quoteState === 'Policy Issued' ? <button className="btn btn-link" onClick={() => selectPolicy(quoteData, this.props)}>{quoteData.quoteState}</button> : quoteData.quoteState}</dd>
          </div>
        </dl>
      </section>
      <section id="policyHolder" className="policyHolder">
        <dl>
          <div>
            <dt>Policyholder</dt>
            <dd>{quoteData && quoteData.policyHolders &&
                 quoteData.policyHolders[0] ? `${quoteData.policyHolders[0].firstName} ${quoteData.policyHolders[0].lastName}` : '-'}</dd>
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
  }

  }

const mapStateToProps = state => ({
  quoteState: state.quoteState,
  tasks: state.cg,
  appState: state.appState,
  quoteData: state.service.quote
});

const mapDispatchToProps = dispatch => ({
  actions: {
    quoteStateActions: bindActionCreators(quoteStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailHeader);
