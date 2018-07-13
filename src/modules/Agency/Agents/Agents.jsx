import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {validation} from '@exzeo/core-ui/lib/InputLifecycle';
import AgentsCard from './AgentsCard';
import AgentModal from './AgentModal';
import ExistingAgentModal from './ExistingAgentModal';
import RemoveAgentModal from './RemoveAgentModal';

export class Agents extends Component {
  state = {
    showEditAgent: false,
    showRemoveAgent: false,
    editType: null,
    selectedAgent: null
  };

  removeAgentModal = () => (selectedAgent) => {
    this.setState({
      selectedAgent,
      showRemoveAgent: !this.state.showRemoveAgent
    });
  };

  toggleNewAgentModal = (agency) => {
    this.setState({
      showEditAgent: !this.state.showEditAgent,
      selectedAgent: {agencyCode: agency.agencyCode},
      editType: 'New'
    });
  };

  toggleAgentModal = editType => (selectedAgent, agency) => {
    if (!selectedAgent || !agency) {
      this.setState({
        showEditAgent: !this.state.showEditAgent,
        selectedAgent: null,
        editType: null
      });
      return;
    }
    const agencyLicense = [];
    agency.license.forEach((l) => {
      const ag = l.agent.find(a => a.agentCode === selectedAgent.agentCode);
      if (ag) {
        agencyLicense.push(l.licenseNumber);
        selectedAgent.agentOfRecord = String(ag.agentOfRecord);
        selectedAgent.appointed = String(ag.appointed);
      }
    });
    selectedAgent.agencyLicense = agencyLicense;

    this.setState({
      editType,
      selectedAgent,
      showEditAgent: !this.state.showEditAgent
    });
  };

  toggleExistingAgentModal = () =>
    this.setState({
      showAddExistingAgent: !this.state.showAddExistingAgent
    });

  isInAgencyLicenseArray = () => validation.isInArray(this.props.agencyLicenseArray);

  render() {
    const {
      addAgent,
      agency,
      agencyLicenseArray,
      agents,
      listOfAgents,
      updateAgency,
      updateAgent,
    } = this.props;
    return (
      <div className="route-content">
        {this.state.showEditAgent &&
        this.state.selectedAgent &&
        this.state.editType && (
          <AgentModal
            agency={agency}
            isInAgencyLicenseArray={this.isInAgencyLicenseArray()}
            agencyLicenseArray={agencyLicenseArray}
            initialValues={this.state.selectedAgent}
            toggleModal={this.toggleAgentModal}
            editType={this.state.editType}
            updateAgency={updateAgency}
            updateAgent={updateAgent}
            addAgent={addAgent}
          />
        )}
        {this.state.showAddExistingAgent && (
          <ExistingAgentModal
            agency={agency}
            existsInAgencyLicense={this.isInAgencyLicenseArray()}
            agencyLicenseArray={agencyLicenseArray}
            agents={agents}
            listOfAgents={listOfAgents}
            toggleModal={this.toggleExistingAgentModal}
            updateAgency={updateAgency}
          />
        )}
        {this.state.showRemoveAgent &&
        this.state.selectedAgent &&
        <RemoveAgentModal
          agency={agency}
          initialValues={this.state.selectedAgent}
          toggleModal={this.removeAgentModal}
          updateAgency={updateAgency}
        />}
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            {agents && agents.map((agent, index) => (
              <AgentsCard
                key={index}
                agency={agency}
                agent={agent}
                agentIndex={index}
                toggleAgentModal={this.toggleAgentModal('Edit')}
                removeAgentModal={this.removeAgentModal()}
              />
            ))}
            <div className="agent-actions">
              <hr/>
              <button className="btn btn-sm btn-primary margin right" onClick={this.toggleExistingAgentModal}>
                <i className="fa fa-plus"/>Existing Agent
              </button>
              <button className="btn btn-sm btn-primary" onClick={() => this.toggleNewAgentModal(agency)}>
                <i className="fa fa-plus"/>New Agent
              </button>
              <hr/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Agents;
