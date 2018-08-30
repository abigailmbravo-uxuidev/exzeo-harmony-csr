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
import EntityPropertyConstructionType from '../EntityPropertyConstructionType';
import EntityPropertySourceNumber from '../EntityPropertySourceNumber';
import EntityCancellationDate from '../EntityCancellationDate';
import EntityEffectiveDate from '../EntityEffectiveDate';
import EntityPremium from '../EntityPremium';

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
      details, policyHolder, mailingAddress, propertyAddress, property, effectiveDate, cancellationDate, showReinstatement, currentPremium
    } = entityDetails;
    const { territory, constructionType, sourceNumber } = property;

    const mapQuery = encodeURIComponent(`${propertyAddress.address1} ${propertyAddress.address2} ${propertyAddress.city}, ${propertyAddress.state} ${propertyAddress.zip}`);
    const mapUri = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    return (
      <div className="detailHeader">
        <EntityDetails details={details} className="policyDetails" />
        <EntityPolicyHolder policyHolder={policyHolder} className="policyHolder" />
        <EntityAddress type="Mailing" address={mailingAddress} className="policyHolderMailingAddress" />
        <EntityAddress type="Property" address={propertyAddress} className="propertyAddress" mapUri={mapUri} />
        <div className="detailHeader-wrapping-sections">
          <div className="wrapping-section">
            <EntityPropertyCounty county={propertyAddress.county} className="propertyCounty" />
            <EntityPropertyTerritory territory={territory} className="territory" />
            <EntityPropertyConstructionType constructionType={constructionType} className="constructionType" />
          </div>
          <div className="wrapping-section">
            <EntityPropertySourceNumber sourceNumber={sourceNumber} className="sourceNumber" />
            <EntityEffectiveDate effectiveDate={effectiveDate} showEffectiveDatePopUp={() => showEffectiveDatePopUp(this.props)} className="effectiveDate" />
            <EntityCancellationDate showReinstatement={showReinstatement} cancellationDate={cancellationDate} showReinstatePolicyPopUp={() => showReinstatePolicyPopUp(this.props)} className="cancellationDate" />
          </div>
        </div>
        <EntityPremium currentPremium={currentPremium} className="premium" />
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
