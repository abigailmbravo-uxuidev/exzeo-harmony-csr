import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setAppState } from '../../state/actions/appStateActions';
import { getEffectiveDateChangeReasons } from '../../state/actions/policyActions';
import { getPolicyDetails } from '../../state/selectors/detailHeader.selectors';
import Details from '../../components/EntityDetails';
import PolicyHolder from '../../components/EntityPolicyHolder';
import Address from '../../components/EntityAddress';
import PropertyCounty from '../EntityPropertyCounty';
import PropertyTerritory from '../EntityPropertyTerritory';
import PropertyConstructionType from '../EntityPropertyConstructionType';
import PropertySourceNumber from '../EntityPropertySourceNumber';
import CancellationDate from '../EntityCancellationDate';
import EffectiveDate from '../EntityEffectiveDate';
import Premium from '../EntityPremium';

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
    const { policy, entityDetails } = this.props;
    if (!policy || !policy.policyID) return (<div className="detailHeader" />);

    const {
      cancellation: { cancellationDate, showReinstatement },
      county,
      details,
      effectiveDate,
      mailingAddress,
      mapURI,
      policyHolder,
      premium: { currentPremium },
      property,
      propertyAddress
    } = entityDetails;
    const { territory, constructionType, sourceNumber } = property;

    return (
      <div className="detailHeader">
        <Details details={details} className="policyDetails">
          <dd>{details.status}</dd>
        </Details>
        <PolicyHolder
          policyHolder={policyHolder}
          label="Policyholder"
          className="policyHolder" />

        <Address
          label="Mailing Address"
          type="Mailing"
          address={mailingAddress}
          className="policyHolderMailingAddress" />

        <Address
          label="Property Address"
          data={propertyAddress}
          type="Property"
          render={() => (mapURI &&
            <a className="btn btn-link btn-xs btn-alt-light no-padding" target="_blank" href={mapURI}>
              <i className="fa fa-map-marker" />Map
            </a>
          )}
          className="propertyAddress" />

        <div className="detailHeader-wrapping-sections">
          <div className="wrapping-section">
            <PropertyCounty
              label="Property County"
              county={county}
              className="propertyCounty" />

            <PropertyTerritory
              label="Territory"
              territory={territory}
              className="territory" />

            <PropertyConstructionType
              label="Construction Type"
              constructionType={constructionType}
              className="constructionType" />
          </div>

          <div className="wrapping-section">
            <PropertySourceNumber
              label="Source Number"
              sourceNumber={sourceNumber}
              className="sourceNumber" />

            <EffectiveDate
              labe="Effective Date"
              effectiveDate={effectiveDate}
              showEffectiveDatePopUp={() => showEffectiveDatePopUp(this.props)}
              className="effectiveDate" />

            <CancellationDate
              label="Cancellation Date"
              showReinstatement={showReinstatement}
              cancellationDate={cancellationDate}
              showReinstatePolicyPopUp={() => showReinstatePolicyPopUp(this.props)}
              className="cancellationDate" />
          </div>
        </div>
        <Premium
          currentPremium={currentPremium}
          className="premium"
          label="Current Premium" />
      </div>
    );
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
