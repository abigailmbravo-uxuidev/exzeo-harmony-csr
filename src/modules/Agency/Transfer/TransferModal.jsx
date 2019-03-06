import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { SelectTypeAhead, Select, Loader, validation } from '@exzeo/core-ui';

import { getAgencies, getAgentListByAgencyCode, transferPoliciesToAgent } from '../../../state/actions/agency.actions';
import { getAgenciesList, getAgentsListForTransfer } from '../../../state/selectors/agency.selector';

export class TransferModal extends Component {
  async componentDidMount() {
    const { getAgencies } = this.props;
    await getAgencies('TTIC', 'FL');
  }

  handleAgencyChange = (event, agencyCode) => {
    const { getAgentListByAgencyCode, change, dispatch } = this.props;
    change('agentCode', '');
    getAgentListByAgencyCode(agencyCode);
  }

  groupPolicyByAgentCode(array) {
    var sorted = {};
    for( var i = 0, max = array.length; i < max ; i++ ){
        if( sorted[array[i].agentCode] === undefined ){
         sorted[array[i].agentCode] = [];
        }
        sorted[array[i].agentCode].push(array[i]);
    }
    return sorted;
}

  submitTransfer = async (data, dispatch, props) => {
    const { agentCodeTo, agencyCodeTo } = data;
    const { selectedPolicies } = props;

    const groupedPolices = this.groupPolicyByAgentCode(selectedPolicies);
    const transfers = [];
    Object.keys(groupedPolices).forEach(p => {
      const policies = groupedPolices[p] || [];
        const { agencyCode = 60000, agentCode = 20000 } = policies[0];
        transfers.push({ policyNumbers: policies.map(p => p.policyNumber), agencyCodeTo, agentCodeTo: Number(agentCodeTo), agencyCodeFrom: agencyCode, agentCodeFrom: agentCode})
    });

    props.transferPoliciesToAgent(transfers);
    getAgentListByAgencyCode(props.agencyCode);
    props.clearSelectedPolicies();
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
                name="agencyCodeTo"
                dataTest="agencyCodeTo"
                component={SelectTypeAhead}
                answers={agencies}
                onChange={this.handleAgencyChange}
                validate={validation.isRequired} />
              <Field
                label="Agent"
                name="agentCodeTo"
                dataTest="agentCodeTo"
                component={Select}
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
  getAgentListByAgencyCode,
  transferPoliciesToAgent
})(reduxForm({
  form: 'TransferPolicies',
  enableReinitialize: true
})(TransferModal));