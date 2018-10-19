import React, { Component } from 'react';
import { validation } from '@exzeo/core-ui';
import Button from '@exzeo/core-ui/lib/Button';

import AgentModal from '../components/AgentModal';
import AddExistingAgentModal from '../components/ExistingAgentModal';

import AgentsCard from './AgentsCard';
import RemoveAgentModal from './RemoveAgentModal';


export class Agents extends Component {
  state = {
    activeIndex: null,
    agentDetailInitialValues: null,
    showAgentDetailEditModal: false,
    showAgentDetailNewModal: false,
    showRemoveAgentModal: false,
    showAgentOfRecordModal: false,
    selectedAgent: null
  };

  toggleRemoveAgentModal = (activeIndex) => {
    this.setState({
      showRemoveAgentModal: !!activeIndex,
      activeIndex: activeIndex || null
    });
  };

  toggleExistingAgentModal = () => {
    this.setState({
      showAddExistingAgentModal: !this.state.showAddExistingAgentModal
    });
  };

  openAgentDetailEditModal = (activeIndex) => {
    const agent = this.props.agents[activeIndex];
    this.setState({
      showAgentDetailEditModal: true,
      activeIndex,
      agentDetailInitialValues: {
        ...agent
      }
    });
  };

  openAgentDetailNewModal = () => {
    this.setState({
      showAgentDetailNewModal: true,
      agentDetailInitialValues: {
        agencies: [],
        mailingAddress: {
          country: {
            code: 'USA',
            displayText: 'United States of America'
          }
        },
        licenses: [{
          state: '', license: '', licenseType: '', licenseEffectiveDate: ''
        }]
      }
    });
  };

  closeAgentDetailModal = () => {
    this.setState({
      showAgentDetailEditModal: false,
      showAgentDetailNewModal: false,
      agentDetailInitialValues: null,
      activeIndex: null
    });
  };

  handleAddExistingAgent = async (data) => {
    const { updateAgent, agency, branchCode } = this.props;
    data.selectedAgent.agencies.push({ agencyCode: agency.agencyCode, branchCode });
    await updateAgent(data.selectedAgent, agency.agencyCode);
    this.toggleExistingAgentModal();
  };

  onHandleEditAgent = async (data) => {
    const {
      agency, updateAgent
    } = this.props;
    await updateAgent(data, agency.agencyCode);
    this.closeAgentDetailModal();
  };

  onHandleSaveAgent = async (data) => {
    const {
      agency, addAgent, branchCode
    } = this.props;
    data.agencies.push({ agencyCode: agency.agencyCode, branchCode });
    data.licenses = [];
    await addAgent(data, agency.agencyCode);
    this.closeAgentDetailModal();
  };

  handleRemoveAgent = async (data) => {
    const { agency: { agencyCode }, updateAgent } = this.props;
    data.agencies = data.agencies.filter(a => a.agencyCode !== agencyCode);
    await updateAgent(data, agencyCode);
    this.toggleRemoveAgentModal();
  };

  isInAgencyLicenseArray = () => {
    return validation.isInArray(this.props.agencyLicenseArray);
  };

  toggleSwitchAgentOfRecord = (agentIndex) => {
    const agent = this.props.agents[agentIndex];

    this.setState({
      selectedAgent: this.state.showAgentOfRecordModal ? null : agent,
      showAgentOfRecordModal: !this.state.showAgentOfRecordModal
    });
  }

  handleSwitchAOR = async (data) => {
    const { agency, updateAgency } = this.props;
    const submitData = { ...agency };
    submitData.agentOfRecord = data.selectedAgent.agentCode;
    await updateAgency(submitData, agency.agencyCode);
    this.toggleSwitchAgentOfRecord();
  }

  render() {
    const {
      agency,
      agents,
      orphans
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
                handleSwitchAOR={this.toggleSwitchAgentOfRecord}
                handleEditAgent={this.openAgentDetailEditModal}
                handleRemoveAgent={this.toggleRemoveAgentModal} />
            ))}
            <div className="agent-actions">
              <hr />
              <Button
                baseClass="primary"
                size="small"
                customClass="margin right"
                dataTest="add-existing-agent"
                onClick={this.toggleExistingAgentModal}><i className="fa fa-plus" />Existing Agent
              </Button>
              <Button
                baseClass="primary"
                size="small"
                dataTest="add-new-agent"
                onClick={this.openAgentDetailNewModal}><i className="fa fa-plus" />New Agent
              </Button>
              <hr />
            </div>
          </div>
        </div>

        {this.state.showAgentDetailEditModal && this.state.agentDetailInitialValues &&
        <AgentModal
          initialValues={this.state.agentDetailInitialValues}
          isEditing
          handleSaveAgent={this.onHandleEditAgent}
          closeModal={this.closeAgentDetailModal} />
        }
        {this.state.showAgentDetailNewModal && this.state.agentDetailInitialValues &&
        <AgentModal
          initialValues={this.state.agentDetailInitialValues}
          handleSaveAgent={this.onHandleSaveAgent}
          closeModal={this.closeAgentDetailModal} />
        }
        {this.state.showAddExistingAgentModal &&
          <AddExistingAgentModal
            header="Exisiting Agent"
            listOfAgents={orphans}
            onToggleModal={this.toggleExistingAgentModal}
            handleSelection={this.handleAddExistingAgent} />
        }
        {this.state.showAgentOfRecordModal &&
        <AddExistingAgentModal
          header="Agent Of Record"
          initialValues={{ selectedAgent: this.state.selectedAgent._id }}
          listOfAgents={this.props.agentsList}
          onToggleModal={this.toggleSwitchAgentOfRecord}
          handleSelection={this.handleSwitchAOR} />
        }
        {this.state.showRemoveAgentModal &&
          <RemoveAgentModal
            agencyName={agency.displayName}
            initialValues={agents[this.state.activeIndex]}
            handleCancel={this.toggleRemoveAgentModal}
            handleConfirm={this.handleRemoveAgent} />
        }

      </div>
    );
  }
}

export default Agents;
