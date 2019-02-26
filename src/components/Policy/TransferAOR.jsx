import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { SelectInteger, SelectTypeAhead, Loader, validation } from '@exzeo/core-ui';

import { callService } from '../../utilities/serviceRunner';
import { getAgencies, getAgentsByAgencyCode } from '../../state/actions/agency.actions';
import { getPolicy } from '../../state/actions/policy.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getAgencyList, getAgentList } from '../../state/selectors/agency.selector';

export class TransferAOR extends Component {
  state = {
    isLoading: false
  }

  async componentDidMount() {
    const { getAgencies, getAgentsByAgencyCode, initialize, companyCode, agencyCode, state } = this.props;
    this.setState({ isLoading: true });

    try {
      await getAgencies(companyCode, state);
      await getAgentsByAgencyCode(agencyCode);
    } catch (err) {
      console.log('errrr', err)
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleAgencyChange = (_, agencyCode) => {
    const { change, getAgentsByAgencyCode } = this.props;
    console.log(this.props)
    change('agentCode', null);
    getAgentsByAgencyCode(agencyCode);
  }

  submitTransfer = async (data, dispatch, props) => {
    const { policyNumber, getPolicy, setAppError } = props;
    const transferData = {
      service: 'policy-manager',
      method: 'POST',
      path: 'update-agent-of-record',
      data: { ...data, policyNumber: policyNumber }
    };

    this.setState({ isLoading: true });

    await callService(transferData)
      .catch(err => setAppError(err));

    await getPolicy(policyNumber);

    this.setState({ isLoading: false });
    this.props.toggleModal();
  }

  render() {
    const { handleSubmit, toggleModal, agencies, agents, pristine } = this.props;
    const { isLoading } = this.state;

    return (
      <div className="modal transfer-AOR-modal" style={this.modalStyle}>
        <div className="card">
          {(isLoading) &&
            <Loader />
          }
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
                component={SelectInteger}
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
                  disabled={pristine}
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
  toggleModal: PropTypes.func.isRequired,
  policyNumber: PropTypes.string.isRequired,
  companyCode: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  agencyCode: PropTypes.number.isRequired,
  agentCode: PropTypes.number
};

const mapStateToProps = (state, { agencyCode, agentCode }) => ({
  agencies: getAgencyList(state),
  agents: getAgentList(state),
  initialValues: { agencyCode, agentCode }
});

export default connect(mapStateToProps, {
  getAgencies,
  getAgentsByAgencyCode,
  getPolicy,
  setAppError
})(reduxForm({
  form: 'TransferAOR',
  enableReinitialize: true
})(TransferAOR));

