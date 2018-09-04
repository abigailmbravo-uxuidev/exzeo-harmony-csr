import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import normalizePhone from '../Form/normalizePhone';
import * as serviceActions from '../../state/actions/serviceActions';
import * as quoteStateActions from '../../state/actions/quoteStateActions';
import { getQuoteDetails } from '../../state/selectors/detailHeader.selectors';

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

export class DetailHeader extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.quoteState && nextProps.quoteState.update && nextProps.quoteState.quoteId) {
      this.props.actions.serviceActions.getQuote(nextProps.quoteState.quoteId);
      this.props.actions.quoteStateActions.getLatestQuote(false, nextProps.quoteState.quoteId);
    }
  }

  handleSelectPolicy = () => {
    const { quoteData } = this.props;
    if (!quoteData.policyNumber) return;
    window.open(`/policy/${quoteData.policyNumber}/coverage`, '_blank');
  };

  render() {
    const { quoteData, entityDetails } = this.props;
      if (!quoteData || !quoteData._id) { // eslint-disable-line
      return <div className="detailHeader" />;
    }

    const {
      details, policyHolder, mailingAddress, propertyAddress, property, effectiveDate, premium: { currentPremium }
    } = entityDetails;
    const { territory, constructionType } = property;

    const mapQuery = encodeURIComponent(`${propertyAddress.address1} ${propertyAddress.address2} ${propertyAddress.city}, ${propertyAddress.state} ${propertyAddress.zip}`);
    const mapUri = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    return (
      <div className="detailHeader">
        <EntityDetails details={details} className="quoteDetails">
          <dd>
            {details.status === 'Policy Issued' ?
              <button className="btn btn-link" data-test="selectPolicy" onClick={this.handleSelectPolicy}>
                {details.status}
              </button>
              :
              details.status
            }
          </dd>
        </EntityDetails>
        <EntityPolicyHolder policyHolder={policyHolder} label="Policyholder" className="policyHolder" />
        {Object.keys(mailingAddress).length > 0 &&
        <EntityAddress type="Mailing" address={mailingAddress} className="policyHolderMailingAddress" />
        }
        <EntityAddress type="Property" address={propertyAddress} className="propertyAddress" mapUri={mapUri} />
        <EntityPropertyCounty county={propertyAddress.county} className="propertyCounty" />
        <EntityPropertyTerritory territory={territory} className="territory" />
        <EntityPropertyConstructionType constructionType={constructionType} className="constructionType" />
        <EntityEffectiveDate effectiveDate={effectiveDate} className="quoteEffectiveDate" />
        <EntityPremium currentPremium={currentPremium} className="premium" label="Premium" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quoteState: state.quoteState,
  tasks: state.cg,
  appState: state.appState,
  quoteData: state.service.quote,
  entityDetails: getQuoteDetails(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    quoteStateActions: bindActionCreators(quoteStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailHeader);
