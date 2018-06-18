import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AgentsCard from './AgentsCard';
// import AgentsModal from './AgentsModal';

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

  editAgentModal = selectedAgent =>
    this.setState({
      selectedAgent,
      showEditAgent: !this.state.showEditAgent
    });

  saveAgent = (values) => {
    /*
      call save action when agency endpoint is implemented
    */
    this.setState({ editType: null, showEditAgent: false, selectedAgent: null });
  };

  render() {
    const { agency, agents } = this.props;
    const addedAgents = agents.filter(agent => agent.agencyCode === agency.agencyCode);

    return (
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            {addedAgents.map((agent, index) => (
              <AgentsCard agency={agency} agent={agent} agentIndex={index} editAgentModal={this.editAgentModal} removeAgentModal={this.removeAgentModal} />
            ))}
            <div className="agent-actions">
              <hr />
              <button className="btn btn-sm btn-primary margin right" onClick={this.toggleAddModal}><i className="fa fa-plus" />Existing Agent</button>
              <button className="btn btn-sm btn-primary" onClick={this.toggleCreateModal}><i className="fa fa-plus" />New Agent</button>
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
  agents: PropTypes.shape()
};

export default Agents;
