import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import normalizePhone from '../Form/normalizePhone';
import normalizeNumbers from '../Form/normalizeNumbers';
import * as serviceActions from '../../actions/serviceActions';


export class DetailHeader extends Component {
  componentDidMount() {
    this.props.actions.serviceActions.getAgency('TTIC', 'FL', this.props.service.agency.agencyCode);
  }
  componentWillReceiveProps(nextProps) {

  }
  render() {
    const { agency } = this.props;
/* if (!policy || !policy.policyID) {
      return (<div className="detailHeader" />);
    }
    return (<div className="detailHeader">
      <section id="policyDetails" className="policyDetails">
        <dl>
          <div>
            <dd>{_.get(policy, 'product') === 'HO3' ? `${_.get(policy, 'product')} Homeowners` : _.get(policy, 'product')}</dd>
            <dd>{_.get(policy, 'policyNumber')}</dd>
            <dd>{`${_.get(policy, 'status')} / ${_.get(summaryLedger, 'status.displayText')}`}</dd>
          </div>
        </dl>
      </section>
      <section id="policyholder" className="policyholder">
        <dl>
          <div>
            <dt>Policyholder</dt>
            <dd>{`${_.get(policy, 'policyHolders[0].firstName')} ${_.get(policy, 'policyHolders[0].lastName')}`}</dd>
            <dd>{normalizePhone(_.get(policy, 'policyHolders[0].primaryPhoneNumber'))}</dd>
          </div>
        </dl>
      </section>
      <section id="policyHolderMailingAddress" className="policyHolderMailingAddress">
        <dl>
          <div>
            <dt>Mailing Address</dt>
            <dd>{_.get(policy, 'policyHolderMailingAddress.address1')}</dd>
            <dd>{_.get(policy, 'policyHolderMailingAddress.address2')}</dd>
            <dd>{`${_.get(policy, 'policyHolderMailingAddress.city')}, ${_.get(policy, 'policyHolderMailingAddress.state')} ${_.get(policy, 'policyHolderMailingAddress.zip')}`}</dd>
          </div>
        </dl>
      </section>
      <section id="propertyAddress" className="propertyAddress">
        <dl>
          <div>
            <dt>Property Address</dt>
            <dd>{_.get(policy, 'property.physicalAddress.address1')}</dd>
            <dd>{_.get(policy, 'property.physicalAddress.address2')}</dd>
            <dd>{`${_.get(policy, 'property.physicalAddress.city')}, ${_.get(policy, 'property.physicalAddress.state')} ${_.get(policy, 'property.physicalAddress.zip')}`}</dd>
          </div>
        </dl>
      </section>
      <section id="propertyCounty" className="propertyCounty">
        <dl>
          <div>
            <dt>Property County</dt>
            <dd>{_.get(policy, 'property.physicalAddress.county')}</dd>
          </div>
        </dl>
      </section>
      <section id="territory" className="territory">
        <dl>
          <div>
            <dt>Territory</dt>
            <dd>{_.get(policy, 'property.territory')}</dd>
          </div>
        </dl>
      </section>
      <section id="sourceNumber" className="sourceNumber">
        <dl>
          <div>
            <dt>Source Number</dt>
            <dd>{_.get(policy, 'sourceNumber')}</dd>
          </div>
        </dl>
      </section>
      <section id="policyEffectiveDate" className="policyEffectiveDate">
        <dl>
          <div>
            <dt>Effective Date <button className="btn btn-link btn-xs btn-alt-light" onClick={() => showEffectiveDatePopUp(this.props)}><i className="fa fa-pencil-square" />Edit</button></dt>
            <dd>{moment.utc(_.get(policy, 'effectiveDate')).format('MM/DD/YYYY')}</dd>
          </div>
        </dl>
      </section>
      <section id="cancellationDate" className="cancellationDate">
        <dl>
          <div>
            <dt>Cancellation Date</dt>
            <dd>{_.get(policy, 'cancelDate') ? moment.utc(_.get(policy, 'cancelDate')).format('MM/DD/YYYY') : '' }</dd>
          </div>
        </dl>
      </section>
      <section id="premium" className="premium">
        <dl>
          <div>
            <dt>Current Premium</dt>
            <dd>$ {summaryLedger ? normalizeNumbers(summaryLedger.currentPremium) : '-'}</dd>
          </div>
        </dl>
      </section>

  </div>);*/
  }

}

DetailHeader.propTypes = {
  agency: PropTypes.shape()
};


const mapStateToProps = state => ({
  agency: state.service.agency
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailHeader);
