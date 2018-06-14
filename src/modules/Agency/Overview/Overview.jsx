import React, { Component } from 'react';
import _ from 'lodash';
import AgencyDetails from './AgencyDetails';
import AgencyContacts from './AgencyContacts';

export class Overview extends Component {
  state = {
    showEditContact: false,
    editType: null,
    showAgencyEdit: false
  };

  componentDidMount() {
    const agencyCode = localStorage.getItem('agencyCode');
    this.props.getAgency('TTIC', 'FL', agencyCode);
  }

  toggleContactModal = editType => () =>
    this.setState({
      editType,
      showEditContact: !this.state.showEditContact
    });

  updateContact = (values) => {
    /*
      call update action when agency endpoint is implemented
    */
    this.setState({ editType: null, showEditContact: false });
  };

  toggleAgencyModal = () => {
    this.setState({ showAgencyEdit: !this.state.showAgencyEdit });
  };

  saveAgency = (data, dispatch, props) => {
    this.toggleAgencyModal();
  };

  render() {
    const { agency } = this.props;
    if (!agency) return <div />;
    const matchedPhysicalAddress = _.cloneDeep(agency.physicalAddress);
    delete matchedPhysicalAddress.latitude;
    delete matchedPhysicalAddress.longitude;
    delete matchedPhysicalAddress.county;

    return (
      <div>
        {/* {this.state.showEditContact &&
          this.state.editType && (
            <EditContact
              initialValues={agency}
              toggleModal={this.toggleContactModal}
              editType={this.state.editType}
              updateContact={this.updateContact}
            />
          )} */}
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <AgencyDetails agency={agency} editAgency={this.toggleAgencyModal} />
              <AgencyContacts agency={agency} editContact={this.toggleContactModal} />
            </div>
          </div>
        </div>
        {/* {this.state.showAgencyEdit && (
          <AgencyModal
            initialValues={{
              ...agency,
              sameAsMailing: _.isEqual(
                matchedPhysicalAddress,
                agency.mailingAddress
              )
            }}
            fieldValues={_.get(this.props.form, 'AgencyModal.values', {})}
            saveAgency={this.saveAgency}
            isEdit
            closeModal={this.toggleAgencyModal}
          />
        )} */}
      </div>);
  }
}

export default Overview;
