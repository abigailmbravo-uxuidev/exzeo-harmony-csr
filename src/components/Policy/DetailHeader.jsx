import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import normalizePhone from '../Form/normalizePhone';
import normalizeNumbers from '../Form/normalizeNumbers';

export const handleGetPolicy = (state) => {
  const csrQuoteTask = (state.cg && state.appState && state.cg.csrQuote) ? state.cg.csrQuote.data : null;
  const endorsePolicyModelTask = (state.cg && state.appState && state.cg.endorsePolicyModel) ? state.cg.endorsePolicyModel.data : null;
  if (!csrQuoteTask && !endorsePolicyModelTask) return {};

  const policyDataEndorsement = endorsePolicyModelTask && _.find(endorsePolicyModelTask.model.variables, { name: 'retrievePolicy' }) ? _.find(endorsePolicyModelTask.model.variables, { name: 'retrievePolicy' }).value[0] : null;
  const policyData = csrQuoteTask && _.find(csrQuoteTask.model.variables, { name: 'retrievePolicy' }) ? _.find(csrQuoteTask.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return policyDataEndorsement || policyData;
};

const DetailHeader = (props) => {
  const { policyData } = props;
  if (!policyData.policyID) {
    return (<div className="detailHeader" />);
  }
  return (<div className="detailHeader">
    <section id="policyDetails" className="policyDetails">
      <dl>
        <div>
          <dd>{_.get(policyData, 'product') === 'HO3' ? `${_.get(policyData, 'product')} Homeowners` : _.get(policyData, 'product')}</dd>
          <dd>{_.get(policyData, 'policyNumber')}</dd>
          <dd>{_.get(policyData, 'status')}</dd>
        </div>
      </dl>
    </section>
    <section id="policyholder" className="policyholder">
      <dl>
        <div>
          <dt>Policyholder</dt>
          <dd>{`${_.get(policyData, 'policyHolders[0].firstName')} ${_.get(policyData, 'policyHolders[0].lastName')}`}</dd>
          <dd>{normalizePhone(_.get(policyData, 'policyHolders[0].primaryPhoneNumber'))}</dd>
        </div>
      </dl>
    </section>
    <section id="policyHolderMailingAddress" className="policyHolderMailingAddress">
      <dl>
        <div>
          <dt>Mailing Address</dt>
          <dd>{_.get(policyData, 'policyHolderMailingAddress.address1')}</dd>
          <dd>{_.get(policyData, 'policyHolderMailingAddress.address2')}</dd>
          <dd>{`${_.get(policyData, 'policyHolderMailingAddress.city')}, ${_.get(policyData, 'policyHolderMailingAddress.state')} ${_.get(policyData, 'policyHolderMailingAddress.zip')}`}</dd>
        </div>
      </dl>
    </section>
    <section id="propertyAddress" className="propertyAddress">
      <dl>
        <div>
          <dt>Property Address</dt>
          <dd>{_.get(policyData, 'property.physicalAddress.address1')}</dd>
          <dd>{_.get(policyData, 'property.physicalAddress.address2')}</dd>
          <dd>{`${_.get(policyData, 'property.physicalAddress.city')}, ${_.get(policyData, 'property.physicalAddress.state')} ${_.get(policyData, 'property.physicalAddress.zip')}`}</dd>
        </div>
      </dl>
    </section>
    <section id="propertyCounty" className="propertyCounty">
      <dl>
        <div>
          <dt>Property County</dt>
          <dd>{_.get(policyData, 'property.physicalAddress.county')}</dd>
        </div>
      </dl>
    </section>
    <section id="territory" className="territory">
      <dl>
        <div>
          <dt>Territory</dt>
          <dd>{_.get(policyData, 'property.territory')}</dd>
        </div>
      </dl>
    </section>
    <section id="sourceNumber" className="sourceNumber">
      <dl>
        <div>
          <dt>Source Number</dt>
          <dd>{_.get(policyData, 'sourceNumber')}</dd>
        </div>
      </dl>
    </section>
    <section id="policyEffectiveDate" className="policyEffectiveDate">
      <dl>
        <div>
          <dt>Effective Date</dt>
          <dd>{moment.utc(_.get(policyData, 'effectiveDate')).format('MM/DD/YYYY')}</dd>
        </div>
      </dl>
    </section>
    <section id="cancellationDate" className="cancellationDate">
      <dl>
        <div>
          <dt>Cancellation Date</dt>
          <dd>{_.get(policyData, 'cancellationDate') ? moment.utc(_.get(policyData, 'cancellationDate')).format('MM/DD/YYYY') : '' }</dd>
        </div>
      </dl>
    </section>
    <section id="premium" className="premium">
      <dl>
        <div>
          <dt>Current Premium</dt>
          <dd>$ {normalizeNumbers(_.get(policyData, 'rating.totalPremium'))}</dd>
        </div>
      </dl>
    </section>
  </div>);
};

DetailHeader.propTypes = {
  policyData: PropTypes.shape()
};


const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  policyData: handleGetPolicy(state)
});

export default connect(mapStateToProps)(DetailHeader);
