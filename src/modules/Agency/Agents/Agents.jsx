import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import Button from '@exzeo/core-ui/lib/Button'
import AgentsCard from './AgentsCard';
import AgentDetailModal from './AgentModal';
import AddExistingAgentModal from './ExistingAgentModal';
import RemoveAgentModal from './RemoveAgentModal';


export class Agents extends Component {
  state = {
    activeIndex: null,
    agentDetailInitialValues: {},
    isEditing: null,
    showAddExistingAgentModal: false,
    showAgentDetailModal: false,
    showRemoveAgentModal: false,
  };

  toggleRemoveAgentModal = (activeIndex) => {
    this.setState({
      showRemoveAgentModal: !!activeIndex,
      activeIndex: activeIndex || null
    })
  };

  toggleExistingAgentModal = () => {
    this.setState({
      showAddExistingAgentModal: !this.state.showAddExistingAgentModal
    });
  };

  toggleAgentDetailModal = (activeIndex) => {
    // close modal
    if (!activeIndex && this.state.showAgentDetailModal) {
      this.setState({
        showAgentDetailModal: false,
        activeIndex: null,
        isEditing: false,
        agentDetailInitialValues: {}
      });

      return;
    }

    // open to create new agent
    if (!activeIndex) {
      this.setState({
        showAgentDetailModal: true,
        isEditing: false,
        agentDetailInitialValues: { agencyLicense:[], agentLicense: [{ state: '', licenseNumber: '' }]}
      });

      return;
    }

    // open to edit an existing agent
    const agent = this.props.agents[activeIndex];
    this.setState({
      showAgentDetailModal: true,
      isEditing: true,
      activeIndex,
      agentDetailInitialValues: {
        ...agent,
        agencyLicense: []
      }
    });
  };

  handleAddExistingAgent = async (data) => {
    const { addAgentToAgency, agency } = this.props;
    await addAgentToAgency(data, agency);
    this.toggleExistingAgentModal()
  };

  handleSaveAgent = async (data) => {
    // noinspection JSUnusedLocalSymbols
    const { createdBy, createdAt, ...agent } = data;
    const {agency, addAgent, applyLicenseToAgency, updateAgent, updateAgency} = this.props;

    if (this.state.isEditing) {
      await updateAgent(agent, agency);
    } else {
      await addAgent(agent, agency);
    }

    const agencyData = applyLicenseToAgency(data, agency);
    await updateAgency(agencyData);
    this.toggleAgentDetailModal();
  };

  handleRemoveAgent = async (data) => {
    const { agency, updateAgency } = this.props;
    const updatedAgency = cloneDeep(agency);

    updatedAgency.license.forEach((l) => {
      const licenseIndex = agency.license.findIndex(li => li.licenseNumber === l.licenseNumber);
      const agentIndex = l.agent.findIndex(a => Number(a.agentCode) === Number(data.agentCode));

      if (agentIndex !== -1) {
        l.agent.splice(agentIndex, 1);
      }
      if (licenseIndex !== -1) {
        agency.license.splice(licenseIndex, 1, l);
      }
    });
    // noinspection JSUnusedLocalSymbols
    const { createdAt, createdBy, ...selectedAgency } = updatedAgency;
    await updateAgency(selectedAgency);
    this.toggleRemoveAgentModal();
  };

  isInAgencyLicenseArray = () => {
    return validation.isInArray(this.props.agencyLicenseArray);
  };

  render() {
    const {
      agency,
      agencyLicenseArray,
      agents,
      listOfAgents,
    } = this.props;

    return (
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            {agents && agents.map((agent, index) => (
              <AgentsCard
                key={agent.agentCode}
                agency={agency}
                agent={agent}
                agentIndex={index}
                handleEditAgent={this.toggleAgentDetailModal}
                handleRemoveAgent={this.toggleRemoveAgentModal}
              />
            ))}
            <div className="agent-actions">
              <hr/>
              <Button
                baseClass="primary"
                size="small"
                customClass="margin right"
                dataTest="add-existing-agent"
                onClick={this.toggleExistingAgentModal}
              ><i className="fa fa-plus"/>Existing Agent</Button>
              <Button
                baseClass="primary"
                size="small"
                dataTest="add-new-agent"
                onClick={() => this.toggleAgentDetailModal()}
              ><i className="fa fa-plus"/>New Agent</Button>
              <hr/>
            </div>
          </div>
        </div>

        {this.state.showAgentDetailModal &&
        <AgentDetailModal
          agencyLicenseArray={agencyLicenseArray}
          initialValues={this.state.agentDetailInitialValues}
          isEditing={this.state.isEditing}
          isInAgencyLicenseArray={this.isInAgencyLicenseArray()}
          handleSaveAgent={this.handleSaveAgent}
          toggleModal={this.toggleAgentDetailModal}
        />
        }
        {this.state.showAddExistingAgentModal &&
          <AddExistingAgentModal
            agencyLicenseArray={agencyLicenseArray}
            existsInAgencyLicense={this.isInAgencyLicenseArray()}
            listOfAgents={listOfAgents}
            toggleModal={this.toggleExistingAgentModal}
            handleSaveAgent={this.handleAddExistingAgent}
          />
        }
        {this.state.showRemoveAgentModal &&
          <RemoveAgentModal
            agencyName={agency.displayName}
            initialValues={agents[this.state.activeIndex]}
            handleCancel={this.toggleRemoveAgentModal}
            handleConfirm={this.handleRemoveAgent}
          />
        }

      </div>
    );
  }
}

export default Agents;
