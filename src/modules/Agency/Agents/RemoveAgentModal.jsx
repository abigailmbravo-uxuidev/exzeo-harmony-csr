import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

export class RemoveAgentModal extends Component {
  // TODO: Clean up this logic!
  removeAgent = async (data, dispatch, props) => {
    const { agency } = props;
    agency.license.forEach((l) => {
      const licenseIndex = agency.license.findIndex(li => li.licenseNumber === l.licenseNumber);
      const agentIndex = l.agent.findIndex(a => a.agentCode === Number(data.agentCode));

      if (agentIndex !== -1) {
        l.agent.splice(agentIndex, 1);
      }
      if (licenseIndex !== -1) {
        agency.license.splice(licenseIndex, 1, l);
      }
    });
    const { createdAt, createdBy, ...selectedAgency } = agency;
    await props.updateAgency(selectedAgency);
    props.toggleModal()();
  };

  render() {
    const {
      toggleModal,
      handleSubmit,
      submitting,
      initialValues,
      agency
    } = this.props;

    return (
      <div className="modal agent-crud">
        <form onSubmit={handleSubmit(this.removeAgent)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-remove" /> Remove Agent
              </h4>
            </div>
            <div className="card-block">
              <section className="agent-details">
                <h4>Are you sure you want to remove {`${initialValues.firstName} ${initialValues.lastName}`} from {agency.displayName}?</h4>
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  tabIndex="0"
                  className="btn btn-secondary"
                  type="button"
                  onClick={toggleModal()}
                >
              No
                </button>
                <button
                  tabIndex="0"
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting}
                >
              Yes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default reduxForm({ form: 'RemoveAgentModal', enableReinitialize: true })(RemoveAgentModal);
