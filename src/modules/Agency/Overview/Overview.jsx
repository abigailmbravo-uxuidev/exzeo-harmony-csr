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
    this.props.getAgency(agencyCode);
    this.props.getAgentsByAgencyCode(agencyCode);
  }

  toggleContactModal = editType => () =>
    this.setState({
      editType,
      showEditContact: !this.state.showEditContact
    });


  toggleAgencyModal = () => {
    this.setState({ editAgency: !this.state.editAgency });
  };

  render() {
    const { agency } = this.props;
    if (!agency || !agency._id) return <div />;

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
