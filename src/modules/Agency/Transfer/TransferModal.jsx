import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { defaultMemoize } from 'reselect';
import { SelectTypeAhead, Loader, validation, Button } from '@exzeo/core-ui';
import { setAppError } from '../../../state/actions/error.actions';
import { getAgencies, getAgentListByAgencyCode, clearAgentList, transferPoliciesToAgent, fetchAgenciesByAgencyCodeOrName, fetchAgentsByAgencyCode } from '../../../state/actions/agency.actions';
import { filterAgenciesList, filterActiveAgentsList } from '../../../state/selectors/agency.selector';

export class TransferModal extends Component {

  constructor(props) {
    super(props);
    this.filterActiveAgentsList = defaultMemoize(filterActiveAgentsList);
    this.filterAgenciesList = defaultMemoize(filterAgenciesList);
  }

  state = {
    isLoading: false,
    agents: [],
    agencies: []
  }

  async componentDidMount() {
    const { clearAgentList, setAppError } = this.props;

    try {
      this.setState({ isLoading: true });
      await this.getAgenciesForTransfer('');
      clearAgentList();

    } catch (err) {
      setAppError(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  getAgenciesForTransfer = async (searchParam = '') => {
    const agencies = await fetchAgenciesByAgencyCodeOrName('', '', searchParam);
    this.setState({ agencies: this.filterAgenciesList(agencies) });
  }

  handleAgenciesFilter = (value) => {
    this.getAgenciesForTransfer(value);
    return value;
  }

  getAgentsForTransfer = async (agencyCode) => {
    const agents = await fetchAgentsByAgencyCode(agencyCode);
    this.setState({ agents: this.filterActiveAgentsList(agents) });
  }

  handleAgencyChange = (_, agencyCode) => {
    const { change } = this.props;
    change('agentCodeTo', null);
    this.getAgentsForTransfer(agencyCode);
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
    const { handleSubmit, submitting } = this.props;
    const { isLoading, agencies, agents  } = this.state;

    if(isLoading || submitting) return (<Loader />);

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
                styleName="agencyCode"
                dataTest="agencyCodeTo"
                component={SelectTypeAhead}
                answers={agencies}
                onChange={this.handleAgencyChange}
                onInputChange={this.handleAgenciesFilter}
                validate={validation.isRequired} />
              <Field
                label="Agent"
                styleName="agentCode"
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
                  className={Button.constants.classNames.secondary}
                  type="button"
                  label="Cancel"
                  onClick={this.closeModal}
                  disabled={isLoading} />
                <Button
                  tabIndex="0"
                  className={Button.constants.classNames.primary}
                  type="submit"
                  label="Transfer"
                  disabled={isLoading} />
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
  initialValues: { agencyCode, agentCode }
});

export default connect(mapStateToProps, {
  getAgencies,
  getAgentListByAgencyCode,
  clearAgentList,
  transferPoliciesToAgent,
  setAppError
})(reduxForm({
  form: 'TransferPolicies',
  enableReinitialize: true
})(TransferModal));
