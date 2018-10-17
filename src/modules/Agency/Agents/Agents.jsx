import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { validation } from '@exzeo/core-ui';
import Button from '@exzeo/core-ui/lib/Button';
import AgentsCard from './AgentsCard';
import AgentDetailModal from './AgentModal';
import AddExistingAgentModal from '../components/ExistingAgentModal';
import RemoveAgentModal from './RemoveAgentModal';


export class Agents extends Component {
  state = {
    activeIndex: null,
    agentDetailInitialValues: null,
    showAgentDetailEditModal: false,
    showAgentDetailModal: false,
    showRemoveAgentModal: false
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
    // open to edit an existing agent
    const agent = this.props.agents[activeIndex];
    this.setState({
      showAgentDetailEditModal: true,
      activeIndex,
      agentDetailInitialValues: {
        ...agent
      }
    });
  };

  closeAgentDetailEditModal = () => {
    this.setState({
      showAgentDetailEditModal: false,
      agentDetailInitialValues: null
    });
  };

  closeAgentDetailSaveModal = () => {

  }

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
    this.closeAgentDetailEditModal();
  };

  handleSaveAgent = async (data) => {
    const {
      agency, addAgent
    } = this.props;
    await addAgent(data, agency.agencyCode);
    this.closeAgentDetailSaveModal();
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

  render() {
    const {
      agency,
      agencyLicenseArray,
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
                onClick={null}><i className="fa fa-plus" />New Agent
              </Button>
              <hr />
            </div>
          </div>
        </div>

        {this.state.showAgentDetailEditModal && this.state.agentDetailInitialValues &&
        <AgentDetailModal
          initialValues={this.state.agentDetailInitialValues}
          isEditing
          handleSaveAgent={this.onHandleEditAgent}
          closeModal={this.closeAgentDetailEditModal} />
        }
        {this.state.showAddExistingAgentModal &&
          <AddExistingAgentModal
            agencyLicenseArray={agencyLicenseArray}
            listOfAgents={orphans}
            onToggleModal={this.toggleExistingAgentModal}
            handleSelection={this.handleAddExistingAgent} />
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
