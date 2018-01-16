import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import _ from 'lodash';
// import moment from 'moment';
import localStorage from 'localStorage';
import { reduxForm, propTypes } from 'redux-form';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as serviceActions from '../../actions/serviceActions';
import AgencyConnect from '../../containers/Agency';
import ClearErrorConnect from '../Error/ClearError';
// import normalizeNumbers from '../Form/normalizeNumbers';
import Footer from '../Common/Footer';


const handleInitialize = state => state.service.getAgency;

export class Staff extends Component {

  componentDidMount() {
    const isNewTab = localStorage.getItem('isNewTab') === 'true';
    if (isNewTab) {
      localStorage.setItem('isNewTab', false);
      const agencyCode = localStorage.getItem('agencyCode');
      console.log(agencyCode);
      this.props.actions.serviceActions.getAgency('TTIC', 'FL', agencyCode);
    }
  }

  render() {
    const { agency } = this.props;
    console.log(agency);
    if (!agency) {
      return (<AgencyConnect>
        <ClearErrorConnect />
      </AgencyConnect>);
    }
    return (
      <AgencyConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <p>{}</p>
            </div>
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </AgencyConnect>
    );
  }

}

/**
------------------------------------------------
Property type definitions
------------------------------------------------
*/
Staff.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

/**
------------------------------------------------
redux mapping
------------------------------------------------
*/
const mapStateToProps = state => ({
  initialValues: handleInitialize(state),
  agency: state.service.agency || {}

});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Staff' })(Staff));
