import React from 'react';

import DetailView from '../components/DetailView';
import ContactView from '../components/ContactView';
import AddressView from '../components/AddressView';
import ContactCard from '../components/ContactCard';
import AgentCard from '../components/AgentCard';
import AgentModal from '../components/AgentModal';

import AgencyAddressModal from './AgencyAddressModal';
import AgencyContactModal from './AgencyContactModal';
import AgencyModal from './AgencyModal';
import BranchModal from './BranchModal';
import Footer from '../../../components/Common/Footer';
import ExistingAgentModal from '../ExistingAgentModal';

export class Overview extends React.Component {
  state = {
    showEditDetailsModal: false,
    showEditAddressModal: false,
    showEditContactModal: false,
    showEditPrincipalModal: false,
    showEditAgentModal: false,
    showSwitchAgentOfRecordModal: false,
    selectedAgent: null
  };

  toggleEditDetails = () => {
    this.setState({ showEditDetailsModal: !this.state.showEditDetailsModal });
  };

  toggleEditAddress = () => {
    this.setState({ showEditAddressModal: !this.state.showEditAddressModal });
  };

  toggleEditContact = () => {
    this.setState({ showEditContactModal: !this.state.showEditContactModal });
  };

  toggleEditPrincipal = () => {
    this.setState({
      showEditPrincipalModal: !this.state.showEditPrincipalModal
    });
  };

  toggleEditAgent = () => {
    this.setState({ showEditAgentModal: !this.state.showEditAgentModal });
  };

  toggleSwitchAOR = agent => () => {
    this.setState({
      selectedAgent: agent,
      showSwitchAgentOfRecordModal: !this.state.showSwitchAgentOfRecordModal
    });
  };

  handleSwitchAOR = async data => {
    const {
      agency: { agencyCode, branches },
      updateAgency,
      branchCode
    } = this.props;
    if (branchCode > 0) {
      const branchData = [...branches];
      const branchIndex = branchData.findIndex(
        b => Number(b.branchCode) === Number(branchCode)
      );
      branchData[branchIndex].agentOfRecord = data.selectedAgentCode;
      await updateAgency({ agencyCode, branches: branchData });
    } else
      await updateAgency({ agencyCode, agentOfRecord: data.selectedAgentCode });
    this.toggleSwitchAOR(null)();
  };

  onHandleEditAgent = async data => {
    const { agency, updateAgent } = this.props;
    await updateAgent(data, agency.agencyCode);
    this.toggleEditAgent();
  };

  render() {
    const {
      agency,
      territoryManagers,
      agentOfRecord,
      addressInitialValues,
      agencyBranchData,
      branchCode,
      agentsList,
      updateAgency
    } = this.props;

    const {
      showEditDetailsModal,
      showEditAddressModal,
      showEditContactModal,
      showEditPrincipalModal,
      showEditAgentModal
    } = this.state;

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
                  onClick={this.toggleEditDetails}
                >
                  <i className="fa fa-pencil-square" />
                  Edit
                </button>
              </h3>
              <section className="agency-details">
                <DetailView
                  agency={agency}
                  agencyBranchData={agencyBranchData}
                />
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
                  onClick={this.toggleEditAddress}
                >
                  <i className="fa fa-pencil-square" />
                  Edit
                </button>
              </h3>
              <section className="agency-address">
                <AddressView
                  agencyBranchData={agencyBranchData}
                  territoryManagers={territoryManagers}
                />
              </section>
              {agencyBranchData.principal && (
                <React.Fragment>
                  <h3 data-test="agency-officer">Officer</h3>
                  <section className="agency-principal">
                    <ContactCard
                      isOfficer
                      contact={agencyBranchData.principal}
                      handleClick={this.toggleEditPrincipal}
                    />
                  </section>
                </React.Fragment>
              )}
              <h3 data-test="agency-contact">Contact</h3>
              <section className="agency-contact">
                <ContactCard
                  contact={agencyBranchData.contact}
                  handleClick={this.toggleEditContact}
                />
              </section>
              <h3 data-test="agency-aor">
                Agent Of Record
                <button
                  className="btn btn-link btn-sm"
                  onClick={this.toggleSwitchAOR(agentOfRecord.agentCode)}
                >
                  <i className="fa fa-pencil-square" />
                  Switch AOR
                </button>
              </h3>
              <section name="agentOfRecord" className="agency-aor">
                {agentOfRecord && agentOfRecord.agentCode && (
                  <AgentCard
                    agent={agentOfRecord}
                    handleSecondaryClick={this.toggleSwitchAOR}
                    handlePrimaryClick={this.toggleEditAgent}
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
            closeModal={this.toggleEditDetails}
          />
        )}
        {showEditDetailsModal && Number(branchCode) > 0 && (
          <BranchModal
            agency={agency}
            branchCode={branchCode}
            initialValues={agencyBranchData}
            closeModal={this.toggleEditDetails}
          />
        )}
        {showEditAddressModal && (
          <AgencyAddressModal
            branchCode={branchCode}
            agency={agency}
            initialValues={addressInitialValues}
            closeModal={this.toggleEditAddress}
          />
        )}
        {showEditContactModal && (
          <AgencyContactModal
            agency={agency}
            branchCode={branchCode}
            header="Edit Contact"
            section="contact"
            initialValues={agencyBranchData}
            closeModal={this.toggleEditContact}
          />
        )}
        {showEditPrincipalModal && (
          <AgencyContactModal
            agency={agency}
            branchCode={branchCode}
            header="Edit Officer"
            section="principal"
            initialValues={agencyBranchData}
            closeModal={this.toggleEditPrincipal}
          />
        )}
        {showEditAgentModal && (
          <AgentModal
            isEditing
            agencyCode={agency.agencyCode}
            initialValues={agentOfRecord}
            closeModal={this.toggleEditAgent}
            handleSaveAgent={this.onHandleEditAgent}
          />
        )}
        {this.state.showSwitchAgentOfRecordModal && (
          <ExistingAgentModal
            header="Agent Of Record"
            initialValues={{
              selectedAgent: this.state.selectedAgent
                ? this.state.selectedAgent._id
                : ''
            }}
            listOfAgents={agentsList}
            onToggleModal={this.toggleSwitchAOR(null)}
            handleSelection={this.handleSwitchAOR}
          />
        )}
      </div>
    );
  }
}

export default Overview;
