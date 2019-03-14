import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { SelectTypeAhead, Loader, validation, Button } from '@exzeo/core-ui';

import { getAgencies, getAgentListByAgencyCode, clearAgentList, transferPoliciesToAgent } from '../../../state/actions/agency.actions';
import { getAgenciesList, getAgentsListForTransfer } from '../../../state/selectors/agency.selector';

export class TransferModal extends Component {
  async componentDidMount() {
    const { getAgencies, clearAgentList } = this.props;
    await getAgencies('TTIC', 'FL');
    clearAgentList();

  }

  handleAgencyChange = (event, agencyCode) => {
    const { getAgentListByAgencyCode, change, dispatch } = this.props;
    change('agentCodeTo', '');
    getAgentListByAgencyCode(agencyCode);
  }

  groupPolicyByAgentCode(array) {
    var sorted = {};
    for( var i = 0, max = array.length; i < max ; i++ ){
        if(sorted[String(array[i].agentCode)] === undefined ){
         sorted[String(array[i].agentCode)] = [];
        }
        sorted[String(array[i].agentCode)].push(array[i]);
    }
    return sorted;
}

  submitTransfer = async (data, dispatch, props) => {
    const { agentCodeTo, agencyCodeTo } = data;
    const { selectedPolicies, activeAgencyCode } = props;

    const groupedPolices = this.groupPolicyByAgentCode(selectedPolicies);
    const transfers = [];
    Object.keys(groupedPolices).forEach(p => {
      const policies = groupedPolices[p] || [];
        const { agencyCode: agencyCodeFrom, agentCode: agentCodeFrom } = policies[0];
        transfers.push({ policyNumbers: policies.map(p => p.policyNumber), agencyCodeTo, agentCodeTo: Number(agentCodeTo), agencyCodeFrom, agentCodeFrom})
    });

    await props.transferPoliciesToAgent(transfers);
    await props.getAgentListByAgencyCode(activeAgencyCode);
    await props.getPoliciesForAgency({ agencyCode: activeAgencyCode } );
    props.clearSelectedPolicies();
    props.toggleModal();
  }

  closeModal = () => {
    const { activeAgencyCode } = this.props;
    this.props.getAgentListByAgencyCode(activeAgencyCode);
    this.props.toggleModal();
  }

  render() {
    const { handleSubmit, agencies, agents, submitting } = this.props;

    if (agencies.length === 0 || submitting) return (<Loader />);

    return (
      <div className="modal bob-transfer">
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
                component={SelectTypeAhead}
                answers={agents}
                validate={validation.isRequired} />
            </div>
            <div className="card-footer">
              <div className="btn-group">
                <Button
                  tabIndex="0"
                  baseClass="secondary"
                  type="button"
                  label="Cancel"
                  onClick={this.closeModal}
                  disabled={submitting} />
                <Button
                  tabIndex="0"
                  baseClass="primary"
                  type="submit"
                  label="Transfer"
                  disabled={submitting} />
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
  clearAgentList,
  transferPoliciesToAgent
})(reduxForm({
  form: 'TransferPolicies',
  enableReinitialize: true
})(TransferModal));
