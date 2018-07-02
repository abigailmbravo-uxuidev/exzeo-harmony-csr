import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        selectedAgent: { agencyCode: agency.agencyCode },
        editType: 'New'
      });
    }

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
      if (l.agent.find(a => a.agentCode === selectedAgent.agentCode)) {
        agencyLicense.push(l.licenseNumber);
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

  render() {
    const {
      agency, agencyAgents, agents, updateAgency, addAgent, updateAgent, listOfAgents, agencyLicenseArray
    } = this.props;
    return (
      <div className="route-content">
        {this.state.showEditAgent &&
          this.state.selectedAgent &&
          this.state.editType && (
            <AgentModal
              agency={agency}
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
            {agencyAgents && agencyAgents.map((agent, index) => (
              <AgentsCard agency={agency} agent={agent} agentIndex={index} toggleAgentModal={this.toggleAgentModal('Edit')} removeAgentModal={this.removeAgentModal()} />
            ))}
            <div className="agent-actions">
              <hr />
              <button className="btn btn-sm btn-primary margin right" onClick={this.toggleExistingAgentModal}><i className="fa fa-plus" />Existing Agent</button>
              <button className="btn btn-sm btn-primary" onClick={() => this.toggleNewAgentModal(agency)}><i className="fa fa-plus" />New Agent</button>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Agents.propTypes = {
  agency: PropTypes.shape(),
  agencyAgents: PropTypes.shape(),
  listOfAgents: PropTypes.shape()
};

export default Agents;
