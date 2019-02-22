import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { SelectTypeAhead, Loader, validation } from '@exzeo/core-ui';

import { getAgencies, getAgentsByAgencyCode } from '../../../state/actions/agency.actions';
import { getAgenciesList, getAgentsListForTransfer } from '../../../state/selectors/agency.selector';

export class TransferModal extends Component {
  async componentDidMount() {
    const { getAgencies, getAgentsByAgencyCode, companyCode, agencyCode, state } = this.props;
    await getAgencies('TTIC', 'FL');
  }

  handleAgencyChange = (event, agencyCode) => {
    const { getAgentsByAgencyCode } = this.props;
    getAgentsByAgencyCode(agencyCode);
  }

  submitTransfer = (data, dispatch, props) => {
    getAgentsByAgencyCode(props.agencyCode);
    props.toggleModal();
  }

  render() {
    const { handleSubmit, toggleModal, agencies, agents } = this.props;

    if (agencies.length === 0) return (<Loader />);

    return (
      <div className="modal bob-transfer" style={this.modalStyle}>
        <div className="card ">
          <form id="TransferPolicies" className="Transfer" onSubmit={handleSubmit(this.submitTransfer)}>
            <div className="card-header">
              <h4>Agent Receiving Selected Policy</h4>
            </div>
            <div className="card-block">
              <Field
                label="Agency"
                name="agencyCode"
                dataTest="agencyCode"
                component={SelectTypeAhead}
                answers={agencies}
                onChange={this.handleAgencyChange}
                validate={validation.isRequired} />
              <Field
                label="Agent"
                name="agentCode"
                dataTest="agentCode"
                component={SelectTypeAhead}
                answers={agents}
                validate={validation.isRequired} />
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

TransferModal.propTypes = {
  toggleModal: PropTypes.func.isRequired
};

const mapStateToProps = (state, { agencyCode, agentCode }) => ({
  agencies: getAgenciesList(state),
  agents: getAgentsListForTransfer(state),
  initialValues: { agencyCode, agentCode }
});

export default connect(mapStateToProps, {
  getAgencies,
  getAgentsByAgencyCode
})(reduxForm({
  form: 'TransferPolicies',
  enableReinitialize: true
})(TransferModal));