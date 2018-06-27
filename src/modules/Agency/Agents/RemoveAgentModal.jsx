import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Radio, Input, Phone, AutocompleteChips, Integer } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

const radioStatusAnswers = [
  { answer: 'Inactive', label: 'Inactive' },
  { answer: 'Active', label: 'Active' }
];

export class RemoveAgentModal extends Component {
  removeAgent = async (data, dispatch, props) => {
    const { agency } = props;
    const { createdAt, createdBy, ...selectedAgency } = agency;
    agency.license.map((l) => {
      const agentIndex = l.agent.findIndex(a => a.agentCode === data.agentCode);

      if (agentIndex !== -1) {
        l.agent.splice(agentIndex, 1);
      }
      return l;
    });
    await props.updateAgency(selectedAgency);
    props.toggleModal();
  };

  render() {
    const {
      toggleModal,
      handleSubmit,
      submitting,
      selectedAgent
    } = this.props;

    return (
      <div className="modal agent-crud">
        <form onSubmit={handleSubmit(this.removeAgent)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" />
            Remove Agent
              </h4>
            </div>
            <div className="card-block">
              <section className="agent-details">
                <h4>Are you sure you want to remove {selectedAgent.firstName}</h4>
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
              Cancel
                </button>
                <button
                  tabIndex="0"
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting}
                >
              Save
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
