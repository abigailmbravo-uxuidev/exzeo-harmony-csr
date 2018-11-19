import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as serviceActions from '../../state/actions/service.actions';
import { getQuoteDetails } from '../../state/selectors/detailHeader.selectors';
import Details from '../DetailMain';
import Section from '../DetailSection';
import SectionSingle from '../DetailSectionSingle';
import MapLink from '../MapLink';

export class DetailHeader extends Component {
  handleSelectPolicy = () => {
    const { quoteData } = this.props;
    if (!quoteData.policyNumber) return;
    window.open(`/policy/${quoteData.policyNumber}/coverage`, '_blank');
  };

  render() {
    const { quoteData, quoteDetails } = this.props;
      if (!quoteData || !quoteData._id) { // eslint-disable-line
      return <div className="detailHeader" />;
    }

    const {
      constructionType,
      county,
      currentPremium,
      details,
      effectiveDate,
      mailingAddress,
      mapURI,
      policyHolder,
      propertyAddress,
      status,
      territory
    } = quoteDetails;

    return (
      <div className="detailHeader">
        <Details
          data={details}
          dataTest="quoteDetails"
          className="quoteDetails">
          <dd className="status">
            {status === 'Policy Issued' ?
              <button className="btn btn-link btn-alt-light" data-test="selectPolicy" onClick={this.handleSelectPolicy}>
                {status}
              </button>
              :
              status
            }
          </dd>
        </Details>

        <Section
          data={policyHolder}
          label="Policyholder"
          dataTest="policyholderDetail"
          className="policyHolder" />

        {Object.keys(mailingAddress).length > 0 &&
        <Section
          label="Mailing Address"
          data={mailingAddress}
          dataTest="mailingAddressDetail"
          className="policyHolderMailingAddress" />
        }

        <Section
          label="Property Address"
          data={propertyAddress}
          dataTest="propertyAddressDetail"
          className="propertyAddress"
          render={() => <MapLink mapURI={mapURI} />} />

        <SectionSingle
          label="Property County"
          value={county}
          dataTest="propertyCountyDetail"
          className="propertyCounty" />

        <SectionSingle
          label="Territory"
          value={territory}
          dataTest="territoryDetail"
          className="territory" />

        <SectionSingle
          label="Construction Type"
          value={constructionType}
          dataTest="constructionTypeDetail"
          className="constructionType" />

        <SectionSingle
          label="Effective Date"
          value={effectiveDate}
          dataTest="effectiveDateDetail"
          className="quoteEffectiveDate" />

        <SectionSingle
          label="Premium"
          value={currentPremium}
          dataTest="premiumDetail"
          className="premium" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quoteState: state.quoteState,
  tasks: state.cg,
  appState: state.appState,
  quoteDetails: getQuoteDetails(state),
  quoteData: state.quoteState.quote
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailHeader);
