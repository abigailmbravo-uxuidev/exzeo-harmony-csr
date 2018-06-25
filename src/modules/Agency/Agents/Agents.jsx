import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AgentsCard from './AgentsCard';
import AgentModal from './AgentModal';
import ExistingAgentModal from './ExistingAgentModal';

export class Agents extends Component {
  state = {
    showEditAgent: false,
    showRemoveAgent: false,
    editType: null,
    selectedAgent: null
  };

  removeAgentModal = selectedAgent =>
    this.setState({
      selectedAgent,
      showRemoveAgent: !this.state.showRemoveAgent
    });

  toggleAgentModal = editType => selectedAgent =>
    this.setState({
      editType,
      selectedAgent,
      showEditAgent: !this.state.showEditAgent
    });

  toggleExistingAgentModal = () =>
    this.setState({
      showAddExistingAgent: !this.state.showAddExistingAgent
    });

  render() {
    const {
      agency, agencyAgents, agents, updateAgent, addAgent
    } = this.props;

    const listOfAgents = agents ? agents.map(a => ({ answer: a.agentCode, label: `${a.firstName} ${a.lastName}` })) : [];
    return (
      <div className="route-content">
        {this.state.showEditAgent &&
          this.state.selectedAgent &&
          this.state.editType && (
            <AgentModal
              agency={agency}
              initialValues={this.state.selectedAgent}
              toggleModal={this.toggleAgentModal}
              editType={this.state.editType}
              updateAgent={updateAgent}
            />
          )}
        {this.state.showAddExistingAgent && (
          <ExistingAgentModal
            agency={agency}
            agents={agents}
            listOfAgents={listOfAgents}
            toggleModal={this.toggleExistingAgentModal}
            addAgent={addAgent}
          />
          )}
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            {agencyAgents && agencyAgents.map((agent, index) => (
              <AgentsCard agency={agency} agent={agent} agentIndex={index} toggleAgentModal={this.toggleAgentModal('Edit')} removeAgentModal={this.removeAgentModal} />
            ))}
            <div className="agent-actions">
              <hr />
              <button className="btn btn-sm btn-primary margin right" onClick={this.toggleExistingAgentModal}><i className="fa fa-plus" />Existing Agent</button>
              <button className="btn btn-sm btn-primary" onClick={() => this.toggleAgentModal('Add')({ agencyCode: agency.agencyCode })}><i className="fa fa-plus" />New Agent</button>
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
