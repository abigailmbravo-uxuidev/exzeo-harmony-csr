import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import * as appStateActions from '../../actions/appStateActions';
import normalizePhone from '../Form/normalizePhone';
import normalizeNumbers from '../Form/normalizeNumbers';
import * as serviceActions from '../../actions/serviceActions';
import * as policyStateActions from '../../actions/policyStateActions';

export const showEffectiveDatePopUp = (props) => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showEffectiveDateChangePopUp: true }
  );
};

export const showReinstatePolicyPopUp = (props) => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showReinstatePolicyPopUp: true }
  );
};

export class DetailHeader extends Component {
  componentDidMount() {
    this.props.actions.serviceActions.getEffectiveDateChangeReasons();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.policyState && nextProps.policyState.update && nextProps.policyState.policyNumber) {
      this.props.actions.serviceActions.getLatestPolicy(nextProps.policyState.policyNumber);
      this.props.actions.policyStateActions.updatePolicy(false, nextProps.policyState.policyNumber);
    }
    if (!_.isEqual(this.props.policy, nextProps.policy) && nextProps.policy && nextProps.policy.policyNumber) {
      this.props.actions.serviceActions.getSummaryLedger(nextProps.policy.policyNumber);
    }
  }
  render() {
    const { policy, summaryLedger } = this.props;
    const billingStatusCode = summaryLedger && summaryLedger.status ? summaryLedger.status.code : null;

    let cancellationDate = '';
    if (policy && policy.cancelDate && (policy.status.includes('Pending') || policy.status.includes('Cancel') || billingStatusCode > 8)) {
      cancellationDate = moment.utc(policy.cancelDate).format('MM/DD/YYYY');
    }
    if (policy && policy.endDate && billingStatusCode === 99) {
      cancellationDate = moment.utc(policy.endDate).format('MM/DD/YYYY');
    }

    if (!policy || !policy.policyID) {
      return (<div className="detailHeader" />);
    }

    const loc = policy.property.physicalAddress;
    const mapQuery = encodeURIComponent(`${loc.address1} ${loc.address2} ${loc.city}, ${loc.state} ${loc.zip}`)
    const mapUri = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    return (
      <div className="detailHeader">
        <section id="policyDetails" className="policyDetails">
          <dl>
            <div>
              <dd>{_.get(policy, 'product') === 'HO3' ? `${_.get(policy, 'product')} Homeowners` : _.get(policy, 'product')}</dd>
              <dd>{_.get(policy, 'policyNumber')}</dd>
              <dd className="policy-status">{`${_.get(policy, 'status')} / ${_.get(summaryLedger, 'status.displayText')}`}</dd>
            </div>
          </dl>
        </section>
        <section id="policyHolder" className="policyHolder">
          <dl>
            <div>
              <dt>Policyholder</dt>
              <dd>{`${_.get(policy, 'policyHolders[0].firstName')} ${_.get(policy, 'policyHolders[0].lastName')}`}</dd>
              <dd>{normalizePhone(_.get(policy, 'policyHolders[0].primaryPhoneNumber'))}</dd>
            </div>
          </dl>
        </section>
        <section id="policyHolderMailingAddress" className="policyHolderMailingAddress">
          <dl>
            <div>
              <dt>Mailing Address</dt>
              <dd>{_.get(policy, 'policyHolderMailingAddress.address1')}</dd>
              <dd>{_.get(policy, 'policyHolderMailingAddress.address2')}</dd>
              <dd>{`${_.get(policy, 'policyHolderMailingAddress.city')}, ${_.get(policy, 'policyHolderMailingAddress.state')} ${_.get(policy, 'policyHolderMailingAddress.zip')}`}</dd>
            </div>
          </dl>
        </section>
        <section id="propertyAddress" className="propertyAddress">
          <dl>
            <div>
              <dt>Property Address <a className="btn btn-link btn-xs btn-alt-light no-padding" target="_blank" href={mapUri}><i className="fa fa-map-marker" />Map</a></dt>
              <dd>{_.get(policy, 'property.physicalAddress.address1')}</dd>
              <dd>{_.get(policy, 'property.physicalAddress.address2')}</dd>
              <dd>{`${_.get(policy, 'property.physicalAddress.city')}, ${_.get(policy, 'property.physicalAddress.state')} ${_.get(policy, 'property.physicalAddress.zip')}`}</dd>
            </div>
          </dl>
        </section>
        <div className="detailHeader-wrapping-sections">
          <div className="wrapping-section">
            <section id="propertyCounty" className="propertyCounty">
              <dl>
                <div>
                  <dt>Property County</dt>
                  <dd>{_.get(policy, 'property.physicalAddress.county')}</dd>
                </div>
              </dl>
            </section>
            <section id="territory" className="territory">
              <dl>
                <div>
                  <dt>Territory</dt>
                  <dd>{_.get(policy, 'property.territory')}</dd>
                </div>
              </dl>
            </section>
            <section id="constructionType" className="constructionType">
              <dl>
                <div>
                  <dt>Construction Type</dt>
                  <dd>{_.get(policy, 'property.constructionType')}</dd>
                </div>
              </dl>
            </section>
          </div>
          <div className="wrapping-section">
            <section id="sourceNumber" className="sourceNumber">
              <dl>
                <div>
                  <dt>Source Number</dt>
                  <dd>{_.get(policy, 'sourceNumber')}</dd>
                </div>
              </dl>
            </section>
            <section id="policyEffectiveDate" className="policyEffectiveDate">
              <dl>
                <div>
                  <dt>Effective Date <button id="effective-date" className="btn btn-link btn-xs btn-alt-light no-padding" onClick={() => showEffectiveDatePopUp(this.props)}><i className="fa fa-pencil-square" />Edit</button></dt>
                  <dd>{moment.utc(_.get(policy, 'effectiveDate')).format('MM/DD/YYYY')}</dd>
                </div>
              </dl>
            </section>
            {policy.status !== 'Not In Force' && billingStatusCode !== 99 &&
            <section id="cancellationDate" className="cancellationDate">
              <dl>
              <div>
                <dt>Cancellation</dt>
                <dd>{policy.cancelDate &&  policy.status !== 'Policy Issued' && policy.status !== 'In Force' && billingStatusCode > 8
                  ? moment.utc(policy.cancelDate).format('MM/DD/YYYY')
                  : '' }</dd>
              </div>
            </dl>
            </section>}
            { billingStatusCode === 99 &&
            <section id="cancellationDate" className="cancellationDate">
              <dl>
              <div>
                <dt>Expiration <button id="effective-date" className="btn btn-link btn-xs btn-alt-light no-padding" onClick={() => showReinstatePolicyPopUp(this.props)}><i className="fa fa-thumbs-up" />Reinstate</button></dt>
                <dd>{policy.endDate ? moment.utc(policy.endDate).format('MM/DD/YYYY') : '' }</dd>
              </div>
            </dl>
            </section>}
          </div>
        </div>
        <section id="premium" className="premium">
          <dl>
            <div>
              <dt>Current Premium</dt>
              <dd>$ {summaryLedger ? normalizeNumbers(summaryLedger.currentPremium) : '-'}</dd>
            </div>
          </dl>
        </section>
      </div>
    );
  }
}

DetailHeader.propTypes = {
  policy: PropTypes.shape()
};


const mapStateToProps = state => ({
  policyState: state.policy,
  tasks: state.cg,
  appState: state.appState,
  summaryLedger: state.service.getSummaryLedger,
  getTransactionHistory: state.service.getTransactionHistory,
  policy: state.service.latestPolicy
});

const mapDispatchToProps = dispatch => ({
  actions: {
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailHeader);
