import React, { useState } from 'react';

import DetailView from '../components/DetailView';
import ContactView from '../components/ContactView';
import AddressView from '../components/AddressView';
import ContactCard from '../components/ContactCard';
import AgentCard from '../components/AgentCard';

import AgencyContactModal from '../AgencyContactModal';
import AgencyModal from '../AgencyModal';
import BranchModal from '../BranchModal';
import Footer from '../../../components/Footer';

import ExistingAgentModal from '../ExistingAgentModal';
import AgentModal from '../AgentModal';
import AgencyAddressModal from '../AgencyAddressModal';
import { formatAgent } from '../utilities';
import { useFetchTerritoryManager } from '../../../hooks/territoryManagers';

export const Overview = ({
  agency,
  agentOfRecord,
  addressInitialValues,
  agencyBranchData,
  branchCode,
  agentsList,
  updateAgency,
  updateAgent,
  listAnswersAsKey
}) => {
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [showEditContactModal, setShowEditContactModal] = useState(false);
  const [showEditPrincipalModal, setShowEditPrincipalModal] = useState(false);
  const [showEditAgentModal, setShowEditAgentModal] = useState(false);
  const [
    showSwitchAgentOfRecordModal,
    setShowSwitchAgentOfRecordModal
  ] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(undefined);

  const { territoryManager } = useFetchTerritoryManager(
    agency?.territoryManagerId
  );

  const toggleSwitchAOR = agent => () => {
    setSelectedAgent(agent);
    setShowSwitchAgentOfRecordModal(!showSwitchAgentOfRecordModal);
  };

  const handleSwitchAOR = async data => {
    const { agencyCode, branches } = agency;

    if (branchCode > 0) {
      const branchData = branches.filter(b => String(b.branchCode) !== '0');
      const branchIndex = branchData.findIndex(
        b => Number(b.branchCode) === Number(branchCode)
      );
      branchData[branchIndex].agentOfRecord = data.selectedAgentCode;
      await updateAgency({ agencyCode, branches: branchData });
    } else
      await updateAgency({ agencyCode, agentOfRecord: data.selectedAgentCode });
    toggleSwitchAOR(null)();
  };

  const handleEditAgent = async data => {
    const agentData = formatAgent(data);
    await updateAgent(agentData, agency.agencyCode);
    setShowEditAgentModal(false);
  };

  if (!agencyBranchData || !agencyBranchData.physicalAddress) return <span />;

  return (
    <div className="route-content-wrapper">
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <section className="contract-details">
              {agency.contracts.map(contract => (
                <div className="contract" key={contract.contractNumber}>
                  <h3>{contract.companyCode}</h3>
                  {contract.stateProducts.map(item => (
                    <span key={`${item.state}-${item.product}`}>
                      {item.state}&nbsp;&bull;&nbsp;{item.product}
                      &nbsp;&bull;&nbsp;
                      <strong>{item.status}</strong>
                    </span>
                  ))}
                </div>
              ))}
            </section>
            <h3 data-test="agency-details">
              Details
              <button
                className="btn btn-link btn-sm"
                data-test="edit-agency-details"
                onClick={() => setShowEditDetailsModal(true)}
              >
                <i className="fa fa-pencil-square" />
                Edit
              </button>
            </h3>
            <section className="agency-details">
              <DetailView agency={agency} agencyBranchData={agencyBranchData} />
              <hr />
              <ContactView
                agency={agency}
                agencyBranchData={agencyBranchData}
                emailType="CSR"
              />
            </section>
            <h3 data-test="agency-address">
              Address
              <button
                className="btn btn-link btn-sm"
                data-test="edit-agency-address"
                onClick={() => setShowEditAddressModal(true)}
              >
                <i className="fa fa-pencil-square" />
                Edit
              </button>
            </h3>
            <section className="agency-address">
              <AddressView
                agencyBranchData={agencyBranchData}
                territoryManager={territoryManager}
              />
            </section>
            {agencyBranchData.principal && (
              <React.Fragment>
                <h3 data-test="agency-officer">Officer</h3>
                <section className="agency-principal">
                  <ContactCard
                    isOfficer
                    contact={agencyBranchData.principal}
                    handleClick={() => setShowEditPrincipalModal(true)}
                  />
                </section>
              </React.Fragment>
            )}
            <h3 data-test="agency-contact">Contact</h3>
            <section className="agency-contact">
              <ContactCard
                contact={agencyBranchData.contact}
                handleClick={() => setShowEditContactModal(true)}
              />
            </section>
            <h3 data-test="agency-aor">
              Agent Of Record
              <button
                className="btn btn-link btn-sm"
                onClick={toggleSwitchAOR(agentOfRecord.agentCode)}
              >
                <i className="fa fa-pencil-square" />
                Switch AOR
              </button>
            </h3>
            <section name="agentOfRecord" className="agency-aor">
              {agentOfRecord && agentOfRecord.agentCode && (
                <AgentCard
                  agent={agentOfRecord}
                  handleSecondaryClick={toggleSwitchAOR}
                  handlePrimaryClick={() => setShowEditAgentModal(true)}
                />
              )}
            </section>
          </div>
        </div>
      </div>
      <div className="basic-footer">
        <Footer />
      </div>
      {showEditDetailsModal && Number(branchCode) === 0 && (
        <AgencyModal
          initialValues={agency}
          updateAgency={updateAgency}
          closeModal={() => setShowEditDetailsModal(false)}
        />
      )}
      {showEditDetailsModal && Number(branchCode) > 0 && (
        <BranchModal
          agency={agency}
          branchCode={branchCode}
          initialValues={agencyBranchData}
          updateAgency={updateAgency}
          closeModal={() => setShowEditDetailsModal(false)}
        />
      )}
      {showEditAddressModal && (
        <AgencyAddressModal
          branchCode={branchCode}
          agency={agency}
          initialValues={addressInitialValues}
          listAnswersAsKey={listAnswersAsKey}
          updateAgency={updateAgency}
          closeModal={() => setShowEditAddressModal(false)}
        />
      )}
      {showEditContactModal && (
        <AgencyContactModal
          agency={agency}
          branchCode={branchCode}
          header="Edit Contact"
          section="contact"
          initialValues={agencyBranchData}
          updateAgency={updateAgency}
          closeModal={() => setShowEditContactModal(false)}
        />
      )}
      {showEditPrincipalModal && (
        <AgencyContactModal
          agency={agency}
          branchCode={branchCode}
          header="Edit Officer"
          section="principal"
          initialValues={agencyBranchData}
          updateAgency={updateAgency}
          closeModal={() => setShowEditPrincipalModal(false)}
        />
      )}
      {showEditAgentModal && (
        <AgentModal
          isEditing
          agencyCode={agency.agencyCode}
          initialValues={agentOfRecord}
          closeModal={() => setShowEditAgentModal(false)}
          handleSaveAgent={handleEditAgent}
          listAnswersAsKey={listAnswersAsKey}
        />
      )}
      {showSwitchAgentOfRecordModal && (
        <ExistingAgentModal
          header="Agent Of Record"
          initialValues={{
            selectedAgent: selectedAgent ? selectedAgent._id : ''
          }}
          listOfAgents={agentsList}
          onToggleModal={toggleSwitchAOR(null)}
          handleSelection={handleSwitchAOR}
        />
      )}
    </div>
  );
};

export default Overview;
