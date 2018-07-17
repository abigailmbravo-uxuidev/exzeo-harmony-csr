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

  handleRemoveAgent = async (data, props) => {
    const { agency, updateAgency } = this.props;
    const updatedAgency = cloneDeep(agency);

    updatedAgency.license.forEach((l) => {
      const licenseIndex = agency.license.findIndex(li => li.licenseNumber === l.licenseNumber);
      const agentIndex = l.agent.findIndex(a => a.agentCode === Number(data.agentCode));

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
      addAgent,
      addAgentToAgency,
      agency,
      agencyLicenseArray,
      agents,
      listOfAgents,
      updateAgency,
      updateAgent,
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
                handleEditAgent={this.toggleAgentModal('Edit')}
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
                onClick={() => this.toggleNewAgentModal(agency)}
              ><i className="fa fa-plus"/>New Agent</Button>
              <hr/>
            </div>
          </div>
        </div>

        {this.state.showAgentModal &&
        <AgentDetailModal
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
        }
        {this.state.showAddExistingAgentModal &&
          <AddExistingAgentModal
            addAgentToAgency={addAgentToAgency}
            agency={agency}
            agencyLicenseArray={agencyLicenseArray}
            existsInAgencyLicense={this.isInAgencyLicenseArray()}
            listOfAgents={listOfAgents}
            toggleModal={this.toggleExistingAgentModal}
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
