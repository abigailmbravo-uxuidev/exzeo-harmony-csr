import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';

const handleGetPolicy = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const policyData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return policyData;
};


const DetailHeader = (props) => {
  const { policyData } = props;
  return (<div className="detailHeader">
    <section id="policyholder" className="policyholder">
      <dl>
        <div>
          <dt>Policyholder</dt>
          <dd>{`${_.get(policyData, 'policyHolders[0].firstName')} ${_.get(policyData, 'policyHolders[0].lastName')}`}</dd>
        </div>
      </dl>
    </section>
    <section id="quoteDetails" className="quoteDetails">
      <dl>
        <div>
          <dt>Policy Number</dt>
          <dd>{_.get(policyData, 'policyNumber')}</dd>
        </div>
      </dl>
    </section>
    <section id="propertyAddress" className="propertyAddress">
      <dl>
        <div>
          <dt>Property Address</dt>
          <dd>{_.get(policyData, 'policyHolderMailingAddress.address1')}</dd>
          <dd>{_.get(policyData, 'policyHolderMailingAddress.address2')}</dd>
          <dd>{`${_.get(policyData, 'policyHolderMailingAddress.city')} ${_.get(policyData, 'policyHolderMailingAddress.state')}, ${_.get(policyData, 'policyHolderMailingAddress.zip')}`}</dd>
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
    <section id="policyholderPhone" className="policyholderPhone">
      <dl>
        <div>
          <dt>Policyholder Phone</dt>
          <dd>{_.get(policyData, 'policyHolders[0].primaryPhoneNumber')}</dd>
        </div>
      </dl>
    </section>
    <section id="policyStatus" className="policyStatus">
      <dl>
        <div>
          <dt>Policy Status</dt>
          <dd>{_.get(policyData, 'status')}</dd>
        </div>
      </dl>
    </section>
    <section id="policyEffectiveDate" className="policyEffectiveDate">
      <dl>
        <div>
          <dt>Effective Date</dt>
          <dd>{moment.utc(_.get(policyData, 'effectiveDate')).format('YYYY-MM-DD')}</dd>
        </div>
      </dl>
    </section>
    <section id="cencellationDate" className="cencellationDate">
      <dl>
        <div>
          <dt>Cancellation Date</dt>
          <dd>{moment.utc(_.get(policyData, 'cencellationDate')).format('YYYY-MM-DD')}</dd>
        </div>
      </dl>
    </section>
    <section id="premium" className="premium">
      <dl>
        <div>
          <dt>Current Premium</dt>
          <dd>$ {_.get(policyData, 'rating.totalPremium')}</dd>
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
