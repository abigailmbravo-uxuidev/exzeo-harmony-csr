import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaxDetails from './TaxDetails';
import AgencyModal from '../AgencyModal';
import ContractsCard from './ContractsCard';
import ContractsModal from './ContractsModal';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

export class Contracts extends Component {
  state = {
    showEditAgencyContract: false,
    editType: null,
    showAgencyEdit: false
  };

  displayAgencyPopup = (showPopup) => {
    this.setState({ showAgencyEdit: showPopup });
  };

  toggleContractModal = (editType, contractIndex) => () =>
    this.setState({
      editType,
      contractIndex,
      showEditAgencyContract: !this.state.showEditAgencyContract
    });

  toggleAgencyModal = () => {
    this.setState({ showAgencyEdit: !this.state.showAgencyEdit });
  };

  saveContract = async (data) => {
    const agentArray = [];

    data.agentList.forEach((code) => {
      const agentIndex = this.props.agencyAgents.findIndex(ag => String(ag.agentCode) === code);
      if (agentIndex !== -1) { agentArray.push(this.props.agencyAgents[agentIndex]); }
    });

    data.license[this.state.contractIndex].agent = agentArray;

    this.props.updateAgency(data);
    this.setState({ editType: null, showEditAgencyContract: false });
  };

  existsInAgentsList = () => validation.isInArray(this.props.agencyAgentsList);


  render() {
    const {
      agency, contractInitialValues, agencyAgentsList, agencyAgents
    } = this.props;
    if (!agency) return <div />;

    const { license } = agency;
    return (
      <div>
        {this.state.showEditAgencyContract && (
        <ContractsModal
          agencyAgents={agencyAgents}
          existsInAgentsList={this.existsInAgentsList()}
          agencyAgentsList={agencyAgentsList}
          initialValues={contractInitialValues}
          toggleModal={this.toggleContractModal}
          editType={this.state.editType}
          contractIndex={this.state.contractIndex}
          saveContract={this.saveContract}
        />
          )}
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <TaxDetails agency={agency} editAgency={this.toggleAgencyModal} />
              <section>
                <h3>Contracts</h3>
                { license && license.length > 0 && license.map((contract, index) =>
                  <ContractsCard contractIndex={index} contract={contract} editContract={this.toggleContractModal} />)}
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
