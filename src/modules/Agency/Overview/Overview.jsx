import React from 'react';

import AgencyModal from '../AgencyModal';
import AgencyAddressModal from '../AgencyAddressModal';
import ContactCard from '../components/ContactCard';
import AgentCard from '../components/AgentCard';
import AgencyContactModal from '../AgencyContactModal';
import DetailView from '../DetailView';
import ContactView from '../ContactView';
import AddressView from '../AddressView';
import AgentModal from '../AgentModal';
import { getEditModalInitialValues } from '../../../state/selectors/agency.selector';

export class Overview extends React.Component {
  state = {
    showEditDetailsModal: false,
    showEditAddressModal: false,
    showEditContactModal: false,
    showEditPrincipalModal: false,
    showEditAgentModal: false
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

  render() {
    const {
      agency, territoryManagers, agentOfRecord, addressInitialValues
    } = this.props;
    const {
      showEditDetailsModal, showEditAddressModal, showEditContactModal, showEditPrincipalModal, showEditAgentModal
    } = this.state;

    if (!agency || !agency.physicalAddress) return <span />;

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
                <DetailView agency={agency} />
                <hr />
                <ContactView agency={agency} emailType="CSR" />
              </section>
              <h3>Address
                <button
                  className="btn btn-link btn-sm"
                  onClick={this.onHandleToggleEditAddressModal}>
                  <i className="fa fa-pencil-square" />Edit
                </button>
              </h3>
              <section className="agency-address">
                <AddressView agency={agency} territoryManagers={territoryManagers} />
              </section>
              <h3>Officer</h3>
              <section className="agency-principal">
                <ContactCard contact={agency.principal} handleClick={this.onHandleToggleEditPrincipalModal} />
              </section>
              <h3>Contact</h3>
              <section className="agency-contact">
                <ContactCard contact={agency.contact} handleClick={this.onHandleToggleEditContactModal} />
              </section>
              <h3>Agent Of Record</h3>
              <section name="agentOfRecord">
                {agentOfRecord && agentOfRecord.agentCode && <AgentCard agent={agentOfRecord} handleSecondaryClick={x => x} handlePrimaryClick={this.onHandleToggleEditAgentModal} />}
              </section>
            </div>
          </div>
        </div>
        {showEditDetailsModal && <AgencyModal initialValues={agency} closeModal={this.onHandleToggleEditDetailsModal} />}
        {showEditAddressModal && <AgencyAddressModal initialValues={addressInitialValues} closeModal={this.onHandleToggleEditAddressModal} />}
        {showEditContactModal &&
          <AgencyContactModal header="Edit Contact" section="contact" initialValues={agency.contact} closeModal={this.onHandleToggleEditContactModal} />
        }
        {showEditPrincipalModal &&
          <AgencyContactModal header="Edit Officer" section="principal" initialValues={agency.principal} closeModal={this.onHandleToggleEditPrincipalModal} />
        }
        {showEditAgentModal &&
        <AgentModal agencyCode={agency.agencyCode} initialValues={agentOfRecord} closeModal={this.onHandleToggleEditAgentModal} />
        }
      </div>
    );
  }
}
export default Overview;
