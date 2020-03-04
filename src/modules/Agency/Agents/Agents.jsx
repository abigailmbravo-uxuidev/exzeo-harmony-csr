import React, { useState } from 'react';
import { Button } from '@exzeo/core-ui';

import AgentsCard from './AgentsCard';
import RemoveAgentModal from './RemoveAgentModal';
import Footer from '../../../components/Common/Footer';
import AgentModal from '../AgentModal';
import AddExistingAgentModal from '../ExistingAgentModal';
import { setDefaults } from '../utilities';

export const Agents = ({
  agency,
  agents,
  orphans,
  updateAgent,
  updateAgency,
  branchCode,
  addAgent,
  agentsList,
  listAnswersAsKey
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [agentDetailInitialValues, setAgentDetailInitialValues] = useState(
    null
  );
  const [showAgentDetailEditModal, setShowAgentDetailEditModal] = useState(
    false
  );
  const [showAgentOfRecordModal, setShowAgentOfRecordModal] = useState(false);
  const [showAgentDetailNewModal, setShowAgentDetailNewModal] = useState(false);
  const [showRemoveAgentModal, setShowRemoveAgentModal] = useState(false);
  const [selectedAgentCode, setSelectedAgentCode] = useState(null);
  const [showAddExistingAgentModal, setShowAddExistingAgentModal] = useState(
    false
  );

  const onHandleEditAgent = async (data, form) => {
    const { dirtyFields } = form.getState();
    setDefaults(dirtyFields, data);
    await updateAgent(data, agency.agencyCode);
    closeAgentDetailModal();
  };

  const onHandleSaveAgent = async data => {
    data.agencies.push({ agencyCode: agency.agencyCode, branchCode });
    await addAgent(data, agency.agencyCode);
    closeAgentDetailModal();
  };

  const handleRemoveAgent = async data => {
    const { agencyCode } = agency;
    data.agencies = data.agencies.filter(a => a.agencyCode !== agencyCode);
    await updateAgent(data, agencyCode);
    toggleRemoveAgentModal();
  };

  const toggleSwitchAgentOfRecord = agentCode => {
    setSelectedAgentCode(showAgentOfRecordModal ? null : agentCode);
    setShowAgentOfRecordModal(!showAgentOfRecordModal);
  };

  const handleSwitchAOR = async data => {
    await updateAgency({
      agencyCode: agency.agencyCode,
      agentOfRecord: data.selectedAgentCode
    });
    toggleSwitchAgentOfRecord();
  };

  const toggleRemoveAgentModal = activeIndex => {
    setShowRemoveAgentModal(!showRemoveAgentModal);
    setActiveIndex(activeIndex);
  };

  const toggleExistingAgentModal = () => {
    setShowAddExistingAgentModal(!showAddExistingAgentModal);
  };

  const openAgentDetailEditModal = activeIndex => {
    const agent = agents[activeIndex];
    setShowAgentDetailEditModal(true);
    setActiveIndex(activeIndex);
    setAgentDetailInitialValues(agent);
  };

  const openAgentDetailNewModal = () => {
    setShowAgentDetailNewModal(true);
    setAgentDetailInitialValues({
      status: 'Active',
      agencies: [],
      mailingAddress: {
        country: {
          code: 'USA',
          displayText: 'United States of America'
        }
      },
      licenses: [
        {
          state: '',
          license: '',
          licenseType: '',
          licenseEffectiveDate: '',
          appointed: true
        }
      ]
    });
  };

  const closeAgentDetailModal = () => {
    setShowAgentDetailEditModal(false);
    setShowAgentDetailNewModal(false);
    setAgentDetailInitialValues(null);
    setActiveIndex(null);
  };

  const handleAddExistingAgent = async data => {
    const { selectedAgentCode } = data;
    const selectedAgent = orphans.filter(
      a => String(a.agentCode) === String(selectedAgentCode)
    )[0];
    selectedAgent.agencies.push({ agencyCode: agency.agencyCode, branchCode });
    await updateAgent(selectedAgent, agency.agencyCode);
    toggleExistingAgentModal();
  };

  return (
    <div className="route-content-wrapper">
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            {agents &&
              agents.map((agent, index) => (
                <AgentsCard
                  key={agent.agentCode}
                  agency={agency}
                  agent={agent}
                  agentIndex={index}
                  handleSwitchAOR={toggleSwitchAgentOfRecord}
                  handleEditAgent={openAgentDetailEditModal}
                  handleRemoveAgent={toggleRemoveAgentModal}
                />
              ))}
            <div className="agent-actions">
              <hr />
              <Button
                className={Button.constants.classNames.primary}
                size={Button.constants.sizes.small}
                customClass="margin right"
                dataTest="add-existing-agent"
                onClick={toggleExistingAgentModal}
              >
                <i className="fa fa-plus" />
                Existing Agent
              </Button>
              <Button
                className={Button.constants.classNames.primary}
                size={Button.constants.sizes.small}
                dataTest="add-new-agent"
                onClick={openAgentDetailNewModal}
              >
                <i className="fa fa-plus" />
                New Agent
              </Button>
              <hr />
            </div>
          </div>
        </div>

        {showAgentDetailEditModal && agentDetailInitialValues && (
          <AgentModal
            listAnswersAsKey={listAnswersAsKey}
            initialValues={agentDetailInitialValues}
            isEditing
            handleSaveAgent={onHandleEditAgent}
            closeModal={closeAgentDetailModal}
          />
        )}
        {showAgentDetailNewModal && agentDetailInitialValues && (
          <AgentModal
            listAnswersAsKey={listAnswersAsKey}
            initialValues={agentDetailInitialValues}
            handleSaveAgent={onHandleSaveAgent}
            closeModal={closeAgentDetailModal}
          />
        )}
        {showAddExistingAgentModal && (
          <AddExistingAgentModal
            header="Exisiting Agent"
            listOfAgents={orphans}
            onToggleModal={toggleExistingAgentModal}
            handleSelection={handleAddExistingAgent}
          />
        )}
        {showAgentOfRecordModal && (
          <AddExistingAgentModal
            header="Agent Of Record"
            initialValues={{
              selectedAgentCode: selectedAgentCode
            }}
            listOfAgents={agentsList}
            onToggleModal={toggleSwitchAgentOfRecord}
            handleSelection={handleSwitchAOR}
          />
        )}
        {showRemoveAgentModal && (
          <RemoveAgentModal
            agencyName={agency.displayName}
            initialValues={agents[activeIndex]}
            handleCancel={toggleRemoveAgentModal}
            handleConfirm={handleRemoveAgent}
          />
        )}
      </div>
      <div className="basic-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Agents;
