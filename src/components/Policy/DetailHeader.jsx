import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAppState } from '../../state/actions/appState.actions';
import { getEffectiveDateChangeReasons } from '../../state/actions/policy.actions';
import { getPolicyDetails } from '../../state/selectors/detailHeader.selectors';
import Details from '../DetailMain';
import Section from '../DetailSection';
import SectionSingle from '../DetailSectionSingle';
import MapLink from '../MapLink';

export class DetailHeader extends Component {
  componentDidMount() {
    this.props.getEffectiveDateChangeReasons();
  }

  handleEditEffectiveDate = () => {
    const { setAppState, appState } = this.props;
    setAppState(
      appState.modelName, appState.instanceId,
      { ...appState.data, showEffectiveDateChangePopUp: true }
    );
  };

  handleReinstatePolicy = () => {
    const { setAppState, appState } = this.props;
    setAppState(
      appState.modelName, appState.instanceId,
      { ...appState.data, showReinstatePolicyPopUp: true }
    );
  };

  render() {
    const { policy, policyDetails } = this.props;
    if (!policy || !policy.policyID) return (<div className="detailHeader" />);

    const {
      entityDetailsLabel,
      cancellation: { cancellationDate, showReinstatement },
      constructionType,
      county,
      details,
      effectiveDate,
      mailingAddress,
      mapURI,
      policyHolder,
      currentPremium,
      propertyAddress,
      sourceNumber,
      status,
      territory
    } = policyDetails;

    return (
      <div className="detailHeader">
        <Details
          data={details}
          dataTest="policyDetails"
          className="policyDetails">
          <dd>{status}</dd>
        </Details>

        <Section
          label="Policyholder"
          data={policyHolder}
          dataTest="policyHolderDetail"
          className="policyHolder" />

        <Section
          label="Mailing Address"
          data={mailingAddress}
          dataTest="mailingAddressDetail"
          className="policyHolderMailingAddress" />

        <Section
          label="Property Address"
          data={propertyAddress}
          type="Property"
          className="propertyAddress"
          render={() => <MapLink mapURI={mapURI} />} />

        <div className="detailHeader-wrapping-sections">
          <div className="wrapping-section">
            <SectionSingle
              label="Property County"
              value={county}
              dataTest="countyDetail"
              className="propertyCounty" />

            <SectionSingle
              label="Territory"
              value={territory}
              dataTest="territoryDetail"
              className="territory" />

            <SectionSingle
              label="Construction Type"
              dataTest="constructionTypeDetail"
              value={constructionType}
              className="constructionType" />
          </div>
          <div className="wrapping-section">
            <SectionSingle
              label="Source Number"
              value={sourceNumber}
              dataTest="sourceNumberDetail"
              className="sourceNumber" />

            <SectionSingle
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

            <SectionSingle
              label={entityDetailsLabel}
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

        <SectionSingle
          label="Current Premium"
          value={currentPremium}
          dataTest="premiumDetail"
          className="premium" />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
  policy: state.policyState.policy,
  policyDetails: getPolicyDetails(state)
});


export default connect(mapStateToProps, {
  setAppState,
  getEffectiveDateChangeReasons
})(DetailHeader);
