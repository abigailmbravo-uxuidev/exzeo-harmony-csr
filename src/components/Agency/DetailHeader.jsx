import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as serviceActions from '../../state/actions/service.actions';


export class DetailHeader extends Component {

  render() {
    const { agency } = this.props;
    if (!agency || !agency.agencyCode) {
      return (<div className="detailHeader" />);
    }
    return (
      <div className="detailHeader">
        <section id="agencyDetails" className="agencyDetails">
          <dl>
            <div>
              <dd className="font-size-base">{agency.agencyCode}</dd>
              <dd className="agency-name">{agency.displayName}</dd>
            </div>
          </dl>
        </section>
        <section id="entityName" className="entityName">
          <dl>
            <div>
              <dt>Entity Name</dt>
              <dd>{agency.legalName}</dd>
              <div className="flex-row">
                <section>
                  <dt>Status</dt>
                  <dd>{agency.status}</dd>
                </section>
                <section><dt>Tier</dt><dd>{agency.tier >= 0 ? agency.tier : ''}</dd></section>
                <section>
                  <dt>Website</dt>
                  <dd><a href={agency.websiteUrl} target="_blank">{agency.websiteUrl}</a></dd>
                </section>
              </div>
            </div>
          </dl>
        </section>
        <section id="physicalAddress" className="physicalAddress">
          <dl>
            <div>
              <dt>Physical Address</dt>
              <dd>{agency.physicalAddress.address1}</dd>
              <dd>{agency.physicalAddress.address2 ? agency.physicalAddress.address2 : null }</dd>
              <dd>{`${agency.physicalAddress.city}, ${agency.physicalAddress.state} ${agency.physicalAddress.zip}`}</dd>
            </div>
          </dl>
        </section>
        <section id="mailingAddress" className="mailingAddress">
          <dl>
            <div>
              <dt>Mailing Address</dt>
              <dd>{agency.mailingAddress.address1}</dd>
              <dd>{agency.mailingAddress.address2 ? agency.mailingAddress.address2 : null }</dd>
              <dd>{`${agency.mailingAddress.city}, ${agency.mailingAddress.state} ${agency.mailingAddress.zip}`}</dd>
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
