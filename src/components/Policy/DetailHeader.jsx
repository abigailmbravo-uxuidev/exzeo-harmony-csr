import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import moment from 'moment';

import { setAppState } from '../../state/actions/appStateActions';
import { getEffectiveDateChangeReasons } from '../../state/actions/policyActions';
import normalizeNumbers from '../Form/normalizeNumbers';
import { getPolicyDetails } from '../../state/selectors/detailHeader.selectors';
import EntityDetails from '../../components/EntityDetails';
import EntityPolicyHolder from '../../components/EntityPolicyHolder';
import EntityAddress from '../../components/EntityAddress';
import EntityPropertyCounty from '../EntityPropertyCounty';
import EntityPropertyTerritory from '../EntityPropertyTerritory';

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
    const { policy, summaryLedger, entityDetails } = this.props;
    if (!policy || !policy.policyID) return (<div className="detailHeader" />);

    const {
      details, policyHolder, mailingAddress, propertyAddress, property
    } = entityDetails;
    const { territory } = property;

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

    return (
      <div className="detailHeader">
        <EntityDetails details={details} className="policyDetails" />
        <EntityPolicyHolder policyHolder={policyHolder}className="policyHolder" />
        <EntityAddress type="Mailing" address={mailingAddress}className="policyHolderMailingAddress" />
        <EntityAddress type="Property" address={propertyAddress}className="propertyAddress" mapUri={mapUri} />
        <div className="detailHeader-wrapping-sections">
          <div className="wrapping-section">
            <EntityPropertyCounty county={propertyAddress.county}className="propertyCounty" />
            <EntityPropertyTerritory territory={territory}className="territory" />
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
                Cancellation Date
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
  summaryLedger: state.policyState.summaryLedger,
  entityDetails: getPolicyDetails(state)
});


export default connect(mapStateToProps, {
  setAppState,
  getEffectiveDateChangeReasons
})(DetailHeader);
