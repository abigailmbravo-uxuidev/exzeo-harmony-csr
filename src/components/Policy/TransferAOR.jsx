import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { SelectTypeAhead, Loader, validation } from '@exzeo/core-ui';

import { getAgencies, getAgentsByAgencyCode } from '../../state/actions/agency.actions';
import { getAgencyList, getAgentList } from '../../state/selectors/agency.selector';

export class TransferAOR extends Component {
  async componentDidMount() {
    const { getAgencies, getAgentsByAgencyCode, initialize, companyCode, agencyCode, state } = this.props;
    await getAgencies(companyCode, state);
    await getAgentsByAgencyCode(agencyCode);
  }

  handleAgencyChange = (_, agencyCode) => {
    const { getAgentsByAgencyCode } = this.props;
    getAgentsByAgencyCode(agencyCode);
  }

  submitTransfer = (data, dispatch, props) => {
    return true;
  }

  render() {
    const { handleSubmit, toggleModal, agencies, agents } = this.props;
    return (
      <div className="modal" style={this.modalStyle}>
        <div className="card card-billing-edit-modal">
          <form id="TransferAOR" className="TransferAOR" onSubmit={handleSubmit(this.submitTransfer)}>
            <div className="card-header">
              <h4>Transfer AOR</h4>
            </div>
            <div className="card-block">
              <Field
                label="Agency"
                name="agencyCode"
                dataTest="agencyCode"
                component={SelectTypeAhead}
                answers={agencies}
                onChange={this.handleAgencyChange}
              />
              <Field
                label="Agent"
                name="agentCode"
                dataTest="agentCode"
                component={SelectTypeAhead}
                answers={agents}
              />
            </div>
            <div className="card-footer">
              <div className="btn-group">
                <button
                  tabIndex="0"
                  aria-label="reset-btn form-editBilling"
                  className="btn btn-secondary"
                  type="button"
                  onClick={toggleModal}>Cancel
                </button>
                <button
                  tabIndex="0"
                  aria-label="submit-btn form-editBilling"
                  className="btn btn-primary"
                  type="submit"
                >Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

TransferAOR.propTypes = {

};

const mapStateToProps = (state, { agencyCode, agentCode }) => ({
  agencies: getAgencyList(state),
  agents: getAgentList(state),
  initialValues: { agencyCode, agentCode }
});

export default connect(mapStateToProps, {
  getAgencies,
  getAgentsByAgencyCode
})(reduxForm({
  form: 'TransferAOR',
  enableReinitialize: true
})(TransferAOR));
