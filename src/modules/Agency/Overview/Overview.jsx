import React from 'react';

import DetailView from '../components/DetailView';
import ContactView from '../components/ContactView';
import AddExistingAgentModal from '../components/ExistingAgentModal';
import AddressView from '../components/AddressView';
import ContactCard from '../components/ContactCard';
import AgentCard from '../components/AgentCard';
import AgentModal from '../components/AgentModal';

import AgencyAddressModal from './AgencyAddressModal';
import AgencyContactModal from './AgencyContactModal';
import AgencyModal from './AgencyModal';
import BranchModal from './BranchModal';


export class Overview extends React.Component {
  state = {
    showEditDetailsModal: false,
    showEditAddressModal: false,
    showEditContactModal: false,
    showEditPrincipalModal: false,
    showEditAgentModal: false,
    showSwitchAgentOfRecordModal: false,
    selectedAgent: null
  }

  onHandleToggleEditDetailsModal = () => {
    this.setState({ showEditDetailsModal: !this.state.showEditDetailsModal });
  }

  onHandleToggleEditAddressModal = () => {
    this.setState({ showEditAddressModal: !this.state.showEditAddressModal });
  }

  onHandleToggleEditContactModal = () => {
    this.setState({ showEditContactModal: !this.state.showEditContactModal });
  }

  onHandleToggleEditPrincipalModal = () => {
    this.setState({ showEditPrincipalModal: !this.state.showEditPrincipalModal });
  }

  onHandleToggleEditAgentModal = () => {
    this.setState({ showEditAgentModal: !this.state.showEditAgentModal });
  }

  onHandleToggleSwitchAgentOfRecordModal = agent => () => {
    this.setState({
      selectedAgent: agent,
      showSwitchAgentOfRecordModal: !this.state.showSwitchAgentOfRecordModal
    });
  }

  handleSwitchAOR = async (data) => {
    const { agency, updateAgency } = this.props;
    const submitData = { ...agency };
    submitData.agentOfRecord = data.selectedAgent.agentCode;
    await updateAgency(submitData);
    this.onHandleToggleSwitchAgentOfRecordModal(null)();
  }

  onHandleEditAgent = async (data) => {
    const {
      agency, updateAgent
    } = this.props;
    await updateAgent(data, agency.agencyCode);
    this.onHandleToggleEditAgentModal();
  };

  render() {
    const {
      agency, territoryManagers, agentOfRecord, addressInitialValues, agencyBranchData, branchCode, agentsList
    } = this.props;
    const {
      showEditDetailsModal, showEditAddressModal, showEditContactModal, showEditPrincipalModal, showEditAgentModal
    } = this.state;

    if (!agencyBranchData || !agencyBranchData.physicalAddress) return <span />;

    return (
      <div className="route-content-wrapper">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <h3>Details
                <button
                  className="btn btn-link btn-sm"
                  onClick={this.onHandleToggleEditDetailsModal}>
                  <i className="fa fa-pencil-square" />Edit
                </button>
              </h3>
              <section className="agency-details">
                <DetailView agency={agency} agencyBranchData={agencyBranchData} />
                <hr />
                <ContactView agency={agency} agencyBranchData={agencyBranchData} emailType="CSR" />
              </section>
              <h3>Address
                <button
                  className="btn btn-link btn-sm"
                  onClick={this.onHandleToggleEditAddressModal}>
                  <i className="fa fa-pencil-square" />Edit
                </button>
              </h3>
              <section className="agency-address">
                <AddressView agencyBranchData={agencyBranchData} territoryManagers={territoryManagers} />
              </section>
              {agencyBranchData.principal && <h3>Officer</h3>}
              {agencyBranchData.principal &&
              <section className="agency-principal">
                <ContactCard contact={agencyBranchData.principal} handleClick={this.onHandleToggleEditPrincipalModal} />
              </section>
              }
              <h3>Contact</h3>
              <section className="agency-contact">
                <ContactCard contact={agencyBranchData.contact} handleClick={this.onHandleToggleEditContactModal} />
              </section>
              <h3>Agent Of Record</h3>
              <section name="agentOfRecord">
                {agentOfRecord && agentOfRecord.agentCode && <AgentCard agent={agentOfRecord} handleSecondaryClick={this.onHandleToggleSwitchAgentOfRecordModal} handlePrimaryClick={this.onHandleToggleEditAgentModal} />}
              </section>
            </div>
          </div>
        </div>
        {showEditDetailsModal && Number(branchCode) === 0 && <AgencyModal initialValues={agency} closeModal={this.onHandleToggleEditDetailsModal} />}
        {showEditDetailsModal && Number(branchCode) > 0 && <BranchModal agency={agency} branchCode={branchCode} initialValues={agencyBranchData} closeModal={this.onHandleToggleEditDetailsModal} />}
        {showEditAddressModal && <AgencyAddressModal agency={agency} initialValues={addressInitialValues} closeModal={this.onHandleToggleEditAddressModal} />}
        {showEditContactModal &&
          <AgencyContactModal agency={agency} branchCode={branchCode} header="Edit Contact" section="contact" initialValues={agencyBranchData} closeModal={this.onHandleToggleEditContactModal} />
        }
        {showEditPrincipalModal &&
          <AgencyContactModal agency={agency} branchCode={branchCode} header="Edit Officer" section="principal" initialValues={agencyBranchData} closeModal={this.onHandleToggleEditPrincipalModal} />
        }
        {showEditAgentModal &&
        <AgentModal isEditing agencyCode={agency.agencyCode} initialValues={agentOfRecord} closeModal={this.onHandleToggleEditAgentModal} handleSaveAgent={this.onHandleEditAgent} />
        }
        {this.state.showSwitchAgentOfRecordModal &&
        <AddExistingAgentModal
          header="Agent Of Record"
          initialValues={{ selectedAgent: this.state.selectedAgent._id }}
          listOfAgents={agentsList}
          onToggleModal={this.onHandleToggleSwitchAgentOfRecordModal(null)}
          handleSelection={this.handleSwitchAOR} />
        }
      </div>
    );
  }
}
export default Overview;
