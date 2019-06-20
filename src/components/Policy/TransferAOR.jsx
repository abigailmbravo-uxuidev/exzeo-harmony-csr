import React, { Component } from 'react';
import { defaultMemoize } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  SelectInteger,
  SelectTypeAhead,
  Loader,
  validation,
  Button
} from '@exzeo/core-ui';
import { callService } from '@exzeo/core-ui/src/@Harmony';

import {
  getAgencies,
  fetchAgentsByAgencyCode,
  getAgency,
  getAgentsByAgencyCode,
  fetchAgenciesByAgencyCodeOrName
} from '../../state/actions/agency.actions';
import { getPolicy } from '../../state/actions/policy.actions';
import { setAppError } from '../../state/actions/error.actions';
import {
  filterAgenciesList,
  filterActiveAgentsList
} from '../../state/selectors/agency.selector';

export class TransferAOR extends Component {
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
    const { agencyCode } = this.props;

    try {
      this.setState({ isLoading: true });
      await this.getAgenciesForAORTransfer(agencyCode);
      await this.getAgentsForAORTransfer(agencyCode);
    } catch (err) {
      setAppError(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  getAgenciesForAORTransfer = async (searchParam = '') => {
    const { companyCode, state } = this.props;
    const agencies = await fetchAgenciesByAgencyCodeOrName(
      companyCode,
      state,
      searchParam
    );
    this.setState({ agencies: this.filterAgenciesList(agencies) });
  };

  getAgentsForAORTransfer = async agencyCode => {
    const agents = await fetchAgentsByAgencyCode(agencyCode);
    this.setState({ agents: this.filterActiveAgentsList(agents) });
  };

  handleAgenciesFilter = value => {
    this.getAgenciesForAORTransfer(value);
    return value;
  };

  handleAgencyChange = (_, agencyCode) => {
    const { change } = this.props;
    change('agentCode', null);
    this.getAgentsForAORTransfer(agencyCode);
  };

  submitTransfer = async (data, dispatch, props) => {
    const { policyNumber, getPolicy, setAppError } = props;
    const transferData = {
      service: 'policy-manager',
      method: 'POST',
      path: 'update-agent-of-record',
      data: { ...data, policyNumber: policyNumber }
    };

    this.setState({ isLoading: true });

    await callService(transferData).catch(err => setAppError(err));

    await getPolicy(policyNumber);
    await props.getAgency(data.agencyCode);
    await props.getAgentsByAgencyCode(data.agencyCode);

    this.setState({ isLoading: false });
    this.props.toggleModal();
  };

  render() {
    const { handleSubmit, toggleModal, pristine } = this.props;
    const { isLoading, agents, agencies } = this.state;

    return (
      <div className="modal transfer-AOR-modal" style={this.modalStyle}>
        <div className="card">
          {isLoading && <Loader />}
          <form
            id="TransferAOR"
            className="TransferAOR"
            onSubmit={handleSubmit(this.submitTransfer)}
          >
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
                validate={validation.isRequired}
                onChange={this.handleAgencyChange}
                onInputChange={this.handleAgenciesFilter}
              />
              <Field
                label="Agent"
                name="agentCode"
                dataTest="agentCode"
                component={SelectInteger}
                answers={agents}
                validate={validation.isRequired}
              />
            </div>
            <div className="card-footer">
              <div className="btn-group">
                <Button
                  tabIndex="0"
                  className="btn btn-secondary"
                  label="Cancel"
                  onClick={toggleModal}
                  dataTest="aor-modal-cancel"
                />
                <Button
                  tabIndex="0"
                  className="btn btn-primary"
                  type="submit"
                  label="Update"
                  dataTest="aor-modal-submit"
                  disabled={pristine}
                />
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
  initialValues: { agencyCode, agentCode }
});

export default connect(
  mapStateToProps,
  {
    getAgency,
    getAgentsByAgencyCode,
    getAgencies,
    getPolicy,
    setAppError
  }
)(
  reduxForm({
    form: 'TransferAOR',
    enableReinitialize: true
  })(TransferAOR)
);
