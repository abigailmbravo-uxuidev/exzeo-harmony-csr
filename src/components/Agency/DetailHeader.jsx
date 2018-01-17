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

  render() {
    const { agency } = this.props;
    console.log(agency);
    if (!agency || !agency.agencyCode) {
      return (<div className="detailHeader" />);
    }
    return (
      <div className="detailHeader">
        <section id="agencyDetails" className="agencyDetails">
          <dl>
            <div>
              <dd className="font-size-base">{agency.agencyCode}</dd>
              <dd>{agency.displayName}</dd>
            </div>
          </dl>
        </section>
        <section id="" className="">
          <dl>
            <div>
              <dd>{agency.status}</dd>
              <dd>{agency.tier}</dd>
              <dd>{agency.websiteUrl}</dd>
            </div>
          </dl>
        </section>
        <section id="" className="">
          <dl>
            <div>
              <dd>{agency.legalName}</dd>
              <dd>{agency.physicalAddress.address1}</dd>
              <dd>{agency.physicalAddress.address2 ? agency.physicalAddress.address2 : null }</dd>
              <dd>{agency.physicalAddress.city}</dd>
              <dd>{agency.physicalAddress.state}</dd>
              <dd>{agency.physicalAddress.zip}</dd>
              <dd>{agency.physicalAddress.city}</dd>
            </div>
          </dl>
        </section>
        <section id="" className="">
          <dl>
            <div>
              <dd>{agency.mailingAddress.address1}</dd>
              <dd>{agency.mailingAddress.address2 ? agency.mailingAddress.address2 : null }</dd>
              <dd>{agency.mailingAddress.city}</dd>
              <dd>{agency.mailingAddress.state}</dd>
              <dd>{agency.mailingAddress.zip}</dd>
              <dd>{agency.mailingAddress.city}</dd>
            </div>
          </dl>
        </section>
      </div>
    );
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
