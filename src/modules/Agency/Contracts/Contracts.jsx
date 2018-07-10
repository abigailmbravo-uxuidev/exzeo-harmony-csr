import React, { Component } from 'react';
import { change } from 'redux-form';
import PropTypes from 'prop-types';
import TaxDetails from './TaxDetails';
import AgencyModal from '../AgencyModal';
import ContractsCard from './ContractsCard';
import ContractsModal from './ContractsModal';

export class Contracts extends Component {
  state = {
    showEditAgencyContract: false,
    editType: null,
    showAgencyEdit: false,
    agentsInContract: []
  };

  displayAgencyPopup = (showPopup) => {
    this.setState({ showAgencyEdit: showPopup });
  };

  toggleContractModal = (editType, contractIndex, agentsInContract) => () =>
    this.setState({
      editType,
      contractIndex,
      agentsInContract,
      showEditAgencyContract: !this.state.showEditAgencyContract
    });

  toggleAgencyModal = () => {
    this.setState({ showAgencyEdit: !this.state.showAgencyEdit });
  };

  saveContract = async (data) => {
    data.license[this.state.contractIndex].agent || [];
    this.props.updateAgency(data);
    this.setState({ editType: null, showEditAgencyContract: false });
  };

  removeAgentFromList = (e, agentCode) => {
    e.preventDefault();
    e.stopPropagation();
    const { contractIndex } = this.state;
    const { contractInitialValues } = this.props;
    const agentsInContract = contractInitialValues.license[contractIndex].agent;
    change('ContractsModal', `license[${contractIndex}].agent`, agentsInContract.filter(a => a.agentCode !== agentCode));
  }

  addAgentFromList = (event) => {
    const { value } = event.target;
    const { listOfAgents, contractInitialValues } = this.props;
    const { contractIndex } = this.state;

    const agentsInContract = contractInitialValues.license[contractIndex].agent;

    const agent = listOfAgents.find(a => a.agentCode === Number(value));
    const {
      appointed, agentOfRecord, agentCode, agentInfo
    } = agent;
    if (agentsInContract.filter(a => a.agentCode === agent.agentCode).length === 0) {
      agentsInContract.push({
        appointed, agentOfRecord, agentCode, agentInfo: agentInfo || { ...agent }
      });
      change('ContractsModal', `license[${contractIndex}].agent`, agentsInContract);
    }
    return value;
  }


  render() {
    const {
      agency, contractInitialValues, listOfAgents
    } = this.props;
    if (!agency) return <div />;

    const { license } = agency;
    return (
      <div id="agency-contracts" className="agency-contracts">
        {this.state.showEditAgencyContract && (
        <ContractsModal
          agentsInContract={this.state.agentsInContract}
          initialValues={contractInitialValues}
          toggleModal={this.toggleContractModal}
          editType={this.state.editType}
          contractIndex={this.state.contractIndex}
          saveContract={this.saveContract}
          removeAgentFromList={this.removeAgentFromList}
          listOfAgents={listOfAgents}
          addAgentFromList={this.addAgentFromList}
        />
          )}
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <TaxDetails agency={agency} editAgency={this.toggleAgencyModal} />
              <section>
                <h3>Contracts</h3>
                { license && license.length > 0 && license.map((contract, index) =>
                  <ContractsCard key={contract.licenseNumber} contractIndex={index} contract={contract} editContract={this.toggleContractModal} />)}
                <div className="create-contract">
                  <hr />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={this.toggleContractModal('New', license ? license.length : 0)}
                  >
                    <i className="fa fa-plus" /> Contract
                  </button>
                  <hr />
                </div>
              </section>
            </div>
          </div>
        </div>
        {this.state.showAgencyEdit && (
          <AgencyModal
            isEdit
            closeModal={this.toggleAgencyModal}
          />
        )}
      </div>
    );
  }
}

Contracts.propTypes = {
  agency: PropTypes.shape(),
  contractInitialValues: PropTypes.shape()
};

export default Contracts;
