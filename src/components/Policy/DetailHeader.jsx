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

  handleEditEffectiveDate = (props) => {
    props.setAppState(
      props.appState.modelName, props.appState.instanceId,
      { ...props.appState.data, showEffectiveDateChangePopUp: true }
    );
  };

  handleReinstatePolicy = (props) => {
    props.setAppState(
      props.appState.modelName, props.appState.instanceId,
      { ...props.appState.data, showReinstatePolicyPopUp: true }
    );
  };

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
      currentPremium,
      propertyAddress,
      status,
      territory, constructionType, sourceNumber
    } = entityDetails;

    return (
      <div className="detailHeader">
        <Details
          data={details}
          dataTest="policyDetails"
          className="policyDetails">
          <dd>{status}</dd>
        </Details>

        <Address
          label="Policyholder"
          data={policyHolder}
          dataTest="policyHolderDetail"
          className="policyHolder" />

        <Address
          label="Mailing Address"
          data={mailingAddress}
          dataTest="mailingAddressDetail"
          className="policyHolderMailingAddress" />

        <Address
          label="Property Address"
          data={propertyAddress}
          type="Property"
          className="propertyAddress"
          render={() => (mapURI &&
            <a className="btn btn-link btn-xs btn-alt-light no-padding" target="_blank" href={mapURI}>
              <i className="fa fa-map-marker" />Map
            </a>
          )} />

        <div className="detailHeader-wrapping-sections">
          <div className="wrapping-section">
            <PropertyCounty
              label="Property County"
              value={county}
              dataTest="countyDetail"
              className="propertyCounty" />

            <PropertyCounty
              label="Territory"
              value={territory}
              dataTest="territoryDetail"
              className="territory" />

            <PropertyCounty
              label="Construction Type"
              dataTest="constructionTypeDetail"
              value={constructionType}
              className="constructionType" />
          </div>
          <div className="wrapping-section">
            <PropertyCounty
              label="Source Number"
              value={sourceNumber}
              dataTest="sourceNumberDetail"
              className="sourceNumber" />

            <PropertyCounty
              label="Effective Date"
              value={effectiveDate}
              dataTest="effectiveDateDetail"
              className="effectiveDate"
              render={() => (
                <button
                  id="effective-date"
                  className="btn btn-link btn-xs btn-alt-light no-padding"
                  onClick={this.handleEditEffectiveDate}>
                  <i className="fa fa-pencil-square" />Edit
                </button>
              )} />

            <PropertyCounty
              label="Cancellation Date"
              value={cancellationDate}
              dataTest="cancellationDateDetail"
              className="cancellationDate"
              render={() => (showReinstatement &&
                <button
                  id="show-reinstate"
                  className="btn btn-link btn-xs btn-alt-light no-padding"
                  onClick={this.handleReinstatePolicy}>
                  <i className="fa fa-thumbs-up" />Reinstate
                </button>
              )} />
          </div>
        </div>
        <PropertyCounty
          label="Current Premium"
          value={currentPremium}
          dataTest="premiumDetail"
          className="premium" />
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
