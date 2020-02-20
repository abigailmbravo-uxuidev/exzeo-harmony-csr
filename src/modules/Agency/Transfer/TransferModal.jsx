import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defaultMemoize } from 'reselect';
import {
  SelectTypeAhead,
  Loader,
  validation,
  Button,
  Form,
  Field
} from '@exzeo/core-ui';
import { setAppError } from '../../../state/actions/error.actions';
import {
  getAgentListByAgencyCode,
  clearAgentList,
  transferPoliciesToAgent,
  fetchAgenciesByAgencyCodeOrName,
  fetchAgentsByAgencyCode
} from '../../../state/actions/agency.actions';
import {
  filterAgenciesList,
  filterActiveAgentsList
} from '../../../state/selectors/agency.selector';
import AgencyChangeWatcher from './AgencyChangeWatcher';

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
  };

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
  };

  handleAgenciesFilter = value => {
    this.getAgenciesForTransfer(value);
    return value;
  };

  getAgentsForTransfer = async agencyCode => {
    const agents = await fetchAgentsByAgencyCode(agencyCode);
    this.setState({ agents: this.filterActiveAgentsList(agents) });
  };

  groupPolicyByAgentCode(array) {
    var sorted = {};
    for (var i = 0, max = array.length; i < max; i++) {
      if (sorted[String(array[i].agentCode)] === undefined) {
        sorted[String(array[i].agentCode)] = [];
      }
      sorted[String(array[i].agentCode)].push(array[i]);
    }
    return sorted;
  }

  submitTransfer = async data => {
    try {
      const { agentCodeTo, agencyCodeTo } = data;
      const {
        selectedPolicies,
        activeAgencyCode,
        transferPoliciesToAgent,
        getAgentListByAgencyCode,
        getPoliciesForAgency,
        clearSelectedPolicies,
        toggleModal
      } = this.props;

      const groupedPolices = this.groupPolicyByAgentCode(selectedPolicies);
      const transfers = [];
      Object.keys(groupedPolices).forEach(p => {
        const policies = groupedPolices[p] || [];
        const {
          agencyCode: agencyCodeFrom,
          agentCode: agentCodeFrom
        } = policies[0];
        transfers.push({
          policyNumbers: policies.map(p => p.policyNumber),
          agencyCodeTo,
          agentCodeTo: Number(agentCodeTo),
          agencyCodeFrom,
          agentCodeFrom
        });
      });

      await transferPoliciesToAgent(transfers);
      await getAgentListByAgencyCode(activeAgencyCode);
      await getPoliciesForAgency({ agencyCode: activeAgencyCode });
      clearSelectedPolicies();
      toggleModal();
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error in submitTransfer (TransferModal): ', err);
      }
    }
  };

  closeModal = () => {
    const { activeAgencyCode } = this.props;
    this.props.getAgentListByAgencyCode(activeAgencyCode);
    this.props.toggleModal();
  };

  render() {
    const { isLoading, agencies, agents } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div className="modal bob-transfer" data-test="transfer-modal">
        <div className="card ">
          <Form
            onSubmit={this.submitTransfer}
            subscription={{ submitting: true }}
          >
            {({ submitting, handleSubmit }) => (
              <form
                id="TransferPolicies"
                className="Transfer"
                onSubmit={handleSubmit}
              >
                {(isLoading || submitting) && <Loader />}
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
                    onInputChange={this.handleAgenciesFilter}
                    validate={validation.isRequired}
                  />
                  <AgencyChangeWatcher
                    getAgentsForTransfer={this.getAgentsForTransfer}
                  />
                  <Field
                    label="Agent"
                    styleName="agentCode"
                    name="agentCodeTo"
                    dataTest="agentCodeTo"
                    component={SelectTypeAhead}
                    answers={agents}
                    validate={validation.isRequired}
                  />
                </div>
                <div className="card-footer">
                  <div className="btn-group">
                    <Button
                      tabIndex="0"
                      className={Button.constants.classNames.secondary}
                      type="button"
                      label="Cancel"
                      onClick={this.closeModal}
                      disabled={isLoading || submitting}
                      data-test="cancel"
                    />
                    <Button
                      tabIndex="0"
                      className={Button.constants.classNames.primary}
                      type="submit"
                      label="Transfer"
                      disabled={isLoading || submitting}
                      data-test="submit"
                    />
                  </div>
                </div>
              </form>
            )}
          </Form>
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
  getAgentListByAgencyCode,
  clearAgentList,
  transferPoliciesToAgent,
  setAppError
})(TransferModal);
