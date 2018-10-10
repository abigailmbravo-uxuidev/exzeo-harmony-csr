import React from 'react';
import AgencyModal from '../AgencyModal';
import AgencyAddressModal from '../AgencyAddressModal';

export class Overview extends React.Component {
  state = {
    showEditDetailsModal: false,
    showEditAddressModal: false
  }

  onHandleToggleEditDetailsModal = () => {
    this.setState({ showEditDetailsModal: !this.state.showEditDetailsModal });
  }

  onHandleToggleEditAddressModal = () => {
    this.setState({ showEditAddressModal: !this.state.showEditAddressModal });
  }

  render() {
    const { agency, editAgency, territoryManagers } = this.props;
    const { showEditDetailsModal, showEditAddressModal } = this.state;

    if (!agency || !agency.physicalAddress) return <span />;

    return (
      <React.Fragment>
        <section>
          <h3>
      Details
            <button
              className="btn btn-link btn-sm"
              onClick={this.onHandleToggleEditDetailsModal}>
              <i className="fa fa-pencil-square" />Edit
            </button>
          </h3>
          <div className="form-group flex-parent billing">
            <div className="flex-child">
              <label>Agency ID</label>
              <div>
                {agency.agencyCode}
              </div>
            </div>
            <div className="flex-child">
              <label>Agency Name</label>
              <div>
                {agency.displayName}
              </div>
            </div>
            <div className="flex-child">
              <label>Entity Name</label>
              <div>{agency.legalName}</div>
            </div>
            <div className="flex-child">
              <label>Status</label>
              <div>{agency.status}</div>
            </div>
            <div className="flex-child">
              <label>TPAID</label>
              <div>{agency.tpaid}</div>
            </div>
            <div className="flex-child">
              <label>OK to Pay</label>
              <div>{agency.okToPay ? 'Yes' : 'No'}</div>
            </div>
            <div className="flex-child">
              <label>Web Address</label>
              <div>
                <a href={agency.websiteUrl} target="_blank">
                  {agency.websiteUrl}
                </a>
              </div>
            </div>
            <div className="flex-child">
              <label>Tax ID</label>
              <div>{agency.taxIdNumber}</div>
            </div>
            <div className="flex-child">
              <label>Tax Classification</label>
              <div>{agency.taxClassification}</div>
            </div>
            <div className="flex-child">
              <label>EO Expiration Date</label>
              <div>{agency.eoExpirationDate}</div>
            </div>
            <div className="flex-child">
              <label>Branch Name</label>
              <div>{agency.branchName}</div>
            </div>
          </div>
        </section>
        <section>
          <div className="form-group flex-parent billing">
            <div className="flex-child">
              <label>Phone 1</label>
              <div>
                {agency.primaryPhoneNumber}
              </div>
            </div>
            <div className="flex-child">
              <label>Phone 2</label>
              <div>
                {agency.secondaryPhoneNumber}
              </div>
            </div>
            <div className="flex-child">
              <label>Fax</label>
              <div>
                {agency.faxNumber}
              </div>
            </div>
            <div className="flex-child">
              <label>CSR Email</label>
              <div>
                {agency.customerServiceEmailAddress}
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3>
      Address
            <button
              className="btn btn-link btn-sm"
              onClick={this.onHandleToggleEditAddressModal}>
              <i className="fa fa-pencil-square" />Edit
            </button>
          </h3>
          <div className="form-group flex-parent billing">
            <div className="flex-child">
              <h4>Physical Address</h4>
              <label>Address</label>
              <div>
                {agency.physicalAddress.address1}
                {agency.physicalAddress.address2}
              </div>
              <label>City</label>
              <div>
                {agency.physicalAddress.city}
              </div>
              <label>State</label>
              <div>
                {agency.physicalAddress.state}
              </div>
              <label>Zip Code</label>
              <div>
                {agency.physicalAddress.zip}
              </div>
              <label>County</label>
              <div>
                {agency.physicalAddress.county}
              </div>
            </div>
            <div className="flex-child">
              <h4>Mailing Address</h4>
              <label>Address</label>
              <div>
                {agency.mailingAddress.address1}
                {agency.mailingAddress.address2}
              </div>
              <label>City</label>
              <div>
                {agency.mailingAddress.city}
              </div>
              <label>State</label>
              <div>
                {agency.mailingAddress.state}
              </div>
              <label>Zip Code</label>
              <div>
                {agency.mailingAddress.zip}
              </div>
              <label>Territory Manager</label>
              <div>{territoryManagers.filter(t => t._id === agency.territoryManagerId)[0].name}</div>
            </div>
          </div>
        </section>
        {showEditDetailsModal && <AgencyModal initialValues={agency} closeModal={this.onHandleToggleEditDetailsModal} />}
        {showEditAddressModal && <AgencyAddressModal initialValues={agency} closeModal={this.onHandleToggleEditAddressModal} />}

      </React.Fragment>
    );
  }
}
export default Overview;
