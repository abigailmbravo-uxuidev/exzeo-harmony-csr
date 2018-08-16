import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import moment from 'moment';
import { setAppState } from '../../state/actions/appStateActions';
import { getEffectiveDateChangeReasons } from '../../state/actions/policyActions';
import normalizePhone from '../Form/normalizePhone';
import normalizeNumbers from '../Form/normalizeNumbers';

export const showEffectiveDatePopUp = (props) => {
  props.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showEffectiveDateChangePopUp: true }
  );
};

export const showReinstatePolicyPopUp = (props) => {
  props.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showReinstatePolicyPopUp: true }
  );
};

export class DetailHeader extends Component {
  componentDidMount() {
    this.props.getEffectiveDateChangeReasons();
  }

  render() {
    const { policy, summaryLedger } = this.props;

    if (!policy || !policy.policyID) return (<div className="detailHeader" />);

    const billingStatusCode = summaryLedger && summaryLedger.status ? summaryLedger.status.code : null;

    let cancellationDate = '';

    if (policy && policy.status && (policy.status.includes('Pending') || policy.status.includes('Cancel') || billingStatusCode > 8) && summaryLedger) {
      cancellationDate = policy.cancelDate
        ? moment.utc(policy.cancelDate).format('MM/DD/YYYY')
        : moment.utc(summaryLedger.nonPaymentNoticeDueDate).format('MM/DD/YYYY');
    }
    if (policy && policy.endDate && billingStatusCode === 99) {
      cancellationDate = moment.utc(policy.endDate).format('MM/DD/YYYY');
    }

    const loc = policy.property.physicalAddress;
    const mapQuery = encodeURIComponent(`${loc.address1} ${loc.address2} ${loc.city}, ${loc.state} ${loc.zip}`);
    const mapUri = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
    const showReinstatement = policy.status === 'Cancelled' && [12, 13, 14, 15].includes(billingStatusCode);
    const displayExpirationDate = ['In Force', 'Policy Issued', 'Not In Force'].includes(policy.status) && [0, 1, 2, 3, 6, 99].includes(billingStatusCode);

    return (<div className="detailHeader">
      <section id="policyDetails" className="policyDetails">
        <dl>
          <div>
            <dd>{_get(policy, 'product') === 'HO3' ? `${_get(policy, 'product')} Homeowners` : _get(policy, 'product')}</dd>
            <dd>{_get(policy, 'policyNumber')}</dd>
            <dd className="policy-status">{`${_get(policy, 'status')} / ${_get(summaryLedger, 'status.displayText')}`}</dd>
          </div>
        </dl>
      </section>
      <section id="policyHolder" className="policyHolder">
        <dl>
          <div>
            <dt>Policyholder</dt>
            <dd>{`${_get(policy, 'policyHolders[0].firstName')} ${_get(policy, 'policyHolders[0].lastName')}`}</dd>
            <dd>{normalizePhone(_get(policy, 'policyHolders[0].primaryPhoneNumber'))}</dd>
          </div>
        </dl>
      </section>
      <section id="policyHolderMailingAddress" className="policyHolderMailingAddress">
        <dl>
          <div>
            <dt>Mailing Address</dt>
            <dd>{_get(policy, 'policyHolderMailingAddress.address1')}</dd>
            <dd>{_get(policy, 'policyHolderMailingAddress.address2')}</dd>
            <dd>{`${_get(policy, 'policyHolderMailingAddress.city')}, ${_get(policy, 'policyHolderMailingAddress.state')} ${_get(policy, 'policyHolderMailingAddress.zip')}`}</dd>
          </div>
        </dl>
      </section>
      <section id="propertyAddress" className="propertyAddress">
        <dl>
          <div>
            <dt>Property Address <a className="btn btn-link btn-xs btn-alt-light no-padding" target="_blank" href={mapUri}><i className="fa fa-map-marker" />Map</a></dt>
            <dd>{_get(policy, 'property.physicalAddress.address1')}</dd>
            <dd>{_get(policy, 'property.physicalAddress.address2')}</dd>
            <dd>{`${_get(policy, 'property.physicalAddress.city')}, ${_get(policy, 'property.physicalAddress.state')} ${_get(policy, 'property.physicalAddress.zip')}`}</dd>
          </div>
        </dl>
      </section>
      <div className="detailHeader-wrapping-sections">
        <div className="wrapping-section">
          <section id="propertyCounty" className="propertyCounty">
            <dl>
              <div>
                <dt>Property County</dt>
                <dd>{_get(policy, 'property.physicalAddress.county')}</dd>
              </div>
            </dl>
          </section>
          <section id="territory" className="territory">
            <dl>
              <div>
                <dt>Territory</dt>
                <dd>{_get(policy, 'property.territory')}</dd>
              </div>
            </dl>
          </section>
          <section id="constructionType" className="constructionType">
            <dl>
              <div>
                <dt>Construction Type</dt>
                <dd>{_get(policy, 'property.constructionType')}</dd>
              </div>
            </dl>
          </section>
        </div>
        <div className="wrapping-section">
          <section id="sourceNumber" className="sourceNumber">
            <dl>
              <div>
                <dt>Source Number</dt>
                <dd>{_get(policy, 'sourceNumber')}</dd>
              </div>
            </dl>
          </section>
          <section id="policyEffectiveDate" className="policyEffectiveDate">
            <dl>
              <div>
                <dt>Effective Date <button id="effective-date" className="btn btn-link btn-xs btn-alt-light no-padding" onClick={() => showEffectiveDatePopUp(this.props)}><i className="fa fa-pencil-square" />Edit</button></dt>
                <dd>{moment.utc(_get(policy, 'effectiveDate')).format('MM/DD/YYYY')}</dd>
              </div>
            </dl>
          </section>
          {policy &&
          <section id="cancellationDate" className="cancellationDate">
            <dl>
              <div>
                <dt>
                  <span id="cancellationDateLabel">{displayExpirationDate ? 'Expiration' : 'Cancellation'} Date</span>
                  {policy && showReinstatement &&
                    <button id="show-reinstate" className="btn btn-link btn-xs btn-alt-light no-padding" onClick={() => showReinstatePolicyPopUp(this.props)}><i className="fa fa-thumbs-up" />Reinstate</button>
                  }
                </dt>
                <dd>{cancellationDate}</dd>
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
    </div>);
  }
}

DetailHeader.propTypes = {
  policy: PropTypes.shape()
};

const mapStateToProps = state => ({
  appState: state.appState,
  policy: state.policyState.policy,
  summaryLedger: state.policyState.summaryLedger
});


export default connect(mapStateToProps, {
  setAppState,
  getEffectiveDateChangeReasons
})(DetailHeader);
