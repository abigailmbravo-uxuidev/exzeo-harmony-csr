import React, { Component } from 'react';
import AgencyDetails from './AgencyDetails';
import AgencyContacts from './AgencyContacts';
import AgencyModal from '../AgencyModal';
import EditContact from './EditContact';

export class Overview extends Component {
  state = {
    showEditContact: false,
    editType: null,
    editAgency: false
  };

  componentDidMount() {
    const { match } = this.props;
    const { agencyCode } = match.params;
    this.props.getAgency('TTIC', 'FL', agencyCode);
    this.props.getAgents('TTIC', 'FL');
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
    this.setState({ editAgency: !this.state.editAgency });
  };

  render() {
    const { agency } = this.props;
    if (!agency._id) return <div />;

    return (
      <div>
        {this.state.showEditContact &&
          this.state.editType && (
            <EditContact
              initialValues={agency}
              toggleModal={this.toggleContactModal}
              editType={this.state.editType}
              updateContact={this.updateContact}
            />
          )}
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <AgencyDetails agency={agency} editAgency={this.toggleAgencyModal} />
              <AgencyContacts agency={agency} editContact={this.toggleContactModal} />
            </div>
          </div>
        </div>
        {this.state.editAgency &&
          <AgencyModal closeModal={this.toggleAgencyModal} isEdit />
        }
      </div>);
  }
}

export default Overview;
