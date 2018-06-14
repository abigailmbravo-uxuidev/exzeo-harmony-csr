import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as serviceActions from '../../state/actions/serviceActions';


export class DetailHeader extends Component {
  render() {
    const { agency } = this.props;
    if (!agency || !agency.agencyCode) {
      return (<div className="detailHeader" />);
    }
    return (
      <div className="detailHeader">
        <section id="agencyDetails" className="agencyDetails">
          <h4 className="agency-code">{agency.agencyCode}</h4>
        </section>
        <section id="agency-name" className="entityName">
          <h4 className="agency-name">{agency.displayName} <span className="font-weight-normal legal-name">| {agency.legalName}</span></h4>
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
